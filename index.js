const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const bcrypt = require("./bcrypt");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");
const { response } = require("express");

app.use(express.json());

app.use(
    cookieSession({
        secret: "This is my secret",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(compression());
app.use(express.static("public"));

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
    db.getUserData(email).then(({ rows }) => {
        if (rows[0]) {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            db.addCode(email, secretCode)
                .then(() => {
                    const subject = "Your verification code";
                    const message = `Welcome, 
                    Please use the following code for resetting your password: ${secretCode}`;
                    return ses.sendEmail(email, message, subject);
                })
                .then(() => {
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error while adding secret code", err);
                    res.json({
                        errorMessage:
                            "Oops, something went wrong, please try again",
                    });
                });
        } else {
            res.json({
                errorMessage:
                    "Sorry, given e-mail is not registered in our service",
            });
        }
    });
});

app.post("/password/reset/verify", (req, res) => {
    console.log(req.body);
    const { email, code, password } = req.body;
    db.getCode(email).then(({ rows }) => {
        if (code == rows[0].code) {
            console.log("match");
            bcrypt
                .hash(password)
                .then((hash) => {
                    console.log(hash);
                    return db.updatePassword(hash, email);
                })
                .then(() => {
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error while updating a password", err);
                    res.json({
                        errorMessage:
                            "Sorry, something went wrong, please try again",
                    });
                });
        } else {
            res.json({
                errorMessage:
                    "Sorry, but the verification code does not match or has expired",
            });
        }
    });
});

app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
    bcrypt
        .hash(password)
        .then((hash) => {
            return db.addUser(first, last, email, hash);
        })
        .then((result) => {
            const { id } = result.rows[0];
            req.session.userId = id;
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error post /register route: ", err);
            res.json({ success: false });
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.getUserData(email)
        .then(({ rows }) => {
            const { id } = rows[0];
            const hash = rows[0].password;
            return bcrypt
                .compare(password, hash)
                .then((result) => {
                    if (result) {
                        req.session.userId = id;
                        res.json({ success: true });
                    } else {
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("error in post /login: ", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error in post /login: ", err);
            res.json({ success: false });
        });
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});

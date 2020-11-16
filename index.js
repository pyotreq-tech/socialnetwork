const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const bcrypt = require("./bcrypt");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");
const uidSafe = require("uid-safe");
const multer = require("multer");
const path = require("path");
const s3 = require("./s3");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

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

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.post("/images", uploader.single("file"), s3.upload, (req, res) => {
    if (req.file) {
        const { id } = req.body;
        const { filename } = req.file;
        const url = `https://s3.amazonaws.com/spicedling/${filename}`;
        console.log("url from post image:", url);
        console.log("id from post image:", id);
        db.updateImage(url, id)
            .then(({ rows }) => {
                rows = rows[0];
                console.log("image url after upload:", rows);
                res.json(rows);
            })
            .catch((err) => {
                console.log("error in posting image: ", err);
                res.json({
                    success: false,
                });
            });
    } else {
        res.json({
            success: false,
        });
    }
});
app.post("/bio", (req, res) => {
    const { id, bio } = req.body;
    // console.log(req.body);

    db.updateBio(bio, id)
        .then(({ rows }) => {
            rows = rows[0];
            console.log("image url after upload:", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in posting image: ", err);
            res.json({
                success: false,
            });
        });
});

app.get("/users", (req, res) => {
    const { userId } = req.session;
    // console.log("users route hit");
    // console.log(userId);
    db.getUserDataById(userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("error in /get users: ", err);
        });
});

app.get("/getFriends", async (req, res) => {
    const { userId } = req.session;
    try {
        const { rows } = await db.getFriends(userId);
        let received = rows.filter(function (user) {
            return !user.accepted && user.sender_id != userId;
        });
        let sent = rows.filter(function (user) {
            return !user.accepted && user.sender_id == userId;
        });
        res.json({ rows, received, sent });
    } catch (e) {
        console.log(e);
    }
});

app.get("/getOtherFriends/:id", async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.getOtherFriends(id);
    res.json(rows);
});

app.get("/api/moreusers/:user", async (req, res) => {
    const { user } = req.params;
    const { rows } = await db.getMatchingUsers(user);
    if (rows[0]) {
        // console.log("more users: ");
        res.json(rows);
    } else {
        // console.log("no result");
        res.json({ empty: true });
    }
});

app.post("/FriendStatus/:buttonMessage", async (req, res) => {
    const { userId } = req.session;
    const { id } = req.body;
    if (req.params.buttonMessage == "Add Friend") {
        const { data } = await db.addFriendRequest(id, userId, false);
        res.json({ success: true });
    } else if (req.params.buttonMessage == "Cancel request") {
        const { data } = await db.cancelFriendship(id, userId);
        res.json({ success: true });
    } else if (req.params.buttonMessage == "Accept Friend") {
        const { data } = await db.acceptFriendRequest(id, userId, true);
        console.log({ id });
        console.log({ userId });
        res.json({ success: true });
    } else if (req.params.buttonMessage == "End Friendship") {
        const { data } = await db.cancelFriendship(id, userId);
        res.json({ success: true });
    }
});

app.get("/checkFriendStatus/:otherUserId", async (req, res) => {
    try {
        const { userId } = req.session;
        const { otherUserId } = req.params;
        const { rows } = await db.getInitialStatus(userId, otherUserId);
        if (!rows[0]) {
            res.json({ button: "Add Friend", id: userId });
        } else if (!rows[0].accepted) {
            if (rows[0].recipient_id !== req.session.userId) {
                res.json({
                    button: "Cancel request",
                    id: userId,
                });
            } else {
                res.json({
                    button: "Accept Friend",
                    id: userId,
                });
            }
        } else if (rows[0].accepted) {
            res.json({ button: "End Friendship", id: userId });
        }
    } catch (e) {
        console.log("Error in check friend status: ", e);
    }
});

app.get("/api/users", async (req, res) => {
    const { rows } = await db.getLastThreeRegisteredUsers();
    // console.log("3 users: ", rows);
    res.json(rows);
});

app.get("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.session;
    if (id == userId) {
        res.json({ denied: true });
    } else {
        try {
            const { rows } = await db.getOtherUserDataById(id);
            if (rows[0]) {
                res.json(rows[0]);
                // console.log(rows[0]);
            } else {
                res.json({ denied: true });
            }
        } catch (e) {
            console.log("error in api user");
            res.json({ denied: true });
        }
    }
});

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
    // console.log(req.body);
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
            console.log(rows);
            const { id } = rows[0];
            const hash = rows[0].password;
            bcrypt
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

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});
app.get("*", function (req, res) {
    // console.log("LOLLLL");
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function () {
    console.log("I'm listening.");
});

// SOCKET CODE WILL RUN BELOW ALL HTTP CODE RUN ABOVE

io.on("connection", (socket) => {
    console.log(`socked with id ${socket.id} just connect!`);

    // sending messages to client from server

    //socket.emit - sends a message only to one client who has connected

    socket.emit("welcome", {
        name: "Piotr",
    });

    // io.emit -> everytime new user logs in, msg send to everybody

    // io.emit("messageSentWithIoEmit", {
    //     id: socket.id,
    // });

    // socket.broadcast.emit
    // everytime one user connects, other users see the broadcast, except the user who just connected

    socket.broadcast.emit("broadcastEmitFun", {
        id: socket.id,
    });

    // listening for a message from the client

    socket.on("messageFromClient", (data) => {
        console.log("here is our data: ", data);
    });

    socket.on("disconnect", () => {
        console.log("user " + socket.id + "has disconnected");
    });
});

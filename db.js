var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/socialnetwork`
);

exports.addUser = (first, last, email, password) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4) RETURNING id
    `,
        [first, last, email, password]
    );
};

exports.addCode = (email, code) => {
    return db.query(
        `
        INSERT INTO reset_codes (email, code)
        VALUES ($1, $2)
    `,
        [email, code]
    );
};

exports.getUserData = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};
exports.getUserDataById = (id) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};
exports.getOtherUserDataById = (id) => {
    return db.query(
        `SELECT first, last, profileimage, bio, id FROM users WHERE id = $1`,
        [id]
    );
};

exports.updatePassword = (hash, email) => {
    return db.query(`UPDATE users SET password = $1 WHERE email = $2`, [
        hash,
        email,
    ]);
};

exports.getCode = (email) => {
    return db.query(
        `SELECT * FROM reset_codes
        WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes' 
        AND email = $1
        ORDER BY id DESC
        LIMIT 1;
        `,
        [email]
    );
};

exports.updateImage = (profileimage, id) => {
    return db.query(
        `UPDATE users SET profileimage = $1 WHERE id = $2 RETURNING profileimage;

    `,
        [profileimage, id]
    );
};
exports.updateBio = (bio, id) => {
    return db.query(
        `UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio;

    `,
        [bio, id]
    );
};

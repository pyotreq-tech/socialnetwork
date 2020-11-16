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
exports.getFriends = (id) => {
    return db.query(
        `  SELECT users.id, first, last, profileimage, accepted, sender_id, recipient_id
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = false AND sender_id = $1 AND recipient_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
`,
        [id]
    );
};
exports.getOtherFriends = (id) => {
    return db.query(
        `  SELECT users.id, first, last, profileimage, accepted, sender_id, recipient_id
        FROM friendships
        JOIN users
        ON (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
        LIMIT 6
`,
        [id]
    );
};

exports.getOtherUserDataById = (id) => {
    return db.query(
        `SELECT id, first, last, profileimage, bio, id FROM users WHERE id = $1`,
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

exports.getLastThreeRegisteredUsers = () => {
    return db.query(`  SELECT * FROM users ORDER BY id DESC LIMIT 3`);
};

exports.getMatchingUsers = (val) => {
    return db.query(
        `SELECT first, last, profileimage, id FROM users WHERE first ILIKE $1`,
        [val + "%"]
    );
};

exports.getInitialStatus = (receipent, sender) => {
    return db.query(
        `  SELECT * FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1);
`,
        [sender, receipent]
    );
};

exports.addFriendRequest = (receipent, sender, accepted) => {
    return db.query(
        `INSERT INTO friendships (recipient_id, sender_id, accepted) VALUES ($1, $2, $3);
`,
        [receipent, sender, accepted]
    );
};

exports.cancelFriendship = (receipent, sender) => {
    return db.query(
        `  DELETE FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)
        RETURNING sender_id;
        `,
        [receipent, sender]
    );
};

exports.acceptFriendRequest = (receipent, sender, accepted) => {
    return db.query(
        `UPDATE friendships SET accepted = $3 WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)
;
        `,
        [receipent, sender, accepted]
    );
};

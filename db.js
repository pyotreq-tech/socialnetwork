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
exports.postWall = (userId, authorId, content, imageUrl) => {
    return db.query(
        `INSERT INTO wall (user_id, author_id, content, image_url) VALUES ($1, $2, $3, $4) RETURNING *;
`,
        [userId, authorId, content, imageUrl]
    );
};
exports.postComment = (postId, authorId, comment) => {
    return db.query(
        `INSERT INTO comments (post_id, author_id, comment) VALUES ($1, $2, $3) RETURNING *;
`,
        [postId, authorId, comment]
    );
};
// exports.displayWall = (id) => {
//     return db.query(
//         `SELECT users.first AS first, users.last AS last, users.profileimage AS profileimage, wall.timestamp, wall.content, wall.image_url
//         FROM users
//         JOIN wall
//         ON users.id = wall.user_id
//         WHERE wall.user_id = $1
//         ORDER by timestamp DESC;
// `,
//         [id]
//     );
// };
exports.displayWall = (id) => {
    return db.query(
        `SELECT wall.author_id AS author_id, wall.id AS id, users.first AS first, users.last AS last, wall.timestamp AS timestamp, wall.content AS content, wall.image_url AS image_url, users.profileimage AS profileimage FROM wall JOIN users ON author_id = users.id WHERE user_id = $1  ORDER BY timestamp DESC
`,
        [id]
    );
};
exports.displayComments = (id) => {
    return db.query(
        // `SELECT * FROM comments WHERE post_id = $1  ORDER BY timestamp DESC`
        `SELECT users.profileimage AS profileimage, users.first AS first, users.last AS last, comments.post_id AS post_id, comments.author_id AS author_id, comments.timestamp AS timestamp, comments.comment AS comment FROM comments JOIN users ON author_id = users.id WHERE post_id = $1  ORDER BY timestamp DESC`,

        [id]
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

exports.getOnline = (id) => {
    return db.query(
        `SELECT id, first, last, profileimage FROM users WHERE id = $1;`,
        [id]
    );
};

exports.getShoutbox = () => {
    // `SELECT users.profileimage AS profileimage, users.first AS first, users.last AS last, comments.post_id AS post_id, comments.author_id AS author_id, comments.timestamp AS timestamp, comments.comment AS comment FROM comments JOIN users ON author_id = users.id WHERE post_id = $1  ORDER BY timestamp DESC`,

    return db.query(
        `SELECT shoutbox.author_id AS author_id, shoutbox.message AS message, shoutbox.timestamp AS timestamp, users.profileimage AS profileimage, users.first AS first, users.last AS last FROM shoutbox JOIN users ON author_id = users.id ORDER BY timestamp DESC LIMIT 10`
    );
};
exports.getPrivateChat = (receiverId, senderId) => {
    return db.query(
        `SELECT * FROM chat WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)`,
        [receiverId, senderId]
    );
};

exports.addShoutbox = (author_id, message) => {
    return db.query(
        `INSERT INTO shoutbox (author_id, message) VALUES ($1, $2) RETURNING *`,
        [author_id, message]
    );
};

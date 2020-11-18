-- DROP TABLE IF EXISTS users CASCADE;
-- CREATE TABLE users (
--      id SERIAL PRIMARY KEY,
--      first VARCHAR(255) NOT NULL CHECK (first != ''),
--      last VARCHAR(255) NOT NULL CHECK (last != ''),
--      profileimage VARCHAR(255),
--      bio TEXT,
--      email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
--      password VARCHAR(255) NOT NULL CHECK (password != ''),
--      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- DROP TABLE IF EXISTS reset_codes CASCADE;
-- CREATE TABLE reset_codes(
--     id SERIAL PRIMARY KEY,
--     email VARCHAR NOT NULL REFERENCES users(email) ON DELETE CASCADE,
--     code VARCHAR NOT NULL,
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );

-- DROP TABLE IF EXISTS friendships CASCADE;
-- CREATE TABLE friendships(
--    id SERIAL PRIMARY KEY,
--    sender_id INT REFERENCES users(id) NOT NULL,
--    recipient_id INT REFERENCES users(id) NOT NULL,
--    accepted BOOLEAN DEFAULT false
--  );

-- DROP TABLE IF EXISTS wall CASCADE;
-- CREATE TABLE wall(
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id) NOT NULL,
--     author_id INT REFERENCES users(id) NOT NULL,
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     content TEXT,
--     image_url TEXT
-- );

-- DROP TABLE IF EXISTS comments CASCADE;
-- CREATE TABLE comments(
--     id SERIAL PRIMARY KEY,
--     post_id INT REFERENCES wall(id) NOT NULL,
--     author_id INT REFERENCES users(id) NOT NULL,
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     comment TEXT
-- );

-- DROP TABLE IF EXISTS shoutbox CASCADE;
-- CREATE TABLE shoutbox(
--     id SERIAL PRIMARY KEY,
--     author_id INT REFERENCES users(id) NOT NULL,
--     message TEXT,
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- INSERT INTO shoutbox (author_id, message) VALUES (1, 'Welcome');

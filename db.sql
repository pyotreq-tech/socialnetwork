DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     first VARCHAR(255) NOT NULL CHECK (first != ''),
     last VARCHAR(255) NOT NULL CHECK (last != ''),
     profileimage VARCHAR(255),
     bio TEXT,
     email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
     password VARCHAR(255) NOT NULL CHECK (password != ''),
     time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS reset_codes CASCADE;
CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

DROP TABLE IF EXISTS friendships;
CREATE TABLE friendships(
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES users(id) NOT NULL,
   recipient_id INT REFERENCES users(id) NOT NULL,
   accepted BOOLEAN DEFAULT false
 );

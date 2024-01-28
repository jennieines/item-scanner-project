CREATE DATABASE itemscanner;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(30) NOT NULL
);

-- \c itemscanner

TABLE users;
 --display the users table and info

 INSERT INTO users (username, password) VALUES ('test_user', 'test_password');
CREATE DATABASE itemscanner;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- \c itemscanner

TABLE users;
 --display the users table and info

 INSERT INTO users (username, password) VALUES ('test_user', 'test_password');




 --psql postgresql://postgres:postgrespassword@localhost:5432/itemscanner -f db-setup.sql
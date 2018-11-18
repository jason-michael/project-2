-- Table Schemas, optimized for JAWSDB heroku deployment

-- Set up DB
DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
USE testdb;

-- Bookmarks Table
CREATE TABLE bookmarks (
    id INT AUTO_INCREMENT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    bookmark_name VARCHAR(50) NULL,
    href VARCHAR(750) NOT NULL,
    notes VARCHAR(2000) NULL,
    category VARCHAR(100) NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    PRIMARY KEY (id),
    FOREIGN KEY (username) REFERENCES users(username)
);

-- Users table
CREATE TABLE users
(
    id  INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- User config;
CREATE TABLE userconfig
(
    user_id INT(11) NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
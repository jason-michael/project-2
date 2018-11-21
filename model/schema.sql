-- Table Schemas, optimized for JAWSDB heroku deployment

-- Set up DB
DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
USE testdb;

-- Users table
CREATE TABLE users
(
    id  INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);


-- Bookmarks Table
CREATE TABLE bookmarks (
    createdAt TIMESTAMP NOT NULL,
    bookmark_name VARCHAR(50) NULL,
    href VARCHAR(750) NOT NULL,
    notes VARCHAR(2000) NULL,
    category VARCHAR(100) NULL,
    
    user_name VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_name) 
    REFERENCES users(username)
);


-- TEST ENTRIES
INSERT INTO users (username, email, password)
VALUES ("matt", "matt@matt.com", "mattyb");

INSERT INTO users (username, email, password)
VALUES ("bob", "bob@bob.com", "bobby");


INSERT INTO bookmarks (bookmark_name, href, notes, category, user_name)
VALUES ("Semantic HTML", "w3schools.com", "HTML5 semantic tags ref.", "HTML", "matt");

INSERT INTO bookmarks (bookmark_name, href, notes, category, user_name)
VALUES ("JS Closures", "hackernoon.com", "Understand JS closures", "JS", "matt");

INSERT INTO bookmarks (bookmark_name, href, notes, category, user_name)
VALUES ("CSS Grid", "css-tricks.com", "Learn CSS Grid", "CSS", "bob");

INSERT INTO bookmarks (bookmark_name, href, notes, category, user_name)
VALUES ("Travis CI", "travisci.com", "Travis Continuous Integration Tool", "DevOps", "bob");
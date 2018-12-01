-- Table Schemas, optimized for JAWSDB heroku deployment

-- Set up DB
DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
USE testdb;

-- Users table
CREATE TABLE users
(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);


-- Bookmarks Table
CREATE TABLE bookmarks (
    bkmk_id INT(11) NOT NULL AUTO_INCREMENT,
    createdAt TIMESTAMP NOT NULL,
    bookmark_name VARCHAR(50) NULL,
    href VARCHAR(750) NOT NULL,
    notes VARCHAR(2000) NULL,
    collection_name VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    PRIMARY KEY (bkmk_id),
    user_id INT(11) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- INSERT INTO bookmarks (bookmark_name, href, notes, collection_name category, user_id)
-- VALUES ("Semantic HTML", "w3schools.com", "HTML5 semantic tags ref.", "HTML", "Documentation" 1);

-- INSERT INTO bookmarks (bookmark_name, href, notes, category, user_id)
-- VALUES ("JS Closures", "hackernoon.com", "Understand JS closures", "JS", 1);

-- INSERT INTO bookmarks (bookmark_name, href, notes, category, user_id)
-- VALUES ("CSS Grid", "css-tricks.com", "Learn CSS Grid", "CSS", "bob");

-- INSERT INTO bookmarks (bookmark_name, href, notes, category, user_id)
-- VALUES ("Travis CI", "travisci.com", "Travis Continuous Integration Tool", "DevOps", "bob");
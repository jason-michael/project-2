-- Table Schemas, optimized for JAWSDB heroku deployment

-- Bookmarks Table
CREATE TABLE bookmarks (
    id INT AUTO_INCREMENT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    bookmark_name VARCHAR(50) NULL,
    href VARCHAR(750) NOT NULL,
    notes VARCHAR(2000) NULL,
    category VARCHAR(100) NULL,
    user VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);
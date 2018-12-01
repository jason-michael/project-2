const connection = require("./db_connection")


const bookmk_orm = {
    selectAll: function(user, callback) {
        let query = "SELECT * FROM bookmarks WHERE user_id = ?";
        connection.query(query, [user], (err, result) => {
            if (err) throw err
            callback(result)
        })
    },
    selectCategory: function(user, category, callback) {
        let query = "SELECT * FROM bookmarks WHERE user_name = ? AND category = ?";
        connection.query(query, [user, category], (err, result) => {
            if (err) throw err
            callback(result)
        })
    },
    insertOne: function(name, href, notes, category, user, callback) {
        let query = "INSERT INTO bookmarks (bookmark_name, href, notes, category, user_name) VALUES (?, ?, ?, ?, ?)"
        connection.query(query, [name, href, notes, category, user], (err, result) => {
            if (err) throw err
            callback(result)
        })
    }
}


module.exports = bookmk_orm;
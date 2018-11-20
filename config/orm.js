const connection = require("./db_connection")


const orm = {
    selectAll: function(user, callback) {
        let query = "SELECT * FROM bookmarks WHERE user_name = ?";
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
    }
}


module.exports = orm;
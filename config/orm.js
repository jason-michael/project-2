const connection = require("./db_connection")


const orm = {
    selectAll: function(tableName, colName, val, callback) {
        let query = "SELECT * FROM ?? WHERE ?? = ?";
        connection.query(query, [tableName, colName, val], (err, result) => {
            if (err) throw err
            callback(result)
        })
    },
    selectWhereCat: function(username, category, callback) {
        let query = "SELECT * FROM bookmarks WHERE username = ? AND category = ?";
        connection.query(query, [username, category], (err, result) => {
            if (err) throw err
            callback(result)
        })
    }
}


module.exports = orm;
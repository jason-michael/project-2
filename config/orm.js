const connection = require("./db_connection")


const bookmk_orm = {
    selectAll: function (user, callback) {
        let query = "SELECT * FROM bookmarks WHERE user_id = ?";
        connection.query(query, [user], (err, result) => {
            if (err) throw err
            callback(result)
        })
    },
    selectAllWhere: function (user, collection, category, callback) {
        let query = "SELECT * FROM bookmarks WHERE user_id = ? AND collection_name = ? AND category = ?";
        connection.query(query, [user, collection, category], (err, result) => {
            if (err) throw err
            callback(result)
        })
    },
<<<<<<< HEAD
    insertOne: function (table, obj, bkmk_id, callback) {
        let query = "INSERT INTO ?? SET ? WHERE bkmk_id = ?";
        connection.query(query, [table, obj, bkmk_id], (err, result) => {
=======
    insertOne: function (table, obj, callback) {
        let query = "INSERT INTO ?? SET ?";
        connection.query(query, [table, obj], (err, result) => {
>>>>>>> ae3c57e594139bc10d53034901753baa7df1ef6e
            if (err) throw err
            callback(result)
        })
    },
    deleteOne: function (table, bkmk_id, callback) {
        let query = "DELETE FROM ?? WHERE bkmk_id = ?";
        connection.query(query, [table, bkmk_id], (err, result) => {
            if (err) throw err
            callback(result)
        })
    },
    updateOne: function (table, obj, bkmk_id, callback) {
        let query = "UPDATE ?? SET ? WHERE bkmk_id = ?";
        connection.query(query, [table, obj, bkmk_id], (err, result) => {
            if (err) throw err
            callback(result)
        })
    }
}


module.exports = bookmk_orm;
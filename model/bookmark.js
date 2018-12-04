const orm = require('../config/orm');

module.exports = {
    getAll: (user, callback) => orm.selectAll(user, callback),
    getAllWhere: (user, collection, category, callback) => orm.selectAllWhere(user, collection, category, callback),
<<<<<<< HEAD
    create: (obj, bkmk_id, callback) => orm.insertOne("bookmarks", obj, bkmk_id, callback),
=======
    create: (obj, callback) => orm.insertOne("bookmarks", obj, callback),
>>>>>>> ae3c57e594139bc10d53034901753baa7df1ef6e
    delete: (bkmk_id, callback) => orm.deleteOne("bookmarks", bkmk_id, callback),
    update: (obj, bkmk_id, callback) => orm.updateOne("bookmarks", obj, bkmk_id, callback)
}
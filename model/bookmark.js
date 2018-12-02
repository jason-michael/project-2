const orm = require('../config/orm');

module.exports = {
    getAll: (user, callback) => orm.selectAll(user, callback),
    getAllWhere: (user, collection, category, callback) => orm.selectAllWhere(user, collection, category, callback),
    create: (obj, user, callback) => orm.insertOne("bookmarks", obj, user, callback),
    delete: (bkmk_id, callback) => orm.deleteOne("bookmarks", bkmk_id, callback),
    update: (obj, bkmk_id, callback) => orm.updateOne("bookmarks", obj, bkmk_id, callback)
}
const orm = require('../config/orm');

module.exports = {
    getAll: (user, callback) => orm.selectAll(user, callback),
    create: (obj, bkmk_id, callback) => orm.insertOne("bookmarks", obj, bkmk_id, callback),
    delete: (bkmk_id, callback) => orm.deleteOne("bookmarks", bkmk_id, callback),
    update: (obj, bkmk_id, callback) => orm.updateOne("bookmarks", obj, bkmk_id, callback)
}
const Bookmarks = require('../model/bookmark');

module.exports = {
    getCollections: async function (userId) {
        const collections = await Bookmarks.getAll(userId, data => {

            let _collections = {};
            // Sort bookmarks
            data.forEach(bookmark => {
                if (!collections[bookmark.collection_name]) {
                    collections[bookmark.collection_name] = [];
                }

                collections[bookmark.collection_name].push(bookmark);
            });

            return _collections;
        });

        return collections;
    }
}
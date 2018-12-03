//==========================================================
// Dependencies
//==========================================================
const router = require('express').Router();
const Bookmarks = require("../model/bookmark");
//==========================================================
// GET All Bookmarks for User
//==========================================================
router.get("/users/:id/bookmarks", (req, res) => {
    Bookmarks.getAll(user, data => {
        res.json(data)
    })
})
//==========================================================
// CREATE New Bookmark
//==========================================================
router.post("/bookmarks/:bkmk_id", (req, res) => {
    let obj = req.body;
    let user = req.user.user_id;
    obj.user_id = user
    Bookmarks.create(obj, data => {
        res.json(data)
    })
})
//==========================================================
// UPDATE Bookmark
//==========================================================
router.put("/bookmarks/:bkmk_id", (req, res) => {
    let obj = req.body;
    let id = req.params.bkmk_id;
    Bookmarks.update(obj, id, data => {
        res.json(data)
    })
})
//==========================================================
// DELETE Bookmark
//==========================================================
router.delete("/bookmarks/:bkmk_id", (req, res) => {
    let id = req.params.bkmk_id;
    Bookmarks.delete(id, data => {
        res.end()
    })
})
//==========================================================
// Initial Login
//==========================================================
router.get('/bookmarks/:user/:collection/:category', (req, res) => {
    const user = req.params.user;
    const collection = req.params.collection;
    const category = req.params.category;

    console.log(req.params)

    Bookmarks.getAll(req.user.user_id, data => {

        // Sort bookmarks
        let collections = {};
        data.forEach(bookmark => {
            if (!collections[bookmark.collection_name]) {
                collections[bookmark.collection_name] = [];
            }

            collections[bookmark.collection_name].push(bookmark);
        });

        Bookmarks.getAllWhere(user, collection, category, results => {
            res.render('profile', {
                collections,
                bookmarks: results,
                user: req.user.user_id,
                category: category,
                collectionHeading: 'Bookmarks - ' + collection
            });
        });
    });
});

module.exports = router;
//==========================================================
// Dependencies
//==========================================================
const router = require('express').Router();
const Bookmarks = require("../model/bookmark");
const loginController = require('./loginController');

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
    let newBkmk = req.body;
    let id = req.params.bkmk_id;
    Bookmarks.create(newBkmk, id, data => {
        res.json(data)
    })
})
//==========================================================
// UPDATE Bookmark
//==========================================================
router.put("/users/:id/bookmarks/:bkmk_id", (req, res) => {
    let
})



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
                user: req.user.user_id
            });
        });
    });
});


module.exports = router;
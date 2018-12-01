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
    let newBkmk = req.body;
    let id = req.params.bkmk_id;
    Bookmarks.create(newBkmk, id, data => {
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
        res.send("Bookmark successfully deleted.")
    })
})

module.exports = router;
//==========================================================
// Dependencies
//==========================================================
const router = require('express').Router()
//==========================================================
// Modules
//==========================================================
const bookmk_orm = require('../config/bookmk_orm')
//==========================================================
// Get Bookmarks
//==========================================================
router.get("/bookmarks/:user/:category?", (req, res) => {
    let user = req.params.user
    let category = req.params.category
    if (!category) {
        bookmk_orm.selectAll(user, (data) => {
            res.json(data)    
        })
    } else {
        bookmk_orm.selectCategory(user, category, (data) => {
            res.json(data)
        }) 
    }
})

router.post("/bookmarks", (req, res) => {
    let newBkmk = req.body
    bookmk_orm.insertOne(newBkmk.name, newBkmk.href, newBkmk.notes, newBkmk.category, newBkmk.user, (data) => {
        res.json(newBkmk)
    })
    
    
})

module.exports = router;
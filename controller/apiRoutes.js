//==========================================================
// Dependencies
//==========================================================
const router = require('express').Router()
//==========================================================
// Modules
//==========================================================
const orm = require('../config/orm')
//==========================================================
// Get Bookmarks
//==========================================================
router.get("/bookmarks/:user/:category?", (req, res) => {
    let user = req.params.user
    let category = req.params.category
    if (!category) {
        orm.selectAll(user, (data) => {
            res.json(data)    
        })
    } else {
        orm.selectCategory(user, category, (data) => {
            res.json(data)
        }) 
    }
})

router.post("/bookmarks", (req, res) => {
    let newBkmk = req.body
    orm.insertOne(newBkmk.name, newBkmk.href, newBkmk.notes, newBkmk.category, newBkmk.user, (data) => {
        res.json(data)
    })
    
    
})

module.exports = router;
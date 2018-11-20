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
    let category = req.params.category
    let user = req.params.user
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


module.exports = router;
//==========================================================
// Dependencies
//==========================================================
const router = require('express').Router()
//==========================================================
// Modules
//==========================================================
const db = require('../config/db_connection')
const orm = require('../config/orm')


//==========================================================
// Get Bookmarks
//==========================================================
router.get("/api/bookmarks/:category?", (req, res) => {
    let category = req.params.category
    if (!category) {
        orm.selectAll("bookmarks", "username", "matt", (data) => {
            console.log(data);
            res.json(data)    
        })
        
    }
    // res.json() all bookmarks in 'category'
})


module.exports = router;
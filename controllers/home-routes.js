const router = require('express').Router()
const sequelize = require('../config/connection')

// GET all posts
router.get('/', (req, res) => {
    res.render('home')
})


module.exports = router
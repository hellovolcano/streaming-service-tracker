const router = require('express').Router();
const sequelize = require('../config/connection');

// GET all posts
router.get('/', (req, res) => {
    res.render('home')
});

router.get('/login', (req, res) => {
    res.render('login')
});

module.exports = router;

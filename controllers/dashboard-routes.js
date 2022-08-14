const router = require('express').Router();
const sequelize = require('../config/connection');
const { Service, User } = require('../models');

// route to the user dashboard
router.get('/', (req,res) => {
    res.render('dashboard')
})

// route to create a new service
router.get('/create-service', (req,res) => {
    res.render('create-service')
})

module.exports = router;

const router = require('express').Router()
const sequelize = require('../config/connection')
const { Service } = require('../models')

// Render home page
router.get('/', (req, res) => {
    res.render('home')
})

// GET all services
router.get('/services', (req, res) => {
    Service.findAll()
    .then(serviceData => {
        const services = serviceData.map(service => service.get({ plain: true }))
        res.render('services', { services })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router
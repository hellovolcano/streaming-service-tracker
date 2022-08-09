const router = require('express').Router()
const sequelize = require('../../config/connection')
const { Service } = require('../../models')

// GET all services => /api/services
router.get('/', (req, res) => {
    Service.findAll()
    .then(serviceData => res.json(serviceData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports = router
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Service, User } = require('../models');

// render the user dashboard
router.get('/', (req,res) => {
    res.render('dashboard')
})

// create a new service
router.get('/create-service', (req,res) => {
    res.render('create-service')
})

// edit a service
router.get('/edit/:id', (req,res) => {
    Service.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','name','cost','cost_basis','auto_renewal_date','is_active']
    })
    .then(dbServiceData => {
        if(!dbServiceData) {
            res.status(404).json({ message: 'No post found with that id'})
            return
        }

        // serialize the data before passing to template
        const service = dbServiceData.get({ plain: true })
        res.render('edit-service', { service })
    })
})

module.exports = router;

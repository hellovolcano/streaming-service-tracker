const router = require('express').Router();
const sequelize = require('../config/connection');
const { Service, User } = require('../models');

// render the user dashboard
// TODO (BLOCKED): Filter the list of returned services to the specific user after we implement the junction table
router.get('/', (req,res) => {
    Service.findAll()
        .then(serviceData => {
            const services = serviceData.map(service => service.get({ plain: true }))
        res.render('dashboard', {services})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
// create a new service
router.get('/create-service', (req,res) => {
    res.render('create-service')
})

// edit a service
router.get('/edit-service/:id', (req,res) => {
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

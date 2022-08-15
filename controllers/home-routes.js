const router = require('express').Router();
const sequelize = require('../config/connection');
const { Service, User } = require('../models');

// Render home page
router.get('/', (req, res) => {
    res.render('home', {
        layout: 'landing-page.handlebars',
        loggedIn: req.session.loggedIn,
        userName: req.session.userName
    });
});

// LOGIN route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard')
        return
    }

    res.render('login', {layout: 'landing-page.handlebars'})
})


// GET all services
router.get('/services', (req, res) => {
    Service.findAll()
        .then(serviceData => {
            const services = serviceData.map(service => service.get({ plain: true }))
            res.render('services', { services });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
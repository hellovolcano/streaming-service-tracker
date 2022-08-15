const router = require('express').Router();
const sequelize = require('../config/connection');
const { Service, User, User_Subscription } = require('../models');

// render the user dashboard
router.get('/', (req,res) => {
 // TODO (BUG FIX): When redirected from the /login screen, the application intermittently redirects before we've saved the session info

    // search for all of the user's subscriptions to display on their dashboard
    User_Subscription.findAll({
        where: {
            // use the ID from the session after testing (req.session.user_id)
            user_id: req.session.user_id
        },
        attributes: ['id','user_id','service_id','is_active','auto_renewal_date'],
        include: {
            model: Service,
            attributes: ['name','cost','cost_basis']
        }
    })
        .then(dbSubData => {
            const services = dbSubData.map(service => service.get({ plain: true }))

        res.render('dashboard', {services, loggedIn: true})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
// render create a new service view
router.get('/create-service', (req,res) => {
    res.render('create-service')
})

// render edit a service view
router.get('/edit-service/:id', (req,res) => {
    Service.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','name','cost','cost_basis']
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

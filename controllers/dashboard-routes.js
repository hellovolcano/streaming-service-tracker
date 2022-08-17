const router = require('express').Router();
const { Op } = require('sequelize');
// const { moment } = require('moment');
const { Service, User_Subscription, TvShow } = require('../models');
const withAuth = require('../utils/auth')
const moment = require('moment')

// render the user dashboard
router.get('/', withAuth, (req, res) => {
    // TODO (BUG FIX): When redirected from the /login screen, the application intermittently redirects before we've saved the session info

    // search for all of the user's subscriptions to display on their dashboard
    User_Subscription.findAll({
        where: {
            // use the ID from the session after testing (req.session.user_id)
            user_id: req.session.user_id
        },
        order: [
            ['auto_renewal_date', 'DESC']
        ],
        attributes: ['id', 'user_id', 'service_id', 'is_active', 'auto_renewal_date'],
        include: {
            model: Service,
            attributes: ['id', 'name', 'cost', 'cost_basis']
        }
    })
        .then(dbSubData => {
            const services = dbSubData.map(service => service.get({ plain: true }))
            const summaryData = {
                monthlyCost: 0,
                activeSubs: 0,
            };
            const activeServiceIds = [];
            services.reduce((accumulator, current) => {
                if (current.is_active) {
                    if (current.Service.cost_basis === 'yearly') {
                        accumulator.monthlyCost += Math.round(current.Service.cost / 12);

                    } else {
                        accumulator.monthlyCost += Math.round(parseFloat(current.Service.cost));
                    }
                    activeServiceIds.push(current.Service.id)
                    accumulator.activeSubs++;
                }
                return accumulator;
            }, summaryData);
            TvShow.findAll({
                where: {
                    // use the ID from the session after testing (req.session.user_id)
                    premiereDate: {
                        [Op.gte]: moment()
                    }
                }
            }).then((results) => {
                const tvShows = results.map(results => results.get({ plain: true }));
                tvShows.forEach((tvShow)=>{
                    tvShow.isSubscribed = activeServiceIds.indexOf(tvShow.service_id) >= 0;
                });
                res.render('dashboard', {
                    services,
                    tvShows: tvShows,
                    loggedIn: req.session.loggedIn,
                    summary: summaryData
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.get('/add-subscription', withAuth, (req, res) => {
    res.render('add-subscription', { loggedIn: req.session.loggedIn })
})

router.get('/edit-subscription/:id', withAuth, (req, res) => {
    User_Subscription.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbSubData => {
            if (!dbSubData) {
                res.status(404).json({ message: 'not found' })
                return
            }

            const subscription = dbSubData.get({ plain: true })
            res.render('edit-subscription', { subscription, loggedIn: req.session.loggedIn })
        })
})

// render create a new service view
router.get('/create-service', withAuth, (req, res) => {
    res.render('create-service', { loggedIn: req.session.loggedIn })
})

// render edit a service view
router.get('/edit-service/:id', withAuth, (req, res) => {
    Service.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name', 'cost', 'cost_basis']
    })
        .then(dbServiceData => {
            if (!dbServiceData) {
                res.status(404).json({ message: 'No post found with that id' })
                return
            }

            // serialize the data before passing to template
            const service = dbServiceData.get({ plain: true })
            res.render('edit-service', { service, loggedIn: req.session.loggedIn })
        })
})

module.exports = router;

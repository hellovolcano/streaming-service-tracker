const router=require('express').Router()
const sequelize = require('../../config/connection')
const {User, Service, User_Subscription} = require('../../models')

// gets a list of all active user subscriptions
router.get('/', (req, res) => {
    User_Subscription.findAll({
        attributes: ['id','user_id','service_id','is_active','auto_renewal_date'],
        include: {
            model: Service,
            attributes: ['name','cost','cost_basis']
        }
    })
    .then(dbSubData => res.json(dbSubData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// create a user-specific subscription to a service
router.post('/', (req, res) => {
    User_Subscription.create({

        user_id: req.body.user_id,  // change to get info from the session after testing
        service_id: req.body.service_id,
        is_active: req.body.is_active,
        auto_renewal_date: req.body.auto_renewal_date
    })
    .then(dbSubData => res.json(dbSubData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })

})


module.exports = router

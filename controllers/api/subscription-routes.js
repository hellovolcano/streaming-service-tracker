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

        user_id: req.session.user_id,  // change to get info from the session after testing
        service_id: req.body.service_id,
        is_active: req.body.is_active, // hardcoding as a test
        auto_renewal_date: req.body.auto_renewal_date
    })
    .then(dbSubData => res.json(dbSubData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })

})

// update a user-specific subscription to a service
router.put('/:id', (req, res) => {
    User_Subscription.update({
        service_id: req.body.service_id,
        is_active: req.body.is_active,
        auto_renewal_date: req.body.auto_renewal_date
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbSubData => {
        console.log(dbSubData)
        if (!dbSubData) {
            res.status(404).json({message: 'Not found'})
            return
        }
        res.json(dbSubData)
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })

})

router.delete('/:id', (req, res) => {
    User_Subscription.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbSubData => {
        if (!dbSubData) {
            res.status(404).json({message: 'Not found'})
            return
        }

        res.json(dbSubData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router

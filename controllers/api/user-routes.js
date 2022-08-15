const router=require('express').Router()
const sequelize = require('../../config/connection')
const {User} = require('../../models')

// find all users
router.get('/', (req,res) => {
    User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with that email address!'})
            return
        }

        const validPassword = dbUserData.checkPassword(req.body.password)

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'})
            return
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id
            req.session.userName = dbUserData.firstname + " " + dbUserData.lastName
            req.session.loggedIn = true

            res.json({ user: dbUserData, message: 'You are now logged in'})
        })

    })
})

//logout route
router.post('/logout', (req, res) => {
    // if the session loggedIn variable evaluates to true, destroy the session
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    }
    else {
        res.status(404).end()
    }
})

module.exports = router
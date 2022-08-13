const router = require('express').Router();
const sequelize = require('../config/connection');
const { Service, User } = require('../models');
const bcrypt = require('bcrypt');

// Render home page
router.get('/', (req, res) => {
    res.render('home', {
        loggedIn: req.session.loggedIn,
        userName: req.session.userName
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {

    // Capture the input fields
    const userName = req.body.userName;
    const password = req.body.password;
    // Ensure the input fields exists and are not empty
    if (userName && password) {
        let user = await User.findOne({
            where: {
                email: userName
            }
        });
        if (user && bcrypt.compareSync(password, user.password)) {
            // Authenticate the user
            req.session.loggedIn = true;
            req.session.userName = user.firstName + " " + user.lastName;
            // Redirect to home page
            res.redirect('/');
        } else {
            res.render('login', {
                error: 'Incorrect userName and/or Password!'
            });
        }
    } else {
        res.render('login', {
            error: 'Please enter userName and Password!'
        });
    }
});
router.delete('/login', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.render('error', {
            error: 'Unable to log out'
        });
      } else {
        // Redirect to home page
        res.redirect('/');
      }
    });
  } else {
    res.end()
  }
});

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
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

router.get('/signup', (req, res) => {
    res.render('signup');
});
router.post('/signup', async (req, res) => {

    // Capture the input fields
    const userData = {
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    const confirmPassword = req.body.confirmPassword;
    let errMsg = '';
    const emptyFields = [];
    // Ensure the input fields exists and are not empty
    Object.keys(userData).forEach((key) => {
        if (!userData[key]) {
            emptyFields.push(key);
        }
    });
    if (emptyFields.length) {
        errMsg = 'Please enter values for all required fields';
        console.log(emptyFields);
    } else {
        if (userData.password !== confirmPassword) {
            errMsg = 'The password and confirmation password do not match.';
        }
        
        let user = await User.findOne({
            where: {
                email: userData.email
            }
        });
        if (user) {
            errMsg = 'Email already exists, please enter a different email address.';
        }
    }

    if (!errMsg) {
        user = User.build(userData);
        await user.save();
        res.redirect('/login?msg=user_created');
    } else {
        res.render('signup',{error:errMsg});
    }
});

module.exports = router;
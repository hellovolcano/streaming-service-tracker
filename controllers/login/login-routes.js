const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('login', {layout: 'landing-page.handlebars'});
});

router.post('/', async (req, res) => {

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

router.delete('/', (req, res) => {
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
module.exports = router;

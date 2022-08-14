const router = require('express').Router();
const { User } = require('../../models');
router.get('/', (req, res) => {
    res.render('signup', {layout: 'landing-page.handlebars'});
});
router.post('/', async (req, res) => {

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

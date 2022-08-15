const router = require('express').Router();
router.get('/', (req, res) => {
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
        res.redirect('/');
    }
});
module.exports = router;

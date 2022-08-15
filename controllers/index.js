const router = require('express').Router()

const apiRoutes = require('./api')
const homeRoutes = require('./home-routes.js')
const loginRoutes = require('./login')
const signupRoutes = require('./signup')
const logoutRoutes = require('./logout')
// const dashboardRoutes = require('./dashboard-routes.js')

router.use('/api', apiRoutes)
router.use('/login', loginRoutes)
router.use('/signup', signupRoutes)
router.use('/logout', logoutRoutes)
router.use('/', homeRoutes)
// router.use ('/dashboard', dashboardRoutes)

router.use((req, res) => {
    res.status(404).end()
})

module.exports = router
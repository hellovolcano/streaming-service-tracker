const router = require('express').Router()

const serviceRoutes = require('./service-routes')

router.use('/services', serviceRoutes)

module.exports = router
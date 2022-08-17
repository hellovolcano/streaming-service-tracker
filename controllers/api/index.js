const router=require('express').Router();

const serviceRoutes = require('./service-routes')
const showRoutes = require('./showRoutes.js');
const subscriptionRoutes = require('./subscription-routes')
const userRoutes = require('./user-routes')

router.use('/services',serviceRoutes);
router.use('/shows',showRoutes);
router.use('/subscriptions',subscriptionRoutes)
router.use('/users', userRoutes)

module.exports=router;

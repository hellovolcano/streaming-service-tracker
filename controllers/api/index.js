const router=require('express').Router();

const serviceRoutes = require('./service-routes')
const showRoutes = require('./showRoutes.js');

router.use('/services',serviceRoutes);
router.use('/show',showRoutes);

module.exports=router;
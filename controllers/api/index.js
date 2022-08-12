const router=require('express').Router();

const showRoutes = require('./showRoutes.js');

router.use('/show',showRoutes);

module.exports=router;
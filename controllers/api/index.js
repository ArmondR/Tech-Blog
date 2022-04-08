// this file serves as a meanse to gather all the API routes and package them up.

const router = require('express').Router();

const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;
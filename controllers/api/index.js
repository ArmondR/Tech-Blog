// this file serves as a meanse to gather all the API routes and package them up.

const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
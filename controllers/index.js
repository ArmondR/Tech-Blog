// this file is for collecting the packaged api routes.

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// error handling for request that dont exist.
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
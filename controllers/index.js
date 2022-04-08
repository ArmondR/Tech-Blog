// this file is for collecting the packaged api routes.

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// error handeling for request that dont exist.
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Index for the two main types of routes, api via /api, and user via /

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

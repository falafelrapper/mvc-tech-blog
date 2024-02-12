const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// Index for the api routes
// Two main routes, one for users (login, logout, create) and recipes (create, delete)

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;

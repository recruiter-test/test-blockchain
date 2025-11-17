var express = require('express');
var router = express.Router();

// Import sub-routers
var pagesRouter = require('./pages');
var blocksRouter = require('./blocks');
var historyRouter = require('./history');

// Mount page routes
router.use('/', pagesRouter);

// Mount API routes
router.use('/api/blocks', blocksRouter);
router.use('/api/history', historyRouter);

module.exports = router;

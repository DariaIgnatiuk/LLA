// routes/index.js

const express = require('express');
const router = express.Router();
const cardSetRoutes = require('./cardSetRoutes');
const gameRoutes = require('./gameRoutes');
const playerStatisticsRoutes = require('./playerStatisticsRoutes');
const uploadRoutes = require('./uploadRoutes');
const wordRoutes = require('./wordRoutes');

router.use('/cardsets', cardSetRoutes); // Route for card sets
router.use('/games', gameRoutes); // Route for games
router.use('/playerstatistics', playerStatisticsRoutes); // Route for player statistics
router.use('/upload', uploadRoutes); // Route for file uploads
router.use('/words', wordRoutes); // Route for words

module.exports = router;

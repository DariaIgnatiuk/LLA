// routes/index.js

const express = require('express');
const router = express.Router();
const cardSetRoutes = require('./cardSetRoutes');
const gameRoutes = require('./gameRoutes');
const playerStatisticsRoutes = require('./playerStatisticsRoutes');
const uploadRoutes = require('./upload');
const wordRoutes = require('./wordRoutes');

router.use('/cardsets', cardSetRoutes);
router.use('/games', gameRoutes);
router.use('/playerstatistics', playerStatisticsRoutes);
router.use('/upload', uploadRoutes);
router.use('/words', wordRoutes);

module.exports = router;

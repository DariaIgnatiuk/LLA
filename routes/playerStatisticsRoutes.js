// routes/playerStatisticsRoutes.js

const express = require('express');
const router = express.Router();
const playerStatisticsController = require('../controllers/playerStatisticsController');

router.post('/playerstatistics', playerStatisticsController.addPlayerResult);
router.get('/topresults/:set_name/:game_name', playerStatisticsController.getTopResults);

module.exports = router;

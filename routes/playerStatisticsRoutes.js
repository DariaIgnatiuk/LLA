// routes/playerStatisticsRoutes.js

const express = require('express');
const router = express.Router();
const {
    getPlayerStatisticsByGameNameHandler,
    addPlayerResultHandler,
} = require('../controllers/playerStatisticsController');

// Route to get player statistics by game name
router.get('/game/:gameName', getPlayerStatisticsByGameNameHandler);

// Route to add a new player result
router.post('/game', addPlayerResultHandler);

module.exports = router;

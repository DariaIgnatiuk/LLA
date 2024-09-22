// routes/playerStatisticsRoutes.js

const express = require('express');
const router = express.Router();
const addPlayerResult = require('../controllers/addPlayerResult');
const getTopResults = require('../controllers/getTopResults');

// Route to add player result
router.post('/', addPlayerResult);

// Route to get top results
router.get('/topresults/:set_name/:game_name', getTopResults);

module.exports = router;

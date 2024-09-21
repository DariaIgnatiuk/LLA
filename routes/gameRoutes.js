// routes/gameRoutes.js

const express = require('express');
const router = express.Router();
const { getAllGamesHandler, createGameHandler } = require('../controllers/gameController');

// Route to get all games
router.get('/', getAllGamesHandler);

// Route to create a new game
router.post('/create', createGameHandler);

module.exports = router;

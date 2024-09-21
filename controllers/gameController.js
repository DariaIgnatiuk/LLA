// controllers/gameController.js

const { getAllGames, createGame } = require('../models/gameModel');

// Function to get all games
async function getAllGamesHandler(req, res) {
    try {
        const games = await getAllGames();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving games', error });
    }
}

// Function to create a new game
async function createGameHandler(req, res) {
    const { gameName } = req.body;
    try {
        const game = await createGame(gameName);
        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ message: 'Error creating game', error });
    }
}

module.exports = { getAllGamesHandler, createGameHandler };

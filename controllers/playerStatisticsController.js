// controllers/playerStatisticsController.js

const db = require('../config/db');
const { getPlayerStatisticsByGameName } = require('../models/playerStatisticsModel');

// Function to get player statistics by game name
async function getPlayerStatisticsByGameNameHandler(req, res) {
    const { gameName } = req.params;
    try {
        const statistics = await getPlayerStatisticsByGameName(gameName);
        res.json(statistics);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving player statistics', error });
    }
}

// Function to add a new player result
async function addPlayerResultHandler(req, res) {
    const { username, gameName, correctAnswers, timeSpent } = req.body;
    try {
        // Get the game ID
        const gameResult = await db.query('SELECT id FROM games WHERE game_name = $1', [gameName]);
        if (gameResult.rows.length === 0) {
            return res.status(404).json({ message: 'Game not found' });
        }
        const gameId = gameResult.rows[0].id;

        // Insert the new player result
        await db.query(
            'INSERT INTO player_statistics (username, game_id, correct_answers, time_spent) VALUES ($1, $2, $3, $4)',
            [username, gameId, correctAnswers, timeSpent]
        );

        // Get the updated top 5 results
        const updatedStatistics = await getPlayerStatisticsByGameName(gameName);
        res.status(201).json(updatedStatistics);
    } catch (error) {
        res.status(500).json({ message: 'Error adding player result', error });
    }
}

module.exports = { getPlayerStatisticsByGameNameHandler, addPlayerResultHandler };

// models/gameModel.js

const db = require('../config/db');

// Function to get all games
async function getAllGames() {
    try {
        const result = await db.query('SELECT * FROM games');
        return result.rows;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
}

// Function to create a new game
async function createGame(gameName) {
    if (!gameName) {
        throw new Error('Game name is required');
    }
    try {
        const result = await db.query('INSERT INTO games (game_name) VALUES ($1) RETURNING *', [gameName]);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating game:', error);
        throw error;
    }
}

module.exports = { getAllGames, createGame };

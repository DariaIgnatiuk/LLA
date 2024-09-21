// models/gameModel.js

const db = require('../config/db');

// Function to get all games
async function getAllGames() {
    const result = await db.query('SELECT * FROM games');
    return result.rows;
}

// Function to create a new game
async function createGame(gameName) {
    const result = await db.query('INSERT INTO games (game_name) VALUES ($1) RETURNING *', [gameName]);
    return result.rows[0];
}

module.exports = { getAllGames, createGame };

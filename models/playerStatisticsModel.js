// models/playerStatisticsModel.js

const db = require('../config/db');

// Function to get game ID by name
async function getGameIdByName(gameName) {
    try {
        const result = await db.query(`SELECT id FROM games WHERE game_name = $1`, [gameName]);
        return result.rows[0].id;
    } catch (error) {
        console.error('Error fetching game ID:', error);
        throw error;
    }
}

// Function to get card set ID by name
async function getCardSetIdByName(setName) {
    try {
        const result = await db.query(`SELECT id FROM card_sets WHERE set_name = $1`, [setName]);
        return result.rows[0].id;
    } catch (error) {
        console.error('Error fetching card set ID:', error);
        throw error;
    }
}

// Function to get game name by ID
async function getGameNameById(gameId) {
    try {
        const result = await db.query(`SELECT game_name FROM games WHERE id = $1`, [gameId]);
        return result.rows[0].game_name;
    } catch (error) {
        console.error('Error fetching game name:', error);
        throw error;
    }
}

// Function to get card set name by ID
async function getCardSetNameById(cardSetId) {
    try {
        const result = await db.query(`SELECT set_name FROM card_sets WHERE id = $1`, [cardSetId]);
        return result.rows[0].set_name;
    } catch (error) {
        console.error('Error fetching card set name:', error);
        throw error;
    }
}

// Function to add player result for Match Words
async function addPlayerResultMatchWords(username, card_set_id, time_spent, game_id, number_of_attempts) {
    try {
        const result = await db.query(
            `
            INSERT INTO player_statistics (username, card_set_id, time_spent, game_id, number_of_attempts)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [username, card_set_id, time_spent, game_id, number_of_attempts]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error adding player result:', error);
        throw error;
    }
}

// Function to add player result for Choose Correct Word
async function addPlayerResultChooseCorrectWord(username, card_set_id, correct_answers, time_spent, game_id) {
    try {
        const result = await db.query(
            `
            INSERT INTO player_statistics (username, card_set_id, correct_answers, time_spent, game_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [username, card_set_id, correct_answers, time_spent, game_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error adding player result:', error);
        throw error;
    }
}

// Function to get top results for Match Words
async function getTopResultsMatchWords(game_id, card_set_id) {
    try {
        const result = await db.query(
            `
            SELECT * FROM top_results
            WHERE game_id = $1 AND card_set_id = $2
            ORDER BY number_of_attempts ASC, time_spent ASC
            LIMIT 5
            `,
            [game_id, card_set_id]
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching top results:', error);
        throw error;
    }
}

// Function to get top results for Choose Correct Word
async function getTopResultsChooseCorrectWord(game_id, card_set_id) {
    try {
        const result = await db.query(
            `
            SELECT * FROM top_results
            WHERE game_id = $1 AND card_set_id = $2
            ORDER BY correct_answers DESC, time_spent ASC
            LIMIT 5
            `,
            [game_id, card_set_id]
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching top results:', error);
        throw error;
    }
}

module.exports = {
    getGameIdByName,
    getCardSetIdByName,
    getGameNameById,
    getCardSetNameById,
    addPlayerResultMatchWords,
    addPlayerResultChooseCorrectWord,
    getTopResultsMatchWords,
    getTopResultsChooseCorrectWord,
};

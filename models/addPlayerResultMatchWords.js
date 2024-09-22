// models/addPlayerResultMatchWords.js

const db = require('../config/db');

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

module.exports = addPlayerResultMatchWords;

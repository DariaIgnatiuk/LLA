// models / addPlayerResultChooseCorrectWord.js;

const db = require('../config/db');

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

module.exports = addPlayerResultChooseCorrectWord;

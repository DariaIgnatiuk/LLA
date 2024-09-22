// models/getTopResultsChooseCorrectWord.js

const db = require('../config/db');

async function getTopResultsChooseCorrectWord(game_id, card_set_id) {
    try {
        const result = await db.query(
            `
            SELECT username, correct_answers, time_spent
            FROM player_statistics
            WHERE game_id = $1 AND card_set_id = $2
            ORDER BY correct_answers DESC, time_spent ASC
            LIMIT 5
            `,
            [game_id, card_set_id]
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching top results for Choose Correct Word:', error);
        throw error;
    }
}

module.exports = getTopResultsChooseCorrectWord;

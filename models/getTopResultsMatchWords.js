// models / getTopResultsMatchWords.js;

const db = require('../config/db');

async function getTopResultsMatchWords(game_id, card_set_id) {
    try {
        const result = await db.query(
            `
            SELECT username, time_spent, number_of_attempts
            FROM player_statistics
            WHERE game_id = $1 AND card_set_id = $2
            ORDER BY time_spent ASC, number_of_attempts ASC
            LIMIT 5
            `,
            [game_id, card_set_id]
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching top results for Match Words:', error);
        throw error;
    }
}

module.exports = getTopResultsMatchWords;

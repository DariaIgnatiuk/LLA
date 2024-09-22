// models / getGameIdByName.js;

const db = require('../config/db');

async function getGameIdByName(gameName) {
    try {
        const result = await db.query(`SELECT id FROM games WHERE game_name = $1`, [gameName]);
        return result.rows[0].id;
    } catch (error) {
        console.error('Error fetching game ID:', error);
        throw error;
    }
}

module.exports = getGameIdByName;
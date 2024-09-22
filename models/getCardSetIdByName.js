// models / getCardSetIdByName.js;

const db = require('../config/db');

async function getCardSetIdByName(setName) {
    try {
        const result = await db.query(`SELECT id FROM card_sets WHERE set_name = $1`, [setName]);
        return result.rows[0].id;
    } catch (error) {
        console.error('Error fetching card set ID:', error);
        throw error;
    }
}

module.exports = getCardSetIdByName;

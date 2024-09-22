// models/cardSetModel.js

const db = require('../config/db');
const logger = require('../utils/logger'); // Import the logger

// Function to get all card sets
async function getAllCardSets() {
    try {
        const result = await db.query('SELECT set_name FROM card_sets');
        return result.rows;
    } catch (error) {
        logger.error('Error fetching card sets:', error);
        throw error;
    }
}

// Function to get words by set name
async function getWordsBySetName(setName) {
    try {
        const result = await db.query(
            `
            SELECT w.id, w.english, w.hebrew, w.audio_file
            FROM words w
            JOIN card_set_words csw ON w.id = csw.word_id
            JOIN card_sets cs ON cs.id = csw.card_set_id
            WHERE cs.set_name = $1
            `,
            [setName]
        );
        return result.rows;
    } catch (error) {
        logger.error(`Error fetching words for set ${setName}:`, error);
        throw error;
    }
}

// Function to create a new card set
async function createCardSet(setName) {
    try {
        const result = await db.query('INSERT INTO card_sets (set_name) VALUES ($1) RETURNING *', [setName]);
        return result.rows[0];
    } catch (error) {
        logger.error('Error creating card set:', error);
        throw error;
    }
}

module.exports = { getAllCardSets, getWordsBySetName, createCardSet };

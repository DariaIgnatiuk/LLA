// models/cardSetModel.js

const db = require('../config/db');

// Function to get all card sets
async function getAllCardSets() {
    const result = await db.query('SELECT set_name FROM card_sets');
    return result.rows;
}

// Function to get words by set name
async function getWordsBySetName(setName) {
    const result = await db.query(`
      SELECT w.id, w.english, w.hebrew, w.audio_file --added w.id
      FROM words w
      JOIN card_set_words csw ON w.id = csw.word_id
      JOIN card_sets cs ON cs.id = csw.card_set_id
      WHERE cs.set_name = $1
    `, [setName]);
    return result.rows;
  }

module.exports = { getAllCardSets, getWordsBySetName };

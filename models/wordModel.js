// models/wordModel.js

const db = require('../config/db');

// Function to get all words
async function getAllWords() {
    const result = await db.query('SELECT * FROM words');
    return result.rows;
}

// Function to create a new word
async function createWord(english, hebrew, audioFile) {
    const result = await db.query('INSERT INTO words (english, hebrew, audio_file) VALUES ($1, $2, $3) RETURNING *', [
        english,
        hebrew,
        audioFile,
    ]);
    return result.rows[0];
}

module.exports = { getAllWords, createWord };

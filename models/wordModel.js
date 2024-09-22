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

// Function to add a word to a set
async function addWordToSet(setId, wordId) {
    const result = await db.query('INSERT INTO word_sets (set_id, word_id) VALUES ($1, $2) RETURNING *', [
        setId,
        wordId,
    ]);
    return result.rows[0];
}

// Function to create a new set of words
async function createWordSet(setName) {
    const result = await db.query('INSERT INTO sets (name) VALUES ($1) RETURNING *', [setName]);
    return result.rows[0];
}

module.exports = { getAllWords, createWord };

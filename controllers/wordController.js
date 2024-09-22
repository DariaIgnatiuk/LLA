// controllers/wordController.js

const convertTextToSpeech = require('../utils/textToSpeech');
const { getAllWords, createWord } = require('../models/wordModel');

// Function to get all words
async function getAllWordsHandler(req, res) {
    try {
        const words = await getAllWords();
        res.json(words);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving words', error: error.message });
    }
}

// Function to create a new word
async function createWordHandler(req, res) {
    const { english, hebrew } = req.body;

    if (!english || !hebrew) {
        return res.status(400).json({ message: 'English and Hebrew words are required' });
    }

    const audioFile = `./public/sounds/${english}.mp3`;

    try {
        await convertTextToSpeech(hebrew, audioFile);
        const word = await createWord(english, hebrew, audioFile);
        res.status(201).json(word);
    } catch (error) {
        res.status(500).json({ message: 'Error creating word', error: error.message });
    }
}

module.exports = { getAllWordsHandler, createWordHandler };

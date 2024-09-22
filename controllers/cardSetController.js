// controllers/cardSetController.js

const { getAllCardSets, getWordsBySetName, createCardSet } = require('../models/cardSetModel');

// Function to get all card sets
async function getAllCardSetsHandler(req, res) {
    try {
        const cardSets = await getAllCardSets();
        res.json(cardSets);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving card sets', error });
    }
}

// Function to get words by set name
async function getWordsBySetNameHandler(req, res) {
    const { setName } = req.params;
    try {
        const words = await getWordsBySetName(setName);
        res.json(words);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving words for the set', error });
    }
}

// Function to create a new card set
async function createCardSetHandler(req, res) {
    const { set_name } = req.body;
    try {
        const newCardSet = await createCardSet(set_name);
        res.status(201).json(newCardSet);
    } catch (error) {
        res.status(500).json({ message: 'Error creating card set', error });
    }
}

module.exports = { getAllCardSetsHandler, getWordsBySetNameHandler, createCardSetHandler };
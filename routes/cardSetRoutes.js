// routes/cardSetRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllCardSetsHandler,
    getWordsBySetNameHandler,
    createCardSetHandler,
} = require('../controllers/cardSetController');

// Route to get all card sets
router.get('/', getAllCardSetsHandler);

// Route to get words by set name
router.get('/:setName/words', getWordsBySetNameHandler);

// Route to create a new card set
router.post('/', createCardSetHandler);

module.exports = router;

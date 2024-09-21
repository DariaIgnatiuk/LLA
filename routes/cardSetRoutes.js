// routes/cardSetRoutes.js

const express = require('express');
const router = express.Router();
const { getAllCardSetsHandler, getWordsBySetNameHandler } = require('../controllers/cardSetController');

// Route to get all card sets
router.get('/', getAllCardSetsHandler);

// Route to get words by set name
router.get('/:setName/words', getWordsBySetNameHandler);

module.exports = router;

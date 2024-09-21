// routes/wordRoutes.js

const express = require('express');
const router = express.Router();
const { getAllWordsHandler, createWordHandler } = require('../controllers/wordController');

// Route to get all words
router.get('/', getAllWordsHandler);

// Route to create a new word
router.post('/create', createWordHandler);

module.exports = router;

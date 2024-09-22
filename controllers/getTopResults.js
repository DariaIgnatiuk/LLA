// controllers/getTopResults.js;

const getGameIdByName = require('../models/getGameIdByName');
const getCardSetIdByName = require('../models/getCardSetIdByName');
const getTopResultsMatchWords = require('../models/getTopResultsMatchWords');
const getTopResultsChooseCorrectWord = require('../models/getTopResultsChooseCorrectWord');

async function getTopResults(req, res) {
    console.log('Incoming request params:', req.params); // Log the incoming request params
    const { set_name, game_name } = req.params;
    try {
        const game_id = await getGameIdByName(game_name);
        const card_set_id = await getCardSetIdByName(set_name);

        let topResults;
        if (game_name === 'Match Words') {
            topResults = await getTopResultsMatchWords(game_id, card_set_id);
        } else if (game_name === 'Choose Correct Word') {
            topResults = await getTopResultsChooseCorrectWord(game_id, card_set_id);
        }

        res.status(200).json(topResults);
    } catch (error) {
        console.error('Error fetching top results:', error); // Log the error
        res.status(500).json({ message: 'Error fetching top results', error });
    }
}

module.exports = getTopResults;

// controllers/addPlayerResult.js

const getGameIdByName = require('../models/getGameIdByName');
const getCardSetIdByName = require('../models/getCardSetIdByName');
const addPlayerResultMatchWords = require('../models/addPlayerResultMatchWords');
const addPlayerResultChooseCorrectWord = require('../models/addPlayerResultChooseCorrectWord');

async function addPlayerResult(req, res) {
    console.log('Incoming request body:', req.body); // Log the incoming request body
    const { username, set_name, game_name, number_of_attempts, time_spent, correct_answers } = req.body;
    try {
        const game_id = await getGameIdByName(game_name);
        const card_set_id = await getCardSetIdByName(set_name);

        let result;
        if (game_name === 'Match Words') {
            result = await addPlayerResultMatchWords(username, card_set_id, time_spent, game_id, number_of_attempts);
        } else if (game_name === 'Choose Correct Word') {
            result = await addPlayerResultChooseCorrectWord(
                username,
                card_set_id,
                correct_answers,
                time_spent,
                game_id
            );
        }

        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding player result:', error); // Log the error
        res.status(500).json({ message: 'Error adding player result', error });
    }
}

module.exports = addPlayerResult;

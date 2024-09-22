// controllers/playerStatisticsController.js

const db = require('../config/db'); // Import the db module
const {
    getGameIdByName,
    getCardSetIdByName,
    getGameNameById,
    getCardSetNameById,
    addPlayerResultMatchWords,
    addPlayerResultChooseCorrectWord,
    getTopResultsMatchWords,
    getTopResultsChooseCorrectWord,
} = require('../models/playerStatisticsModel');

exports.addPlayerResult = async (req, res) => {
    try {
        const { username, set_name, correct_answers, time_spent, game_name, number_of_attempts } = req.body;

        // Get game ID and card set ID by name
        const game_id = await getGameIdByName(game_name);
        const card_set_id = await getCardSetIdByName(set_name);

        console.log('Game ID:', game_id);
        console.log('Card Set ID:', card_set_id);

        let playerResult;

        if (game_name === 'Match Words') {
            // Add player result to player_statistics table for Match Words
            playerResult = await addPlayerResultMatchWords(
                username,
                card_set_id,
                time_spent,
                game_id,
                number_of_attempts
            );

            // Check if the result should be in the top 5
            const topResults = await getTopResultsMatchWords(game_id, card_set_id);

            if (
                topResults.length < 5 ||
                number_of_attempts < topResults[4].number_of_attempts ||
                (number_of_attempts === topResults[4].number_of_attempts && time_spent < topResults[4].time_spent)
            ) {
                // Add result to top_results table
                await db.query(
                    `
                    INSERT INTO top_results (username, card_set_id, time_spent, game_id, number_of_attempts)
                    VALUES ($1, $2, $3, $4, $5)
                    `,
                    [username, card_set_id, time_spent, game_id, number_of_attempts]
                );

                // Remove the lowest result if there are more than 5 results
                if (topResults.length === 5) {
                    await db.query(
                        `
                        DELETE FROM top_results
                        WHERE id = $1
                        `,
                        [topResults[4].id]
                    );
                }
            }
        } else if (game_name === 'Choose Correct Word') {
            // Add player result to player_statistics table for Choose Correct Word
            playerResult = await addPlayerResultChooseCorrectWord(
                username,
                card_set_id,
                correct_answers,
                time_spent,
                game_id
            );

            // Check if the result should be in the top 5
            const topResults = await getTopResultsChooseCorrectWord(game_id, card_set_id);

            if (
                topResults.length < 5 ||
                correct_answers > topResults[4].correct_answers ||
                (correct_answers === topResults[4].correct_answers && time_spent < topResults[4].time_spent)
            ) {
                // Add result to top_results table
                await db.query(
                    `
                    INSERT INTO top_results (username, card_set_id, correct_answers, time_spent, game_id)
                    VALUES ($1, $2, $3, $4, $5)
                    `,
                    [username, card_set_id, correct_answers, time_spent, game_id]
                );

                // Remove the lowest result if there are more than 5 results
                if (topResults.length === 5) {
                    await db.query(
                        `
                        DELETE FROM top_results
                        WHERE id = $1
                        `,
                        [topResults[4].id]
                    );
                }
            }
        }

        res.status(201).json(playerResult);
    } catch (error) {
        console.error('Error adding player result:', error);
        res.status(500).json({ error: 'Failed to add player result' });
    }
};

exports.getTopResults = async (req, res) => {
    try {
        const { set_name, game_name } = req.params;

        // Get game ID and card set ID by name
        const game_id = await getGameIdByName(game_name);
        const card_set_id = await getCardSetIdByName(set_name);

        let topResults;

        if (game_name === 'Match Words') {
            topResults = await getTopResultsMatchWords(game_id, card_set_id);
        } else if (game_name === 'Choose Correct Word') {
            topResults = await getTopResultsChooseCorrectWord(game_id, card_set_id);
        }

        // Get game name and card set name by ID
        const gameName = await getGameNameById(game_id);
        const cardSetName = await getCardSetNameById(card_set_id);

        // Add game name and card set name to each result
        const resultsWithNames = topResults.map((result) => ({
            ...result,
            game_name: gameName,
            set_name: cardSetName,
        }));

        res.status(200).json(resultsWithNames);
    } catch (error) {
        console.error('Error fetching top results:', error);
        res.status(500).json({ error: 'Failed to retrieve top results' });
    }
};

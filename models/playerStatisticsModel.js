// models/playerStatisticsModel.js

const db = require('../config/db');

// Function to get player statistics by game name
async function getPlayerStatisticsByGameName(gameName) {
    const result = await db.query(
        `
    SELECT ps.username, ps.correct_answers, ps.time_spent, ps.created_at
    FROM player_statistics ps
    JOIN games g ON ps.game_id = g.id
    WHERE g.game_name = $1
  `,
        [gameName]
    );
    return result.rows;
}

module.exports = { getPlayerStatisticsByGameName };

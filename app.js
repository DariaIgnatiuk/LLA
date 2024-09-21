const express = require('express');
const bodyParser = require('body-parser');
const wordRoutes = require('./routes/wordRoutes');
const cardSetRoutes = require('./routes/cardSetRoutes');
const gameRoutes = require('./routes/gameRoutes');
const playerStatisticsRoutes = require('./routes/playerStatisticsRoutes');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes
app.set('views', './views');
app.set('view engine', 'ejs'); 
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/match-words', (req, res) => {
    res.render('matchWordsGame');
  });
app.get('/choose-word', (req, res) => {
    res.render('chooseCorrectWordGame');
  });
app.use('/words', wordRoutes);
app.use('/card-sets', cardSetRoutes);
app.use('/games', gameRoutes);
app.use('/player-statistics', playerStatisticsRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
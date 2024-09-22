const express = require('express');
const path = require('path');
const logger = require('./utils/errorLogger'); // Import the errorLogger
const pool = require('./config/db'); // Import the pool object
const routes = require('./routes'); // Import the routes
const middleware = require('./middleware/middleware'); // Import the middleware
const errorHandler = require('./middleware/errorHandler'); // Import the errorHandler

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(middleware);

// Routes
app.set('views', './views');
app.set('view engine', 'ejs'); 
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/match-words', (req, res) => {
    res.render('matchWordsGame');
  });
app.get('/choose-word', (req, res) => {
    res.render('chooseCorrectWordGame');
  });

app.use('/', routes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000; // Use process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
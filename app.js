const express = require('express');
const path = require('path');
const logger = require('./utils/errorLogger'); // Import the errorLogger
const pool = require('./config/db'); // Import the pool object
const routes = require('./routes'); // Import the routes
const { logger: requestLogger, errorHandler } = require('./middleware/middleware'); // Import the middleware
const playerStatisticsRoutes = require('./routes/playerStatisticsRoutes'); // Import player statistics routes

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);

// Routes
app.use('/', routes);
app.use('/api/playerstatistics', playerStatisticsRoutes); // Ensure this line is correct
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

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).send({ message: 'Invalid JSON' });
    }
    next();
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000; // Use process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
// Dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes/loginRoutes');
const expressValidator = require('express-validator');

// Express setup
const PORT = process.env.PORT || 3000;
const app = express();

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());

// Routes
app.use(routes);

// Server start
app.listen(PORT, () => {
    console.log(`--> Server running on http://localhost:${PORT}/`);
});
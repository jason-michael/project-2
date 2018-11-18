// Dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const loginRoutes = require("./controller/loginRoutes");
const expressValidator = require('express-validator');

// Express setup
const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());

// Routes
app.use(loginRoutes);

// Server start
app.listen(PORT, () => {
    console.log(`--> Server running on http://localhost:${PORT}/`);
});
//============================
// DEPENDENCIES
//============================
require("dotenv").config();
const expressValidator = require('express-validator');
const express = require('express');
const path = require('path');

//============================
// EXPRESS INITIALIZATION
//============================
const PORT = process.env.PORT || 3002;
const app = express();
require('./login/loginConfig')(app);
const loginRoutes = require('./login/loginController');

//============================
// VIEW ENGINE
//============================
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//============================
// STANDARD MIDDLEWARE
//============================
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(expressValidator());

//============================
// ROUTES
//============================
app.use(loginRoutes);

//============================
// SERVER START
//============================
app.listen(PORT, () => {
    console.log(`--> Server running on http://localhost:${PORT}/`);
});
//============================
// DEPENDENCIES
//============================
require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes/loginRoutes');
const expressValidator = require('express-validator');

//============================
// AUTHENTICATION PACKAGES
//============================
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const MySQLStore = require('express-mysql-session')(session);

//============================
// EXPRESS INITIALIZATION
//============================
const PORT = process.env.PORT || 3000;
const app = express();

//============================
// VIEW ENGINE
//============================
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//============================
// STANDARD MIDDLEWARE
//============================
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(expressValidator());

//============================
// SESSION STORAGE
//============================
const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};
const sessionStore = new MySQLStore(options);
app.use(session({
    secret: 'qwdpjonscv',
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    // cookie: { secure: true }
}));

//============================
// PASSPORT SETUP
//============================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
    function (username, password, done) {

        // TODO: refactor

        const db = require('./db/connection');

        const query = 'SELECT id, password FROM users WHERE username = ?'
        db.query(query, [username], (err, res) => {
            if (err) done(err);

            // Check if username exists in database.
            if (res.length === 0) {
                done(null, false);
            }

            // Re-hash password for comparison.
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) throw err;

                // Check if stored password matches entered password.
                bcrypt.compare(password, hash, (err, response) => {
                    if (response) {
                        // Authentication success.
                        return done(null, {
                            user_id: res[0].id
                        });
                    } else {
                        // Authentication failure.
                        return done(null, false);
                    }
                });
            });
        });
    }
));

//============================
// ROUTES
//============================
app.use(routes);

//============================
// SERVER START
//============================
app.listen(PORT, () => {
    console.log(`--> Server running on http://localhost:${PORT}/`);
});
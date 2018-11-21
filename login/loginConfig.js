//============================
// DEPENDENCIES
//============================
require('dotenv').config();
const db = require('../config/db_connection');

//============================
// AUTHENTICATION PACKAGES
//============================
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const MySQLStore = require('express-mysql-session')(session);

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

module.exports = function(app) {
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

            // TODO: Move query to ORM
            const query = 'SELECT id, password FROM users WHERE username = ?'
            db.query(query, [username], (err, res) => {
                if (err) done(err);

                // Check if username exists in database.
                if (res.length === 0) {

                    done(null, false);

                } else {

                    // Check if password matches.
                    const hash = res[0].password;

                    bcrypt.compare(password, hash, (err, response) => {
                        if (err) throw err;

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
                }
            });
        }
    ));
}
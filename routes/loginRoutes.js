//============================
// DEPENDENCIES
//============================
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../db/connection');
const passport = require('passport');

// Hashed password size
const saltRounds = 10;

//============================
// ROUTES
//============================

/**
 * Home
 */
router.get('/', (req, res, next) => {

    // TODO: remove
    console.log('Logged in ID:  ', req.user);
    console.log('Authenticated: ', req.isAuthenticated());

    res.render('home', {
        title: 'Home'
    });
});

/**
 * Profile
 */
router.get('/profile', authenticationMiddleware(), (req, res) => {
    res.render('profile', {
        title: 'Profile'
    });
});

/**
 * Login GET
 */
router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

/**
 * Login POST
 */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

/**
 * Register GET
 */
router.get('/register', (req, res, next) => res.render('register', {
    title: 'Sign up'
}));

/**
 * Register POST
 */
router.post('/register', (req, res, next) => {

    // TODO: refactor

    //============================
    // VALIDATORS
    //============================
    req.checkBody('username', 'Username cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);
    //------------------------------------------------------------------
    // Strict password character validation (disabled for development)
    //------------------------------------------------------------------
    // req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.")
    // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");



    //============================
    // VALIDATION
    //============================
    const errors = req.validationErrors();

    if (errors) {
        console.log(`Validation error: ${JSON.stringify(errors)}`);

        res.render('register', {
            title: 'Sign up',
            errors
        });
    } else {
        let newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        // Hash the new user's password before storing.
        bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;

            //============================
            // REGISTER
            //============================
            registerNewUser(newUser, (userId) => {
                req.login(userId, err => {
                    if (err) throw err;
                    res.redirect('/profile');
                });
            });
        });
    }
});

//============================
// SESSION STORAGE
//============================
/**
 * Store user id.
 */
passport.serializeUser(function (userId, done) {
    done(null, userId);
});

/**
 * Read from session.
 */
passport.deserializeUser(function (userId, done) {
    done(null, userId);
});

//===============================
// TEST FOR USER AUTHENTICATION
//===============================
function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/login')
    }
}

// TODO: redo giant comment blocks below

//=========================================================================
// REGISTER NEW USER
//-------------------------------------------------------------------------
// Takes in a user object and a callback function.
//-------------------------------------------------------------------------
// First adds the new user to the users table and get their user id,
// then adds a new row in userconfig table with a key matching the user id,
// then executes callback function.
//=========================================================================
async function registerNewUser(user, callback) {
    const newUserId = await addNewUser(user)
    await setNewUserConfig(newUserId);
    callback(newUserId);
}

//============================================
// ADD NEW USER
//--------------------------------------------
// Takes in a user object.
//--------------------------------------------
// Adds the new user to the users table.
// Resolves with the insertId (the user's id).
//============================================
async function addNewUser(user) {
    return new Promise((resolve, reject) => {
        console.log('--> Adding new user: ', user.username);

        const query = 'INSERT INTO users (username, email, password) VALUES (?,?,?)';
        db.query(query, [user.username, user.email, user.password], (err, results) => {
            if (err) reject(err);

            resolve(results.insertId);
        });
    });
}

//================================================
// SET NEW USER CONFIG
//------------------------------------------------
// Takes in an id (user id).
//------------------------------------------------
// Adds the new user's id to the userconfig table.
// Resolves (empty).
//================================================
async function setNewUserConfig(id) {
    return new Promise((resolve, reject) => {
        console.log('--> Setting user config for userId:', id);

        const query = 'INSERT INTO userconfig (user_id) VALUES (?)';
        db.query(query, [id], (err, results, fields) => {
            resolve();
        });
    });
}

module.exports = router;

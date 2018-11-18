const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

// Hashed password size
const saltRounds = 10;

// Root GET
router.get('/', (req, res, next) => res.render('home', {
    title: 'Home'
}));

// Register GET
router.get('/register', (req, res, next) => res.render('register', {
    title: 'Sign up'
}));

// Register POST
router.post('/register', (req, res, next) => {

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
    // Strict password charactor validation (disabled for development)
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


        // HASH PASSWORD
        bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;

            // REGISTER NEW USER
            registerNewUser(newUser, () => {
                console.log('--> Rendering new user home view.')
                res.render('home', {
                    title: 'Home'
                });
            });

        });
    }
});

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
    callback();
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
        db.query(query, [user.username, user.email, user.password], (err, results, fields) => {
            if (err) reject(err);
            resolve(results.insertId);
        });
    });
}

//============================================
// SET NEW USER CONFIG
//--------------------------------------------
// Takes in an id (user id).
//--------------------------------------------
// Adds the new user to the users table.
// Resolves (empty).
//============================================
async function setNewUserConfig(id) {
    return new Promise((resolve, reject) => {
        console.log('--> Setting user config for userId:', id);

        const query = 'INSERT INTO userconfig (userId) VALUES (?)';
        db.query(query, [id], (err, results, fields) => {
            resolve();
        });
    });
}

//============================================
// GET NEW USER CONFIG
//--------------------------------------------
// Takes in an id (user id).
//--------------------------------------------
// This works but needs to be executed on
// registered user login.
//============================================
/*
async function getNewUserConfig(id) {
    return new Promise((resolve, reject) => {
        console.log('--> Getting user config for userId:', id);

        const query = 'SELECT * FROM userconfig WHERE userId = ?';
        db.query(query, [id], (err, results, fields) => {
            console.log(results)
            resolve(results);
        });
    });
}
*/
module.exports = router;
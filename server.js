// Dependencies
const express = require('express');
const path = require('path');

// Express setup
const PORT = process.env.PORT || 3000;
const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());

// Default route (root)
app.get('/', (req,res) => {

    // Render the home view (home.pug),
    // then pass an object containing variables you want to use in your views (title and message).
    res.render('home', {
        title: 'Your new favorite bookmark manager.',
        message: 'A better way to manage links to your favorite tutorials, documents, and articles.'
    });
});

app.get("/about", (req, res)=>{
    res.render("about",{

    });
});

// Server start
app.listen(PORT, () => {
    console.log(`--> Server running on http://localhost:${PORT}/`);
});
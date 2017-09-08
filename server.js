const express = require('express');
//const handlebars = require('handlebars');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

//the return result from calling express as a function will go here
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// app.use is how you register middleware

//log date, method call, and url to server.log file
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile ('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    } );
    next();
});

////maintenaince handler
// app.use((req, res, next)  => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//root handler
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Modern Software Factory!',
    });
});

// /about handler afddfdafdaf
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

//projects handler
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
    });
});

// /bad handler
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
});

//dynamic listening port for hiruko
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
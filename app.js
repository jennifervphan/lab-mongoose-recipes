const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const data = require('./data.js'); // Import of the data from './data.js'
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const session = require('express-session')

app.use(session({
    secret: 'work hard',
    resave: false,
    saveUninitialized: true,
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

hbs.registerPartials(__dirname + '/views/partials');



// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/kitchen', { useNewUrlParser: true })
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch(err => {
        console.error('Error connecting to mongo', err);
    });

const index = require('./routes/index');
app.use('/', index)

const recipes = require('./routes/recipes');
app.use('/', recipes);

const recipe = require('./routes/recipeDetail');
app.use('/', recipe);

const edit = require('./routes/editRecipe');
app.use('/', edit);

const deleteRecipe = require('./routes/deleteRecipe');
app.use('/', deleteRecipe);

const addNewRecipe = require('./routes/addNewRecipe');
app.use('/', addNewRecipe);

const addCook = require('./routes/addCook');
app.use('/', addCook);

const register = require('./routes/register');
app.use('/', register);

const logIn = require('./routes/login');
app.use('/', logIn);

const profile = require('./routes/profile');
app.use('/', profile);

const logOut = require('./routes/logOut');
app.use('/', logOut);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.listen(3000, () => {
    console.log("App listening");
})
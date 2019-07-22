const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'
const bodyParser = require('body-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/kitchen', { useNewUrlParser: true })
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    }).catch(err => {
        console.error('Error connecting to mongo', err);
    });


const index = require('./routes/index');
app.use('/', index);

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

app.listen(3000, () => {
    console.log("App listening");
})
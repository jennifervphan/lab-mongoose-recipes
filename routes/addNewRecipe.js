const express = require('express');
const app = express();
const router = express.Router();
const Recipe = require('../models/Recipe');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/addNewRecipe', (req, res, next) => {
    res.render('addNewRecipe');
});

router.post('/addNewRecipe', (req, res, next) => {
    debugger
    if (req.body.title &&
        req.body.level &&
        req.body.dishType &&
        req.body.cuisine &&
        req.body.ingredients) {
        var recipeData = new Recipe({
            title: req.body.title,
            level: req.body.level,
            dishType: req.body.dishType,
            cuisine: req.body.cuisine,
            ingredients: req.body.ingredients
        });
        debugger
        recipeData.save()
            .then((recipe) => {
                console.log(recipe)
                res.render('newRecipe', { recipe });
            })
            .catch(err => {
                res.status(500).send("ERROR");
            })
    }
})

module.exports = router;
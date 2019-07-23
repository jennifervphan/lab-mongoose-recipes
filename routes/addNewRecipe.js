const express = require('express');
const router = express.Router();
const Cook = require('../models/Cook');
const Recipe = require('../models/Recipe');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/addNewRecipe', (req, res, next) => {
    Cook.find({})
        .then((cooks) => {
            res.render("addNewRecipe", { cooks });
        })
        .catch((err) => {
            next();
        })

});

router.post('/addNewRecipe', (req, res, next) => {
    let arrIngredients = [];
    let newArr = req.body.ingredients.split(',');

    for (let i = 0; i < newArr.length; i++) {
        arrIngredients.push(newArr[i].trim())
    }

    if (req.body.title &&
        req.body.level &&
        req.body.dishType &&
        req.body.cuisine &&
        req.body.ingredients &&
        req.body.creator &&
        req.body.duration) {
        var recipeData = new Recipe({
            title: req.body.title,
            level: req.body.level,
            dishType: req.body.dishType,
            cuisine: req.body.cuisine,
            ingredients: arrIngredients,
            creator: mongoose.Types.ObjectId(req.body.creator),
            duration: req.body.duration
        });
        debugger
        recipeData.save(
                Recipe.populate(recipeData, 'creator'))
            .then((recipe) => {
                res.render('recipeDetail', { recipe });
            })
            .catch(err => {
                res.status(500).send("ERROR");
            })
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }

})

module.exports = router;
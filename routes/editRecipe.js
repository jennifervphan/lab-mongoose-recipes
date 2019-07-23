const express = require('express');
const router = express.Router();
const Cook = require('../models/Cook')
const Recipe = require('../models/Recipe');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/edit', (req, res, next) => {
    debugger
    const idNum = req.query.recipe_id;
    Recipe.findOne({ _id: idNum })
        .populate("creator")
        .then(recipe => {
            Cook.find({})
                .then((cooks) => {
                    res.render('edit', { recipe, cooks });
                })
        })
        .catch(err => {
            res.status(500).send("ERROR");
        })

});

router.post('/edit', (req, res, next) => {
    let recipeId = req.query.recipe_id;
    let editRecipe = {
        title: req.body.title,
        creator: req.body.creator,
        ingredients: req.body.ingredients,
        duration: req.body.duration
    }
    Recipe.findByIdAndUpdate(recipeId, editRecipe, { new: true })
        .then((recipe) => {
            res.render('recipeDetail', { recipe });
        })
        .catch((error) => {
            console.log(error);
        })
})

module.exports = router;
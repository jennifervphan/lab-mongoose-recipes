const express = require('express');
const app = express();
const router = express.Router();
const Recipe = require('../models/Recipe');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/edit', (req, res, next) => {
    const idNum = req.query.recipe_id;
    Recipe.findOne({ _id: idNum })
        .then(recipe => {
            res.render('edit', { recipe });
        })
        .catch(err => {
            res.status(500).send("ERROR");
        })
});

router.post('/edit', (req, res, next) => {
    let recipeId = req.query.recipe_id;
    debugger
    Recipe.update({ _id: recipeId }, {
            $set: {
                title: req.body.title,
                creator: req.body.creator,
                ingredients: req.body.ingredients,
                duration: req.body.duration
            }
        }, { new: true })
        .then((recipe) => {
            console.log(recipe)
            debugger
            res.render('recipeDetail', { recipe });
        })
        .catch((error) => {
            console.log(error);
        })
        // Recipe.findOne({ _id: recipeId })
        //     .then((recipe) => {
        //         console.log(recipe)
        //         res.render('recipeDetail', { recipe });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
})

module.exports = router;
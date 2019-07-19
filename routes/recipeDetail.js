const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/recipe/:id', (req, res, next) => {
    let idNum = req.params.id;
    Recipe.findOne({ _id: idNum })
        .then(recipe => {
            res.render('recipeDetail', { recipe });
        })
        .catch(err => {
            res.status(500).send("ERROR");
        })
});

module.exports = router;
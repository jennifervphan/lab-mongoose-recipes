const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Cook = require('../models/Cook');

/* GET home page */
router.get('/recipes', (req, res, next) => {
    Recipe.find()
        .populate("cook")
        .then(recipes => {
            if (req.session.user) {
                res.render('recipes', { recipes });
            } else {
                res.render('recipes', { recipes, login: true });
            }
        })
        .catch(err => {
            res.status(500).send("ERROR");
        })
});

module.exports = router;
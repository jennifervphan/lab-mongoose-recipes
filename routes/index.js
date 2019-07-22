const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Cook = require('../models/Cook');

/* GET home page */
router.get('/', (req, res, next) => {
    Recipe.find()
        .populate("cook")
        .then(recipes => {
            res.render('index', { recipes });
        })
        .catch(err => {
            res.status(500).send("ERROR");
        })
});

module.exports = router;
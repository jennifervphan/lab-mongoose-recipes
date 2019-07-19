const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

/* GET home page */
router.get('/', (req, res, next) => {
    Recipe.find()
        .then(recipes => {
            res.render('index', { recipes });
        })
        .catch(err => {
            res.status(500).send("ERROR");
        })
});

module.exports = router;
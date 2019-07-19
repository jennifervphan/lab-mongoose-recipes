const express = require('express');
const router = express.Router();
// const Recipe = require('../models/Recipe');

router.get('/newRecipe', (req, res, next) => {
    res.render('newRecipe');
})

module.exports = router;
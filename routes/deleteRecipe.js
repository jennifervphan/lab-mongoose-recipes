const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/delete', (req, res, next) => {
    const deleteNum = req.query.recipe_id;
    debugger
    Recipe.findByIdAndRemove(deleteNum, function(err, offer) {
        res.redirect('/');
    });
})

module.exports = router;
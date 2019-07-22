const express = require('express');
const router = express.Router();
const Cook = require('../models/Cook');

router.get('/cook/:id', (req, res, next) => {
    let idNum = req.params.id;
    Cook.findOne({ _id: idNum })
        .then(cook => {
            res.render('cookProfile', { cook });
        })
        .catch(err => {
            res.status(500).send("ERROR");
        })
});
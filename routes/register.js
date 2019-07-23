const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/register', (req, res, next) => {
    res.render('register');
})

router.post('/register', (req, res, next) => {
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }
    if (req.body.firstName &&
        req.body.lastName &&
        req.body.username &&
        req.body.password &&
        req.body.email) {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            var newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hash,
                email: req.body.email
            }
            User.create(newUser)
                .then(user => {
                    res.render('profile', { user })
                })
                .catch(() => {
                    res.status(500).send("ERROR");
                })
        });
    }
})
module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/logIn', (req, res, next) => {
    res.render('login', { invalid: false });
})

router.post('/logIn', (req, res, next) => {
    User.findOne({ email: req.body.logemail })
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.logpassword, user.password, function(err, match) {
                    debugger
                    if (match) {
                        req.session.user = user;
                        res.render('profile', { user })
                    } else {
                        res.render("login", { invalid: true });
                    }
                })
            } else {
                res.render('login', { invalid: true });
            }
        })
        .catch(() => {
            res.status(500).send("ERROR");
        })
})

module.exports = router;
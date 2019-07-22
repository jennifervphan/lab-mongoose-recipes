const express = require('express');
const router = express.Router();
const app = express();
const User = require('../models/User');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/logIn', (req, res, next) => {
    res.render('login', { invalid: false, login: true });
})

router.post('/logIn', (req, res, next) => {
    User.findOne({ email: req.body.logemail })
        .then((user) => {
            if (user) {
                if (user.password === req.body.logpassword) {
                    //start session
                    req.session.user = user;
                    res.render('profile', { user, login: false })
                } else {
                    res.render("login", { invalid: true, login: true });
                }
            } else {
                res.render('login', { invalid: true, login: true });
            }
        })
        .catch(() => {
            res.status(500).send("ERROR");
        })
})

module.exports = router;
const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/register', (req, res, next) => {
    res.render('register', { login: true });
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
        var newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
        User.create(newUser)
            .then(user => {
                res.render('profile', { user, login: false })
            })
            .catch(() => {
                res.status(500).send("ERROR");
            })
    }
})
module.exports = router;
const express = require('express');
const app = express();
const router = express.Router();
const Cook = require('../models/Cook');
const Recipe = require('../models/Recipe');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/addCook', (req, res, next) => {
    res.render('addCook');
});

router.post('/addCook', (req, res, next) => {
        let arrSpciecialties = [];
        let newArr = req.body.specialties.split(',');

        for (let i = 0; i < newArr.length; i++) {
            arrSpciecialties.push(newArr[i].trim());
        }

        if (req.body.firstName &&
            req.body.lastName &&
            req.body.birthday &&
            req.body.specialties &&
            req.body.nationality) {
            var newCook = new Cook({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthday: req.body.birthday,
                nationality: req.body.nationality,
                specialties: arrSpciecialties
            })

            newCook.save()
                .then((cook) => {
                    res.render('cookProfile', { cook })
                })
                .catch(err => {
                    res.status(500).send("ERROR");
                })
        } else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
    }

);

module.exports = router;
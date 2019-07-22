const express = require('express');
const router = express.Router();

router.get('/profile', (req, res, next) => {
    if (req.session.user) {
        res.render('profile', { user: req.session.user, login: false });
    } else {
        res.redirect('/logIn')
    }
})

module.exports = router;
var express = require('express');
router = express.Router();


module.exports = function (app) {
    app.get('/', (req, res) => {
        // render the home page
        res.render('home');
    });
};
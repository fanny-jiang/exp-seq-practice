'use strict';

var express = require('express');
var router = express.Router();
var Drink = require('./models').Drink;

module.exports = router;

router.get('/', function (req, res, next) {
    res.send('Welcome to my cafe!');
});

router.get('/menu', function (req, res, next) {
    Drink.findAll()
        .then(function (drinks) {
            var menu = [];
            drinks.map(function (drink) {
                menu.push(drink.name + ' - ' + drink.price)
            });
            return menu;
        })
        .then(function (drinkNames) {
            res.send(drinkNames.join(', '));
        })
        .catch(next);
});

router.get('/:drinkName', function (req, res, next) {
    Drink.findOne({
            where: {
                name: req.params.drinkName
            }
        })
        .then(function (drink) {
            res.send(drink.description)
        })
        .catch(next);

});

router.put('/makeIced/:drinkName', function (req, res, next) {
    Drink.findOne({
            where: {
                name: req.params.drinkName
            }
        })
        .then(function (drink) {
            drink.makeIced();
        })
        .then(function () {
            res.send('Here\'s your iced drink!');
        })
        .catch(next);
})

router.put('/makeHot/:drinkName', function (req, res, next) {
    Drink.findOne({
            where: {
                name: req.params.drinkName
            }
        })
        .then(function (drink) {
            drink.makeHot();
        })
        .then(function () {
            res.send('Here\'s your hot drink!');
        })
        .catch(next);
})

router.post('/new-drink/:drinkName', function (req, res, next) {
    Drink.create({
            name: req.params.drinkName,
            price: (Math.random() * 10 + 3).toFixed(2),
            isHot: Math.random() > 0.5 ? 'hot' : 'iced'
        })
        .then(res.sendStatus(201))
        .catch(next)
});
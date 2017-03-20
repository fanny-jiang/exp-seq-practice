'use strict';
// this will contain our routes

var express = require('express');
var router = express.Router();

var Kitten = require('./models').Kitten;

module.exports = router;

router.get('/', function (req, res, next) {
    Kitten.findAll()
        .then(function (kittens) {
            return kittens.map(function (kitten) {
                return kitten.name;
            })
        })
        .then(function (kittensNames) {
            res.send(kittensNames.join(', '))
        })
        .catch(next);
})

router.get('/orangefluff', function (req, res, next) {
    Kitten.findFluffyOrangeCats()
        .then(function (kittens) {
            res.send(`There is/are ${kittens.length} fluffy orange kitten(s)!`)
        })
        .catch(next);

});


router.get('/:id', function (req, res, next) {
    Kitten.findById(req.params.id)
        .then(function (kitten) {
            res.send(`${kitten.name} is a(n) ${kitten.description} kitten!`);
        })
        .catch(next);
});

router.post('/:name', function (req, res, next) {
    Kitten.create({
            name: req.params.name,
            fluffiness: Math.random() > 0.5 ? 'shorthaired' : 'longhaired',
            color: req.query.color,
            wuv: Math.ceil(Math.random() * 10)
        })
        .then(res.sendStatus(201))
        .catch(next);
});

router.put('/:id/groom', function (req, res, next) {
    Kitten.findById(req.params.id)
        .then(function (kitten) {
            kitten.grooming();
        })
        .then(function () {
            res.send(`Someone just got a haircut!`);
        })
        .catch(next);
});
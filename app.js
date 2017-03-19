'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var volleyball = require('volleyball');
var path = require('path');

var db = require('./models').db;

// ----- middleware goes here! -----

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static route
app.use(express.static(path.join(__dirname, './public')));

// mount your routers
app.use('/kitten', require('./kittenRoutes'));

// error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});

// sync db to server

db.sync()
    .then(function () {
        app.listen(3000, function () {
            console.log('listening on port 3000!');
        })
    });
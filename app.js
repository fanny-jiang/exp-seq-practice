'use strict';
// This is our express app server

var express = require('express');
var app = express();

var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var path = require('path');

var db = require('./models').db;

// ---- Our awesome middleware goes here ----

// middleware logger
app.use(volleyball);

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create a static route
app.use(express.static(path.join(__dirname, './public')));

// plug in your routers
app.use('/kittens', require('./kittenRoutes'));

// error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});

// sync the db to the server
db.sync({ force: true })
    .then(function () {
        app.listen(3000, function () {
            console.log('listening on port 3000!');
        });
    });
var express = require('express');
var app = express();
var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var path = require('path');

var db = require('./models').db;

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static route
app.use(express.static(path.join(__dirname, './public')));

// connect to router
app.use('/cafe', require('./routes'))

// error logging
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});

// sync db to server

db.sync()
    .then(function () {
        app.listen(3000, function () {
            console.log('server is listening at port 3000!')
        })
    });
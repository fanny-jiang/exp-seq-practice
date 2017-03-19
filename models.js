'use strict';
// this is our models for our kittens database

var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/kittensdb', {
    logging: false
});

var Kitten = db.define('kitten', {
    name: {},
    fluffiness: {},
    color: {},
    wuv: {}
}, {
    getterMethods: {},
    instanceMethods: {},
    classMethods: {},
    hooks: {}
});

var Owner = db.define('owner', {
    name: {},
    craziness: {}
}, {
    instanceMethods: {}
})

// Associations

module.exports = {
    db: db,
    Kitten: Kitten,
    Owner: Owner
}
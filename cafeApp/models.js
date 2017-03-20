'use strict';

var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/cafe', { logging: false });

var Drink = db.define('drink', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    isHot: {
        type: Sequelize.ENUM('hot', 'iced'),
        allowNull: false
    }
}, {
    getterMethods: {
        description: function () {
            return `${this.name} is a(n) ${this.isHot} drink! That'll be $${this.price}, please.`
        }
    },
    instanceMethods: {
        makeIced: function () {
            this.update({
                    isHot: 'iced'
                })
                .catch();
        },
        makeHot: function () {
            this.update({
                    isHot: 'hot'
                })
                .catch();
        }
    },
    classMethods: {}
});

var Customer = db.define('customer', {
    name: {
        type: Sequelize.STRING
    },
    favDesert: {
        type: Sequelize.STRING
    }
})

Customer.hasMany(Drink);

module.exports = {
    db: db,
    Drink: Drink,
    Customer: Customer
};
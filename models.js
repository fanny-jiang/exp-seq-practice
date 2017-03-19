var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/kittens', {
    logging: false
});

var Kitten = db.define('kittens', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fluffiness: {
        type: Sequelize.ENUM('shorthaired', 'longhaired')
    },
    color: {
        type: Sequelize.STRING
    },
    wuv: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 10
        }
    }
}, {
    // getter methods allow you to return values that are created from existing values in the database
    getterMethods: {
        description: function () {
            return `${this.color} ${this.fluffiness}`
        }
    },
    // methods that can only be called on an instance, need to be invoked
    instanceMethods: {
        grooming: function () {
            this.update({
                    fluffiness: 'shorthaired'
                })
                .catch();
        }
    },
    // these are custom sequelize queries that can be called on the instance
    classMethods: {
        findFluffyOrangeCats: function () {
            return this.findAll({
                where: {
                    color: 'orange',
                    fluffiness: 'longhaired'
                }
            });
        }
    },
    // hooks are functions that are called before and after calls in sequelize are executed and need to be passed in arguments bc they don't know what the context of 'this' is
    hooks: {
        beforeValidate: function (kitten) {
            kitten.wuv = 10;
        }
    }
});

var Owner = db.define('owners', {
    name: {
        type: Sequelize.STRING
    },
    craziness: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 10
        }
    }
}, {
    instanceMethods: {
        isCrazyCatPerson: function () {
            if (this.countKittens() > 3 || this.craziness >= 5) {
                return `${this.name} is a crazy cat person!`;
            } else {
                return `${this.name} is just a regular cat person!`;
            }
        }
    }
})

Owner.hasMany(Kitten);

module.exports = {
    db: db,
    Kitten: Kitten,
    Owner: Owner
};
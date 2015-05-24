"use strict";

var fs = require('fs');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var dbConfig = require(path.join(__dirname, '/../../config/database.json'))[env];
var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options);
var db = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Data manipulation methods on db models
db.createParentAndPlayer = function (parentEmail, parentFirstName, parentLastName, parentPhone,
                                     playerFirstName, playerLastName, playerPosition, playerTeam) {
    return sequelize.transaction(function (t) {
        return db.Parent.create({
            email: parentEmail,
            first_name: parentFirstName,
            last_name: parentLastName,
            phone: parentPhone
        }, {isNewRecord: true, transaction: t})
            .then(function (parent) {
                return db.Player.create({
                    first_name: playerFirstName,
                    last_name: playerLastName,
                    parent_id: parent.id,
                    position: playerPosition,
                    team: playerTeam
                }, {isNewRecord: true, transaction: t})
                    .then(function (player) {
                        return {parent: parent, player: player};
                    });
            });
    }).then(function (result) {
        // Transaction has been committed
        return result;
    }).catch(function (err) {
        // Transaction has been rolled back
        return err;
    });
};

module.exports = db;

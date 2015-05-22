"use strict";

module.exports = function(sequelize, DataTypes){
    var Actor = sequelize.define('Actor', {
        actor_id: {type: DataTypes.INTEGER, primaryKey: true},
        first_name: {type: DataTypes.STRING, allowNull: true},
        last_name: {type: DataTypes.STRING, allowNull: true},
        last_update: {type: DataTypes.DATE, allowNull: true}
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'actor',
        getterMethods: {
            fullName: function () {
                return this.firstName + ' ' + this.lastName;
            }
        },
        setterMethods: {
            fullName: function (value) {
                var name = value.split(' ');
                this.setDataValue('firstName', names.slice(0, -1).join(' '));
                this.setDataValue('lastName', names.slice(-1).join(' '));
            }
        },
        instanceMethods: {
            testMe: function(id){
                return "tested with " + id;
            },
            findById: function (id, onSuccess, onError) {
                Actor.find({where: {id: id}}, {raw: true})
                    .success(onSuccess).error(onError);
            }
        }
    });

    return Actor;
};

"use strict";

module.exports = function(sequelize, DataTypes){
    var Parent = sequelize.define('Parent', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING, allowNull: true, unique: true},
        first_name: {type: DataTypes.STRING, allowNull: true},
        last_name: {type: DataTypes.STRING, allowNull: true},
        phone: {type: DataTypes.STRING, allowNull: true},
        create_time: {type: DataTypes.DATE, allowNull: true}
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'parent',
        getterMethods: {
            fullName: function () {
                return this.first_name + ' ' + this.last_name;
            }
        },
        setterMethods: {
            fullName: function (value) {
                var names = value.split(' ');
                this.setDataValue('first_name', names.slice(0, -1).join(' '));
                this.setDataValue('last_name', names.slice(-1).join(' '));
            }
        },
        //instanceMethods: {
        //    testMe: function(id){
        //        return "tested with " + id;
        //    },
        //    findById: function (id, onSuccess, onError) {
        //        Parent.find({where: {id: id}}, {raw: true})
        //            .success(onSuccess).error(onError);
        //    }
        //}
        classMethods: {
            associate: function(models){
                Parent.hasMany(models.Player, {foreignKey: 'parent_id'});
            }
        }
    });

    return Parent;
};
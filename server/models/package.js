"use strict";

module.exports = function(sequelize, DataTypes){
    var Package = sequelize.define('Package', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING},
        description: {type: DataTypes.STRING}, // pipe delimited bullet items
        price: {type: DataTypes.DECIMAL(7,2)},
        create_time: {type: DataTypes.DATE}
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'package',
        getterMethods: {
            descriptionDetails: function () {
                return this.description.split('|');
            }
        }
        //classMethods: {
        //    associate: function(models){
        //        Parent.hasMany(models.Player, {foreignKey: 'parent_id'});
        //    }
        //}
    });

    return Package;
};
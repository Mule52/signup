"use strict";

module.exports = function(sequelize, DataTypes){
    var User = sequelize.define('User', {
        email: {type: DataTypes.STRING, primaryKey: true},
        password: {type: DataTypes.STRING},
        create_time: {type: DataTypes.DATE}
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'user'
    });

    return User;
};

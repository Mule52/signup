"use strict";

module.exports = function(sequelize, DataTypes){
    var SignupParent = sequelize.define('SignupParent', {
        parent_first_name: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
        parent_last_name: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
        parent_phone: {type: DataTypes.STRING, allowNull: true},
        parent_email: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
        player_first_name: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
        player_last_name: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
        player_team: {type: DataTypes.STRING, allowNull: true},
        player_position: {type: DataTypes.STRING, allowNull: true},
        create_time: {type: DataTypes.DATE, allowNull: true}
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'signup_parent',
        getterMethods: {
            parentFullName: function () {
                return this.parent_first_name + ' ' + this.parent_last_name;
            }
        },
        setterMethods: {
            fullName: function (value) {
                var name = value.split(' ');
                this.setDataValue('parent_first_name', names.slice(0, -1).join(' '));
                this.setDataValue('parent_last_name', names.slice(-1).join(' '));
            }
        },
        //instanceMethods: {
        //    findByEmail: function (email, onSuccess, onError) {
        //        SignupParent.findAll({where: {parent_email: email}}, {raw: true})
        //            .success(onSuccess).error(onError);
        //    }
        //}
    });

    return SignupParent;
};
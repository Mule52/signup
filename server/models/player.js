"use strict";

module.exports = function(sequelize, DataTypes){
    var Player = sequelize.define('Player', {
        first_name: {type: DataTypes.STRING, primaryKey: true},
        last_name: {type: DataTypes.STRING, primaryKey: true},
        parent_id: {type: DataTypes.INTEGER, primaryKey: true},
        position: {type: DataTypes.STRING},
        team: {type: DataTypes.STRING, allowNull: true},
        create_time: {type: DataTypes.DATE}
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'player',
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
        classMethods: {
            associate: function(models){
                Player.belongsTo(models.Parent, { foreignKey: 'parent_id' });
            }
        }
    });

    return Player;
};
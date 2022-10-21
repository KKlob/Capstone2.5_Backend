const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Subs', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING
        },
        memberID: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        tableName: "Subs",
    });
}
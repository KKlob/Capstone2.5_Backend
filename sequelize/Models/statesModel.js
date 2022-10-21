const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('States', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        code: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        tableName: "States",
        timestamps: false
    });
}
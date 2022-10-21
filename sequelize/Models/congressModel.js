const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Congress', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        chamber: {
            allowNull: false,
            type: DataTypes.STRING
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        state: {
            allowNull: false,
            type: DataTypes.STRING
        },
        party: {
            allowNull: false,
            type: DataTypes.STRING
        },
        dob: {
            allowNull: false,
            type: DataTypes.STRING
        },
        site: {
            allowNull: false,
            type: DataTypes.STRING
        },
        api_url: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        tableName: "Congress",
        timestamps: false
    });
}
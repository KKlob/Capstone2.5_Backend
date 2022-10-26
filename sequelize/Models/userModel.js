const { DataTypes } = require('sequelize');

// export a function that defines the model
// automatically receive as parameter the Sequelize connection object

module.exports = (sequelize) => {
    sequelize.define('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        tableName: "Users",
    });
};
const { DataTypes } = require('sequelize');

// export a function that defines the model
// automatically receive as parameter the Sequelize connection object

module.exports = (sequelize) => {
    sequelize.define('Subs', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        }
    }, {
        tableName: "Subs",
    });
}

const { DataTypes } = require('sequelize');

// export a function that defines the model
// automatically receive as parameter the Sequelize connection object

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
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        last_name: {
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
        total_votes: {
            type: DataTypes.INTEGER
        },
        api_url: {
            allowNull: false,
            type: DataTypes.STRING
        },
        missed_votes: {
            type: DataTypes.INTEGER
        },
        bills_sponsored: {
            type: DataTypes.INTEGER
        },
        votes_with_party_pct: {
            type: DataTypes.FLOAT
        },
        socials: {
            type: DataTypes.JSON
        },
        years_served: {
            type: DataTypes.INTEGER
        },
        photo: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "Congress",
        timestamps: false
    });
}

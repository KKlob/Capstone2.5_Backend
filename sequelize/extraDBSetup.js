function applyExtraSetup(sequelize) {
    const { Congress, Subs, States, Users } = sequelize.models;

    // One -> Many (States -> Congress) One State has many congress members. Each congress member has one state
    Congress.belongsTo(States, { targetKey: 'code', foreignKey: 'state' });

    // Many <--> Many (Congress <--> Users) through Subs. One user can be subbed to many congress members. One congress member can be subbed by many users

    Congress.belongsToMany(Users, { through: Subs });
    Users.belongsToMany(Congress, { through: Subs });

}

module.exports = { applyExtraSetup };
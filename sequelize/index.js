const { Sequelize } = require('sequelize');

// Get database url from .env or use local db
const db_url = process.env.DATABASE_URL || 'postgres:///pi_local_db';

const sequelize = new Sequelize(db_url);

// import all the models necessary for the db
const modelDefiners = [
    require('./Models/userModel'),
    require('./Models/statesModel')
]

// define all models according to their files
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}


// export the sequelize conneciton instance to be used around our app
module.exports = sequelize;
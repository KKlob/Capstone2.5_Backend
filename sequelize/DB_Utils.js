const { models } = require('../sequelize');
const states = require('./states.json');

const States = models.States;
const Congress = models.Congress;

class DB_Utilities {
    async fillStates() {
        // loop through state objects and insert each one into the db
        for (let state of states) {
            await States.create({ ...state });
        }
    }

    async fillCongress() {
        console.log("Filling congress");
    }
}

const DB_Utils = new DB_Utilities();

module.exports = DB_Utils
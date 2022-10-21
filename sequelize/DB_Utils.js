const { models } = require('../sequelize');
const states = require('./states.json');
const API_Utils = require('./API_Utils');

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
        const members = await API_Utils.getCongressMembers();
        for (let member of members) {
            await Congress.create({ ...member });
        }
    }
}

const DB_Utils = new DB_Utilities();

module.exports = DB_Utils
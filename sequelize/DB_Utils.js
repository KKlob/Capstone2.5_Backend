const { models } = require('../sequelize');
const states = require('./states.json');
const API_Utils = require('./API_Utils');
const bcrypt = require('bcrypt');
const ExpressError = require('../express/expressError');
const States = models.States;
const Congress = models.Congress;
const Users = models.Users;
const Subs = models.Subs;

// This class orgainzes helper functions when dealing with the db. Keeps code clean and universal to routes helper functions

class DB_Utilities {
    async fillStates() {
        // loop through state objects and insert each one into the db
        for (let state of states) {
            await States.create({ ...state });
        }
    }

    async fillCongress() {
        // loop through member objects and insert each one into the db
        console.log("Filling congress");
        const members = await API_Utils.getCongressMembers();
        for (let member of members) {
            await Congress.create({ ...member });
        }
    }

    async createAdmin(username, password) {
        // create admin user - Used during server initialization only
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            await Users.create({ username, password: hashedPassword });
        } catch (error) {
            throw new ExpressError(error.message, error.status);
        }
    }

    async createAdminSub(username) {
        // create admin sub - Used during server initialization only
        try {
            const user = await Users.findOne({ where: { username } });
            const member = await Congress.findOne();
            const UserId = user.id;
            const CongressId = member.id;
            await Subs.create({ UserId, CongressId });
        } catch (error) {
            throw new ExpressError(error.message, error.status);
        }
    }
}

const DB_Utils = new DB_Utilities();

module.exports = DB_Utils

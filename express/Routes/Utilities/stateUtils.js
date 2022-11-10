const { models } = require('../../../sequelize');
const Congress = models.Congress;
const States = models.States;

class StateUtilities {
    async getAllStates() {
        // get all states from db and return results
        const states = await States.findAll();
        const countedStates = await this.getMemberCounts(states)
        return countedStates;
    }

    async getMemberCounts(states) {
        // get all member counts for each state
        const fullStates = [];
        for (let state of states) {
            let data = state.dataValues;
            const members = await Congress.findAll({
                where: { state: data.code },
                include: States
            });
            const partys = { "D": 0, "R": 0, "ID": 0 };
            for (let member of members) {
                let party = member.party;
                partys[party] += 1
            }
            const newState = { ...state.dataValues, partys }
            fullStates.push(newState);
        }
        return fullStates;
    }
}

const StateUtils = new StateUtilities();

module.exports = StateUtils;
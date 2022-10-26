const { models } = require('../../../sequelize');
const States = models.States;

class StateUtilities {
    async getAllStates() {
        // get all states from db and return results
        const states = await States.findAll();
        return states;
    }
}

const StateUtils = new StateUtilities();

module.exports = StateUtils;
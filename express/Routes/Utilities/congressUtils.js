const { models } = require('../../../sequelize');
const Congress = models.Congress;
const API_Utils = require('../../../sequelize/API_Utils');

class CongressUtilities {
    async getAllMembers() {
        const members = await Congress.findAll();
        return members;
    }

    async getMembersFromState(state) {
        const members = await Congress.findAll({
            where: { state }
        });
        return members;
    }

    async getMembersFromChamber(chamber) {
        const members = await Congress.findAll({
            where: { chamber }
        });
        return members;
    }

    async getMember(id) {
        const member = await Congress.findOne({
            where: { id }
        });
        const addData = await API_Utils.getSecondaryMemberInfo(member.getDataValue('api_url'));

        return { ...member.dataValues, ...addData };
    }


}

const CongressUtils = new CongressUtilities();

module.exports = CongressUtils;
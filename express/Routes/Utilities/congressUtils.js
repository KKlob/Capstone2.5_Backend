const { models } = require('../../../sequelize');
const Congress = models.Congress;
const States = models.States;
const API_Utils = require('../../../sequelize/API_Utils');

class CongressUtilities {
    async getAllMembers() {
        const members = await Congress.findAll({ include: States });
        return members;
    }

    async getMembersFromState(state) {
        const members = await Congress.findAll({
            where: { state },
            include: States
        });

        const tasks = [];

        for (let member of members) {
            if (!member.photo) {
                tasks.push(API_Utils.getSecondaryMemberInfo(member.getDataValue('api_url'), member.getDataValue('id')));
            }
        }

        if (tasks.length > 0) {
            const values = await Promise.all(tasks);
            for (let addData of values) {
                for (let member of members) {
                    if (member.id === addData.id) {
                        const updateData = {};
                        for (let key of Object.keys(addData)) {
                            if (key !== 'id') {
                                updateData[key] = addData[key];
                            }
                        }
                        member.update(updateData);
                        member.reload();
                        break;
                    }
                }
            }
        }

        return members;
    }

    async getMembersFromChamber(chamber) {
        const members = await Congress.findAll({
            where: { chamber },
            include: States
        });
        return members;
    }

    async getMember(id) {
        const member = await Congress.findOne({
            where: { id },
            include: States
        });
        const addData = await API_Utils.getSecondaryMemberInfo(member.getDataValue('api_url'), id);
        return { ...member.dataValues, ...addData };
    }


}

const CongressUtils = new CongressUtilities();

module.exports = CongressUtils;
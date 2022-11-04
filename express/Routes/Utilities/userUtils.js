const bcrypt = require('bcrypt');
const { models } = require('../../../sequelize');
const ExpressError = require('../../expressError');
const jwt = require('jsonwebtoken');
const States = models.States;
const Users = models.Users;
const Congress = models.Congress;
const Subs = models.Subs;
const API_Utils = require('../../../sequelize/API_Utils');
const { config } = require('dotenv');
config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

class UserUtilities {
    async createUser(username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await Users.create({ username, password: hashedPassword });
            let payload = { id: newUser.id, username: newUser.username };
            let token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' });
            return token;
        } catch (error) {
            throw new ExpressError(error.message, error.status);
        }
    }

    async loginUser(username, password) {
        try {
            const user = await Users.findOne({
                where: { username }
            });

            if (user) {
                if (await bcrypt.compare(password, user.password) === true) {
                    let payload = { id: user.id, username: user.username };
                    let token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' });
                    return token;
                }
            }
            throw new ExpressError("Invalid username / password", 400);
        } catch (error) {
            throw new ExpressError(error.message, error.status);
        }
    }

    async logoutUser(username) {
        try {
            const user = Users.findOne({ where: { username } });
            if (user) {
                return { message: "User logged out" };
            }
            throw new ExpressError("Cannot log out another user", 400);
        } catch (error) {
            throw new ExpressError(error.message, error.status);
        }
    }

    async deleteUser(username) {
        try {
            const user = await Users.findOne({ where: { username } });
            if (user) {
                await user.destroy();
                return { message: "User was deleted" };
            }
        } catch (error) {
            throw new ExpressError(error.message, error.status);
        }
    }

    async getSubs(userId) {
        try {
            const user = await Users.findOne({ where: { id: userId }, include: [{ model: Congress, include: [States] }] });
            const members = user.Congresses;
            return members;

        } catch (error) {
            throw new ExpressError(error.message, error.status);
        }
    }

    async addSub(UserId, CongressId) {
        try {
            await Subs.create({ UserId, CongressId });
            return { message: 'Subscribed to member Successfully' };
        } catch (error) {
            throw new ExpressError(error.message, error.status);
        }
    }

    async removeSub(UserId, CongressId) {
        try {
            const sub = await Subs.findOne({ where: { UserId, CongressId } });
            if (sub) {
                await sub.destroy();
                return { message: "Unsubscribed from member Successfully" };
            } else {
                throw new ExpressError("No subscription to member found", 401);
            }
        } catch (error) {
            throw new ExpressError(error.message, error.status);
        }
    }
}

const UserUtils = new UserUtilities();

module.exports = { UserUtils };

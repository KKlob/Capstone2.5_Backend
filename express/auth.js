// express middleware to ensure user is logged in
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function ensureLoggedIn(req, res, next) {
    try {
        const { token } = req.body;
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        req.user = payload;
        return next();
    } catch (error) {
        return next();
    }
}

module.exports = { ensureLoggedIn };
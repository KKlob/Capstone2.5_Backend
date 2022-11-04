// express middleware to ensure user is logged in
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function ensureLoggedIn(req, res, next) {
    try {
        let token;
        if (req.body.token) {
            token = req.body.token;
        } else {
            token = req.get('X-user-token');
        }
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        req.user = payload;
        return next();
    } catch (error) {
        return next();
    }
}

module.exports = { ensureLoggedIn };
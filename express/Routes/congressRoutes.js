const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const StateUtils = require('./Utilities/stateUtils');

router.get("/states", async function (req, res) {
    const results = await StateUtils.getAllStates();
    return res.status(200).json(results);
});

router.get("/states/:state", function (req, res) {
    const state = req.params.state;
    return res.status(200).json({ "message": "/api/:state route - returns info on param state", state });
});

router.get("/members", function (req, res) {
    return res.status(200).json({ "message": "/api/members route - returns info on all US Congressional Members" });
})

router.get("/members/:id", function (req, res) {
    const id = req.params.id;
    return res.status(200).json({ "message": "/api/members/:id route - returns info on specific congressional member based on id", id });
});

module.exports = router;
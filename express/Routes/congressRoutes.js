const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const StateUtils = require('./Utilities/stateUtils');

router.get("/states", async function (req, res) {
    // Returns array of state objects {name, code}
    const results = await StateUtils.getAllStates();
    return res.status(200).json(results);
});

router.get("/states/:state", function (req, res) {
    // Returns array of member objects from state
    const state = req.params.state;
    return res.status(200).json({ "message": `/api/:state route - returns array of member objects from ${state}` });
});

router.get("/members", function (req, res) {
    // Returns array of all member objects in DB
    return res.status(200).json({ "message": "/api/members route - returns info on all US Congressional Members" });
})

router.get("/members/:chamber", function (req, res) {
    // Returns array of all member objects in DB serving in chamber
    return res.status(200).json({ "message": "/api/members/:chamber route - returns info on all US members of the specified chamber" });
})

router.get("/member/:id", function (req, res) {
    // Returns member obj with id
    const id = req.params.id;
    return res.status(200).json({ "message": "/api/members/:id route - returns info on specific congressional member based on id", id });
});

module.exports = router;
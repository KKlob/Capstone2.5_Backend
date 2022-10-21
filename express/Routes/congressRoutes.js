const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const StateUtils = require('./Utilities/stateUtils');
const CongressUtils = require('./Utilities/congressUtils');

router.get("/states", async function (req, res, next) {
    // Returns array of state objects {name, code}
    try {
        const results = await StateUtils.getAllStates();
        return res.status(200).json(results);
    } catch (error) {
        const dbError = new ExpressError(error.message, 500);
        return next(dbError);
    }

});

router.get("/states/:state", async function (req, res, next) {
    // Returns array of member objects from state
    const state = req.params.state;
    try {
        const results = await CongressUtils.getMembersFromState(state);
        return res.status(200).json({ "data": results })
    } catch (error) {
        const dbError = new ExpressError(error.message, 500);
        return next(dbError);
    }
});

router.get("/members", async function (req, res, next) {
    // Returns array of all member objects in DB
    try {
        const members = await CongressUtils.getAllMembers();
        return res.status(200).json({ "data": members });
    } catch (error) {
        const dbError = new ExpressError(error.message, 500);
        return next(dbError);
    }

})

router.get("/members/:chamber", async function (req, res, next) {
    // Returns array of all member objects in DB serving in chamber
    const chamber = req.params.chamber;
    try {
        const members = await CongressUtils.getMembersFromChamber(chamber);
        return res.status(200).json({ "data": members });
    } catch (error) {
        const dbError = new ExpressError(error.message, 500);
        return next(dbError);
    }
})

router.get("/member/:id", async function (req, res, next) {
    // Returns member obj with id
    const id = req.params.id;
    try {
        const member = await CongressUtils.getMember(id);
        return res.status(200).json({ "data": member });
    } catch (error) {
        const dbError = new ExpressError(error.message, 500);
        return next(dbError);
    }
});

module.exports = router;
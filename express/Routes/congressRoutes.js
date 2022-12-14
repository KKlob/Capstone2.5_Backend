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
        if (results.length) {
            return res.status(200).json({ "data": results });
        } else {
            const clientError = new ExpressError(`No members belong to ${state} state`, 400);
            return next(clientError);
        }
    } catch (error) {
        const dbError = new ExpressError(error.message, error.status);
        return next(dbError);
    }
});

router.get("/member/:id", async function (req, res, next) {
    // Returns member obj with id
    const id = req.params.id;
    try {
        const member = await CongressUtils.getMember(id);
        if (member) {
            return res.status(200).json({ "data": member });
        } else {
            clientError = new ExpressError(`No member with id: ${id}`);
            return next(clientError);
        }
    } catch (error) {
        const dbError = new ExpressError(error.message, 500);
        return next(dbError);
    }
});

// Route /members is disabled until future use is established

// router.get("/members", async function (req, res, next) {
//     // Returns array of all member objects in DB
//     try {
//         const members = await CongressUtils.getAllMembers();
//         return res.status(200).json({ "data": members });
//     } catch (error) {
//         const dbError = new ExpressError(error.message, 500);
//         return next(dbError);
//     }
// })

// Route /members/:chamber disabled until future use is established

// router.get("/members/:chamber", async function (req, res, next) {
//     // Returns array of all member objects in DB serving in chamber
//     const chamber = req.params.chamber;
//     try {
//         const members = await CongressUtils.getMembersFromChamber(chamber);
//         if (members.length) {
//             return res.status(200).json({ "data": members });
//         } else {
//             clientError = new ExpressError(`No members in ${chamber} chamber`, 400)
//             return next(clientError);
//         }
//     } catch (error) {
//         const dbError = new ExpressError(error.message, 500);
//         return next(dbError);
//     }
// })

module.exports = router;
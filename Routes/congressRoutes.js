const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');

router.get("/states", function (req, res) {
    return res.status(200).json({ "message": "/api/states route - returns info on all US states" });
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
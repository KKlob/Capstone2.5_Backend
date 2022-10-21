const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');

router.get("/login", function (req, res) {
    return res.status(200).json({ "message": "/api/user/login route - handles login of user" });
})

router.get("/logout", function (req, res) {
    return res.status(200).json({ "message": "/api/user/logout route - handles logout of user" });
})

router.get("/signup", function (req, res) {
    return res.status(200).json({ "message": "/api/user/signup route - handles signup of user" });
})

router.get("/:id", function (req, res) {
    return res.status(200).json({ "message": "/api/user/:id route - returns necessary info on userID for subbed members" });
})

module.exports = router;
const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const { UserUtils } = require('./Utilities/userUtils');
const { ensureLoggedIn } = require('../auth');


router.get("/login", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const token = await UserUtils.loginUser(username, password);
        return res.status(200).json({ token });
    } catch (error) {
        return next(error);
    }
});

router.get("/logout", ensureLoggedIn, async function (req, res, next) {
    try {
        if (req.user) {
            const result = await UserUtils.logoutUser(req.user.username);
            return res.status(200).json(result);
        }
        throw new ExpressError("You must be logged in first!", 400);
    } catch (error) {
        return next(error);
    }
});

router.post("/signup", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const token = await UserUtils.createUser(username, password);
        return res.status(201).json({ token });
    } catch (error) {
        return next(error);
    }
});

router.delete("/delete", ensureLoggedIn, async function (req, res, next) {
    try {
        const { user } = req.body;
        if (user) {
            const result = await UserUtils.deleteUser(user);
            return res.status(200).json(result);
        }
        throw new ExpressError("You must be logged in to delete a user", 400);
    } catch (error) {
        return next(error);
    }
});

router.post("/subs/add", ensureLoggedIn, async function (req, res, next) {
    try {
        if (req.user) {
            const result = await UserUtils.addSub(req.user.id, req.body.memberId);
            return res.status(200).json(result);
        }
        throw new ExpressError("You must be logged in to sub to a congressional member", 400);
    } catch (error) {
        return next(error);
    }
});

router.delete("/subs/remove", ensureLoggedIn, async function (req, res, next) {
    try {
        if (req.user) {
            const result = await UserUtils.removeSub(req.user.id, req.body.memberId);
            return res.status(200).json(result);
        }
        throw new ExpressError("You must be logged in to sub to a congressional member", 400);
    } catch (error) {
        return next(error);
    }
});

router.get("/subs", ensureLoggedIn, async function (req, res, next) {
    if (req.user) {
        const subs = await UserUtils.getSubs(req.user.id);
        return res.status(200).json({ subs });
    } else {
        const authError = new ExpressError("You must be logged in to request that info", 401);
        return next(authError);
    }
})

module.exports = router;
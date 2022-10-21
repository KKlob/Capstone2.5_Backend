const express = require('express');
const cors = require('cors');
const ExpressError = require('./expressError');
const congressRoutes = require('./Routes/congressRoutes');
const userRoutes = require('./Routes/userRoutes');
const app = express();
const { models } = require('../sequelize');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// API ROUTES

app.get("/api", (req, res, next) => {
    res.json({ message: "Hello from the Capstone2.5_Backend API" });
})

app.use("/api/user", userRoutes);

app.use("/api/congress", congressRoutes);

// 404 Handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Invalid Endpoint", 400);
    return next(notFoundError);
})

// Generic Error Handler
app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({ error: { message, status } });
});

module.exports = app;
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// API ROUTES

app.get("/", (req, res) => {
    res.json({ message: "Hello from the Capstone2.5_Backend API" });
})

// Error Handling


// Ensure App is listening on port
app.listen(port, () => console.log(`Capstone2.5_Backend API listening on port ${port}`));
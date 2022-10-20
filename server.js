const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// API ROUTES

app.get("/", (req, res) => {
    res.json({ message: "Hello from the Capstone2.5_Backend API" });
})

// Error Handling


// Ensure App is listening on port
app.listen(port, () => console.log(`Capstone2.5_Backend API listening on port ${port}`));
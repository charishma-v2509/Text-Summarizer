// app.js

const express = require("express");
const cors = require("cors");
const summaryRoutes = require("./routes/summaryRoutes");

const app = express();
const path = require("path");

// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON request bodies

// Routes
app.use("/api", summaryRoutes);

app.use(express.static(path.join(__dirname, 'public')));

// Export app to use in server.js
module.exports = app;

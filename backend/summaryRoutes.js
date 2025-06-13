// summaryRoutes.js

const express = require("express");
const router = express.Router();
const { summarizeText } = require("../controllers/summaryController");

// POST /api/summarize
router.post("/summarize", summarizeText);

module.exports = router;

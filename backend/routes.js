const express = require("express");
const router = express.Router();
const { analyzeResume } = require("./controller");

router.post("/analyze", analyzeResume);

module.exports = router;
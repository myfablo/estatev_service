const express = require("express");
const { generateDailyProfit } = require("../controllers/profitController");

const router = express.Router();

router.post("/generate-daily-profit", generateDailyProfit); // Generate daily profit for all customers

module.exports = router;

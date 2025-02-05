const express = require("express");
const { getPlans } = require("../controllers/planController");

const router = express.Router();

router.get("/", getPlans); // Get all investment plans

module.exports = router;
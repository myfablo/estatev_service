const express = require("express");
const { createInvestment, getInvestmentsByCustomer } = require("../controllers/investmentController");

const router = express.Router();

router.post("/", createInvestment);
router.get("/:customerId", getInvestmentsByCustomer);

module.exports = router;

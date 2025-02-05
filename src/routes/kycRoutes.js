const express = require("express");
const { createKYC, getKYCByCustomer, updateKYCStatus } = require("../controllers/kycController");

const router = express.Router();

router.post("/", createKYC); // Create KYC
router.get("/:customerId", getKYCByCustomer); // Get KYC Details
router.put("/:customerId", updateKYCStatus); // Update KYC Status

module.exports = router;

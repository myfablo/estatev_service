const express = require("express");
const { addOrUpdateBank, getBankByCustomer, deleteBankByCustomer } = require("../controllers/bankController");

const router = express.Router();

router.post("/", addOrUpdateBank); // Add or Update Bank Details
router.get("/:customerId", getBankByCustomer); // Get Bank Details by Customer ID
router.delete("/:customerId", deleteBankByCustomer); // Delete Bank Details

module.exports = router;

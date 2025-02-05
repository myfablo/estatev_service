const express = require("express");
const { getTransactionsByCustomer } = require("../controllers/transactionController");

const router = express.Router();

router.get("/:customerId", getTransactionsByCustomer);

module.exports = router;

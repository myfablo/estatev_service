const express = require("express");
const { getWalletByCustomer } = require("../controllers/walletController");
const router = express.Router();

router.get("/:customerId", getWalletByCustomer);

module.exports = router;

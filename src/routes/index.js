const express = require("express");
const investmentRoutes = require("./investmentRoutes");
const transactionRoutes = require("./transactionRoutes");
const walletRoutes = require("./walletRoutes");
const kycRoutes = require("./kycRoutes");
const customerRoutes = require("./customerRoutes");
const payoutRoutes = require("./payoutRoutes");
const bankRoutes = require("./bankRoutes");
const profitRoutes = require("./profitRoutes");
const planRoutes = require("./planRoutes");

const router = express.Router();

router.use("/investments", investmentRoutes);
router.use("/transactions", transactionRoutes);
router.use("/wallets", walletRoutes);
router.use("/kyc", kycRoutes);
router.use("/customers", customerRoutes);
router.use("/payouts", payoutRoutes);
router.use("/banks", bankRoutes);
router.use("/profit", profitRoutes);
router.use("/plans", planRoutes);

module.exports = router;

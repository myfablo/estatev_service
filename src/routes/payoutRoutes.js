const express = require("express");
const {
  requestPayout,
  getPayoutsByCustomer,
  updatePayoutStatus,
  processPayout
} = require("../controllers/payoutController");

const router = express.Router();

router.post("/", requestPayout); // Request payout
router.get("/:customerId", getPayoutsByCustomer); // Get payouts by customer
router.put("/:payoutId", updatePayoutStatus); // Approve/Reject payout request
router.post("/process/:payoutId", processPayout); // Process approved payout

module.exports = router;

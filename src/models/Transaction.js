const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    amount: { type: mongoose.Types.Decimal128, required: true },
    status: { type: String, enum: ["pending", "completed", "failed", "reversed"], default: "pending" },
    narration: { type: String, required: true },
    type: { type: String, enum: ["credit", "debit"], required: true }, // credit for deposits, debit for withdrawals
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
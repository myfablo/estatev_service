const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true, unique: true },
    capital: { type: mongoose.Types.Decimal128, default: 0.0 }, // Invested amount
    profit: { type: mongoose.Types.Decimal128, default: 0.0 }, // Earned profit
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);

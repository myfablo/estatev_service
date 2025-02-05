const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    amount: { type: mongoose.Types.Decimal128, required: true },
    rate: { type: mongoose.Types.Decimal128, required: true },
    locking: { type: Number, required: true }, // Locking period in months
    profit: { type: mongoose.Types.Decimal128, default: 0 }, // Tracks individual investment profit
    status: { type: String, enum: ["active", "completed", "cancelled", "pending"], default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Investment", investmentSchema);

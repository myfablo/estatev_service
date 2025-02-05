const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    amountMin: { type: mongoose.Types.Decimal128, required: true },
    amountMax: { type: mongoose.Types.Decimal128, required: true },
    rate: { type: mongoose.Types.Decimal128, required: true },
    locking: { type: Number, required: true } // Locking period in months
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
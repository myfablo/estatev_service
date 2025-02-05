const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    investmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Investment", required: function() { return this.type === "capital"; } }, 
    bankDetails: { 
      bankName: { type: String, required: true },
      accountNumber: { type: String, required: true },
      ifscCode: { type: String, required: true },
      beneficiaryName: { type: String, required: true }
    },
    amount: { type: mongoose.Types.Decimal128, required: true },
    type: { type: String, enum: ["profit", "capital"], required: true },
    status: { type: String, enum: ["pending", "approved", "rejected", "processed"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payout", payoutSchema);

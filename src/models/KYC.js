const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true, unique: true },
    address: { type: String, required: true },
    panNumber: { type: String, required: true, unique: true },
    aadhaarNumber: { type: String, required: true, unique: true },
    status: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("KYC", kycSchema);

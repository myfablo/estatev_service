const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true, unique: true },
    address: { type: String, required: true },
    panNumber: { type: String, required: true, unique: true },
    aadhaarNumber: { type: String, required: true, unique: true },
    panPhoto: { type: String, required: true }, // URL to PAN photo
    aadhaarPhoto: {
      front: { type: String, required: true }, // URL to Aadhaar front
      back: { type: String, required: true }   // URL to Aadhaar back
    },
    kycStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KYC", kycSchema);

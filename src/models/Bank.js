const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true, unique: true },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    ifscCode: { type: String, required: true },
    beneficiaryName: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);

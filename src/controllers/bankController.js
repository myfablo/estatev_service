const Bank = require("../models/Bank");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// ✅ 1️⃣ Add or Update Customer Bank Account
exports.addOrUpdateBank = async (req, res) => {
  try {
    const { customerId, bankName, accountNumber, ifscCode, beneficiaryName } = req.body;

    // Find existing bank record for the customer
    const existingBank = await Bank.findOne({ customerId });

    if (existingBank) {
      // Update existing bank details
      const updatedBank = await Bank.findOneAndUpdate(
        { customerId },
        { bankName, accountNumber, ifscCode, beneficiaryName },
        { new: true }
      );
      return successResponse(res, updatedBank, "Bank details updated successfully");
    }

    // Create new bank details entry
    const newBank = await Bank.create({ customerId, bankName, accountNumber, ifscCode, beneficiaryName });
    return successResponse(res, newBank, "Bank details added successfully", 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ 2️⃣ Get Bank Details by Customer ID
exports.getBankByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const bank = await Bank.findOne({ customerId });

    if (!bank) return errorResponse(res, "Bank details not found", 404);

    return successResponse(res, bank, "Bank details fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ 3️⃣ Delete Customer's Bank Details
exports.deleteBankByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const deletedBank = await Bank.findOneAndDelete({ customerId });

    if (!deletedBank) return errorResponse(res, "Bank details not found", 404);

    return successResponse(res, deletedBank, "Bank details deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

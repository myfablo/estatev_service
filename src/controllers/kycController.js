const KYC = require("../models/KYC");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// ✅ 1️⃣ Create KYC Record
exports.createKYC = async (req, res) => {
  try {
    const { customerId, address, panNumber, aadhaarNumber, panPhoto, aadhaarPhoto } = req.body;

    // Check if KYC already exists
    const existingKYC = await KYC.findOne({ customerId });
    if (existingKYC) return errorResponse(res, "KYC record already exists", 400);

    // Create new KYC record
    const kyc = await KYC.create({
      customerId,
      address,
      panNumber,
      aadhaarNumber,
      panPhoto,
      aadhaarPhoto
    });

    return successResponse(res, kyc, "KYC record created successfully", 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ 2️⃣ Get KYC Details by Customer ID
exports.getKYCByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const kyc = await KYC.findOne({ customerId });

    if (!kyc) return errorResponse(res, "KYC record not found", 404);

    return successResponse(res, kyc, "KYC details fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ 3️⃣ Update KYC Status
exports.updateKYCStatus = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { kycStatus } = req.body;

    if (!["pending", "verified", "rejected"].includes(kycStatus)) {
      return errorResponse(res, "Invalid KYC status", 400);
    }

    const updatedKYC = await KYC.findOneAndUpdate(
      { customerId },
      { kycStatus },
      { new: true }
    );

    if (!updatedKYC) return errorResponse(res, "KYC record not found", 404);

    return successResponse(res, updatedKYC, "KYC status updated successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

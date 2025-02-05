const Wallet = require("../models/Wallet");
const { successResponse, errorResponse } = require("../utils/responseHelper");

exports.getWalletByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const wallet = await Wallet.findOne({ customerId });

    if (!wallet) {
      return errorResponse(res, "Wallet not found", 404);
    }

    return successResponse(res, wallet, "Wallet details fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

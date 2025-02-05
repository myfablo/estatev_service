const Transaction = require("../models/Transaction");
const { successResponse, errorResponse } = require("../utils/responseHelper");

exports.getTransactionsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const transactions = await Transaction.find({ customerId });

    if (!transactions.length) {
      return errorResponse(res, "No transactions found", 404);
    }

    return successResponse(res, transactions, "Transactions fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

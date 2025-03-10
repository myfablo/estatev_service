const Plan = require("../models/Plan");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// ✅ Get All Investment Plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ amountMin: 1 }); // Sort by minimum amount

    if (!plans.length) {
      return errorResponse(res, "No investment plans found", 404);
    }

    return successResponse(res, plans, "Investment plans retrieved successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
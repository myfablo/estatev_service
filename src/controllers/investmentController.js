const Investment = require("../models/Investment");
const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");
const Plan = require("../models/Plan");
const mongoose = require("mongoose");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// ✅ Create Investment with Auto-Selected Plan
exports.createInvestment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { customerId, amount } = req.body;

    // ✅ Step 1: Find a Matching Plan Based on Amount
    const plan = await Plan.findOne({
      amountMin: { $lte: amount },
      amountMax: { $gte: amount }
    });

    if (!plan) {
      return errorResponse(res, "No suitable investment plan found for this amount", 400);
    }

    // ✅ Step 2: Create Investment Using the Selected Plan
    const investment = await Investment.create(
      [
        {
          customerId,
          amount,
          rate: plan.rate,
          locking: plan.locking,
          status: "active"
        }
      ],
      { session }
    );

    // ✅ Step 3: Create Transaction Entry
    const transaction = await Transaction.create(
      [
        {
          customerId,
          amount,
          status: "completed",
          narration: "Investment deposit",
          type: "credit"
        }
      ],
      { session }
    );

    // ✅ Step 4: Update Wallet Capital
    const wallet = await Wallet.findOneAndUpdate(
      { customerId },
      { $inc: { capital: amount } },
      { new: true, upsert: true, session }
    );

    // ✅ Step 5: Commit the Transaction
    await session.commitTransaction();
    session.endSession();

    return successResponse(res, { investment, transaction, wallet }, "Investment created successfully", 201);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return errorResponse(res, error.message, 500);
  }
};

exports.getInvestmentsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const investments = await Investment.find({ customerId });

    if (!investments.length) {
      return errorResponse(res, "No investments found", 404);
    }

    return successResponse(res, investments, "Investments fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

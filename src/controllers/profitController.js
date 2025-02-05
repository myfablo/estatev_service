const Investment = require("../models/Investment");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// ✅ Generate Daily Profit & Update Investment Profit
exports.generateDailyProfit = async (req, res) => {
    try {
      // Get all active investments
      const investments = await Investment.find({ status: "active" });
  
      if (!investments.length) {
        return errorResponse(res, "No active investments found", 404);
      }
  
      // Prepare wallet updates & transactions
      const walletUpdates = {};
      const investmentUpdates = [];
      const transactions = [];
      let totalUpdated = 0;
  
      for (const investment of investments) {
        const { customerId, _id, amount, rate } = investment;
        const dailyProfit = (parseFloat(amount) * parseFloat(rate) / 100) / 12 / 30; // ✅ New Calculation
  
        // ✅ Track Wallet Profit Update
        if (!walletUpdates[customerId]) {
          walletUpdates[customerId] = 0;
        }
        walletUpdates[customerId] += dailyProfit;
  
        // ✅ Track Individual Investment Profit Update
        investmentUpdates.push({
          updateOne: {
            filter: { _id },
            update: { $inc: { profit: dailyProfit } }
          }
        });
  
        // ✅ Create Transaction Entry
        transactions.push({
          customerId,
          amount: dailyProfit,
          status: "completed",
          narration: `Daily profit credit for investment ${_id}`,
          type: "credit"
        });
      }
  
      // ✅ Update Wallets
      for (const customerId in walletUpdates) {
        const profitAmount = walletUpdates[customerId];
  
        await Wallet.findOneAndUpdate(
          { customerId },
          { $inc: { profit: profitAmount } },
          { new: true, upsert: true }
        );
        totalUpdated++;
      }
  
      // ✅ Bulk Update Investments to Track Profits
      await Investment.bulkWrite(investmentUpdates);
  
      // ✅ Insert Transactions
      await Transaction.insertMany(transactions);
  
      return successResponse(res, { totalUpdated, transactions }, "Daily profit generated, investments updated & transactions recorded successfully");
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  };

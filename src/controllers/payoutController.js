const Payout = require("../models/Payout");
const Wallet = require("../models/Wallet");
const Bank = require("../models/Bank");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// ✅ Request Payout (Profit or Capital)
exports.requestPayout = async (req, res) => {
    try {
      const { customerId, investmentId, amount, type } = req.body;
  
      if (!["profit", "capital"].includes(type)) {
        return errorResponse(res, "Invalid payout type", 400);
      }
  
      // ✅ Fetch Customer Bank Details
      const bank = await Bank.findOne({ customerId });
      if (!bank) return errorResponse(res, "Bank details not found. Please add bank details before requesting a payout.", 400);
  
      // ✅ If payout type is "capital", verify investment ID
      if (type === "capital") {
        if (!investmentId) return errorResponse(res, "Investment ID is required for capital payout", 400);
  
        const investment = await Investment.findOne({ _id: investmentId, customerId, status: "active" });
  
        if (!investment) {
          return errorResponse(res, "No active investment found with this ID", 400);
        }
  
        // Check if locking period has ended (locking in months)
        const createdDate = new Date(investment.createdAt);
        const unlockDate = new Date(createdDate.setMonth(createdDate.getMonth() + investment.locking));
  
        if (new Date() < unlockDate) {
          return errorResponse(res, `Capital withdrawal is locked until ${unlockDate.toDateString()}`, 400);
        }
      }
  
      // ✅ Get customer wallet
      const wallet = await Wallet.findOne({ customerId });
      if (!wallet) return errorResponse(res, "Wallet not found", 404);
  
      // ✅ Check if sufficient balance exists
      if (type === "profit" && wallet.profit < amount) {
        return errorResponse(res, "Insufficient profit balance", 400);
      }
      if (type === "capital" && wallet.capital < amount) {
        return errorResponse(res, "Insufficient capital balance", 400);
      }
  
      // ✅ Create payout request with full bank details
      const payout = await Payout.create({
        customerId,
        investmentId: type === "capital" ? investmentId : undefined,
        bankDetails: {
          bankName: bank.bankName,
          accountNumber: bank.accountNumber,
          ifscCode: bank.ifscCode,
          beneficiaryName: bank.beneficiaryName
        },
        amount,
        type
      });
  
      return successResponse(res, payout, "Payout request submitted successfully", 201);
    } catch (error) {
      console.log(error);
      return errorResponse(res, error.message, 500);
    }
  };
  

// ✅ 2️⃣ Get Payout Requests by Customer ID
exports.getPayoutsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const payouts = await Payout.find({ customerId });

    if (!payouts.length) return errorResponse(res, "No payout requests found", 404);

    return successResponse(res, payouts, "Payout requests fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ 3️⃣ Approve or Reject Payout Request
exports.updatePayoutStatus = async (req, res) => {
  try {
    const { payoutId } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return errorResponse(res, "Invalid status update", 400);
    }

    const updatedPayout = await Payout.findByIdAndUpdate(
      payoutId,
      { status, processedDate: status === "approved" ? new Date() : null },
      { new: true }
    );

    if (!updatedPayout) return errorResponse(res, "Payout request not found", 404);

    return successResponse(res, updatedPayout, `Payout request ${status} successfully`);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ 4️⃣ Process Approved Payouts
exports.processPayout = async (req, res) => {
  try {
    const { payoutId } = req.params;

    const payout = await Payout.findById(payoutId);
    if (!payout) return errorResponse(res, "Payout request not found", 404);

    if (payout.status !== "approved") {
      return errorResponse(res, "Only approved payouts can be processed", 400);
    }

    // Deduct from wallet
    const wallet = await Wallet.findOne({ customerId: payout.customerId });
    if (!wallet) return errorResponse(res, "Wallet not found", 404);

    const updateField = payout.type === "profit" ? { profit: -payout.amount } : { capital: -payout.amount };
    await Wallet.updateOne({ customerId: payout.customerId }, { $inc: updateField });

    // Update payout status
    payout.status = "processed";
    payout.processedDate = new Date();
    await payout.save();

    return successResponse(res, payout, "Payout processed successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

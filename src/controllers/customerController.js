const Customer = require("../models/Customer");
const Wallet = require("../models/Wallet");
const mongoose = require("mongoose");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// ✅ Create Customer & Automatically Create Wallet
exports.createCustomer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { name, phone, email, city } = req.body;
  
      // Check if customer already exists
      const existingCustomer = await Customer.findOne({ phone });
      if (existingCustomer) {
        return errorResponse(res, "Customer already exists", 400);
      }
  
      // ✅ Step 1: Create Customer
      const customer = await Customer.create([{ name, phone, email, city }], { session });
  
      // ✅ Step 2: Create Wallet for the Customer
      const wallet = await Wallet.create([{ customerId: customer[0]._id, capital: 0, profit: 0 }], { session });
  
      // ✅ Step 3: Commit transaction
      await session.commitTransaction();
      session.endSession();
  
      return successResponse(res, { customer: customer[0], wallet }, "Customer and wallet created successfully", 201);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return errorResponse(res, error.message, 500);
    }
  };

// ✅ 2️⃣ Get Customer Details by ID
exports.getCustomerById = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId);

    if (!customer) return errorResponse(res, "Customer not found", 404);

    return successResponse(res, customer, "Customer details fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ 3️⃣ Get Customer Details by Phone Number
exports.getCustomerByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const customer = await Customer.findOne({ phone });

    if (!customer) return errorResponse(res, "Customer not found", 404);

    return successResponse(res, customer, "Customer details fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ 4️⃣ Update Customer Details
exports.updateCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { name, phone, email, city } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { name, phone, email, city },
      { new: true }
    );

    if (!updatedCustomer) return errorResponse(res, "Customer not found", 404);

    return successResponse(res, updatedCustomer, "Customer updated successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ 5️⃣ Delete Customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    if (!deletedCustomer) return errorResponse(res, "Customer not found", 404);

    return successResponse(res, deletedCustomer, "Customer deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

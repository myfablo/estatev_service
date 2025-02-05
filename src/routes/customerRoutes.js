const express = require("express");
const {
  createCustomer,
  getCustomerById,
  getCustomerByPhone,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customerController");

const router = express.Router();

router.post("/", createCustomer); // Create Customer
router.get("/:customerId", getCustomerById); // Get Customer by ID
router.get("/phone/:phone", getCustomerByPhone); // Get Customer by Phone
router.put("/:customerId", updateCustomer); // Update Customer
router.delete("/:customerId", deleteCustomer); // Delete Customer

module.exports = router;

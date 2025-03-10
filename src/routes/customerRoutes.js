const express = require("express");
const {
  createCustomer,
  getCustomerById,
  getCustomerByPhone,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomersWithActiveInvestments
} = require("../controllers/customerController");

const router = express.Router();

router.post("/", createCustomer); // Create Customer
router.get("/", getAllCustomers); // Get all customers
router.get("/active-investments", getCustomersWithActiveInvestments); // Get customers with active investments
router.get("/:customerId", getCustomerById); // Get Customer by ID
router.get("/phone/:phone", getCustomerByPhone); // Get Customer by Phone
router.put("/:customerId", updateCustomer); // Update Customer
router.delete("/:customerId", deleteCustomer); // Delete Customer

module.exports = router;

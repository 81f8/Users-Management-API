const express = require("express");
const router = express.Router();

const {
  getAllEmployees,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  searchEmployees,
  filterEmployeesByDepartment,
  getFirstEmployee,
  getLastEmployee,
  getEmployeeById,
} = require("../models/employees");

// Set up your routes using the functions

router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployeeById);
router.delete("/:id", deleteEmployeeById);
router.get("/search", searchEmployees);
router.get("/filter", filterEmployeesByDepartment);
router.get("/first", getFirstEmployee);
router.get("/last", getLastEmployee);
router.get("/:id", getEmployeeById);

module.exports = router;

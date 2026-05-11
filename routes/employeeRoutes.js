// Employee Routes
const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

// Middleware
const { isLoggedIn, isAdmin } = require('../middleware');

// Render New Employee Form
router.get('/employee/new', EmployeeController.newEmployee);

// Create Employee   
router.post('/employee', EmployeeController.createEmployee);

// Get Employees
router.get('/Allemployee', EmployeeController.getAllEmployees);

// Get Employee by ID
router.get('/employee/:id', EmployeeController.getEmployee);

// Update Employee

router.patch('/employee/:id', EmployeeController.updateEmployee);
// Delete Employee


router.get("/employees/delete",EmployeeController.renderDeleteForm);

router.delete('/employee/:id', EmployeeController.deleteEmployee);

module.exports = router;









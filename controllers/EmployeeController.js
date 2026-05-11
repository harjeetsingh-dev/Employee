// Employee Controller
const Employee = require('../models/employee');

// Render New Employee Form

module.exports.newEmployee = (req, res) => {
  res.render("../views/employee/new.ejs");
};

// Create Employee
module.exports.createEmployee = async (req, res) => {
  try {
    const { username, email, position, department, salary } = req.body;
    const NewUser = {
      username: username.trim(),
      email: email.toLowerCase(),
      position: position.trim(),
      department: department.trim(),
      salary: salary
    }
    const newEmployee = new Employee(NewUser);
    await newEmployee.save();
    res.redirect("/Allemployee");
  }
  catch (err) {
    console.error(err);
    res.json({ message: 'Server Error' });
  }
};

// Get All Employees
module.exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render("./employee/index", { employees });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Server Error' });
  }
};

// Get Employee by ID
module.exports.getEmployee = async (req, res) => {
  let id = req.params.id;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.json({ message: 'Employee not found' });
    }
    res.json({ employee });

  } catch (err) {
    console.error(err);
    res.json({ message: 'Server Error' });
  }

};

// Update Employee
module.exports.updateEmployee = async (req, res) => {
  let id = req.params.id;
  try {
    const { username, email, position, department, salary } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      username: username,
      email: email.toLowerCase(),
      position: position,
      department: department,
      salary: salary
    },
      { new: true, runValidators: true }
    );
    res.json({ updatedEmployee });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Server Error' });
  }
};

// Delete Employee 

module.exports.newEmployee = (req, res) => {
  res.render("../views/employee/delete.ejs");
};





// Delete Employee
module.exports.deleteEmployee = async (req, res) => {
  let id = req.params.id;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Server Error' });
  }
}

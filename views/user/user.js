const ejs = require('ejs');
const User = require('../../models/user');

// Render Register Page
module.exports.renderRegister = (req, res) => {
  res.render("./employee/register");
};      
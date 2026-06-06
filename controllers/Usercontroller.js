const bcrypt = require('bcrypt');
const User = require('../models/user');

// Render Signup Form
module.exports.renderSignupForm = (req, res) => {
  res.render("../views/Auth/signup.ejs");
};

//User Register Route
module.exports.signup = async (req, res) => {
  try {
    //collect user data from request body
    const { username, email, password } = req.body;

    // 1. Count existing users
    const userCount = await User.countDocuments();

    // 2. First user becomes admin
    const role = userCount === 0 ? "admin" : "user";

    //check if user Email already exist in database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("Email already registered");
    }
    //hash the password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user instance and save to database
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      role: role
    });

    await newUser.save();
    res.redirect("/Allemployee");

  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

//Render Login Form
module.exports.renderLoginForm = (req, res) => {
  res.render("../views/Auth/login.ejs");
};

//User Login Route
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user by email
    const user = await User.findOne({ email });

    // check user exist or not in  database
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    //check password and compare with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);

    // if password does not match return error
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Set session data
    req.session.userId = user._id;
    req.session.userName = user.username;
    req.session.userRole = user.role;

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }

  });
  res.clearCookie("connect.sid");
  res.json({ message: 'Logout successful' });
};
const bcrypt = require('bcrypt');
const User = require('../models/user');


//User Register Route
module.exports.signup = async (req, res) => {
  try {
    //collect user data from request body
    const { username, email, password, role } = req.body;

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
      role: role || "user"
    });

    await newUser.save();

    res.send("User registered successfully");

  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
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

    console.log(`User ${req.session.userName} logged in successfully`);

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
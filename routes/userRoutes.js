const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Usercontroller');

// Render Signup Form
router.get('/signup', UserController.renderSignupForm);

//User Register Route
router.post('/signup', UserController.signup);

//Render Login Form
router.get('/login', UserController.renderLoginForm);

// User Login Route
router.post('/login', UserController.login).post('/logout', UserController.logout);      

module.exports = router;

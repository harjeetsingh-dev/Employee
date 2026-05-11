const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Usercontroller');

router.post('/signup', UserController.signup).post('/login', UserController.login).post('/logout', UserController.logout);      

module.exports = router;

// src/routes/users.js
const express = require('express');
const { getAllUsers, createUser } = require('../controllers/usersController'); // Import controller functions
const router = express.Router();

// Route to get all users
router.get('/', getAllUsers);

// Route to create a new user
router.post('/', createUser);

module.exports = router;
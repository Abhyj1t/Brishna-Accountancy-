// src/controllers/usersController.js

// Example: Get all users
const getAllUsers = (req, res) => {
  res.send('Get all users');
};

// Example: Create a new user
const createUser = (req, res) => {
  const user = req.body;
  res.send(Create a new user: ${JSON.stringify(user)});
};

module.exports = {
  getAllUsers,
  createUser
};
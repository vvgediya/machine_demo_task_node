const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const handleErrors = require('../utils/handleErrors');
const config = require('../config/config.js');

exports.verifyPassword = handleErrors(async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
  return user;
});

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.createUser = async (body) => {
  return await User.create(body);
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Failed to get users');
  }
};
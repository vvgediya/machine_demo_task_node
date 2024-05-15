/**
* File Name: userService.js
*/
const User = require('../models/userModel');
const handleErrors = require('../utils/handleErrors');

exports.getAllUsers =async () => {
  return await User.find();
}

exports.getUserById =async (userId) => {
  return await User.findById(userId);
};

exports.createUser =async (userData) => {
  return await User.create(userData);
}

exports.updateUserById =async (userId, updatedUserData) => {
  return await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
}

exports.deleteUserById =async (userId) => {
  await User.findByIdAndDelete(userId);
}

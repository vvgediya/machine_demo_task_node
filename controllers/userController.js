/**
* File Name: userController.js
*/
const userService = require('../services/userService');
const ResponseHelper = require('../utils/responseHelper');
const MSG = require('../utils/MSG');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, users));
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    res.json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, user));
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(ResponseHelper.success(201, MSG.CREATED_SUCCESS, newUser));
  } catch (error) {
    next(error);
  }
};

exports.updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await userService.updateUserById(userId, req.body);
    res.json(ResponseHelper.success(200, MSG.UPDATED_SUCCESS, updatedUser));
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await userService.deleteUserById(userId);
    res.json(ResponseHelper.success(200, MSG.DELETED_SUCCESS));
  } catch (error) {
    next(error);
  }
};

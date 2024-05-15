const authService = require('../services/authServices');
const MSG = require('../utils/MSG');
const ResponseHelper = require('../utils/responseHelper');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Verify email and password
    const user = await authService.verifyPassword(email, password);

    // Generate JWT token
    const token = authService.generateToken(user);
    
    // Send token in response
    res.json(ResponseHelper.success(200, 'Login successful', { token,user }));
  } catch (error) {
    // Handle errors
    res.status(401).json(ResponseHelper.error(401, 'Login failed', error.message));
  }
};

exports.register = async (req, res, next) => {
  const { email } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json(ResponseHelper.error(400, 'User already exists'));
    }

    // Create a new user
    const newUser = await authService.createUser(req.body);
    // Respond with success message
    res.status(201).json(ResponseHelper.success(201, 'User created successfully', newUser));
  } catch (error) {
    // Handle errors
    res.status(500).json(ResponseHelper.error(500, 'Failed to register user', error.message));
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    // Respond with the user profile data
    return res.json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, req.user));
  } catch (error) {
    // Handle errors
    return next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    // Retrieve all users using the service function
    const users = await authService.getAllUsers();

    // Respond with the array of users
    res.json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, users));
  } catch (error) {
    // Handle errors
    next(error);
  }
};
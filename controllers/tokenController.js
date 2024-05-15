/**
* File Name: tokenController.js
*/
const Token = require('../models/tokenModel');
const ResponseHelper = require('../utils/responseHelper');
const MSG = require('../utils/MSG');

exports.createToken = async (req, res, next) => {
  try {
    const newToken = await Token.create(req.body);
    res.status(201).json(ResponseHelper.success(201, 'Token created successfully', newToken));
  } catch (error) {
    res.status(500).json(ResponseHelper.error(500, 'Failed to create token', error.message));
  }
};

exports.updateToken = async (req, res, next) => {
  try {
    const updatedToken = await Token.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedToken) {
      return res.status(404).json(ResponseHelper.error(404, 'Token not found'));
    }
    res.json(ResponseHelper.success(200, 'Token updated successfully', updatedToken));
  } catch (error) {
    res.status(500).json(ResponseHelper.error(500, 'Failed to update token', error.message));
  }
};

exports.deleteToken = async (req, res, next) => {
  try {
    const deletedToken = await Token.findByIdAndDelete(req.params.id);
    if (!deletedToken) {
      return res.status(404).json(ResponseHelper.error(404, 'Token not found'));
    }
    res.json(ResponseHelper.success(200, 'Token deleted successfully', deletedToken));
  } catch (error) {
    res.status(500).json(ResponseHelper.error(500, 'Failed to delete token', error.message));
  }
};

exports.getTokenById = async (req, res, next) => {
  try {
    const token = await Token.findById(req.params.id);
    if (!token) {
      return res.status(404).json(ResponseHelper.error(404, 'Token not found'));
    }
    res.json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, token));
  } catch (error) {
    res.status(500).json(ResponseHelper.error(500, 'Failed to get token', error.message));
  }
};

exports.getAllTokens = async (req, res, next) => {
  try {
    const tokens = await Token.find();
    res.json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, tokens));
  } catch (error) {
    res.status(500).json(ResponseHelper.error(500, 'Failed to get tokens', error.message));
  }
};

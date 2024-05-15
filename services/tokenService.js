/**
* File Name: tokenService.js
*/
const Token = require('../models/tokenModel');

exports.createToken = async (data) => {
  return await Token.create(data);
};

exports.updateToken = async (id, data) => {
  return await Token.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteToken = async (id) => {
  return await Token.findByIdAndDelete(id);
};

exports.getTokenById = async (id) => {
  return await Token.findById(id);
};

exports.getAllTokens = async () => {
  return await Token.find();
};

const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  tokenNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  jobNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  vehicleType: {
    type: String,
    enum: ['car', 'bus', 'truck'], 
    required: true,
  },
  vehicleNumber: {
    type: String
  },
  userMobileNumber: {
    type: String,
  },
  status:{
    type: String,
    enum: ['pending','inProcess', 'done'],
    default: 'pending'
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;

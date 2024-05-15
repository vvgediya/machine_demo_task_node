const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['active','inActive'],
    default: 'active'
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

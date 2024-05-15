const mongoose = require("mongoose");

const iotDataSchema = new mongoose.Schema({
  D1: Number,
  D2: Number,
  D3: Number,
  D4: String,
  D5: String,
  D6: String,
  D7: String,
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

const IotData = mongoose.model("IotData", iotDataSchema);

module.exports = IotData;

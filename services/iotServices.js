const IotData = require('../models/IotDataModel');

exports.getAllIoTData = async () => {
  try {
    const iotData = await IotData.find().sort({ createdAt: -1 }).limit(100);
    return iotData;
  } catch (error) {
    throw new Error('Failed to get IoT data');
  }
};

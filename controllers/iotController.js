const iotService = require('../services/iotServices');
const MSG = require('../utils/MSG');
const ResponseHelper = require('../utils/responseHelper');

exports.getAllIoTData = async (req, res, next) => {
  try {
    // Retrieve all IoT data using the service function
    const iotData = await iotService.getAllIoTData();

    // Respond with the array of IoT data
    res.json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, iotData));
  } catch (error) {
    // Handle errors
    next(error);
  }
};

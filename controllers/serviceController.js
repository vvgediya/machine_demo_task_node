const Service = require('../services/serviceServices');
const ResponseHelper = require('../utils/responseHelper');

exports.createService = async (req, res, next) => {
  try {
    const service = await Service.createService(req.body);
    res.status(201).json(ResponseHelper.success(201, 'Service created successfully', service));
  } catch (error) {
    res.status(500).json(ResponseHelper.error(500, 'Failed to create service', error.message));
  }
};

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.getAllServices();
    res.json(ResponseHelper.success(200, 'Services retrieved successfully', services));
  } catch (error) {
    res.status(500).json(ResponseHelper.error(500, 'Failed to retrieve services', error.message));
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.getServiceById(req.params.id);
    if (!service) {
      return res.status(404).json(ResponseHelper.error(404, 'Service not found'));
    }
    res.json(ResponseHelper.success(200, 'Service retrieved successfully', service));
  } catch (error) {
    res.status(500).json(ResponseHelper.error(500, 'Failed to retrieve service', error.message));
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.updateService(req.params.id, req.body);
    res.json(ResponseHelper.success(200, 'Service updated successfully', service));
  } catch (error) {
    res.status(500).json(ResponseHelper.error(500, 'Failed to update service', error.message));
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    await Service.deleteService(req.params.id);
    res.json(ResponseHelper.success(200, 'Service deleted successfully'));
  } catch (error) {
    res.status(500).json(ResponseHelper.error(500, 'Failed to delete service', error.message));
  }
};

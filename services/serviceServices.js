const Service = require('../models/serviceModel');

exports.createService = async (data) => {
  return await Service.create(data);
};

exports.getAllServices = async () => {
  return await Service.find();
};

exports.getServiceById = async (id) => {
  return await Service.findById(id);
};

exports.updateService = async (id, data) => {
  return await Service.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteService = async (id) => {
  await Service.findByIdAndDelete(id);
};

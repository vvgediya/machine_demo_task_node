// permissionMiddleware.js

const MSG = require("../utils/MSG");
const checkPermission = require("../utils/rbacHelper");
const ResponseHelper = require("../utils/responseHelper");

const permissionMiddleware = (permission) => {
  return (req, res, next) => {
    // Assuming user's role is stored in req.user.role
    const userRole = req.user.role;

    // Check if user has the required permission based on their role
    if (!checkPermission(userRole, permission)) {
      return res.status(403).json(ResponseHelper.error(403, MSG.NOT_PERMISSION_TO_ACCESS,));
    }
    next();
  };
};

module.exports = permissionMiddleware;

// rbacHelper.js
 
const roles = {
  admin: {
    permissions: ['get_users','get_user','create_user','update_user','delete_user']
  },
  editor: {
    permissions: []
  },
  user: {
    permissions: []
  }
};

  const checkPermission = (role, permission) => {
    const rolePermissions = roles[role]?.permissions;
    return rolePermissions ? rolePermissions.includes(permission) : false;
  };

  module.exports = checkPermission ;

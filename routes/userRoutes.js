/**
* File Name: userRoutes.js
*/
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');

router.get('/', authMiddleware, permissionMiddleware('get_users'), userController.getAllUsers);
router.get('/:userId', authMiddleware, permissionMiddleware('get_user'), userController.getUserById);
router.post('/', authMiddleware, permissionMiddleware('create_user'), userController.createUser);
router.put('/:userId', authMiddleware, permissionMiddleware('update_user'), userController.updateUserById);
router.delete('/:userId', authMiddleware, permissionMiddleware('delete_user'), userController.deleteUserById);

module.exports = router;

/**
* File Name: authRoutes.js
*/
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');

router.post('/login',authController.login);
router.post('/register', authController.register);
router.get('/profile', authMiddleware, authController.getProfile);
router.get('/users', authMiddleware,permissionMiddleware('get_users'), authController.getAllUsers);
module.exports = router;
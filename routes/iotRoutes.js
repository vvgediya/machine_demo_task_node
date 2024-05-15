const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const iotController = require('../controllers/iotController');

router.get('/', authMiddleware, iotController.getAllIoTData);

module.exports = router;

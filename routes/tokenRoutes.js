/**
* File Name: tokenRoutes.js
*/
const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, tokenController.createToken);
router.put('/:id', authMiddleware, tokenController.updateToken);
router.delete('/:id', authMiddleware, tokenController.deleteToken);
router.get('/:id', authMiddleware, tokenController.getTokenById);
router.get('/', authMiddleware, tokenController.getAllTokens);

module.exports = router;

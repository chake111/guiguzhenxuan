const express = require('express');
const router = express.Router();
const trademarkController = require('../../controllers/product/trademarkController');
const authMiddleware = require('../../middleware/auth');

// 品牌管理路由
router.get('/:page/:limit', authMiddleware, trademarkController.getTrademarks);
router.post('/save', authMiddleware, trademarkController.addTrademark);
router.put('/update', authMiddleware, trademarkController.updateTrademark);
router.delete('/remove/:id', authMiddleware, trademarkController.deleteTrademark);
router.get('/list', authMiddleware, trademarkController.getAllTrademarks);

module.exports = router;

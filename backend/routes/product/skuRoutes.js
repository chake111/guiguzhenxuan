const express = require('express');
const router = express.Router();
const skuController = require('../../controllers/product/skuController');
const authMiddleware = require('../../middleware/auth');

// SKU管理路由
router.get('/list/:page/:limit', authMiddleware, skuController.getSkuList);
router.get('/onSale/:skuId', authMiddleware, skuController.onSale);
router.get('/cancelSale/:skuId', authMiddleware, skuController.cancelSale);
router.get('/getSkuInfo/:skuId', authMiddleware, skuController.getSkuInfo);
router.post('/saveSkuInfo', authMiddleware, skuController.saveSkuInfo);
router.delete('/deleteSku/:skuId', authMiddleware, skuController.deleteSku);
router.get('/findBySpuId/:spuId', authMiddleware, skuController.findBySpuId);

module.exports = router;

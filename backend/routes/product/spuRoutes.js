const express = require('express');
const router = express.Router();
const spuController = require('../../controllers/product/spuController');
const authMiddleware = require('../../middleware/auth');

// SPU管理路由
router.get('/:page/:limit', authMiddleware, spuController.getSpuList);
router.get('/spuImageList/:spuId', authMiddleware, spuController.getSpuImageList);
router.get('/spuSaleAttrList/:spuId', authMiddleware, spuController.getSpuSaleAttrList);
router.get('/baseSaleAttrList', authMiddleware, spuController.getBaseSaleAttrList);
router.post('/saveSpuInfo', authMiddleware, spuController.saveSpuInfo);
router.post('/updateSpuInfo', authMiddleware, spuController.updateSpuInfo);
router.delete('/deleteSpu/:spuId', authMiddleware, spuController.deleteSpu);

module.exports = router;

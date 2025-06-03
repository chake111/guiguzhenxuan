const express = require('express');
const router = express.Router();
const attrController = require('../../controllers/product/attrController');
const authMiddleware = require('../../middleware/auth');

// 分类管理路由
router.get('/getCategory1', authMiddleware, attrController.getCategory1);
router.get('/getCategory2/:category1Id', authMiddleware, attrController.getCategory2);
router.get('/getCategory3/:category2Id', authMiddleware, attrController.getCategory3);

// 属性管理路由
router.get('/attrInfoList/:category1Id/:category2Id/:category3Id', authMiddleware, attrController.getAttrList);
router.post('/saveAttrInfo', authMiddleware, attrController.saveAttrInfo);
router.delete('/deleteAttr/:attrId', authMiddleware, attrController.deleteAttr);

module.exports = router;
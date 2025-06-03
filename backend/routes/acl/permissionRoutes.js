const express = require('express');
const router = express.Router();
const permissionController = require('../../controllers/acl/permissionController');
const authMiddleware = require('../../middleware/auth');

// 权限管理路由
router.get('/', authMiddleware, permissionController.getAllPermissions);
router.post('/save', authMiddleware, permissionController.addPermission);
router.put('/update', authMiddleware, permissionController.updatePermission);
router.delete('/remove/:id', authMiddleware, permissionController.deletePermission);

module.exports = router;

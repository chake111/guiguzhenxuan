const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/acl/roleController');
const authMiddleware = require('../../middleware/auth');

// 角色管理路由
router.get('/:page/:limit', authMiddleware, roleController.getAllRoles);
router.post('/save', authMiddleware, roleController.addOrUpdateRole);
router.put('/update', authMiddleware, roleController.addOrUpdateRole);
router.get('/toAssign/:id', authMiddleware, roleController.getRolePermissions);
router.post('/doAssign', authMiddleware, roleController.assignPermissions);
router.delete('/remove/:id', authMiddleware, roleController.deleteRole);

module.exports = router;

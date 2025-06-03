const express = require('express');
const router = express.Router();
const userController = require('../../controllers/acl/userController');
const authMiddleware = require('../../middleware/auth');

// 登录和注册路由（无需认证）
router.post('/login', userController.login);
router.post('/register', userController.register);

// 需要认证的路由
router.get('/info', authMiddleware, userController.getUserInfo);
router.get('/logout', authMiddleware, userController.logout);

// 用户管理路由
router.get('/:page/:limit/:username', authMiddleware, userController.getAllUsers);
router.post('/save', authMiddleware, userController.addUser);
router.put('/update', authMiddleware, userController.updateUser);
router.get('/toAssign/:id', authMiddleware, userController.getUserRoles);
router.post('/doAssignRole', authMiddleware, userController.assignRole);
router.delete('/remove/:id', authMiddleware, userController.deleteUser);
router.delete('/batchRemove', authMiddleware, userController.batchDeleteUsers);

module.exports = router;

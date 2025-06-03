const Permission = require('../../models/acl/permission');

// 获取所有权限菜单
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().sort({ id: 1 });

    // 构建权限树
    const permissionTree = buildPermissionTree(permissions);

    res.json({
      code: 200,
      message: '获取权限菜单成功',
      ok: true,
      data: permissionTree
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取权限菜单失败',
      ok: false,
      data: null
    });
  }
};

// 添加权限
exports.addPermission = async (req, res) => {
  try {
    const { pid, name, code, level } = req.body;

    const newPermission = new Permission({
      pid,
      name,
      code,
      level
    });

    await newPermission.save();

    res.status(201).json({
      code: 200,
      message: '新增权限菜单成功',
      ok: true,
      data: newPermission
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '新增权限菜单失败',
      ok: false,
      data: null
    });
  }
};

// 更新权限
exports.updatePermission = async (req, res) => {
  try {
    const { id, name, code } = req.body;

    const permission = await Permission.findById(id);
    if (!permission) {
      return res.status(404).json({
        code: 404,
        message: '权限不存在',
        ok: false,
        data: null
      });
    }

    permission.name = name;
    permission.code = code;

    await permission.save();

    res.json({
      code: 200,
      message: '更新权限菜单成功',
      ok: true,
      data: permission
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '更新权限菜单失败',
      ok: false,
      data: null
    });
  }
};

// 删除权限
exports.deletePermission = async (req, res) => {
  try {
    const permissionId = req.params.id;

    // 查找权限
    const permission = await Permission.findById(permissionId);
    if (!permission) {
      return res.status(404).json({
        code: 404,
        message: '权限不存在',
        ok: false,
        data: null
      });
    }

    // 递归删除子权限
    await deletePermissionAndChildren(permissionId);

    res.json({
      code: 200,
      message: '删除权限菜单成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '删除权限菜单失败',
      ok: false,
      data: null
    });
  }
};

// 辅助函数：构建权限树
function buildPermissionTree(permissions, parentId = 0) {
  const tree = [];

  for (const permission of permissions) {
    if (permission.pid === parentId) {
      const children = buildPermissionTree(permissions, permission.id);
      if (children.length) {
        permission.children = children;
      }
      tree.push(permission);
    }
  }

  return tree;
}

// 辅助函数：递归删除权限及其子权限
async function deletePermissionAndChildren(permissionId) {
  // 查找所有子权限
  const permission = await Permission.findById(permissionId);
  if (!permission) return;

  const childPermissions = await Permission.find({ pid: permission.id });

  // 递归删除子权限
  for (const child of childPermissions) {
    await deletePermissionAndChildren(child._id);
  }

  // 删除当前权限
  await Permission.findByIdAndDelete(permissionId);
}

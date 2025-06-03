const Role = require('../../models/acl/role');
const Permission = require('../../models/acl/permission');

// 获取角色列表（分页）
exports.getAllRoles = async (req, res) => {
  try {
    const { page, limit } = req.params;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // 获取查询参数
    const roleName = req.query.roleName || '';

    // 构建查询条件
    const query = {};
    if (roleName && roleName !== 'undefined') {
      query.roleName = { $regex: roleName, $options: 'i' };
    }

    // 计算总数
    const total = await Role.countDocuments(query);

    // 查询角色
    const roles = await Role.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createTime: -1 });

    res.json({
      code: 200,
      message: '获取角色列表成功',
      ok: true,
      data: {
        records: roles,
        total,
        size: limitNum,
        current: pageNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      ok: false,
      data: null
    });
  }
};

// 添加或更新角色
exports.addOrUpdateRole = async (req, res) => {
  try {
    const { id, roleName, remark } = req.body;

    if (id) {
      // 更新角色
      const role = await Role.findById(id);
      if (!role) {
        return res.status(404).json({
          code: 404,
          message: '角色不存在',
          ok: false,
          data: null
        });
      }

      role.roleName = roleName;
      role.remark = remark;

      await role.save();

      res.json({
        code: 200,
        message: '更新角色成功',
        ok: true,
        data: role
      });
    } else {
      // 添加角色
      const newRole = new Role({
        roleName,
        remark
      });

      await newRole.save();

      res.status(201).json({
        code: 200,
        message: '新增角色成功',
        ok: true,
        data: newRole
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '操作失败',
      ok: false,
      data: null
    });
  }
};

// 获取角色的权限菜单
exports.getRolePermissions = async (req, res) => {
  try {
    const roleId = req.params.id;

    // 获取所有权限
    const allPermissions = await Permission.find().sort({ id: 1 });

    // 构建权限树
    const permissionTree = buildPermissionTree(allPermissions);

    // 获取角色已分配的权限
    const role = await Role.findById(roleId).populate('permissions');
    if (!role) {
      return res.status(404).json({
        code: 404,
        message: '角色不存在',
        ok: false,
        data: null
      });
    }

    const assignedPermissionIds = role.permissions.map(p => p._id.toString());

    // 标记已选中的权限
    markSelectedPermissions(permissionTree, assignedPermissionIds);

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

// 为角色分配权限
exports.assignPermissions = async (req, res) => {
  try {
    const roleId = req.query.roleId;
    const permissionIds = req.body;

    // 查找角色
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({
        code: 404,
        message: '角色不存在',
        ok: false,
        data: null
      });
    }

    // 更新角色权限
    role.permissions = permissionIds;
    await role.save();

    res.json({
      code: 200,
      message: '分配权限成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '分配权限失败',
      ok: false,
      data: null
    });
  }
};

// 删除角色
exports.deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    // 查找并删除角色
    const role = await Role.findByIdAndDelete(roleId);
    if (!role) {
      return res.status(404).json({
        code: 404,
        message: '角色不存在',
        ok: false,
        data: null
      });
    }

    res.json({
      code: 200,
      message: '删除角色成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '删除角色失败',
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

// 辅助函数：标记已选中的权限
function markSelectedPermissions(tree, selectedIds) {
  for (const node of tree) {
    node.select = selectedIds.includes(node._id.toString());

    if (node.children && node.children.length) {
      markSelectedPermissions(node.children, selectedIds);
    }
  }
}

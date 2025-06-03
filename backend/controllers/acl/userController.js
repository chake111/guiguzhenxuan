const User = require('../../models/acl/user');
const Role = require('../../models/acl/role');
const jwt = require('jsonwebtoken');

// 登录
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        code: 201,
        message: '用户名或密码错误',
        ok: false,
        data: null
      });
    }

    // 验证密码
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        code: 201,
        message: '用户名或密码错误',
        ok: false,
        data: null
      });
    }

    // 生成token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.json({
      code: 200,
      message: '登录成功',
      ok: true,
      data: token
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

// 获取用户信息
exports.getUserInfo = async (req, res, next) => {
  try {
    // 不使用populate，直接查询用户
    const user = await User.findById(req.userData.id);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        ok: false,
        data: null
      });
    }

    // 使用roleName字段
    const roleName = user.roleName;

    // 根据角色名称返回相应的权限
    let routes = [];
    let buttons = [];

    // 在 getUserInfo 方法中，修改 routes 的返回格式
    if (roleName === '超级管理员') {
    routes = ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'];
    } else if (roleName === '普通用户') {
      routes = ['Product', 'Trademark'];
      buttons = ['btn.Trademark.add'];
    }

    // 返回用户信息和权限
    return res.status(200).json({
      code: 200,
      message: '获取用户信息成功',
      ok: true,
      data: {
        name: user.name,
        avatar: user.avatar,
        buttons,
        routes
      }
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return res.status(500).json({
      code: 500,
      message: '获取用户信息失败',
      ok: false,
      data: null
    });
  }
};

// 退出登录
exports.logout = (req, res) => {
  res.json({
    code: 200,
    message: '退出成功',
    ok: true,
    data: null
  });
};

// 获取所有用户（分页）
exports.getAllUsers = async (req, res) => {
  try {
    const { page, limit, username } = req.params;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // 构建查询条件
    const query = {};
    if (username && username !== 'undefined') {
      query.username = { $regex: username, $options: 'i' };
    }

    // 计算总数
    const total = await User.countDocuments(query);

    // 查询用户
    const users = await User.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .select('-password')
      .sort({ createTime: -1 });

    res.json({
      code: 200,
      message: '获取用户列表成功',
      ok: true,
      data: {
        records: users,
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

// 添加用户
exports.addUser = async (req, res) => {
  try {
    const { username, password, name, phone } = req.body;

    // 检查必填项
    if (!username || !password || !name) {
      return res.status(400).json({
        code: 400,
        message: '用户名、密码和姓名为必填项',
        ok: false,
        data: null
      });
    }

    // 检查用户名是否存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: '用户名已存在',
        ok: false,
        data: null
      });
    }

    // 创建新用户
    const newUser = new User({
      username,
      password,
      name,
      phone: phone || ''
    });

    await newUser.save();

    // 返回用户信息（不包含密码）
    const userData = newUser.toObject();
    delete userData.password;

    res.status(201).json({
      code: 200,
      message: '新增用户成功',
      ok: true,
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '新增用户失败',
      ok: false,
      data: null
    });
  }
};

// 更新用户
exports.updateUser = async (req, res) => {
  try {
    const { id, username, name, phone } = req.body;

    // 查找用户
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        ok: false,
        data: null
      });
    }

    // 检查用户名是否已被其他用户使用
    if (username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          code: 400,
          message: '用户名已存在',
          ok: false,
          data: null
        });
      }
    }

    // 更新用户信息
    user.username = username;
    user.name = name;
    user.phone = phone;

    await user.save();

    // 返回更新后的用户信息
    const userData = user.toObject();
    delete userData.password;

    res.json({
      code: 200,
      message: '更新用户成功',
      ok: true,
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '更新用户失败',
      ok: false,
      data: null
    });
  }
};

// 获取用户可分配的角色
exports.getUserRoles = async (req, res) => {
  try {
    const userId = req.params.id;

    // 获取所有角色
    const allRoles = await Role.find();

    // 获取用户已分配的角色
    const user = await User.findById(userId).populate('roles');
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        ok: false,
        data: null
      });
    }

    const assignedRoles = user.roles || [];

    res.json({
      code: 200,
      message: '获取角色列表成功',
      ok: true,
      data: {
        assignRoles: assignedRoles,
        allRolesList: allRoles
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取角色列表失败',
      ok: false,
      data: null
    });
  }
};

// 为用户分配角色
exports.assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    // 查找用户
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        ok: false,
        data: null
      });
    }

    // 清空现有角色并分配新角色
    user.roles = [];

    if (roleId) {
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

      user.roles.push(roleId);
      user.roleName = role.roleName;
    } else {
      user.roleName = '';
    }

    await user.save();

    res.json({
      code: 200,
      message: '分配角色成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '分配角色失败',
      ok: false,
      data: null
    });
  }
};

// 删除用户
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // 超级管理员不能删除
    if (userId === '1') {
      return res.status(400).json({
        code: 400,
        message: '不能删除超级管理员',
        ok: false,
        data: null
      });
    }

    // 查找并删除用户
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        ok: false,
        data: null
      });
    }

    res.json({
      code: 200,
      message: '删除用户成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '删除用户失败',
      ok: false,
      data: null
    });
  }
};

// 批量删除用户
exports.batchDeleteUsers = async (req, res) => {
  try {
    const idList = req.body;

    // 过滤掉超级管理员
    const filteredIds = idList.filter(id => id !== '1');

    // 批量删除用户
    const result = await User.deleteMany({ _id: { $in: filteredIds } });

    res.json({
      code: 200,
      message: `成功删除${result.deletedCount}个用户`,
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '批量删除失败',
      ok: false,
      data: null
    });
  }
};

// 注册用户
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('注册请求数据:', { username, password: '***' });

    // 检查必填项
    if (!username || !password) {
      console.log('缺少必填项');
      return res.status(400).json({
        code: 400,
        message: '用户名和密码为必填项',
        ok: false,
        data: null
      });
    }

    // 检查用户名是否存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: '用户名已存在',
        ok: false,
        data: null
      });
    }

    // 查找普通用户角色
    const normalRole = await Role.findOne({ roleName: '普通用户' });

    // 创建新用户
    const newUser = new User({
      username,
      password,
      name: username,
      phone: '',
      roleName: '普通用户',
      roles: normalRole ? [normalRole._id] : []
    });

    await newUser.save();

    // 生成token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      code: 200,
      message: '注册成功',
      ok: true,
      data: token
    });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({
      code: 500,
      message: '注册失败: ' + error.message,
      ok: false,
      data: null
    });
  }
};

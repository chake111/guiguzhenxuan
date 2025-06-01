import { mock } from 'node:test';
import { MockMethod } from 'vite-plugin-mock';

// 模拟用户数据
const users = [
  {
    id: 1,
    username: 'admin',
    password: '111111',
    name: '超级管理员',
    phone: '13800138000',
    roleName: '超级管理员',
    createTime: '2023-01-01 00:00:00',
    updateTime: '2023-01-01 00:00:00'
  },
  {
    id: 2,
    username: 'test111',
    password: '123456',
    name: '测试用户',
    phone: '13800138001',
    roleName: '普通用户',
    createTime: '2023-01-02 00:00:00',
    updateTime: '2023-01-02 00:00:00'
  }
];

// 模拟角色数据
const roles = [
  { id: 1, roleName: '超级管理员', remark: '拥有所有权限', createTime: '2023-01-01', updateTime: '2023-01-01' },
  { id: 2, roleName: '普通用户', remark: '基础权限', createTime: '2023-01-01', updateTime: '2023-01-01' }
];

export default [
  // 登录接口
  {
    url: '/admin/acl/index/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        return {
          code: 200,
          message: '登录成功',
          ok: true,
          data: 'mock-token-' + user.id
        };
      }
      return {
        code: 201,
        message: '用户名或密码错误',
        ok: false,
        data: null
      };
    }
  },

  // 获取用户信息接口
  {
    url: '/admin/acl/index/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取用户信息成功',
        ok: true,
        data: {
          routes: ['Product', 'Acl', 'User', 'Role', 'Permission'],
          buttons: ['cuser', 'uuser', 'duser'],
          roles: ['超级管理员'],
          name: '超级管理员',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        }
      };
    }
  },

  // 退出登录接口
  {
    url: '/admin/acl/index/logout',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '退出成功',
        ok: true,
        data: null
      };
    }
  },

  // 获取用户列表接口
  {
    url: /\/admin\/acl\/user\/(\d+)\/(\d+)\/(.*)/,
    method: 'get',
    response: ({ url }) => {
      const match = url.match(/\/admin\/acl\/user\/(\d+)\/(\d+)\/(.*)/);;
      const page = Number(match[1]);
      const limit = Number(match[2]);
      const username = match[3];

      let filteredUsers = users;
      if (username && username !== 'undefined') {
        filteredUsers = users.filter(user => user.username.includes(username));
      }

      const total = filteredUsers.length;
      const start = (page - 1) * limit;
      const records = filteredUsers.slice(start, start + limit);

      return {
        code: 200,
        message: '获取用户列表成功',
        ok: true,
        data: {
          records,
          total,
          size: limit,
          current: page,
          pages: Math.ceil(total / limit)
        }
      };
    }
  },

  // 新增用户接口
  {
    url: '/admin/acl/user/',
    method: 'post',
    response: ({ body }) => {
      const newUser = {
        id: users.length + 1,
        username: body.username,
        password: body.password,
        name: body.name,
        phone: body.phone,
        roleName: '',
        createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
        updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      users.push(newUser);
      return {
        code: 200,
        message: '新增用户成功',
        ok: true,
        data: newUser
      };
    }
  },

  // 更新用户接口
  {
    url: '/admin/acl/user/update',
    method: 'put',
    response: ({ body }) => {
      const index = users.findIndex(user => user.id === body.id);
      if (index > -1) {
        users[index] = { ...users[index], ...body, updateTime: new Date().toISOString() };
        return {
          code: 200,
          message: '更新用户成功',
          ok: true,
          data: users[index]
        };
      }
      return {
        code: 404,
        message: '用户不存在',
        ok: false,
        data: null
      };
    }
  },

  // 获取用户角色接口
  {
    url: /\/admin\/acl\/user\/toAssign\/(\d+)/,
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取角色列表成功',
        ok: true,
        data: {
          assignRoles: [roles[0]],
          allRolesList: roles
        }
      };
    }
  },

  // 分配用户角色接口
  {
    url: '/admin/acl/user/doAssignRole/',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '分配角色成功',
        ok: true,
        data: null
      };
    }
  },

  // 删除用户接口
  {
    url: /\/admin\/acl\/user\/remove\/(\d+)/,
    method: 'delete',
    response: ({ url }) => {
      const id = Number(url.split('/').pop());
      const index = users.findIndex(user => user.id === id);
      if (index > -1) {
        users.splice(index, 1);
        return {
          code: 200,
          message: '删除用户成功',
          ok: true,
          data: null
        };
      }
      return {
        code: 404,
        message: '用户不存在',
        ok: false,
        data: null
      };
    }
  },

  // 批量删除用户接口
  {
    url: '/admin/acl/user/batchRemove/',
    method: 'delete',
    response: ({ body }) => {
      const idList = body;
      idList.forEach(id => {
        const index = users.findIndex(user => user.id === id);
        if (index > -1) {
          users.splice(index, 1);
        }
      });
      return {
        code: 200,
        message: '批量删除成功',
        ok: true,
        data: null
      };
    }
  }
] as MockMethod[];

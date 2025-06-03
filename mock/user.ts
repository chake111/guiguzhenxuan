import { MockMethod } from 'vite-plugin-mock';
import { reactive } from 'vue';
import { roles as roles1 } from './role';

const users = reactive([
  {
    id: 1,
    username: 'admin',
    password: '111111',
    name: 'chake1',
    phone: '13800138000',
    roleName: '超级管理员',
    createTime: '2023-01-01 00:00:00',
    updateTime: '2023-01-01 00:00:00'
  },
  {
    id: 2,
    username: 'test111',
    password: '123456',
    name: '张小明',
    phone: '13800138001',
    roleName: '普通用户',
    createTime: '2023-01-02 00:00:00',
    updateTime: '2023-01-02 00:00:00'
  },
  {
    id: 3,
    username: 'operator',
    password: '123456',
    name: '李君颖',
    phone: '13800138002',
    roleName: '运营人员',
    createTime: '2023-01-03 00:00:00',
    updateTime: '2023-01-03 00:00:00'
  },
  {
    id: 4,
    username: 'developer',
    password: '123456',
    name: '武独秀',
    phone: '13800138003',
    roleName: '开发人员',
    createTime: '2023-01-04 00:00:00',
    updateTime: '2023-01-04 00:00:00'
  }
]);

const userRoles = reactive(new Map<number, number>());

userRoles.set(1, 1);
userRoles.set(2, 2);
userRoles.set(3, 3);
userRoles.set(4, 6);

const roles = roles1;

export default [
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

  {
    url: '/admin/acl/index/info',
    method: 'get',
    response: ({ headers }) => {
      const token = headers.token || headers.authorization;

      if (!token) {
        return {
          code: 401,
          message: '未登录',
          ok: false,
          data: null
        };
      }

      const userId = token.replace('mock-token-', '');
      const user = users.find(u => u.id === Number(userId));

      if (!user) {
        return {
          code: 401,
          message: 'token无效',
          ok: false,
          data: null
        };
      }

      const userRoleId = userRoles.get(user.id);
      const userRole = roles.find(r => r.id === userRoleId);

      let routes = [];
      let buttons = [];

      switch (userRole?.roleName) {
        case '超级管理员':
          routes = [
            'Product', 'Trademark', 'Attr', 'Spu', 'Sku',
            'Acl', 'User', 'Role', 'Permission'
          ];
          buttons = ['cuser', 'uuser', 'duser', 'crole', 'urole', 'drole'];
          break;
        case '开发人员':
          routes = ['Product', 'Acl'];
          buttons = ['cuser', 'uuser'];
          break;
        case '运营人员':
          routes = ['Product'];
          buttons = ['cuser'];
          break;
        case '普通用户':
          routes = ['Product'];
          buttons = [];
          break;
        default:
          routes = [];
          buttons = [];
      }

      return {
        code: 200,
        message: '获取用户信息成功',
        ok: true,
        data: {
          routes,
          buttons,
          roles: [userRole?.roleName || ''],
          name: user.name,
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        }
      };
    }
  },

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
  {
    url: '/admin/acl/user/save',
    method: 'post',
    response: ({ body }) => {
      try {
        if (!body.username || !body.password || !body.name) {
          return {
            code: 400,
            message: '用户名、密码和姓名为必填项',
            ok: false,
            data: null
          };
        }

        const existingUser = users.find(u => u.username === body.username);
        if (existingUser) {
          return {
            code: 400,
            message: '用户名已存在',
            ok: false,
            data: null
          };
        }

        const newUser = {
          id: Math.max(...users.map(u => u.id)) + 1,
          username: body.username,
          password: body.password,
          name: body.name,
          phone: body.phone || '',
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
      } catch (error) {
        return {
          code: 500,
          message: '新增用户失败',
          ok: false,
          data: null
        };
      }
    }
  },

  {
    url: '/admin/acl/user/update',
    method: 'put',
    response: ({ body }) => {
      try {
        const index = users.findIndex(user => user.id === body.id);
        if (index === -1) {
          return {
            code: 404,
            message: '用户不存在',
            ok: false,
            data: null
          };
        }

        const existingUser = users.find(u => u.username === body.username && u.id !== body.id);
        if (existingUser) {
          return {
            code: 400,
            message: '用户名已存在',
            ok: false,
            data: null
          };
        }

        const updatedUser = {
          ...users[index],
          username: body.username,
          name: body.name,
          phone: body.phone,
          updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };

        users[index] = updatedUser;

        return {
          code: 200,
          message: '更新用户成功',
          ok: true,
          data: updatedUser
        };
      } catch (error) {
        return {
          code: 500,
          message: '更新用户失败',
          ok: false,
          data: null
        };
      }
    }
  },

  {
    url: /\/admin\/acl\/user\/toAssign\/(\d+)/,
    method: 'get',
    response: ({ url }) => {
      const match = url.match(/\/admin\/acl\/user\/toAssign\/(\d+)/);
      if (!match) {
        return {
          code: 400,
          message: '请求参数错误',
          ok: false,
          data: null
        };
      }

      const userId = Number(match[1]);
      const assignedRoleId = userRoles.get(userId);
      const assignedRoles = assignedRoleId ? roles.filter(role => role.id === assignedRoleId) : [];

      return {
        code: 200,
        message: '获取角色列表成功',
        ok: true,
        data: {
          assignRoles: assignedRoles,
          allRolesList: roles
        }
      };
    }
  },

  {
    url: '/admin/acl/user/doAssignRole/',
    method: 'post',
    response: ({ body }) => {
      try {
        const { userId, roleId } = body;

        if (!userId) {
          return {
            code: 400,
            message: '用户ID不能为空',
            ok: false,
            data: null
          };
        }

        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
          return {
            code: 404,
            message: '用户不存在',
            ok: false,
            data: null
          };
        }

        if (roleId) {
          userRoles.set(userId, roleId);
          const assignedRole = roles.find(role => role.id === roleId);
          if (assignedRole) {
            users[userIndex].roleName = assignedRole.roleName;
          }
        } else {
          userRoles.delete(userId);
          users[userIndex].roleName = '';
        }

        users[userIndex].updateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);

        return {
          code: 200,
          message: '分配角色成功',
          ok: true,
          data: null
        };
      } catch (error) {
        return {
          code: 500,
          message: '分配角色失败',
          ok: false,
          data: null
        };
      }
    }
  },

  {
    url: '/admin/acl/user/batchRemove/',
    method: 'delete',
    response: ({ body }) => {
      try {
        const idList = Array.isArray(body) ? body : [body];
        let deletedCount = 0;

        const filteredIds = idList.filter(id => id !== 1);

        filteredIds.forEach(id => {
          const index = users.findIndex(user => user.id === id);
          if (index > -1) {
            users.splice(index, 1);
            userRoles.delete(id);
            deletedCount++;
          }
        });

        return {
          code: 200,
          message: `成功删除${deletedCount}个用户`,
          ok: true,
          data: null
        };
      } catch (error) {
        return {
          code: 500,
          message: '批量删除失败',
          ok: false,
          data: null
        };
      }
    }
  },

  {
    url: /\/admin\/acl\/user\/remove\/(\d+)/,
    method: 'delete',
    response: ({ url }) => {
      try {
        const id = Number(url.split('/').pop());

        if (id === 1) {
          return {
            code: 400,
            message: '不能删除超级管理员',
            ok: false,
            data: null
          };
        }

        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
          return {
            code: 404,
            message: '用户不存在',
            ok: false,
            data: null
          };
        }

        users.splice(index, 1);
        userRoles.delete(id);

        return {
          code: 200,
          message: '删除用户成功',
          ok: true,
          data: null
        };
      } catch (error) {
        return {
          code: 500,
          message: '删除用户失败',
          ok: false,
          data: null
        };
      }
    }
  },
  // 添加注册接口
  {
    url: '/admin/acl/index/register',
    method: 'post',
    response: ({ body }) => {
      try {
        if (!body.username || !body.password) {
          return {
            code: 400,
            message: '用户名和密码为必填项',
            ok: false,
            data: null
          };
        }

        const existingUser = users.find(u => u.username === body.username);
        if (existingUser) {
          return {
            code: 400,
            message: '用户名已存在',
            ok: false,
            data: null
          };
        }

        const newUser = {
          id: Math.max(...users.map(u => u.id)) + 1,
          username: body.username,
          password: body.password,
          name: body.username, // 可以根据需要修改
          phone: '',
          roleName: '普通用户',
          createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
          updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };

        users.push(newUser);
        userRoles.set(newUser.id, 2); // 默认分配为普通用户角色

        return {
          code: 200,
          message: '注册成功',
          ok: true,
          data: 'mock-token-' + newUser.id // 返回token，与登录保持一致
        };
      } catch (error) {
        return {
          code: 500,
          message: '注册失败',
          ok: false,
          data: null
        };
      }
    }
  }
] as MockMethod[];

import { MockMethod } from 'vite-plugin-mock';

// 模拟角色数据
const roles = [
  { id: 1, roleName: '超级管理员', remark: '拥有所有权限', createTime: '2023-01-01', updateTime: '2023-01-01' },
  { id: 2, roleName: '普通用户', remark: '基础权限', createTime: '2023-01-01', updateTime: '2023-01-01' },
  { id: 3, roleName: '运营人员', remark: '运营相关权限', createTime: '2023-01-01', updateTime: '2023-01-01' }
];

// 模拟权限菜单数据
const permissions = [
  {
    id: 1,
    pid: 0,
    name: '全部数据',
    code: 'all',
    level: 1,
    select: false,
    children: [
      {
        id: 2,
        pid: 1,
        name: '权限管理',
        code: 'Acl',
        level: 2,
        select: false,
        children: [
          { id: 3, pid: 2, name: '用户管理', code: 'User', level: 3, select: false },
          { id: 4, pid: 2, name: '角色管理', code: 'Role', level: 3, select: false },
          { id: 5, pid: 2, name: '菜单管理', code: 'Permission', level: 3, select: false }
        ]
      },
      {
        id: 6,
        pid: 1,
        name: '商品管理',
        code: 'Product',
        level: 2,
        select: false,
        children: [
          { id: 7, pid: 6, name: '品牌管理', code: 'Trademark', level: 3, select: false },
          { id: 8, pid: 6, name: '属性管理', code: 'Attr', level: 3, select: false },
          { id: 9, pid: 6, name: 'SPU管理', code: 'Spu', level: 3, select: false },
          { id: 10, pid: 6, name: 'SKU管理', code: 'Sku', level: 3, select: false }
        ]
      }
    ]
  }
];

export default [
  // 获取角色列表
  {
    url: /\/admin\/acl\/role\/(\d+)\/(\d+)\/\?roleName=(.*)/,
    method: 'get',
    response: ({ url }) => {
      const match = url.match(/\/admin\/acl\/role\/(\d+)\/(\d+)\/\?roleName=(.*)/);
      const page = Number(match[1]);
      const limit = Number(match[2]);
      const roleName = decodeURIComponent(match[3]);

      let filteredRoles = roles;
      if (roleName && roleName !== 'undefined') {
        filteredRoles = roles.filter(role => role.roleName.includes(roleName));
      }

      const total = filteredRoles.length;
      const start = (page - 1) * limit;
      const records = filteredRoles.slice(start, start + limit);

      return {
        code: 200,
        message: '获取角色列表成功',
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

  // 新增角色
  {
    url: '/admin/acl/role/save',
    method: 'post',
    response: ({ body }) => {
      const newRole = {
        id: roles.length + 1,
        ...body,
        createTime: new Date().toISOString().split('T')[0],
        updateTime: new Date().toISOString().split('T')[0]
      };
      roles.push(newRole);
      return {
        code: 200,
        message: '新增角色成功',
        ok: true,
        data: newRole
      };
    }
  },

  // 更新角色
  {
    url: '/admin/acl/role/update',
    method: 'put',
    response: ({ body }) => {
      const index = roles.findIndex(role => role.id === body.id);
      if (index > -1) {
        roles[index] = { ...roles[index], ...body, updateTime: new Date().toISOString().split('T')[0] };
        return {
          code: 200,
          message: '更新角色成功',
          ok: true,
          data: roles[index]
        };
      }
      return {
        code: 404,
        message: '角色不存在',
        ok: false,
        data: null
      };
    }
  },

  // 获取角色权限菜单
  {
    url: /\/admin\/acl\/permission\/toAssign\/(\d+)/,
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取权限菜单成功',
        ok: true,
        data: permissions
      };
    }
  },

  // 分配权限
  {
    url: /\/admin\/acl\/permission\/doAssign\/\?roleId=(\d+)&permissionId=(\d+)/,
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '分配权限成功',
        ok: true,
        data: null
      };
    }
  },

  // 删除角色
  {
    url: /\/admin\/acl\/role\/remove\/(\d+)/,
    method: 'delete',
    response: ({ url }) => {
      const id = Number(url.split('/').pop());
      const index = roles.findIndex(role => role.id === id);
      if (index > -1) {
        roles.splice(index, 1);
        return {
          code: 200,
          message: '删除角色成功',
          ok: true,
          data: null
        };
      }
      return {
        code: 404,
        message: '角色不存在',
        ok: false,
        data: null
      };
    }
  }
] as MockMethod[];

import { MockMethod } from 'vite-plugin-mock';
import { reactive } from 'vue';

// 模拟角色数据
export const roles = reactive([
  { id: 1, roleName: '超级管理员', remark: '拥有所有权限', createTime: '2023-01-01 09:15:23', updateTime: '2023-01-15 14:32:18' },
  { id: 2, roleName: '普通用户', remark: '基础权限', createTime: '2023-01-02 10:42:17', updateTime: '2023-01-18 16:28:45' },
  { id: 3, roleName: '运营人员', remark: '运营相关权限', createTime: '2023-01-03 11:28:56', updateTime: '2023-01-22 09:47:12' },
  { id: 4, roleName: 'VIP用户', remark: 'VIP用户权限', createTime: '2023-01-04 14:17:33', updateTime: '2023-01-25 11:15:27' },
  { id: 5, roleName: '测试用户', remark: '测试用户权限', createTime: '2023-01-05 16:23:41', updateTime: '2023-01-28 13:52:09' },
  { id: 6, roleName: '开发人员', remark: '开发相关权限', createTime: '2023-01-06 08:45:29', updateTime: '2023-02-01 15:38:44' },
  { id: 7, roleName: '客服人员', remark: '客服相关权限', createTime: '2023-01-07 13:56:18', updateTime: '2023-02-03 10:21:36' },
]);

// 角色权限关系存储
const rolePermissions = reactive(new Map<number, number[]>());

// 初始化默认权限分配
rolePermissions.set(1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 71, 72, 73, 74, 81, 82, 83, 84, 91, 92, 93, 94, 101, 102, 103, 104]);
rolePermissions.set(2, [2, 3, 31, 6, 7, 71, 72]);
rolePermissions.set(3, [2, 6, 7, 8, 71, 72, 73, 81, 82]);

// 模拟权限菜单数据
export const permissions = reactive([
  {
    id: 1,
    pid: 0,
    name: '全部数据',
    code: 'all',
    level: 1,
    select: false,
    updateTime: '2023-01-01 09:15:23',
    children: [
      {
        id: 2,
        pid: 1,
        name: '权限管理',
        code: 'Acl',
        level: 2,
        select: false,
        updateTime: '2023-01-01 10:27:45',
        children: [
          {
            id: 3,
            pid: 2,
            name: '用户管理',
            code: 'User',
            level: 3,
            select: false,
            updateTime: '2023-01-01 11:43:12',
            children: [
              { id: 31, pid: 3, name: '查看', code: 'btn.User.list', level: 4, select: false, updateTime: '2023-01-01 11:45:38' },
              { id: 32, pid: 3, name: '新增', code: 'btn.User.add', level: 4, select: false, updateTime: '2023-01-01 11:47:52' },
              { id: 33, pid: 3, name: '修改', code: 'btn.User.update', level: 4, select: false, updateTime: '2023-01-01 11:49:17' },
              { id: 34, pid: 3, name: '删除', code: 'btn.User.remove', level: 4, select: false, updateTime: '2023-01-01 11:51:29' },
              { id: 35, pid: 3, name: '分配角色', code: 'btn.User.assgin', level: 4, select: false, updateTime: '2023-01-01 11:53:44' }
            ]
          },
          {
            id: 4,
            pid: 2,
            name: '角色管理',
            code: 'Role',
            level: 3,
            select: false,
            updateTime: '2023-01-01 14:18:26',
            children: [
              { id: 41, pid: 4, name: '查看', code: 'btn.Role.list', level: 4, select: false, updateTime: '2023-01-01 14:20:15' },
              { id: 42, pid: 4, name: '新增', code: 'btn.Role.add', level: 4, select: false, updateTime: '2023-01-01 14:22:48' },
              { id: 43, pid: 4, name: '修改', code: 'btn.Role.update', level: 4, select: false, updateTime: '2023-01-01 14:24:33' },
              { id: 44, pid: 4, name: '删除', code: 'btn.Role.remove', level: 4, select: false, updateTime: '2023-01-01 14:26:57' },
              { id: 45, pid: 4, name: '分配权限', code: 'btn.Role.assgin', level: 4, select: false, updateTime: '2023-01-01 14:28:41' }
            ]
          },
          {
            id: 5,
            pid: 2,
            name: '菜单管理',
            code: 'Permission',
            level: 3,
            select: false,
            updateTime: '2023-01-01 16:35:19',
            children: [
              { id: 51, pid: 5, name: '查看', code: 'btn.Permission.list', level: 4, select: false, updateTime: '2023-01-01 16:37:24' },
              { id: 52, pid: 5, name: '新增', code: 'btn.Permission.add', level: 4, select: false, updateTime: '2023-01-01 16:39:58' },
              { id: 53, pid: 5, name: '修改', code: 'btn.Permission.update', level: 4, select: false, updateTime: '2023-01-01 16:41:13' },
              { id: 54, pid: 5, name: '删除', code: 'btn.Permission.remove', level: 4, select: false, updateTime: '2023-01-01 16:43:47' }
            ]
          }
        ]
      },
      {
        id: 6,
        pid: 1,
        name: '商品管理',
        code: 'Product',
        level: 2,
        select: false,
        updateTime: '2023-01-02 08:52:31',
        children: [
          {
            id: 7,
            pid: 6,
            name: '品牌管理',
            code: 'Trademark',
            level: 3,
            select: false,
            updateTime: '2023-01-02 09:17:45',
            children: [
              { id: 71, pid: 7, name: '查看', code: 'btn.Trademark.list', level: 4, select: false, updateTime: '2023-01-02 09:19:28' },
              { id: 72, pid: 7, name: '新增', code: 'btn.Trademark.add', level: 4, select: false, updateTime: '2023-01-02 09:21:53' },
              { id: 73, pid: 7, name: '修改', code: 'btn.Trademark.update', level: 4, select: false, updateTime: '2023-01-02 09:23:16' },
              { id: 74, pid: 7, name: '删除', code: 'btn.Trademark.remove', level: 4, select: false, updateTime: '2023-01-02 09:25:42' }
            ]
          },
          {
            id: 8,
            pid: 6,
            name: '属性管理',
            code: 'Attr',
            level: 3,
            select: false,
            updateTime: '2023-01-02 11:46:37',
            children: [
              { id: 81, pid: 8, name: '查看', code: 'btn.Attr.list', level: 4, select: false, updateTime: '2023-01-02 11:48:19' },
              { id: 82, pid: 8, name: '新增', code: 'btn.Attr.add', level: 4, select: false, updateTime: '2023-01-02 11:50:34' },
              { id: 83, pid: 8, name: '修改', code: 'btn.Attr.update', level: 4, select: false, updateTime: '2023-01-02 11:52:58' },
              { id: 84, pid: 8, name: '删除', code: 'btn.Attr.remove', level: 4, select: false, updateTime: '2023-01-02 11:54:21' }
            ]
          },
          {
            id: 9,
            pid: 6,
            name: 'SPU管理',
            code: 'Spu',
            level: 3,
            select: false,
            updateTime: '2023-01-02 15:23:14',
            children: [
              { id: 91, pid: 9, name: '查看', code: 'btn.Spu.list', level: 4, select: false, updateTime: '2023-01-02 15:25:47' },
              { id: 92, pid: 9, name: '新增', code: 'btn.Spu.add', level: 4, select: false, updateTime: '2023-01-02 15:27:32' },
              { id: 93, pid: 9, name: '修改', code: 'btn.Spu.update', level: 4, select: false, updateTime: '2023-01-02 15:29:18' },
              { id: 94, pid: 9, name: '删除', code: 'btn.Spu.remove', level: 4, select: false, updateTime: '2023-01-02 15:31:56' }
            ]
          },
          {
            id: 10,
            pid: 6,
            name: 'SKU管理',
            code: 'Sku',
            level: 3,
            select: false,
            updateTime: '2023-01-02 17:41:29',
            children: [
              { id: 101, pid: 10, name: '查看', code: 'btn.Sku.list', level: 4, select: false, updateTime: '2023-01-02 17:43:15' },
              { id: 102, pid: 10, name: '新增', code: 'btn.Sku.add', level: 4, select: false, updateTime: '2023-01-02 17:45:38' },
              { id: 103, pid: 10, name: '修改', code: 'btn.Sku.update', level: 4, select: false, updateTime: '2023-01-02 17:47:52' },
              { id: 104, pid: 10, name: '删除', code: 'btn.Sku.remove', level: 4, select: false, updateTime: '2023-01-02 17:49:27' }
            ]
          }
        ]
      }
    ]
  }
]);

export default [
  // 获取角色列表
  {
    url: /\/admin\/acl\/role\/(\d+)\/(\d+)/,
    method: 'get',
    response: ({ url }) => {
      const match = url.match(/\/admin\/acl\/role\/(\d+)\/(\d+)/);
      if (!match) {
        return {
          code: 400,
          message: '请求参数错误',
          ok: false,
          data: null
        };
      }

      const page = Number(match[1]);
      const limit = Number(match[2]);

      const urlObj = new URL(url, 'http://localhost');
      const roleName = urlObj.searchParams.get('roleName') || '';

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
        roleName: body.roleName,
        remark: body.remark,
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
    response: ({ url }) => {
      const match = url.match(/\/admin\/acl\/permission\/toAssign\/(\d+)/);
      if (!match) {
        return {
          code: 400,
          message: '请求参数错误',
          ok: false,
          data: null
        };
      }

      const roleId = Number(match[1]);
      const assignedPermissions = rolePermissions.get(roleId) || [];
      const permissionsWithSelect = JSON.parse(JSON.stringify(permissions));
      const setPermissionSelect = (perms: any[]) => {
        perms.forEach(perm => {
          perm.select = assignedPermissions.includes(perm.id);
          if (perm.children && perm.children.length > 0) {
            setPermissionSelect(perm.children);
          }
        });
      };

      setPermissionSelect(permissionsWithSelect);

      return {
        code: 200,
        message: '获取权限菜单成功',
        ok: true,
        data: permissionsWithSelect
      };
    }
  },

  // 分配权限
  {
    url: /\/admin\/acl\/permission\/doAssign\//,
    method: 'post',
    response: ({ url, body }) => {
      try {
        const urlObj = new URL(url, 'http://localhost');
        const roleId = Number(urlObj.searchParams.get('roleId'));
        const permissionIds = Array.isArray(body) ? body : [body];

        const roleExists = roles.some(role => role.id === roleId);
        if (!roleExists) {
          return {
            code: 404,
            message: '角色不存在',
            ok: false,
            data: null
          };
        }

        rolePermissions.set(roleId, permissionIds.map(id => Number(id)));
        return {
          code: 200,
          message: '分配权限成功',
          ok: true,
          data: null
        };
      } catch (error) {
        console.error('分配权限失败:', error);
        return {
          code: 500,
          message: '分配权限失败',
          ok: false,
          data: null
        };
      }
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
  },
  // 获取角色权限列表
  {
    url: /\/admin\/acl\/permission\/role\/(\d+)/,
    method: 'get',
    response: ({ url }) => {
      const match = url.match(/\/admin\/acl\/permission\/role\/(\d+)/);
      if (!match) {
        return {
          code: 400,
          message: '请求参数错误',
          ok: false,
          data: null
        };
      }

      const roleId = Number(match[1]);
      const assignedPermissions = rolePermissions.get(roleId) || [];

      return {
        code: 200,
        message: '获取角色权限列表成功',
        ok: true,
        data: assignedPermissions
      };
    }
  }
] as MockMethod[];

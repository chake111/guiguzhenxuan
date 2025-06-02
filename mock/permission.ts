import { MockMethod } from 'vite-plugin-mock';
import { permissions } from './role';

export default [
  // 获取权限菜单列表
  {
    url: '/admin/acl/permission',
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

  // 新增权限菜单
  {
    url: '/admin/acl/permission/save',
    method: 'post',
    response: ({ body }) => {
      const newPermission = {
        id: Date.now(),
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
        toCode: null,
        type: 1,
        status: null,
        ...body
      };

      // 简单的添加逻辑，实际应该根据pid找到父级并添加到children中
      permissions.push(newPermission);

      return {
        code: 200,
        message: '新增权限菜单成功',
        ok: true,
        data: newPermission
      };
    }
  },

  // 更新权限菜单
  {
    url: '/admin/acl/permission/update',
    method: 'put',
    response: ({ body }) => {
      return {
        code: 200,
        message: '更新权限菜单成功',
        ok: true,
        data: { ...body, updateTime: new Date().toISOString() }
      };
    }
  },

  // 删除权限菜单
  {
    url: /admin\/acl\/permission\/remove\/(\d+)/,
    method: 'delete',
    response: ({ url }) => {
      // 从URL中提取ID
      const id = parseInt(url.match(/\/remove\/(\d+)/)[1]);

      // 递归查找并删除节点的函数
      const removeNode = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          // 如果当前节点就是要删除的节点
          if (node.id === id) {
            nodes.splice(i, 1);
            return true;
          }
          // 如果当前节点有子节点，递归查找
          if (node.children && node.children.length) {
            if (removeNode(node.children)) {
              return true;
            }
          }
        }
        return false;
      };

      // 从权限树中删除节点
      removeNode(permissions);

      return {
        code: 200,
        message: '删除权限菜单成功',
        ok: true,
        data: null
      };
    }
  }
] as MockMethod[];

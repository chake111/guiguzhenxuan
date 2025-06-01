<template>
    <div>
        <el-table :data='permissionArr' style="width:100%;margin-bottom:20px" row-key='id' border>
          <el-table-column prop='name' label="权限名称" />
          <el-table-column prop='code' label="权限值" />
          <el-table-column prop='updateTime' label="修改时间" />
          <el-table-column label="操作">
            <template #default="{ row,$index }">
              <el-button size='small' type="primary" @click="" :title='row.level==3?"添加功能":"添加菜单"' icon='Menu' :disabled='row.level==4?true:false'></el-button>
              <el-button size='small' type="warning" @click="" title='编辑权限' icon='Edit' :disabled='row.level==1?true:false'></el-button>
              <el-button size='small' type="danger" @click="" title='删除权限' icon='Delete' :disabled='row.level==1?true:false'></el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang='ts'>
import { reqAllPermission } from '@/api/acl/menu';
import type { PermissionList, PermissionResponseData } from '@/api/acl/menu/type';
import { onMounted, ref } from 'vue';

let permissionArr= ref<PermissionList>();

onMounted(() => {
  getHasPermission();
});

const getHasPermission = async () => {
//  let result:PermissionResponseData =  await reqAllPermission();
//   if (result.code === 200) {
//       permissionArr.value = result.data;
//     }
  permissionArr.value = [
    { id: 1, name: '全部数据', code: 'user_manage', updateTime: '2023-10-01', level: 1 ,createTime: '2023-10-01',pid: 0,toCode: null,type: 1,status: null,select: true,children: [
      { id: 2, name: '用户管理', code: 'user_manage', updateTime: '2023-10-01', level: 2, createTime: '2023-10-01', pid: 1, toCode: null, type: 1, status: null, select: true, children: [] },
      { id: 3, name: '角色管理', code: 'role_manage', updateTime: '2023-10-01', level: 2, createTime: '2023-10-01', pid: 1, toCode: null, type: 1, status: null, select: true, children: [
        { id: 5, name: '角色权限', code: 'role_permission', updateTime: '2023-10-01', level: 3, createTime: '2023-10-01', pid: 3, toCode: null, type: 1, status: null, select: true, children: [] },
        { id: 6, name: '角色菜单', code: 'role_menu', updateTime: '2023-10-01', level: 3, createTime: '2023-10-01', pid: 3, toCode: null, type: 1, status: null, select: true, children: [] },
      ] },
      { id: 4, name: '菜单管理', code: 'menu_manage', updateTime: '2023-10-01', level: 2, createTime: '2023-10-01', pid: 1, toCode: null, type: 1, status: null, select: true, children: [] },
    ]},
  ];
}
</script>

<style lang="scss" scoped></style>

<template>
    <div>
        <el-table style="width:100%;margin-bottom:20px" row-key='id' border>
          <el-table-column prop='name' label="权限名称" />
          <el-table-column prop='code' label="权限值" />
          <el-table-column prop='updateTime' label="修改时间" />
          <el-table-column label="操作">
            <template #default="{ row,$index }">
              <el-button type="text" @click="">编辑</el-button>
              <el-button type="text" @click="">删除</el-button>
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
 let result:PermissionResponseData =  await reqAllPermission();
  if (result.code === 200) {
      permissionArr.value = result.data;
    }
}
</script>

<style lang="scss" scoped></style>

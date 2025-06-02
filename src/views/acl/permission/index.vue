<template>
  <div>
    <el-table :data='permissionArr' style="width:100%;margin-bottom:20px" row-key='id' border default-expand-all>
      <el-table-column prop='name' label="权限名称" />
      <el-table-column prop='code' label="权限值" />
      <el-table-column prop='updateTime' label="修改时间" />
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <el-button size='small' type="primary" @click="addPermission(row)" :title='row.level == 3 ? "添加功能" : "添加菜单"'
            icon='Menu' :disabled='row.level == 4 ? true : false'></el-button>
          <el-button size='small' type="warning" @click="updatePermission(row)" title='编辑权限' icon='Edit'
            :disabled='row.level == 1 ? true : false'></el-button>
          <el-popconfirm :title="`你确定要删除${row.name}吗？`" @confirm="removeMenu(row)" width="260px">
            <template #reference>
              <el-button size='small' type="danger" @click="" title='删除权限' icon='Delete'
                :disabled='row.level == 1 ? true : false'></el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="menuData.id ? '编辑菜单' : '添加菜单'">
      <template #default>
        <el-form label-width="80px" :rules="rules" ref="formRef" :model="menuData">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="menuData.name" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="权限值" prop="code">
            <el-input v-model="menuData.code" placeholder="请输入权限值"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { reqAddOrUpdateMenu, reqAllPermission, reqRemoveMenu } from '@/api/acl/menu';
import type { MenuPrams, Permission, PermissionList, PermissionResponseData } from '@/api/acl/menu/type';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref } from 'vue';

let rules = reactive({
  name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入权限值', trigger: 'blur' }],
});
let formRef = ref();
let permissionArr = ref<PermissionList>();
let dialogVisible = ref<boolean>(false);
let menuData = reactive<MenuPrams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
});

onMounted(() => {
  getHasPermission();
});

const getHasPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission();
  console.log(result.data);

  if (result.code === 200) {
    permissionArr.value = result.data;
  }
}

const addPermission = (row: Permission) => {
  nextTick(() => {
    formRef.value.clearValidate();
  });
  Object.assign(menuData, {
    id: 0,
    name: '',
    code: '',
    level: 0,
    pid: 0,
  });
  dialogVisible.value = true;
  menuData.level = row.level + 1;
  menuData.pid = row.id;
}

const updatePermission = (row: Permission) => {
  nextTick(() => {
    formRef.value.clearValidate();
  });
  formRef.value.clearValidate();
  dialogVisible.value = true;
  Object.assign(menuData, row);
}

const save = async () => {
  await formRef.value.validate();
  let result: any = await reqAddOrUpdateMenu(menuData);
  if (result.code === 200) {
    dialogVisible.value = false;
    ElMessage.success(menuData.id ? '更新成功' : '添加成功');
    getHasPermission();
  }
}

const removeMenu = async (row: Permission) => {
  let result: any = await reqRemoveMenu(row.id);
  if (result.code === 200) {
    ElMessage.success('删除成功');
    getHasPermission();
  }
}
</script>

<style lang="scss" scoped></style>

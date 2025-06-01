<template>
  <div>
    <el-card style="height: 60px; margin-bottom: 10px;">
      <el-form :inline="true" class="form">
        <el-form-item label="角色名称">
          <el-input v-model="keyword" placeholder="请输入角色名称" style="width: 230px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="!keyword">搜索</el-button>
          <el-button type="default" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-form>
        <el-form-item>
          <el-button @click="addRole" type="primary" icon="Plus">添加角色</el-button>
        </el-form-item>
        <el-form-item>
          <el-table border :data="allRole">
            <el-table-column label="#" type="index" align="center"></el-table-column>
            <el-table-column label="角色id" align="center" prop="id"></el-table-column>
            <el-table-column label="角色名称" align="center" show-overflow-tooltip prop="roleName"></el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
            <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
            <el-table-column label="操作" align="center" width="200px">
              <template #="{ row, $index }">
                <el-button type="success" icon="User" @click="setPermission(row)" size="small" title="分配权限"></el-button>
                <el-button type="primary" icon="Edit" @click="updateRole(row)" size="small" title="编辑"></el-button>
                <el-popconfirm :title="`你确定要删除${row.roleName}?`" @confirm="removeRole(row)">
                  <template #reference>
                    <el-button type="danger" icon="Delete" size="small" title="删除"></el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-pagination @current-change="getHasRole" @size-change="sizeChange" :pager-count="9"
          v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[10, 12, 14, 16]" :background="true"
          layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
      </el-form>
    </el-card>
    <el-dialog v-model="dialogVisible">
      <template #header>
        <h4>{{ RoleParams.id ? '编辑角色' : '添加角色' }}</h4>
      </template>
      <template #default>
        <el-form :model="RoleParams" :rules="rules" ref="RoleForm">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="RoleParams.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配菜单和按钮权限</h4>
      </template>
      <template #default>
        <div>
          <el-tree ref="tree" style="max-width: 600px" :data="menuArr" show-checkbox node-key="id" default-expand-all
            :default-checked-keys="selectArr" :props="defaultProps" />
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="">取消</el-button>
          <el-button type="primary" @click="handler">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang='ts'>
import { reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermission } from '@/api/acl/role';
import type { MenuList, MenuResponseData, Records, RoleResponseData } from '@/api/acl/role/type';
import type { RoleData } from '@/api/acl/user/type';
import { useLayoutSettingStore } from '@/stores/modules/types/setting';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref } from 'vue';

const defaultProps = {
  children: 'children',
  label: 'name',
}
let selectArr = ref<number[]>([]);
let settingStore = useLayoutSettingStore();
let pageNo = ref(1);
let limit = ref(10);
let total = ref(0);
let keyword = ref('');
let allRole = ref<Records>([]);
let dialogVisible = ref<boolean>(false);
let RoleParams = reactive<RoleData>({
  id: 0,
  roleName: '',
  createTime: '',
  updateTime: '',
  remark: ''
});
const validatorRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error('角色名称至少两位'));
  }
};
let rules = {
  roleName: [
    { required: true, validator: validatorRoleName, trigger: 'blur' },
  ]
};
let RoleForm = ref<any>();
let drawer = ref<boolean>(false);
let menuArr = ref<MenuList>([]);
let tree = ref<any>();

onMounted(() => {
  getHasRole();
});

const getHasRole = async (pager = 1) => {
  pageNo.value = pager;
  let result: RoleResponseData = await reqAllRoleList(pager, limit.value, keyword.value);
  if (result.code === 200) {
    allRole.value = result.data.records;
    total.value = result.data.total;
    limit.value = result.data.size;
    pageNo.value = result.data.current;
  }

};

const sizeChange = (size: number) => {
  getHasRole();
};

const search = () => {
  getHasRole(1);
  keyword.value = '';
};

const reset = () => {
  settingStore.refresh = !settingStore.refresh;
};

const addRole = () => {
  dialogVisible.value = true;
  Object.assign(RoleParams, {
    id: 0,
    roleName: '',
    createTime: '',
    updateTime: '',
    remark: ''
  });
  nextTick(() => {
    RoleForm.value.clearValidate();
  });
};

const updateRole = (row: RoleData) => {
  Object.assign(RoleParams, row);
  dialogVisible.value = true;
  nextTick(() => {
    RoleForm.value.clearValidate();
  });
};

const cancel = () => {
  dialogVisible.value = false;
}

const save = async () => {
  await RoleForm.value.validate();
  dialogVisible.value = false;
  let result: any = await reqAddOrUpdateRole(RoleParams);
  if (result.code === 200) {
    ElMessage.success(RoleParams.id ? '更新成功' : '添加成功');
    dialogVisible.value = false;
    getHasRole(RoleParams.id ? pageNo.value : 1);
  }
};

const setPermission = async (row: RoleData) => {
  drawer.value = true;
  Object.assign(RoleParams, row);
  let result: MenuResponseData = await reqAllMenuList((RoleParams.id as number));
  if (result.code === 200) {
    menuArr.value = result.data;
    selectArr.value = filterSelectedArr(menuArr.value, []);
  }
};

const filterSelectedArr = (allData: MenuList, initArr: any) => {
  allData.forEach(item => {
    if (item.select && item.level == 4) {
      initArr.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      filterSelectedArr(item.children, initArr);
    }
  });
  return initArr;
};

const handler = async () => {
  const roleId = RoleParams.id as number;
  let checkedKeys = tree.value.getCheckedKeys();
  let halfCheckedKeys = tree.value.getHalfCheckedKeys();
  let permissionId = checkedKeys.concat(halfCheckedKeys);
  let result: any = await reqSetPermission(roleId, permissionId);
  if (result.code === 200) {
    drawer.value = false;
    ElMessage.success('权限分配成功');
    window.location.reload();
  }
};

const removeRole = async (row: RoleData) => {
  let result: any = await reqRemoveRole((row.id as number));
  if (result.code === 200) {
    ElMessage.success('删除成功');
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1);
  }
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  align-items: center;
}
</style>

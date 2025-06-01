<template>
  <div>
    <el-card style="height: 60px; margin-bottom: 10px;">
      <el-form :inline="true" class="form">
        <el-form-item label="用户昵称">
          <el-input v-model="keyword" placeholder="请输入用户名" style="width: 230px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="keyword ? false : true" type="primary" @click="searchUser">搜索</el-button>
          <el-button type="default" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-form>
        <el-form-item>
          <el-button type="primary" @click="addUser" icon="Plus">添加用户</el-button>
          <el-button @click="deleteSelectUser" :disabled="selectIdArr.length >= 1 ? false : true" type="danger"
            icon="Delete">批量删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-table @selection-change="selectChange" :data="userArr" border>
            <el-table-column type="selection" label="" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="用户id" align="center" prop="id"></el-table-column>
            <el-table-column label="用户姓名" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户昵称" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="200px" align="center">
              <template #="{ row, $index }">
                <el-button type="primary" size="small" @click="setRole(row)" icon="User" title="分配角色"></el-button>
                <el-button type="warning" size="small" @click="updateUser(row)" icon="Edit" title="编辑"></el-button>
                <el-popconfirm width="260px" :title="`你确定要删除用户${row.username}`" @confirm="deleteUser(row.id)"
                  @cancel="cancel">
                  <template #reference>
                    <el-button type="danger" size="small" icon="Delete" title="删除"></el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-pagination @current-change="getHasUser" @size-change="handler" v-model:page-size="pageSize" :pager-count="9"
          v-model:current-page="pageNo" :page-sizes="[5, 7, 9, 11]" :background="true"
          layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
      </el-form>
    </el-card>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ userParams.id ? '编辑用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <el-form ref="userForm" label-width="80px" :model="userParams" :rules="rules">
          <el-form-item label="用户姓名" prop="name">
            <el-input placeholder="请输入用户姓名" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="username">
            <el-input placeholder="请输入用户昵称" v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
            <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-drawer>
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色(职位)</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名" disabled="true">
            <el-input v-model="userParams.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-select v-model="userRoleId" placeholder="请选择职位" style="width: 100%" clearable>
              <el-option
                v-for="item in allRoleArr"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="drawer1 = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang='ts'>
import type { AllRole, AllRoleResponseData, Records, SetRoleData, User, UserResponseData, RoleData } from '@/api/acl/user/type';
import { reqAddOrUpdateUser, reqAllRole, reqALLUserInfo, reqRemoveBatchUser, reqRemoveUser, reqSetUserRole } from '@/api/acl/user';
import { nextTick, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useLayoutSettingStore } from '@/stores/modules/types/setting';

let settingStore = useLayoutSettingStore();
let pageNo = ref<number>(1);
let pageSize = ref<number>(5);
let total = ref<number>(0);
let userArr = ref<Records>([]);
let drawer = ref<boolean>(false);
let drawer1 = ref<boolean>(false);
let userRoleId = ref<number | null>(null);  // 改为单个角色ID
let allRoleArr = ref<AllRole>([]);
let isIndeterminate = ref<boolean>(false);
let selectIdArr = ref<User[]>([]);
let userParams = reactive<User>({
  name: '',
  username: '',
  password: '',
});
let userForm = ref<any>();
let keyword = ref<string>('');

const validatorUsername = (rule: any, value: string, callback: any) => {
  if (value.trim().length >= 5) {
    callback();
  } else {
    callback(new Error('用户名称至少五位'));
  }
};

const validatorName = (rule: any, value: string, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error('用户昵称至少两位'));
  }
};

const validatorPassword = (rule: any, value: string, callback: any) => {
  if (value.trim().length >= 6) {
    callback();
  } else {
    callback(new Error('用户密码至少六位'));
  }
};

const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
};

// 添加用户功能
const addUser = () => {
  drawer.value = true;
  Object.assign(userParams, {
    id: undefined,
    name: '',
    username: '',
    password: '',
    phone: ''
  });
  nextTick(() => {
    userForm.value?.clearValidate();
  });
};

// 更新用户功能
const updateUser = (row: User) => {
  drawer.value = true;
  Object.assign(userParams, row);
  nextTick(() => {
    userForm.value.clearValidate();
  });
};

// 删除用户功能
const deleteUser = async (userId: number) => {
  if (userId === 1) {
    ElMessage.error('不能删除超级管理员');
    return;
  }

  try {
    const result: any = await reqRemoveUser(userId);
    if (result.code === 200) {
      ElMessage.success('删除用户成功');
      getHasUser(userArr.value.length > 1 ? pageNo.value : Math.max(1, pageNo.value - 1));
    } else {
      ElMessage.error(result.message || '删除用户失败');
    }
  } catch (error) {
    console.error('删除用户失败:', error);
    ElMessage.error('删除用户失败');
  }
};

// 获取用户列表
const getHasUser = async (pager = 1) => {
  pageNo.value = pager;
  let result: UserResponseData = await reqALLUserInfo(pageNo.value, pageSize.value, keyword.value);
  if (result.code === 200) {
    total.value = result.data.total;
    userArr.value = result.data.records;
  }
};

onMounted(() => {
  getHasUser();
});

const handler = () => {
  getHasUser(pageNo.value);
};

// 搜索功能
const searchUser = () => {
  if (keyword.value.trim()) {
    getHasUser(1);
  } else {
    ElMessage.warning('请输入搜索关键词');
  }
};

// 重置功能
const reset = () => {
  keyword.value = '';
  getHasUser(1);
};

// 保存功能
const save = async () => {
  try {
    await userForm.value.validate();

    const result: any = await reqAddOrUpdateUser(userParams);
    if (result.code === 200) {
      drawer.value = false;
      ElMessage.success(userParams.id ? '更新用户成功' : '添加用户成功');
      getHasUser(userParams.id ? pageNo.value : 1);
    } else {
      ElMessage.error(result.message || '操作失败');
    }
  } catch (error) {
    console.error('保存用户失败:', error);
    ElMessage.error('保存失败，请检查输入信息');
  }
};

// 角色分配
const setRole = async (row: User) => {
  drawer1.value = true;
  Object.assign(userParams, row);

  try {
    const result: AllRoleResponseData = await reqAllRole(userParams.id as number);
    if (result.code === 200) {
      allRoleArr.value = result.data.allRolesList;
      // 如果有分配的角色，选择第一个，否则设为null
      userRoleId.value = result.data.assignRoles.length > 0 ? result.data.assignRoles[0].id as number : null;
    }
  } catch (error) {
    console.error('获取角色信息失败:', error);
    ElMessage.error('获取角色信息失败');
  }
};

// 批量删除功能
const deleteSelectUser = async () => {
  if (selectIdArr.value.length === 0) {
    ElMessage.warning('请选择要删除的用户');
    return;
  }

  // 检查是否包含超级管理员
  const hasAdmin = selectIdArr.value.some(user => user.id === 1);
  if (hasAdmin) {
    ElMessage.error('不能删除超级管理员');
    return;
  }

  try {
    const idList = selectIdArr.value.map(item => item.id);
    const result: any = await reqRemoveBatchUser(idList);
    if (result.code === 200) {
      ElMessage.success(result.message || '批量删除成功');
      getHasUser(pageNo.value);
      selectIdArr.value = [];
    } else {
      ElMessage.error(result.message || '批量删除失败');
    }
  } catch (error) {
    console.error('批量删除失败:', error);
    ElMessage.error('批量删除失败');
  }
};

const cancel = () => {
  drawer.value = false;
};

const confirmClick = async () => {
  if (userRoleId.value === null) {
    ElMessage.warning('请选择一个职位');
    return;
  }

  let data: SetRoleData = {
    userId: (userParams.id as number),
    roleId: userRoleId.value, // 改为单个角色ID
  }
  let result: any = await reqSetUserRole(data);
  if (result.code == 200) {
    ElMessage.success('分配角色成功');
    drawer1.value = false;
    getHasUser(pageNo.value);
  }
};

const selectChange = (selection: any) => {
  selectIdArr.value = selection;
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  align-items: center;
}
</style>

<template>
  <div>
    <el-card style="height: 60px; margin-bottom: 10px;">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
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
          <el-button @click="deleteSelectUser" :disabled="selectIdArr.length ? false : true" type="danger"
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
        <el-form-item>
          <el-pagination @current-change="getHasUser" @size-change="handler" v-model:page-size="pageSize"
            :pager-count="9" v-model:current-page="pageNo" :page-sizes="[5, 7, 9, 11]" :background="true"
            layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
        </el-form-item>
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
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handlerCheckAllChange">
              全选
            </el-checkbox>
            <el-checkbox-group v-model="userRoleArr" @change="handlerCheckChange">
              <el-checkbox v-for="(item, index) in allRoleArr" :key="index" :value="item">{{ item.roleName
                }}</el-checkbox>
            </el-checkbox-group>
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
import type { AllRole, AllRoleResponseData, Records, SetRoleData, User, UserResponseData } from '@/api/acl/user/type';
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
let checkAll = ref<boolean>(false);
let userRoleArr = ref<AllRole>([]);
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
  if (value.trim().length >= 5) {
    callback();
  } else {
    callback(new Error('用户昵称至少五位'));
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

const addUser = () => {
  drawer.value = true;
  Object.assign(userParams, {
    id: '',
    name: '',
    username: '',
    password: ''
  });
  nextTick(() => {
    userForm.value.clearValidate();
  });
};

const updateUser = (row: User) => {
  drawer.value = true;
  Object.assign(userParams, row);
  nextTick(() => {
    userForm.value.clearValidate();
  });
};

const deleteUser = async (userId: number) => {
  let result: any = await reqRemoveUser(userId);
  if (result.code === 200) {
    ElMessage.success('删除用户成功');
    getHasUser(pageNo.value);
  } else {
    ElMessage.error('删除用户失败');
  }
};

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
}

const save = async () => {
  await userForm.value.validate();
  let result: any = await reqAddOrUpdateUser(userParams);
  if (result.code === 200) {
    drawer.value = false;
    ElMessage.success(userParams.id ? '更新用户成功' : '添加用户成功');
    window.location.reload();
  } else {
    ElMessage.error(userParams.id ? '更新用户失败' : '添加用户失败');
  }
};

const cancel = () => {
  drawer.value = false;
};

const setRole = async (row: User) => {
  drawer1.value = true;
  Object.assign(userParams, row);
  let result: AllRoleResponseData = await reqAllRole((userParams.id as number));
  if (result.code == 200) {
    allRoleArr.value = result.data.allRolesList;
    userRoleArr.value = result.data.assignRoles;
    drawer1.value = true;
  }
};

const handlerCheckAllChange = (value: boolean) => {
  userRoleArr.value = value ? allRoleArr.value : [];
  isIndeterminate.value = false;
};

const handlerCheckChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === allRoleArr.value.length;
  isIndeterminate.value = !(checkedCount === allRoleArr.value.length);
};

const confirmClick = async () => {
  let data: SetRoleData = {
    userId: (userParams.id as number),
    roleIdList: userRoleArr.value.map(item => {
      return (item.id as number);
    }),
  }
  let result: any = await reqSetUserRole(data);
  if (result.code !== 200) {
    ElMessage.error('分配角色成功');
    drawer1.value = false;
    getHasUser(pageNo.value);
  }
};

const selectChange = (selection: any) => {
  selectIdArr.value = selection.map();
};

const deleteSelectUser = async () => {
  let idList: any = selectIdArr.value.map(item => {
    return item.id;
  });
  let result: any = await reqRemoveBatchUser(idList);
  if (result.code === 200) {
    ElMessage.success('批量删除用户成功');
    getHasUser(pageNo.value);
  } else {
    ElMessage.error('批量删除用户失败');
  }
};

const reset = () => {
  settingStore.refresh = !settingStore.refresh;
};

const searchUser = () => {
  getHasUser();
  keyword.value = '';
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  align-items: center;
}
</style>

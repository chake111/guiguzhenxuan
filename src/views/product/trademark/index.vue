<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
      <el-table style="margin:10px 0px" border :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称">
          <template #default="{ row }">
            <pre>{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #default="{ row }">
            <el-image style="max-width: 100px; max-height: 100px; width: auto; height: auto; display: block;"
              :src="row.logoUrl" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" show-progress :initial-index="4"
              fit="contain" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button type="warning" size="small" icon="Edit" @click="updataTrademark(row)">编辑</el-button>
            <el-popconfirm :title="`你确定要删除${row.tmName}吗?`" width="250px" icon="Delete"
              @confirm="() => removeTradeMark(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="changePageNo" @size-change="sizeChange" :pager-count="9"
        v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
        layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
    </el-card>
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
      <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeLogoUpload"
            :on-change="handleLogoChange">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar"
              style="max-width:100px; max-height:100px; width:auto; height:auto; display:block;" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { reqHasTradeMark, reqAddOrUpdateTradeMark, reqDeleteTradeMark } from '@/api/product/trademark';
import type { Records, TrademarkResponseData, Trademark } from '@/api/product/trademark/type';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons-vue'
let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let dialogFormVisible = ref<boolean>(false);
let formRef = ref();
let trademarkArr = ref<Records>([])
let trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: ''
})
const router = useRouter();
console.log(router.currentRoute.value.fullPath);

const getHasTradeMark = async (pager = 1) => {
  try {
    pageNo.value = pager;
    let result: TrademarkResponseData = await reqHasTradeMark(pageNo.value, limit.value);
    if (result && result.code == 200 && result.data) {
      total.value = result.data.total ?? 0;
      trademarkArr.value = Array.isArray(result.data.records) ? result.data.records : [];
    } else {
      total.value = 0;
      trademarkArr.value = [];
      ElMessage.error('获取品牌列表失败');
    }
  } catch (e: any) {
    total.value = 0;
    trademarkArr.value = [];
    ElMessage.error('获取品牌列表异常: ' + (e?.message || e));
  }
}
onMounted(() => {
  getHasTradeMark();
})
const changePageNo = (newPage: number) => {
  pageNo.value = newPage;
  getHasTradeMark(pageNo.value);
}
const sizeChange = (newSize: number) => {
  limit.value = newSize;
  getHasTradeMark(pageNo.value);
}
const addTrademark = () => {
  dialogFormVisible.value = true;
  trademarkParams.id = 0;
  trademarkParams.tmName = '';
  trademarkParams.logoUrl = '';
  nextTick(() => {
    if (formRef.value && typeof formRef.value.clearValidate === 'function') {
      formRef.value.clearValidate();
    }
  })
}
const updataTrademark = (row: Trademark) => {
  dialogFormVisible.value = true;
  Object.assign(trademarkParams, row);
  nextTick(() => {
    if (formRef.value && typeof formRef.value.clearValidate === 'function') {
      formRef.value.clearValidate();
    }
  })
}
const cancel = () => {
  dialogFormVisible.value = false;
}
const confirm = async () => {
  try {
    if (!formRef.value || typeof formRef.value.validate !== 'function') {
      ElMessage.error('表单未初始化');
      return;
    }
    await formRef.value.validate();
    let result: any = await reqAddOrUpdateTradeMark(trademarkParams);
    if (result && result.code == 200) {
      dialogFormVisible.value = false;
      ElMessage.success(trademarkParams.id ? '修改成功' : '添加成功');
      getHasTradeMark(pageNo.value);
    } else {
      ElMessage.error((trademarkParams.id ? '修改失败' : '添加失败') + (result?.data?.message ? `: ${result.data.message}` : ''));
    }
    dialogFormVisible.value = false;
  } catch (e: any) {
    ElMessage.error('操作异常: ' + (e?.message || e));
    dialogFormVisible.value = false;
  }
}

const beforeLogoUpload = (file: File) => {
  if (!file || typeof file !== 'object') {
    ElMessage.error('请选择图片文件');
    return false;
  }
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG) {
    ElMessage.error('上传图片只能是 JPG/PNG 格式!');
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!');
    return false;
  }
  return true;
}

const handleLogoChange = (uploadFile: any) => {
  if (!uploadFile || !uploadFile.raw) {
    ElMessage.error('请选择图片文件');
    return;
  }
  try {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      trademarkParams.logoUrl = e?.target?.result || '';
    };
    reader.onerror = () => {
      ElMessage.error('图片读取失败');
    }
    reader.readAsDataURL(uploadFile.raw);
  } catch (e: any) {
    ElMessage.error('图片处理异常: ' + (e?.message || e));
  }
}

const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (typeof value === 'string' && value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error('品牌名称字数大于等于两位'))
  }
}
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value && typeof value === 'string' && value.trim() !== '') {
    callBack();
  } else {
    callBack(new Error('品牌LOGO不能为空'))
  }
}
const rules = {
  tmName: [
    { required: true, trigger: 'blur', validator: validatorTmName }
  ],
  logoUrl: [
    { required: true, trigger: 'change', validator: validatorLogoUrl }
  ]
}
const removeTradeMark = async (id: number) => {
  try {
    let result = await reqDeleteTradeMark(id);
    if (result && result.code == 200) {
      ElMessage.success("删除成功")
      getHasTradeMark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
      ElMessage.error("删除失败" + (result?.data?.message ? `: ${result.data.message}` : ''));
    }
  } catch (e: any) {
    ElMessage.error('删除异常: ' + (e?.message || e));
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

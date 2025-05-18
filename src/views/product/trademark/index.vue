<template>
        <div>
                <el-card class="box-card">
                        <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
                        <el-table style="margin:10px 0px" border :data="trademarkArr">
                                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                                <el-table-column label="品牌名称">
                                        <template #default="{ row, $index }">
                                                <pre>{{ row.tmName }}</pre>
                                        </template>
                                </el-table-column>
                                <el-table-column label="品牌LOGO">
                                        <template #default="{ row, $index }">
                                                <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px;">
                                        </template>
                                </el-table-column>
                                <el-table-column label="品牌操作">
                                        <template #default="{ row, $index }">
                                                <el-button type="primary" size="small" icon="Edit"
                                                        @click="$event => updataTrademark(row)"></el-button>
                                                <el-popconfirm :title="`你确定要删除${row.tmName}吗?`" width="250px"
                                                        icon="Delete" @confirm="removeTradeMark">
                                                        <template #reference>
                                                                <el-button type="primary" size="small"
                                                                        icon="Delete"></el-button>
                                                        </template>
                                                </el-popconfirm>
                                        </template>
                                </el-table-column>
                        </el-table>
                        <el-pagination @current-change="changePageNo" @size-change="sizeChange" pager-count="9"
                                v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
                                :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
                </el-card>
                <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
                        <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
                                <el-form-item label="品牌名称" label-width="100px" props="tmName">
                                        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                                </el-form-item>
                                <el-form-item label="品牌LOGO" label-width="100px" props="logoUrl">
                                        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload"
                                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                                :before-upload="beforeAvatarUpload">
                                                <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl"
                                                        class="avatar" />
                                                <el-icon v-else class="avatar-uploader-icon">
                                                        <Plus />
                                                </el-icon>
                                        </el-upload>
                                </el-form-item>
                        </el-form>
                        <template #footer>
                                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                                <el-button type="primary" size="default" @click="confirm">确定</el-button>
                        </template>
                </el-dialog>
        </div>
</template>

<script setup lang='ts'>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { reqHasTradeMark, reqAddOrUpdateTradeMark, reqDeleteTradeMark } from '@/api/product/trademark';
import type { Records, TrademarkResponseData, Trademark } from '@/api/product/trademark/type';
import { ElMessage, uploadBaseProps, type UploadProps } from 'element-plus'
let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let dialogFormVisible = ref<boolean>(false);
let formRef = ref();
let trademarkArr = ref<Records>([
        {
                id: 1,
                tmName: '品牌A',
                logoUrl: 'https://via.placeholder.com/100x100?text=A'
        },
        {
                id: 2,
                tmName: '品牌B',
                logoUrl: 'https://via.placeholder.com/100x100?text=B'
        },
        {
                id: 3,
                tmName: '品牌C',
                logoUrl: 'https://via.placeholder.com/100x100?text=C'
        }
])
let trademarkParams = reactive<Trademark>({
        tmName: '',
        logoUrl: '',
})
const getHasTradeMark = async (pager = 1) => {
        pageNo.value = pager;
        let result: TrademarkResponseData = await reqHasTradeMark(pageNo.value, limit.value);
        if (result.code == 200) {
                total.value = result.data.total;
                trademarkArr.value = result.data.records;
        }

}
// onMounted(()=>{
//         getHasTradeMark();
// })
const changePageNo = () => {
        getHasTradeMark();
}
const sizeChange = (pageSize: any) => {
        getHasTradeMark();
}
const addTrademark = () => {
        dialogFormVisible.value = true;
        trademarkParams.id = 0;
        trademarkParams.tmName = '';
        trademarkParams.logoUrl = '';
        nextTick(() => {
                formRef.value.clearValidate('tmName');
                formRef.value.clearValidate('logUrl');
        })
}
const updataTrademark = (row: Trademark) => {
        dialogFormVisible.value = true;
        Object.assign(trademarkParams, row);
        // trademarkParams.id = row.id;
        // trademarkParams.tmName=row.tmName;
        // trademarkParams.logoUrl=row.logoUrl;
}
const cancel = () => {
        dialogFormVisible.value = false;
}
const confirm = async () => {
        await formRef.value.validate();
        let result: any = await reqAddOrUpdateTradeMark(trademarkParams);
        if (result.code == 200) {
                dialogFormVisible.value = false;
                ElMessage.success(trademarkParams.id ? '修改成功' : '添加成功');
                getHasTradeMark(trademarkParams.id ? pageNo.value : 1);
        } else {
                ElMessage.error(trademarkParams.id ? '修改失败' : '添加失败');
        }
        dialogFormVisible.value = false;
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        if (
                rawFile.type !== 'image/jpeg' &&
                rawFile.type !== 'image/png' &&
                rawFile.type !== 'image/gif'
        ) {
                ElMessage.error('只能上传 JPG/PNG/GIF 格式的图片!')
                return false
        } else if (rawFile.size / 1024 / 1024 > 4) {
                ElMessage.error('只能上传小于4M的文件!')
                return false
        }
        return true
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
        trademarkParams.logoUrl = response.data;
        formRef.value.clearValidate('logoUrl');
}
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
        if (value) {
                callBack();
        } else {
                callBack(new Error('LOGO图片务必上传'))
        }
}
const validatorTmName = (rule: any, value: any, callBack: any) => {
        if (value.trim().length >= 2) {
                callBack();
        } else {
                callBack(new Error('品牌名称字数大于等于两位'))
        }
}
const rules = {
        tmName: [
                { required: true, trigger: 'blur', validator: validatorTmName }
        ],
        logoUrl: [{ required: true, trigger: 'blur', validator: validatorLogoUrl }],
}
const removeTradeMark = async (id: number) => {
        let result = await reqDeleteTradeMark(id);
        if (result.code == 200) {
                ElMessage.success("删除成功")
                getHasTradeMark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
        } else {
                ElMessage.error("删除失败")
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
        width: 178px;
        height: 178px;
        text-align: center;
}
</style>
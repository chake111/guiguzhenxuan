<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称"><el-input placeholder="请输入SPU名称"
          v-model="SpuParams.spuName"></el-input></el-form-item>
      <el-form-item label="SPU品牌">
        <el-select style="width: 240px" v-model="SpuParams.tmId">
          <el-option v-for="(item, index) in AllTradeMark" :key="item.id" :label="item.tmName"
            :value="item.id"></el-option>
        </el-select></el-form-item>
      <el-form-item label="SPU描述"><el-input type="textarea" placeholder="请输入SPU描述"
          v-model="SpuParams.description"></el-input></el-form-item>
      <el-form-item label="SPU照片">
        <el-upload v-model:file-list="imgList" action="/admin/product/fileUpLoad" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeImageUpload">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible" width="600px" top="5vh">
          <div style="display:flex;justify-content:center;align-items:center;min-height:400px;">
            <img :src="dialogImageUrl" alt="Preview Image"
              style="max-width:100%;max-height:400px;width:auto;height:auto;object-fit:contain;box-shadow:0 2px 8px #0002;border-radius:6px;" />
          </div>
          <div style="text-align:center;margin-top:10px;">
            <el-button size="small" @click="prevImage" :disabled="previewIndex <= 0">上一张</el-button>
            <el-button size="small" @click="nextImage" :disabled="previewIndex >= (imgList?.length ?? 0) - 1">下一张</el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select style="width: 240px;margin-right: 10px;"></el-select><el-button type="primary"
          icon="Plus">添加销售属性</el-button>
        <el-table style="margin: 10px 0px;" border :data="saleAttr">
          <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
          <el-table-column label="属性名" width="120px">
            <template #default="{ row }">
              {{ row.saleAttrName }}
            </template>
          </el-table-column>
          <el-table-column label="属性值" prop="attrName">
            <template #="{ row, $index }">
              <el-tag style="margin: 0px 5px;" v-for="(item, index) in row.spuSaleAttrValueList" :key="row.id">
                {{ item.saleAttrValueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="104px">
            <template #="{row,$index}">
              <el-button @click="saleAttr?.splice($index,1)" type="danger" icon="Delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="cancel" type="default">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import { reqAllSaleAttr, reqAllTradeMark, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import type { AllTradeMark, HasSaleAttr, HasSaleAttrResponseData, SaleAttr, SaleAttrResponse, SpuData, SpuHasImg, SpuImag } from '@/api/product/spu/type';
import type { Trademark } from '@/api/product/trademark/type';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

let $emit = defineEmits(['changeScene']);
let AllTradeMark = ref<Trademark[]>();
let imgList = ref<SpuImag[]>()
let saleAttr = ref<SaleAttr[]>()
let allSaleAttr = ref<HasSaleAttr[]>()
let SpuParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuSaleAttrList: [],
  spuImageList: []
});

const dialogVisible = ref(false);
const dialogImageUrl = ref('');
const previewIndex = ref(0);

const handlePictureCardPreview = (file: any) => {
  const idx = (imgList.value ?? []).findIndex(f => f.url === file.url);
  previewIndex.value = idx !== -1 ? idx : 0;
  dialogImageUrl.value = file.url || file.response?.url;
  dialogVisible.value = true;
};
const handleRemove = (file: any, fileList_: any[]) => {
  const arr = imgList.value ?? [];
  const idx = arr.findIndex(f => f.url === file.url);
  if (idx !== -1) arr.splice(idx, 1);
  imgList.value = arr;
};

const prevImage = () => {
  const arr = imgList.value ?? [];
  if (previewIndex.value > 0) {
    previewIndex.value--;
    dialogImageUrl.value = arr[previewIndex.value]?.url || '';
  }
};
const nextImage = () => {
  const arr = imgList.value ?? [];
  if (previewIndex.value < arr.length - 1) {
    previewIndex.value++;
    dialogImageUrl.value = arr[previewIndex.value]?.url || '';
  }
};

const cancel = () => {
  $emit('changeScene', 0);
}

const initHasSpuData = async (spu?: SpuData) => {
  SpuParams.value = (spu as SpuData);
  let result: AllTradeMark = await reqAllTradeMark();
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr();
  AllTradeMark.value = result.data;
  allSaleAttr.value = result3.data;
  if (spu && spu.id) {
    let result1: SpuHasImg = await reqSpuImageList((spu.id as number));
    let result2: SaleAttrResponse = await reqSpuHasSaleAttr((spu.id as number));
    imgList.value = result1.data.map(img => ({
      name: img.imgName,
      url: img.imgUrl
    }));
    saleAttr.value = result2.data;
  } else {
    imgList.value = [];
    saleAttr.value = [];
  }
}

const beforeImageUpload = (file: File) => {
  const isAllowedType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type);
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isAllowedType) {
    ElMessage.error('仅支持jpg/png/jpeg/gif/webp格式图片');
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过2MB');
    return false;
  }
  return true;
};

defineExpose({ initHasSpuData })
</script>

<style></style>

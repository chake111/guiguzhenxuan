<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称"><el-input placeholder="请输入SPU名称"></el-input></el-form-item>
      <el-form-item label="SPU品牌"><el-select style="width: 240px"></el-select></el-form-item>
      <el-form-item label="SPU描述"><el-input type="textarea" placeholder="请输入SPU描述"></el-input></el-form-item>
      <el-form-item label="SPU照片"> <el-upload v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog></el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select style="width: 240px;margin-right: 10px;"></el-select><el-button type="primary"
          icon="Plus">添加销售属性</el-button>
        <el-table style="margin: 10px 0px;" border>
          <el-table-column label="序号" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名" width="80px"></el-table-column>
          <el-table-column label="属性值"></el-table-column>
          <el-table-column label="操作" width="100px">
            <el-button type="primary" icon="Delete">删除</el-button>
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

let $emit = defineEmits(['changeScene']);
let AllTradeMark = ref<Trademark[]>();
let imgList = ref<SpuImag[]>()
let saleAttr = ref<SaleAttr[]>()
let allSaleAttr = ref<HasSaleAttr[]>()

// 新增：el-upload所需变量和方法
const fileList = ref<any[]>([]);
const dialogVisible = ref(false);
const dialogImageUrl = ref('');
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url || file.response?.url;
  dialogVisible.value = true;
};
const handleRemove = (file: any, fileList_: any[]) => {
  // 可根据需要处理移除逻辑
};

const cancel = () => {
  $emit('changeScene', 0);
}

const initHasSpuData = async (spu?: SpuData) => {
  let result: AllTradeMark = await reqAllTradeMark();
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr();
  AllTradeMark.value = result.data;
  allSaleAttr.value = result3.data;
  if (spu && spu.id) {
    let result1: SpuHasImg = await reqSpuImageList((spu.id as number));
    let result2: SaleAttrResponse = await reqSpuHasSaleAttr((spu.id as number));
    imgList.value = result1.data;
    saleAttr.value = result2.data;
    // 同步fileList用于el-upload显示
    fileList.value = result1.data.map(img => ({
      name: img.imgName,
      url: img.imgUrl
    }));
  } else {
    imgList.value = [];
    saleAttr.value = [];
    fileList.value = [];
  }
}

defineExpose({ initHasSpuData })
</script>

<style></style>

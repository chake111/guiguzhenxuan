<template>
  <div>
    <el-form>
      <el-form-item label="sku名称"><el-input placeholder="SKU名称"></el-input></el-form-item>

      <el-form-item label="价格(元)"><el-input placeholder="价格(元)"></el-input></el-form-item>

      <el-form-item label="重量(克)"><el-input placeholder="重量(克)"></el-input></el-form-item>

      <el-form-item label="sku描述"><el-input placeholder="sku描述"></el-input></el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item :label='item.attrName' v-for="(item, $index) in attrArr" :key="$index">
            <el-select style="width: 200px;margin: 5px 0px;">
              <el-option :value="item1.valueName" v-for="(item1, $index) in item.attrValueList"
                :key="item1.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

    </el-form>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item v-for="(item, index) in saleArr" :label="item.saleAttrName">
          <el-select style="width: 200px;margin: 5px 0px;">
            <el-option :value="item1.saleAttrValueName" v-for="(item1, $index) in item.spuSaleAttrValueList"
              :key="item1.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="图片名称">
      <el-table :select-on-indeterminate="select" border :data="imgArr">
        <el-table-column type="selection" width="55px" align="center" />
        <el-table-column label="图片">
          <template #="{ row, $index }">
            <el-image :src="row.imgUrl" style="height: 100px;width: 100px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <el-button type="warning">设置默认</el-button>
        </el-table-column>
      </el-table>
      <el-button type="primary" style="margin: 10px 0px;">保存</el-button>
      <el-button @click="cancel" type="default">取消</el-button>
    </el-form-item>

  </div>
</template>

<script setup lang='ts'>
import { reqAttr } from '@/api/product/attr';
import type { AttrResponseData } from '@/api/product/attr/type';
import { reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import type { SaleAttrResponse, SkuData, SpuData, SpuHasImg } from '@/api/product/spu/type';
import { reactive, ref } from 'vue';

let $emit = defineEmits(['changeScene']);
let select = ref<boolean>(true)
let attrArr = ref<any>();
let saleArr = ref<any>();
let imgArr = ref<any>();
let skuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
});

const cancel = () => {
  $emit('changeScene', 0);
}

const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SpuData) => {
  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = (spu.id as number|string);
  skuParams.tmId = spu.tmId;

  let result: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id);
  let result1: SaleAttrResponse = await reqSpuHasSaleAttr((spu.id as number));
  let result2: SpuHasImg = await reqSpuImageList((spu.id as number));

  attrArr.value = result.data;
  saleArr.value = result1.data;
  imgArr.value = result2.data;
}
defineExpose({ initSkuData })
</script>

<style></style>

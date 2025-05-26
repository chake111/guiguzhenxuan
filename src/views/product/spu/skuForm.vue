<template>
  <div>
    <el-form>
      <el-form-item label="sku名称"><el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input></el-form-item>

      <el-form-item label="价格(元)"><el-input placeholder="价格(元)" v-model="skuParams.price"></el-input></el-form-item>

      <el-form-item label="重量(克)"><el-input placeholder="重量(克)" v-model="skuParams.weight"></el-input></el-form-item>

      <el-form-item label="sku描述"><el-input placeholder="sku描述" v-model="skuParams.skuDesc"></el-input></el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item :label='item.attrName' v-for="(item, $index) in attrArr" :key="$index">
            <el-select v-model="item.attrIdAndValueId" style="width: 200px;margin: 5px 0px;">
              <el-option :value="`${item.id}:${item1.id}`" v-for="(item1, $index) in item.attrValueList" :key="item1.id"
                :label="item1.valueName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

    </el-form>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item v-for="(item, index) in saleArr" :label="item.saleAttrName">
          <el-select style="width: 200px;margin: 5px 0px;" v-model="item.saleIdAndValueId">
            <el-option :value="`${item.id}:${item1.id}`" v-for="(item1, $index) in item.spuSaleAttrValueList"
              :key="item1.id" :label="item1.saleAttrValueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="图片名称">
      <el-table ref="table" :select-on-indeterminate="select" border :data="imgArr">
        <el-table-column type="selection" width="55px" align="center" />
        <el-table-column label="图片">
          <template #="{ row, $index }">
            <el-image :src="row.imgUrl" style="height: 100px;width: 100px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="warning" @click="handler(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="save" type="primary" style="margin: 10px 0px;">保存</el-button>
      <el-button @click="cancel" type="default">取消</el-button>
    </el-form-item>

  </div>
</template>

<script setup lang='ts'>
import { reqAttr } from '@/api/product/attr';
import type { AttrResponseData } from '@/api/product/attr/type';
import { reqAddSku, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import type { SaleAttrResponse, SkuData, SpuData, SpuHasImg } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
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
let table = ref<any>();

const cancel = () => {
  $emit('changeScene', 0);
}

const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SpuData) => {
  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = (spu.id as number | string);
  skuParams.tmId = spu.tmId;

  let result: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id);
  let result1: SaleAttrResponse = await reqSpuHasSaleAttr((spu.id as number));
  let result2: SpuHasImg = await reqSpuImageList((spu.id as number));

  attrArr.value = result.data;
  saleArr.value = result1.data;
  imgArr.value = result2.data;
}

const handler = (row: any) => {
  imgArr.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false);
  });
  table.value.toggleRowSelection(row, true);
  skuParams.skuDefaultImg = row.imgUrl;
}

const save = async () => {
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':');
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev;
  }, []);

  skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
      prev.push({
        saleAttrId,
        saleAttrValueId,
      })
    }
    return prev;
  }, []);

  let result: any = await reqAddSku(skuParams);
  if (result.code == 200) {
    ElMessage.success('添加SKU成功');
  } else {
    ElMessage.error('添加SKU失败');
  }

  $emit('changeScene', false);
}

defineExpose({ initSkuData })
</script>

<style></style>

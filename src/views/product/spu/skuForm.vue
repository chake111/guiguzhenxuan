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

const $emit = defineEmits(['changeScene']);
const select = ref<boolean>(true)
const attrArr = ref<any>();
const saleArr = ref<any>();
const imgArr = ref<any>();
const skuParams = reactive<SkuData>({
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
const table = ref<any>();

const cancel = () => {
  $emit('changeScene', 0);
}

const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SpuData, isAdd: boolean, existingSkuData?: SkuData) => {
  // 设置基本信息
  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = (spu.id as number | string);
  skuParams.tmId = spu.tmId;

  if (isAdd) {
    // 新增模式：清空表单
    skuParams.skuName = '';
    skuParams.price = '';
    skuParams.weight = '';
    skuParams.skuDesc = '';
    skuParams.skuAttrValueList = [];
    skuParams.skuSaleAttrValueList = [];
    skuParams.skuDefaultImg = '';
  } else if (existingSkuData) {
    // 修改模式：回显数据
    skuParams.id = existingSkuData.id;
    skuParams.skuName = existingSkuData.skuName;
    skuParams.price = existingSkuData.price;
    skuParams.weight = existingSkuData.weight;
    skuParams.skuDesc = existingSkuData.skuDesc;
    skuParams.skuDefaultImg = existingSkuData.skuDefaultImg;
    skuParams.skuAttrValueList = existingSkuData.skuAttrValueList || [];
    skuParams.skuSaleAttrValueList = existingSkuData.skuSaleAttrValueList || [];
  }

  // 获取属性和图片数据
  const result: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id);
  const result1: SaleAttrResponse = await reqSpuHasSaleAttr((spu.id as number));
  const result2: SpuHasImg = await reqSpuImageList((spu.id as number));

  attrArr.value = result.data;
  saleArr.value = result1.data;
  imgArr.value = result2.data;

  // 如果是修改模式，需要回显选中的属性值
  if (!isAdd && existingSkuData) {
    // 回显平台属性选择
    if (existingSkuData.skuAttrValueList) {
      existingSkuData.skuAttrValueList.forEach((attr: any) => {
        const foundAttr = attrArr.value.find((item: any) => item.id == attr.attrId);
        if (foundAttr) {
          foundAttr.attrIdAndValueId = `${attr.attrId}:${attr.valueId}`;
        }
      });
    }

    // 回显销售属性选择
    if (existingSkuData.skuSaleAttrValueList) {
      existingSkuData.skuSaleAttrValueList.forEach((saleAttr: any) => {
        const foundSaleAttr = saleArr.value.find((item: any) => item.id == saleAttr.saleAttrId);
        if (foundSaleAttr) {
          foundSaleAttr.saleIdAndValueId = `${saleAttr.saleAttrId}:${saleAttr.saleAttrValueId}`;
        }
      });
    }

    // 回显默认图片选择
    if (existingSkuData.skuDefaultImg) {
      const defaultImg = imgArr.value.find((img: any) => img.imgUrl === existingSkuData.skuDefaultImg);
      if (defaultImg) {
        setTimeout(() => {
          table.value?.toggleRowSelection(defaultImg, true);
        }, 100);
      }
    }
  }
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
      const [attrId, valueId] = next.attrIdAndValueId.split(':');
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev;
  }, []);

  skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
      prev.push({
        saleAttrId,
        saleAttrValueId,
      })
    }
    return prev;
  }, []);

  const result: any = await reqAddSku(skuParams);
  if (result.code == 200) {
    ElMessage.success('添加SKU成功');
  } else {
    ElMessage.error(result.message);
    console.log(result);

  }

  $emit('changeScene', false);
}

defineExpose({ initSkuData, save })
</script>

<style></style>

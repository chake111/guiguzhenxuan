<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px;">
      <div v-show="scene == 0 ? true : false">
        <el-button @click="addSpu" type="primary" icon="Plus" :disabled="!categoryStore.c3Id">添加SPU</el-button>
        <el-table border style="margin: 10px 0px;" :data="records">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button @click="addSku(row)" type="primary" icon="Plus" size="small" title="添加SKU"></el-button>
              <el-button @click="updateSpu(row)" type="warning" icon="Edit" size="small" title="修改SPU"></el-button>
              <el-button @click="findSku(row)" type="info" icon="InfoFilled" size="small" title="查看SKU列表"></el-button>
              <el-button type="danger" icon="Delete" size="small" title="删除SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="getHasSpu" @size-change="sizeChange" :pager-count="9"
          v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
          layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
      </div>
      <SpuForm ref="spu" @changeScene="changeScene" v-show="scene == 1 ? true : false"></SpuForm>
      <SkuForm ref="sku" @changeScene="changeScene" v-show="scene == 2 ? true : false"></SkuForm>
      <el-dialog v-model="show" title="SKU列表">
        <el-table :data="skuArr" border>
          <el-table-column label="SKU名称" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row }">
              <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px;">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import type { HasSpuResponseData, Records, SkuData, SpuData } from "@/api/product/spu/type";
import { reqHasSpu, reqSkuList } from "@/api/product/spu/index";
import Category from "@/components/Category/index.vue";
import { useCategoryStore } from "@/stores/modules/Category";
import { onMounted, ref, watch } from "vue";
import SpuForm from "./spuForm.vue";
import SkuForm from "./skuForm.vue";
import { ElMessage } from "element-plus";

let pageNo = ref<number>(1);
let limit = ref<number>(3);
let scene = ref<number>(0);
let total = ref<number>(2);
let categoryStore = useCategoryStore();
let records = ref<Records>([]);
let spu = ref<any>();
let sku = ref<any>();
let skuArr = ref<SkuData[]>([]);
let show = ref<boolean>(false);

watch(() => categoryStore.c3Id, () => {
  if (!categoryStore.c3Id) {
    records.value = [];
    return;
  };
  getHasSpu();
})

const getHasSpu = async (pager = 1) => {
  if (!categoryStore.c3Id) {
    records.value = [];
    total.value = 0;
    return;
  }
  pageNo.value = pager;
  let result: HasSpuResponseData = await reqHasSpu(pageNo.value, limit.value, categoryStore.c3Id);
  if (result.code == 200 && result.data) {
    records.value = result.data.records || [];
    total.value = result.data.total || 0;
  } else {
    records.value = [];
    total.value = 0;
  }
}

const sizeChange = () => {
  getHasSpu();
}

onMounted(() => {
  if (!categoryStore.c3Id) {
    records.value = [];
    return;
  }
  getHasSpu();
})

const addSpu = () => {
  if (!categoryStore.c3Id) {
    ElMessage.warning('请先选择三级分类');
    return;
  }
  scene.value = 1;
  spu.value?.initAddSpu(categoryStore.c3Id);
  changeScene(1, true);
}

const updateSpu = (row: SpuData) => {
  if (!row) return;
  scene.value = 1;
  spu.value?.initHasSpuData(row);
  changeScene(1, false);
}

const changeScene = async (num: number, isAdd = false) => {
  scene.value = num;
  if (num === 0) {
    if (!categoryStore.c3Id) {
      records.value = [];
      total.value = 0;
      return;
    }
    if (isAdd) {
      let result: HasSpuResponseData = await reqHasSpu(1, limit.value, categoryStore.c3Id);
      if (result.code == 200 && result.data) {
        const totalCount = result.data.total || 0;
        const lastPage = Math.max(1, Math.ceil(totalCount / limit.value));
        pageNo.value = lastPage;
        await getHasSpu(lastPage);
      }
    } else {
      await getHasSpu(pageNo.value);
    }
  }
}
const addSku = (row: SpuData) => {
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row);
  scene.value = 2;
}

const findSku = async (row: SpuData) => {
  console.log(row.id);

  let result = await reqSkuList((row.id as number));
  console.log(result);

  if (result.code == 200) {
    skuArr.value = result.data;
    show.value = true;
  } else {
    ElMessage.error(result.message || '获取SKU列表失败');
  }
}
</script>

<style lang="scss" scoped></style>

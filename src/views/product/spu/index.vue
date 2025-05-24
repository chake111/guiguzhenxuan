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
              <el-button type="primary" icon="Plus" size="small" title="添加SPU"></el-button>
              <el-button @click="updateSpu(row)" type="warning" icon="Edit" size="small" title="修改SPU"></el-button>
              <el-button type="info" icon="InfoFilled" size="small" title="查看SPU列表"></el-button>
              <el-button type="danger" icon="Delete" size="small" title="删除SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="getHasSpu" @size-change="sizeChange" :pager-count="9"
          v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
          layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
      </div>
      <SpuForm ref="spu" @changeScene="changeScene" v-show="scene == 1 ? true : false"></SpuForm>
      <SkuForm v-show="scene == 2 ? true : false"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import type { HasSpuResponseData, Records, SpuData } from "@/api/product/spu/type";
import { reqHasSpu } from "@/api/product/spu/index";
import Category from "@/components/Category/index.vue";
import { useCategoryStore } from "@/stores/modules/Category";
import { onMounted, ref, watch } from "vue";
import SpuForm from "./spuForm.vue";
import SkuForm from "./skuForm.vue";

let pageNo = ref<number>(1);
let limit = ref<number>(3);
let scene = ref<number>(0);
let total = ref<number>(2);
let categoryStore = useCategoryStore();
let records = ref<Records>([]);
let spu = ref<any>();

watch(() => categoryStore.c3Id, () => {
  if (!categoryStore.c3Id) {
    records.value = [];
    return;
  };
  getHasSpu();
})

const getHasSpu = async (pager = 1) => {

  pageNo.value = pager;
  let result: HasSpuResponseData = await reqHasSpu(pageNo.value, limit.value, categoryStore.c3Id);
  if (result.code == 200) {
    records.value = result.data.records;
    total.value = result.data.total;
  }
}

const sizeChange = () => {
  getHasSpu();
}

onMounted(() => {
  if (!categoryStore.c3Id) {
    records.value = [];
    return;
  };
  getHasSpu();
})

const addSpu = () => {
  scene.value = 1;
}

const updateSpu = (row: SpuData) => {
  scene.value = 1;
  spu.value.initHasSpuData();
}

const changeScene = (num: number) => {
  scene.value = num;
}
</script>

<style lang="scss" scoped></style>

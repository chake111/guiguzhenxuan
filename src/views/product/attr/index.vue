<template>
  <div>
    <Category />
    <el-card style="margin: 10px 0px;">
      <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true">添加平台属性</el-button>
      <el-table border style="margin: 10px 0px;" :data="attrArr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{row,$index}">
            <el-tag style="margin: 5px;" v-for="(item,index) in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template #="{row,$index}">
            <el-button type="primary" size="small" icon="Edit">编辑</el-button>
            <el-button type="primary" size="small" icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>


</template>

<script setup lang='ts'>
import { reqAttr } from '@/api/product/attr';
import Category from '@/components/Category/index.vue'
import { useCategoryStore } from '@/stores/modules/Category';
import type { AttrResponseData, Attr } from '@/api/product/attr/type';
import { ref, watch } from 'vue';
let categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([])
watch(() => categoryStore.c3Id, () => {
  attrArr.value = [];
  if(!categoryStore.c3Id) return;
  getAttr();
})
const getAttr = async () => {
  let { c1Id, c2Id, c3Id } = categoryStore;
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  if (result.code == 200) {
    attrArr.value=result.data;
  }
}
</script>

<style lang="scss" scoped></style>i

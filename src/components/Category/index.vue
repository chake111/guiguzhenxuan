<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select placeholder="请选择" style="width: 240px" v-model="c1Id" @change="handleC1Change">
            <el-option v-for="(c1, index) in c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select placeholder="请选择" style="width: 240px" v-model="c2Id" @change="handleC2Change" :disabled="!c1Id">
            <el-option v-for="c2 in c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select placeholder="请选择" style="width: 240px" v-model="c3Id" :disabled="!c2Id">
            <el-option v-for="c3 in c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { useCategoryStore } from '@/stores/modules/Category';
import { onMounted, toRefs } from 'vue';
let categoryStore = useCategoryStore();

const { c1Id, c2Id, c3Id, c1Arr, c2Arr, c3Arr } = toRefs(categoryStore);

const handleC1Change = async () => {
  c2Id.value = null;
  c3Id.value = null;
  c3Arr.value = [];
  await categoryStore.getC2();
}

const handleC2Change = async () => {
  c3Id.value = null;
  await categoryStore.getC3();
}

onMounted(async () => {
  await categoryStore.getC1();
})
</script>

<style scoped></style>

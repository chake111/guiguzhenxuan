<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select placeholder="请选择" style="width: 240px" v-model="categoryStore.c1Id">
            <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
              :value="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select placeholder="请选择" style="width: 240px">
            <el-option>1</el-option>
            <el-option>2</el-option>
            <el-option>3</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select placeholder="请选择" style="width: 240px">
            <el-option>1</el-option>
            <el-option>2</el-option>
            <el-option>3</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { useCategoryStore } from '@/stores/modules/Category';
import { onMounted } from 'vue';
let categoryStore = useCategoryStore();
const getC1 = () => {
  categoryStore.getC1();
}
onMounted(() => {
  getC1();
})
</script>

<style scoped></style>

<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px;">
      <div v-show="scene == false">
        <el-button @click="addAttr" type="primary" size="default" icon="Plus"
          :disabled="categoryStore.c3Id ? false : true">添加平台属性</el-button>
        <el-table border style="margin: 10px 0px;" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag style="margin: 5px;" v-for="(item, index) in row.attrValueList" :key="item.id">{{ item.valueName
                }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template #="{ row, $index }">
              <el-button @click="updateAttr" type="primary" size="small" icon="Edit">编辑</el-button>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == true">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="addAttrValue" :disabled="attrParams.attrName ? false : true" type="primary"
          icon="Plus">添加属性</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
          <el-table-column label="序号" type="index" width="80px"></el-table-column>
          <el-table-column label="属性名">
            <template #="{ row, $index }">
              <el-input v-if="row.flag" @blur="toLook(row, $index)" placeholder="请输入属性值名称"
                v-model="row.valueName"></el-input>
              <div v-else @click="toEdit(row)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
        <el-button type="primary" @click="save"
          :disabled="(attrParams.attrValueList.length > 0 ? false : true) || flag">保存</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>


</template>

<script setup lang='ts'>
import { reqAddOrUpdateAttr, reqAttr } from '@/api/product/attr';
import Category from '@/components/Category/index.vue'
import { useCategoryStore } from '@/stores/modules/Category';
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type';
import { reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([]);
let scene = ref(false);
let attrParams = reactive<Attr>({
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: [],
})
let flag = ref(true);
watch(() => categoryStore.c3Id, () => {
  attrArr.value = [];
  if (!categoryStore.c3Id) return;
  getAttr();
})
const getAttr = async () => {
  let { c1Id, c2Id, c3Id } = categoryStore;
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  if (result.code == 200) {
    attrArr.value = result.data;
  }
}
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
    attrValueList: [],
  })
  scene.value = true;
}
const updateAttr = (row: Attr) => {
  Object.assign(attrParams, {
    id: row.id,
    attrName: row.attrName,
    categoryId: row.categoryId,
    categoryLevel: row.categoryLevel,
    attrValueList: row.attrValueList.map(item => ({ ...item })),
  });
  scene.value = true;
}
const cancel = () => {
  scene.value = false;
}
const addAttrValue = () => {
  flag.value = true;
  attrParams.attrValueList.push(
    {
      valueName: '',
      flag: true,
    }
  )
}
const save = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParams);
  if (result.code == 200) {
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功');
    scene.value = false;
    getAttr();
  } else {
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败');
  }
}
const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1);
    flag.value = false;
    ElMessage.error('属性值不能为空');
    return;
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName;
    }
  })
  if (repeat) {
    ElMessage.error('属性值不能重复');
    return;
  }
  row.flag = false;
  flag.value = false;
}
const toEdit = (row: AttrValue) => {
  row.flag = true;
}
</script>

<style lang="scss" scoped></style>

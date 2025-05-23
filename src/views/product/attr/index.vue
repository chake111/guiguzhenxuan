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
              <el-button @click="updateAttr(row)" type="primary" size="small" icon="Edit">编辑</el-button>
              <el-popconfirm :title="`你确定要删除${row.attrName}吗?`" width="250px" icon="Delete"
                @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete">删除</el-button>
                </template>
              </el-popconfirm>
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
        <el-button @click="addAttrValue" type="primary" icon="Plus">添加属性</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
          <el-table-column label="序号" type="index" width="80px"></el-table-column>
          <el-table-column label="属性名">
            <template #="{ row, $index }">
              <el-input v-if="row.flag" @blur="toLook(row, $index)" placeholder="请输入属性值名称" v-model="row.valueName"
                :ref="setInputRef($index)" autofocus></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button @click="deleteAttrValue(row, $index)" type="warning" icon="Delete"
                :disabled="!row.valueName.trim()">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>


</template>

<script setup lang='ts'>
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr';
import Category from '@/components/Category/index.vue'
import { useCategoryStore } from '@/stores/modules/Category';
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type';
import { reactive, ref, watch, nextTick, onMounted } from 'vue';
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
const inputRefs = ref<Record<number, any>>({});
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
  attrParams.attrValueList.push(
    {
      valueName: '',
      flag: true,
    }
  );
  nextTick(() => {
    const idx = attrParams.attrValueList.length - 1;
    inputRefs.value[idx]?.focus();
  });
}

const removeDuplicateValueNames = (list: AttrValue[]) => {
  const seen = new Set<string>();
  let hasDuplicate = false;
  for (let i = list.length - 1; i >= 0; i--) {
    const name = list[i].valueName.trim();
    if (!name) continue;
    if (seen.has(name)) {
      list.splice(i, 1);
      hasDuplicate = true;
    } else {
      seen.add(name);
    }
  }
  return hasDuplicate;
}

const save = async () => {
  const editingIndex = attrParams.attrValueList.findIndex(item => item.flag);
  if (editingIndex !== -1) {
    toLook(attrParams.attrValueList[editingIndex], editingIndex);
    if (attrParams.attrValueList.find(item => item.flag)) {
      return;
    }
  }
  if (!attrParams.attrName.trim()) {
    ElMessage.error('属性名称不能为空');
    return;
  }
  if (removeDuplicateValueNames(attrParams.attrValueList)) {
    ElMessage.error('存在重复的属性值，已自动删除');
    return;
  }
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
    return;
  }
  if (removeDuplicateValueNames(attrParams.attrValueList)) {
    ElMessage.error('属性值不能重复，已自动删除');
  }
  row.flag = false;
}

const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true;
  nextTick(() => {
    inputRefs.value[$index]?.focus();
  });
}

const setInputRef = (index: number) => (el: any) => {
  if (el) inputRefs.value[index] = el;
}

const deleteAttrValue = (row: AttrValue, $index: number) => {
  attrParams.attrValueList.splice($index, 1);
}

const deleteAttr = async (attrId: number) => {
  let result: any = await reqRemoveAttr(attrId);
  if (result.code == 200) {
    ElMessage.success('删除成功')
    getAttr();
  } else {
    ElMessage.error('删除失败')
  }
}
onMounted(() => {
  if (!categoryStore.c3Id) return;
  getAttr();
})
</script>

<style lang="scss" scoped></style>

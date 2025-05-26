<template>
  <div>
    <el-form>
      <el-form-item label="sku名称"><el-input placeholder="SKU名称"></el-input></el-form-item>

      <el-form-item label="价格(元)"><el-input placeholder="价格(元)"></el-input></el-form-item>

      <el-form-item label="重量(克)"><el-input placeholder="重量(克)"></el-input></el-form-item>

      <el-form-item label="sku描述"><el-input placeholder="sku描述"></el-input></el-form-item>

      <el-form-item label="平台属性">
        <el-form inline="true">
          <el-form-item label='label' v-for="(item, index) in 6">
            <el-select style="width: 200px;margin: 5px 0px;">
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

    </el-form>
    <el-form-item label="销售属性">
      <el-form inline="true">
        <el-form-item v-for="(item, index) in ['颜色', '尺码', '版本']" :label='item'>
          <el-select style="width: 200px;margin: 5px 0px;">
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="图片名称">
      <el-table select-on-indeterminate="true" border :data="[1, 2, 3]">
        <el-table-column type="selection" width="55px" align="center" />
        <el-table-column label="图片"></el-table-column>
        <el-table-column label="名称"></el-table-column>
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
let $emit = defineEmits(['changeScene']);

const cancel = () => {
  $emit('changeScene', 0);
}
</script>

<style></style>

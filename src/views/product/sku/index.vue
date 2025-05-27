<template>
  <div>
    <el-card>
      <el-table border :data="[1, 2, 3]">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="描述"></el-table-column>
        <el-table-column label="默认图片"></el-table-column>
        <el-table-column label="重量(克)"></el-table-column>
        <el-table-column label="价格(元)"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" icon="Plus" size="small" title="添加SKU"></el-button>
            <el-button type="warning" icon="Edit" size="small" title="修改SPU"></el-button>
            <el-button type="info" icon="InfoFilled" size="small" title="查看SKU列表"></el-button>
            <el-button type="danger" icon="Delete" size="small" title="删除SPU"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="" @size-change="" :pager-count="9" v-model:current-page="pageNo"
        v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
        layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
      <el-drawer v-model="drawer" :direction="direction">
        <template #header>
          <h4>查看商品详情</h4>
        </template>
        <template #default>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">商品名称</el-col>
            <el-col :span="6">111</el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">商品描述</el-col>
            <el-col :span="18">111</el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">平台属性</el-col>
            <el-col :span="18">
              <el-tag>颜色</el-tag>
              <el-tag>尺码</el-tag>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">销售属性</el-col>
            <el-col :span="18">
              <el-tag>颜色</el-tag>
              <el-tag>尺码</el-tag>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">商品图片</el-col>
            <el-col :span="18">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                  <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </template>
        <template #footer>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import type { DrawerProps } from 'element-plus';
import { ref } from 'vue';

let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let drawer = ref<boolean>(true);
const direction = ref<DrawerProps['direction']>('rtl')

</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

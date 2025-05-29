<template>
  <div>
    <el-card>
      <el-table border :data="skuArr">
        <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
        <el-table-column label="名称" show-overflow-tooltip width="150px" prop="skuName"></el-table-column>
        <el-table-column label="描述" show-overflow-tooltip width="150px" prop="skuDesc"></el-table-column>
        <el-table-column label="默认图片" width="150px" >
          <template #default="{ row }">
            <el-image :src="row.skuDefaultImg"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="重量(克)" prop="weight"></el-table-column>
        <el-table-column label="价格(元)" prop="price"></el-table-column>
        <el-table-column label="操作" width="250px" fixed="right">
          <template #default="{ row, $index }">
            <el-button type="primary" icon="Top" size="small" title="上架SKU"></el-button>
            <el-button type="warning" icon="Edit" size="small" title="修改SPU"></el-button>
            <el-button type="info" icon="InfoFilled" size="small" title="查看SKU列表"></el-button>
            <el-button type="danger" icon="Delete" size="small" title="删除SPU"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="getHasSku" @size-change="handler" :pager-count="9" v-model:current-page="pageNo" v-model:page-size="limit"
        :page-sizes="[10, 20, 30, 40]" :background="true" layout="prev, pager, next, jumper,->,sizes,total"
        :total="total" />
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
import { reqSkuList } from '@/api/product/sku';
import type { SkuResponseData } from '@/api/product/sku/type';
import type { SkuData } from '@/api/product/spu/type';
import type { DrawerProps } from 'element-plus';
import { onMounted, ref } from 'vue';

let pageNo = ref<number>(1);
let pageSize = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let drawer = ref<boolean>(false);
let skuArr = ref<SkuData[]>([]);
const direction = ref<DrawerProps['direction']>('rtl');

onMounted(() => {
  getHasSku();
});

const getHasSku = async (pager=1) => {
  pageNo.value = pager;
  let result: SkuResponseData = await reqSkuList(pageNo.value, limit.value);
  if (result.code == 200) {
    skuArr.value = result.data.records;
    total.value = result.data.total;
  }
}

const handler = (pageSizes: number) => {
  getHasSku();
}
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

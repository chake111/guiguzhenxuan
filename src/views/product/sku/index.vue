<template>
  <div>
    <el-card>
      <el-table border :data="skuArr">
        <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
        <el-table-column label="名称" show-overflow-tooltip width="150px" prop="skuName"></el-table-column>
        <el-table-column label="描述" show-overflow-tooltip width="150px" prop="skuDesc"></el-table-column>
        <el-table-column label="默认图片" width="150px">
          <template #default="{ row }">
            <el-image :src="row.skuDefaultImg"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="重量(克)" prop="weight"></el-table-column>
        <el-table-column label="价格(元)" prop="price"></el-table-column>
        <el-table-column label="操作" width="250px" fixed="right">
          <template #default="{ row, $index }">
            <el-button @click="updateSale(row)" type="primary" :icon="row.isSale == 1 ? 'Bottom' : 'Top'" size="small"
              :title="row.isSale == 1 ? '下架SKU' : '上架SKU'"></el-button>
            <el-button @click="updateSku(row)" type="warning" icon="Edit" size="small" title="修改SKU"></el-button>
            <el-button @click="checkSku(row)" type="info" icon="InfoFilled" size="small" title="查看SKU详情"></el-button>
            <el-button type="danger" icon="Delete" size="small" title="删除SPU"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="getHasSku" @size-change="handler" :pager-count="9" v-model:current-page="pageNo"
        v-model:page-size="limit" :page-sizes="[10, 20, 30, 40]" :background="true"
        layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
      <el-drawer v-model="drawer" :direction="direction">
        <template #header>
          <h4>查看商品详情</h4>
        </template>
        <template #default>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">商品名称</el-col>
            <el-col :span="6">{{ currentSkuDetail?.skuName }}</el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">商品描述</el-col>
            <el-col :span="18">{{ currentSkuDetail?.skuDesc }}</el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">平台属性</el-col>
            <el-col :span="18">
              <template
                v-if="currentSkuDetail && currentSkuDetail.skuAttrValueList && currentSkuDetail.skuAttrValueList.length > 0">
                <el-tag v-for="(attr, index) in currentSkuDetail.skuAttrValueList" :key="index"
                  style="margin-right: 5px;">
                  {{ getAttrName(attr.attrId) }}: {{ getAttrValueName(attr.attrId, attr.valueId) }}
                </el-tag>
              </template>
              <el-empty v-else description="暂无平台属性" :image-size="60"></el-empty>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">销售属性</el-col>
            <el-col :span="18">
              <template
                v-if="currentSkuDetail && currentSkuDetail.skuSaleAttrValueList && currentSkuDetail.skuSaleAttrValueList.length > 0">
                <el-tag v-for="(attr, index) in currentSkuDetail.skuSaleAttrValueList" :key="index"
                  style="margin-right: 5px;">
                  {{ getSaleAttrName(attr.saleAttrId) }}: {{ getSaleAttrValueName(attr.saleAttrId, attr.saleAttrValueId)
                  }}
                </el-tag>
              </template>
              <el-empty v-else description="暂无销售属性" :image-size="60"></el-empty>
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
      <el-dialog v-model="dialogFormVisible" title="修改SKU" width="80%">
        <SkuForm ref="sku"></SkuForm>
        <template #footer>
          <el-button type="default" size="default" @click="cancel">取消</el-button>
          <el-button type="primary" size="default" @click="confirm">确定</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { reqCancelSale, reqSale, reqSkuList } from '@/api/product/sku';
import type { SkuResponseData } from '@/api/product/sku/type';
import type { SkuData } from '@/api/product/spu/type';
import { ElMessage, type DrawerProps } from 'element-plus';
import { onMounted, ref, nextTick } from 'vue';
import SkuForm from '../spu/skuForm.vue';
import { useCategoryStore } from '@/stores/modules/Category';
import { reqAddSku } from '@/api/product/spu';
import { reqSkuInfo } from '@/api/product/sku';

const pageNo = ref<number>(1);
const pageSize = ref<number>(1);
const limit = ref<number>(10);
const total = ref<number>(0);
const drawer = ref<boolean>(false);
const skuArr = ref<SkuData[]>([]);
const direction = ref<DrawerProps['direction']>('rtl');
const dialogFormVisible = ref<boolean>(false);
const currentSkuData = ref<SkuData | null>(null);

const sku = ref<any>();
const categoryStore = useCategoryStore();

onMounted(() => {
  getHasSku();
});

const getHasSku = async (pager = 1) => {
  pageNo.value = pager;
  const result: SkuResponseData = await reqSkuList(pageNo.value, limit.value);
  if (result.code == 200) {
    skuArr.value = result.data.records;
    total.value = result.data.total;
  }
}

const handler = () => {
  getHasSku();
}

const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    await reqCancelSale((row.id as number));
    ElMessage.success('下架成功');
    getHasSku(pageNo.value);
  } else {
    reqSale((row.id as number));
    ElMessage.success('上架成功');
    getHasSku(pageNo.value);
  }
}

const updateSku = async (row: SkuData) => {
  dialogFormVisible.value = true;
  currentSkuData.value = row;

  // 等待对话框渲染完成后初始化数据
  await nextTick();

  // 调用skuForm的初始化方法，传入修改模式
  if (sku.value) {
    await sku.value.initSkuData(
      categoryStore.c1Id,
      categoryStore.c2Id,
      {
        id: row.spuId,
        spuName: row.skuName,
        category3Id: row.category3Id,
        tmId: row.tmId,
        description: '',
        spuSaleAttrList: null,
        spuImageList: null
      },
      false, // 不是新增模式
      row // 传入当前SKU数据用于回显
    );
  }
}

// 在script部分添加
import { reqAttr } from '@/api/product/attr';

// 添加属性数据缓存
const attrData = ref<any>({});

// 获取平台属性名称的方法
const getAttrName = (attrId: number | string) => {
  // 如果已经加载了属性数据，从缓存中查找
  if (currentSkuDetail.value && attrData.value[currentSkuDetail.value.category3Id]) {
    const attr = attrData.value[currentSkuDetail.value.category3Id].find((item: any) => item.id == attrId);
    return attr ? attr.attrName : '未知属性';
  }
  return '加载中...';
};

// 获取平台属性值的方法
const getAttrValueName = (attrId: number | string, valueId: number | string) => {
  if (currentSkuDetail.value && attrData.value[currentSkuDetail.value.category3Id]) {
    const attr = attrData.value[currentSkuDetail.value.category3Id].find((item: any) => item.id == attrId);
    if (attr && attr.attrValueList) {
      const value = attr.attrValueList.find((item: any) => item.id == valueId);
      return value ? value.valueName : '未知值';
    }
  }
  return '加载中...';
};

// 获取销售属性名称的方法（类似实现）
const getSaleAttrName = (saleAttrId: number | string) => {
  // 实现类似getAttrName的逻辑
  return '颜色'; // 临时返回，实际应该查询销售属性数据
};

// 获取销售属性值的方法（类似实现）
const getSaleAttrValueName = (saleAttrId: number | string, saleAttrValueId: number | string) => {
  // 实现类似getAttrValueName的逻辑
  return '黑色'; // 临时返回，实际应该查询销售属性值数据
};

// 在checkSku方法中加载属性数据
const checkSku = async (row: SkuData) => {
  drawer.value = true;
  const result: any = await reqSkuInfo((row.id as number));
  if (result.code == 200) {
    currentSkuDetail.value = result.data;

    // 如果还没有加载过该分类的属性数据，则加载
    if (!attrData.value[row.category3Id]) {
      const attrResult = await reqAttr(categoryStore.c1Id, categoryStore.c2Id, row.category3Id);
      if (attrResult.code == 200) {
        attrData.value[row.category3Id] = attrResult.data;
      }
    }
  } else {
    ElMessage.error(result.message || '获取商品详情失败');
  }
}

// 删除重复的cancel和confirm函数，只保留一个
const cancel = () => {
  dialogFormVisible.value = false;
  currentSkuData.value = null;
}

const confirm = async () => {
  if (sku.value) {
    try {
      await sku.value.save();
      dialogFormVisible.value = false;
      currentSkuData.value = null;
      // 刷新列表
      getHasSku(pageNo.value);
    } catch (error) {
      console.error('保存失败:', error);
    }
  }
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

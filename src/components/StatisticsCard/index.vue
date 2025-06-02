<template>
  <div class="statistics-container">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in statisticsData" :key="item.title">
        <el-card class="statistics-card" shadow="hover">
          <div class="card-content">
            <div class="icon-wrapper" :style="{ backgroundColor: item.color }">
              <el-icon :size="30" :color="'white'">
                <component :is="item.icon" />
              </el-icon>
            </div>
            <div class="content">
              <h3 class="title">{{ item.title }}</h3>
              <p class="value">{{ item.value }}</p>
              <p class="trend" :class="item.trend > 0 ? 'up' : 'down'">
                <el-icon><component :is="item.trend > 0 ? 'ArrowUp' : 'ArrowDown'" /></el-icon>
                {{ Math.abs(item.trend) }}%
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import {
  ShoppingBag,
  User,
  TrendCharts,
  Money,
  ArrowUp,
  ArrowDown
} from '@element-plus/icons-vue'

interface StatisticsItem {
  title: string
  value: string | number
  icon: any
  color: string
  trend: number
}

// 更真实的统计数据
const statisticsData = ref<StatisticsItem[]>([
  {
    title: '商品总数',
    value: '2,847',
    icon: markRaw(ShoppingBag),
    color: '#409EFF',
    trend: 5.2
  },
  {
    title: '注册用户',
    value: '18,926',
    icon: markRaw(User),
    color: '#67C23A',
    trend: 12.8
  },
  {
    title: '今日订单',
    value: '156',
    icon: markRaw(TrendCharts),
    color: '#E6A23C',
    trend: -3.7
  },
  {
    title: '本月销售额',
    value: '¥284,567',
    icon: markRaw(Money),
    color: '#F56C6C',
    trend: 18.9
  }
])
</script>

<style scoped>
.statistics-container {
  margin-bottom: 20px;
}

.statistics-card {
  border-radius: 8px;
  transition: all 0.3s;
}

.statistics-card:hover {
  transform: translateY(-2px);
}

.card-content {
  display: flex;
  align-items: center;
  padding: 10px;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.content {
  flex: 1;
}

.title {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
}

.value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 5px 0;
}

.trend {
  font-size: 12px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 2px;
}

.trend.up {
  color: #67C23A;
}

.trend.down {
  color: #F56C6C;
}
</style>

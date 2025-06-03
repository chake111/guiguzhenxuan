<template>
  <div class="data-screen-container">
    <!-- 头部标题 -->
    <header class="screen-header">
      <div class="header-left">
        <h1>数据大屏</h1>
        <div class="header-divider"></div>
        <span class="time">{{ currentTime }}</span>
      </div>
      <div class="header-right">
        <el-button type="success" size="small" @click="goHome">返回首页</el-button>
        <el-button type="primary" size="small" @click="refreshData">刷新数据</el-button>
      </div>
    </header>

    <!-- 数据概览卡片 -->
    <div class="data-overview">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="6" v-for="item in overviewData" :key="item.title">
          <el-card class="overview-card" shadow="hover">
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
                  <el-icon>
                    <component :is="item.trend > 0 ? 'ArrowUp' : 'ArrowDown'" />
                  </el-icon>
                  {{ Math.abs(item.trend) }}%
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 图表区域 -->
    <div class="charts-container">
      <el-row :gutter="20">
        <!-- 销售趋势图 -->
        <el-col :xs="24" :sm="24" :md="16">
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span class="card-title">销售趋势分析</span>
                <el-radio-group v-model="salesTimeRange" size="small">
                  <el-radio-button value="week">本周</el-radio-button>
                  <el-radio-button value="month">本月</el-radio-button>
                  <el-radio-button value="year">全年</el-radio-button>
                </el-radio-group>
              </div>
            </template>
            <div class="chart-container">
              <v-chart class="chart" :option="salesOption" autoresize />
            </div>
          </el-card>
        </el-col>

        <!-- 热门搜索词云 -->
        <el-col :xs="24" :sm="24" :md="8">
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span class="card-title">热门搜索词云</span>
              </div>
            </template>
            <div class="chart-container">
              <v-chart class="chart" :option="wordcloudOption" autoresize />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
  BarChart,
  LineChart,
  PieChart,
  RadarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DataZoomComponent,
  VisualMapComponent,
  ToolboxComponent,
  TimelineComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import 'echarts-wordcloud'
import {
  ShoppingBag,
  User,
  TrendCharts,
  Money,
} from '@element-plus/icons-vue'
import { markRaw } from 'vue'

// 注册必要的组件
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DataZoomComponent,
  VisualMapComponent,
  ToolboxComponent,
  TimelineComponent
])

// 当前时间
const currentTime = ref(new Date().toLocaleString())
let timer: number | null = null

// 数据概览
const overviewData = ref([
  {
    title: '今日销售额',
    value: '¥126,560',
    icon: markRaw(ShoppingBag),
    color: '#409EFF',
    trend: 15.2
  },
  {
    title: '活跃用户',
    value: '1,846',
    icon: markRaw(User),
    color: '#67C23A',
    trend: 12.8
  },
  {
    title: '订单量',
    value: '2,356',
    icon: markRaw(TrendCharts),
    color: '#E6A23C',
    trend: -3.7
  },
  {
    title: '本月销售额',
    value: '¥2,845,670',
    icon: markRaw(Money),
    color: '#F56C6C',
    trend: 18.9
  }
])

// 销售趋势时间范围
const salesTimeRange = ref('month')

// 销售趋势图表配置
const salesOption = computed(() => {
  // 根据选择的时间范围生成不同的数据
  let xData = []
  let salesData = []
  let orderData = []

  if (salesTimeRange.value === 'week') {
    xData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    salesData = [32000, 39000, 33000, 45000, 44000, 62000, 58000]
    orderData = [320, 390, 330, 450, 440, 620, 580]
  } else if (salesTimeRange.value === 'month') {
    xData = Array.from({ length: 30 }, (_, i) => `${i + 1}日`)
    salesData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50000) + 20000)
    orderData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 500) + 200)
  } else {
    xData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    salesData = [240000, 220000, 332000, 390000, 330000, 450000, 440000, 520000, 490000, 550000, 620000, 680000]
    orderData = [2400, 2200, 3320, 3900, 3300, 4500, 4400, 5200, 4900, 5500, 6200, 6800]
  }

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['销售额', '订单量']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: xData,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '销售额',
        min: 0,
        axisLabel: {
          formatter: '{value} 元'
        }
      },
      {
        type: 'value',
        name: '订单量',
        min: 0,
        axisLabel: {
          formatter: '{value} 单'
        }
      }
    ],
    series: [
      {
        name: '销售额',
        type: 'bar',
        barWidth: salesTimeRange.value === 'year' ? '30%' : '10%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        data: salesData
      },
      {
        name: '订单量',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#FF9F7F'
        },
        lineStyle: {
          width: 2
        },
        data: orderData
      }
    ]
  }
})

const wordcloudOption = ref({
  series: [{
    type: 'wordCloud',
    shape: 'circle',
    left: 'center',
    top: 'center',
    width: '90%',
    height: '90%',
    right: null,
    bottom: null,
    sizeRange: [12, 60],
    rotationRange: [-90, 90],
    rotationStep: 45,
    gridSize: 8,
    drawOutOfBound: false,
    textStyle: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      color: function () {
        return 'rgb(' + [Math.round(Math.random() * 160),
        Math.round(Math.random() * 160),
        Math.round(Math.random() * 160)].join(',') + ')';
      }
    },
    emphasis: {
      focus: 'self',
      textStyle: {
        shadowBlur: 10,
        shadowColor: '#333'
      }
    },
    data: [
      { name: '智能手机', value: 10000 },
      { name: '笔记本电脑', value: 8500 },
      { name: '平板电脑', value: 7800 },
      { name: '智能手表', value: 6500 },
      { name: '耳机', value: 6000 },
      { name: '相机', value: 5800 },
      { name: '游戏机', value: 5500 },
      { name: '电视', value: 5300 },
      { name: '音箱', value: 5000 },
      { name: '投影仪', value: 4800 },
      { name: '路由器', value: 4500 },
      { name: '打印机', value: 4300 },
      { name: '扫地机器人', value: 4100 },
      { name: '空气净化器', value: 3800 },
      { name: '电动牙刷', value: 3500 },
      { name: '剃须刀', value: 3300 },
      { name: '吹风机', value: 3100 },
      { name: '咖啡机', value: 2900 },
      { name: '电饭煲', value: 2700 },
      { name: '微波炉', value: 2500 },
      { name: '洗衣机', value: 2300 },
      { name: '冰箱', value: 2100 },
      { name: '空调', value: 1900 },
      { name: '热水器', value: 1700 },
      { name: '电动车', value: 1500 }
    ]
  }]
})

// 刷新数据
const refreshData = () => {
  // 更新时间
  currentTime.value = new Date().toLocaleString()

  // 这里可以添加刷新各个图表数据的逻辑
  // 模拟数据更新
  overviewData.value = overviewData.value.map(item => {
    return {
      ...item,
      value: item.title.includes('销售额')
        ? `¥${Math.floor(Math.random() * 1000000 + 100000).toLocaleString()}`
        : Math.floor(Math.random() * 5000 + 1000).toString(),
      trend: (Math.random() * 30 - 10).toFixed(1) * 1
    }
  })
}

onMounted(() => {
  // 初始化时间更新器
  timer = window.setInterval(() => {
    currentTime.value = new Date().toLocaleString()
  }, 1000)

  // 初始加载数据
  refreshData()
})

onUnmounted(() => {
  // 清除定时器
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
})
// 路由实例
const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.data-screen-container {
  min-height: 100vh;
  padding: 20px;
  color: #333;
  font-family: 'Microsoft YaHei', sans-serif;
}

.screen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}

.header-left {
  display: flex;
  align-items: center;
}

.screen-header h1 {
  font-size: 26px;
  margin: 0;
  color: #303133;
  font-weight: 600;
  background: linear-gradient(to right, #409EFF, #67C23A);
  -webkit-background-clip: text;
  color: transparent;
}

.header-divider {
  height: 20px;
  width: 1px;
  background-color: #dcdfe6;
  margin: 0 15px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.time {
  font-size: 16px;
  color: #606266;
  font-weight: 500;
}

.data-overview {
  margin-bottom: 30px;
}

.overview-card {
  border-radius: 12px;
  transition: all 0.3s;
  overflow: hidden;
  border: none;
}

.overview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  align-items: center;
  padding: 5px;
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.content {
  flex: 1;
}

.title {
  font-size: 14px;
  margin: 0 0 8px;
}

.value {
  font-size: 26px;
  font-weight: bold;
  margin: 0 0 8px;
}

.trend {
  display: flex;
  align-items: center;
  font-size: 13px;
  margin: 0;
  font-weight: 500;
}

.trend.up {
  color: #67C23A;
}

.trend.down {
  color: #F56C6C;
}

.chart-card {
  border-radius: 12px;
  box-shadow: none;
  margin-bottom: 20px;
  height: 100%;
  border: none;
  overflow: hidden;
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
}

.chart-container {
  height: 350px;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .screen-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-right {
    margin-top: 15px;
  }

  .chart-container {
    height: 300px;
  }
}
</style>

<template>
  <div class="home-dashboard">
    <el-row :gutter="16" class="dashboard-overview">
      <el-col :span="6" v-for="item in overviewCards" :key="item.label">
        <el-card>
          <div class="card-title">{{ item.label }}</div>
          <div class="card-value">{{ item.value }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="16" class="overview-charts" style="margin-top:16px;">
      <el-col :span="12">
        <el-card>
          <v-chart :option="trendOption" autoresize class="chart-echarts" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <v-chart :option="categoryOption" autoresize class="chart-echarts" />
        </el-card>
      </el-col>
    </el-row>

    <el-card class="quick-actions" style="margin-top:24px;">
      <template #header>
        <span>快捷操作</span>
      </template>
      <el-space>
        <el-button type="primary" icon="el-icon-s-order" @click="handleQuickAction('订单处理')">订单处理</el-button>
        <el-button type="success" icon="el-icon-goods" @click="handleQuickAction('商品管理')">商品管理</el-button>
        <el-button type="warning" icon="el-icon-present" @click="handleQuickAction('活动配置')">活动配置</el-button>
        <el-button type="info" icon="el-icon-message" @click="handleQuickAction('客服工单')">客服工单</el-button>
      </el-space>
    </el-card>

    <!-- 动态监控与预警 -->
    <el-card class="monitoring-alerts" style="margin-top:24px;">
      <template #header>
        <span>动态监控与预警</span>
      </template>
      <el-row :gutter="16" class="alerts-list">
        <el-col :span="8">
          <el-alert :title="`库存预警：${monitorData.lowStock} 个低库存商品`" type="warning" show-icon />
        </el-col>
        <el-col :span="8">
          <el-alert :title="`异常订单：${monitorData.abnormalOrder} 单`" type="error" show-icon />
        </el-col>
        <el-col :span="8">
          <el-alert :title="`延迟配送：${monitorData.delayDelivery} 单`" type="info" show-icon />
        </el-col>
      </el-row>
    </el-card>

    <!-- 待办事项与消息中心 -->
    <el-row :gutter="24" class="tasks-messages" style="margin-top:24px;">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>待办事项</span>
          </template>
          <el-table :data="tasks" border style="width: 100%">
            <el-table-column prop="type" label="类型" width="100" />
            <el-table-column prop="desc" label="描述" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>系统通知</span>
          </template>
          <el-table :data="messages" border style="width: 100%">
            <el-table-column prop="content" label="通知内容" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { use } from "echarts/core"
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import { useRouter } from 'vue-router'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const mockOverview = []
const mockMonitor = {}
const mockTasks = []
const mockMessages = []

const overviewCards = ref([...mockOverview])
const monitorData = ref({ ...mockMonitor })
const tasks = ref([...mockTasks])
const messages = ref([...mockMessages])

const trendOption = ref({
  title: { text: '近7天销售趋势', left: 'center', top: 10, textStyle: { fontSize: 14 } },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: '销售额',
      type: 'line',
      data: [1200, 1320, 1010, 1340, 900, 2300, 2100],
      smooth: true,
      areaStyle: {}
    }
  ]
})

const categoryOption = ref({
  title: { text: '品类销售对比', left: 'center', top: 10, textStyle: { fontSize: 14 } },
  tooltip: { trigger: 'axis' },
  legend: { top: 30 },
  xAxis: { type: 'category', data: ['电视', '手机', '空调', '冰箱', '洗衣机'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: '线上',
      type: 'bar',
      data: [500, 800, 600, 400, 300]
    },
    {
      name: '线下',
      type: 'bar',
      data: [300, 400, 500, 200, 100]
    }
  ]
})

async function getDashboardData() {
  try {
    const res = await axios.get('/api/dashboard/overview')
    if (res.data && res.data.code === 200) {
      overviewCards.value = res.data.data.overview || mockOverview
      monitorData.value = res.data.data.monitor || mockMonitor
      tasks.value = res.data.data.tasks || mockTasks
      messages.value = res.data.data.messages || mockMessages
    } else {
      overviewCards.value = [...mockOverview]
      monitorData.value = { ...mockMonitor }
      tasks.value = [...mockTasks]
      messages.value = [...mockMessages]
    }
  } catch (e) {
    overviewCards.value = [...mockOverview]
    monitorData.value = { ...mockMonitor }
    tasks.value = [...mockTasks]
    messages.value = [...mockMessages]
  }
}

const router = useRouter()

function handleQuickAction(action: string) {
  let path = ''
  switch (action) {
    case '订单处理':
      path = '/orders'
      break
    case '商品管理':
      path = '/product'
      break
    case '活动配置':
      path = '/activities'
      break
    case '客服工单':
      path = '/tickets'
      break
    default:
      return
  }
  router.push(path)
}

onMounted(() => {
  getDashboardData()
})
</script>

<style scoped>
.home-dashboard {
  background: #f5f6fa;
  min-height: 100vh;
}

.card-title {
  font-size: 16px;
  color: #666;
}

.card-value {
  font-size: 22px;
  font-weight: bold;
  color: #409EFF;
  margin-top: 8px;
}

.chart-placeholder {
  height: 180px;
  background: #e6f7ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 16px;
}

.chart-echarts {
  width: 100%;
  aspect-ratio: 2 / 1;
  min-width: 0;
  min-height: 180px;
  max-height: 320px;
}
</style>

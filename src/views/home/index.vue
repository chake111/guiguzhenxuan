<template>
  <div class="home-dashboard">
    <!-- 核心数据概览 -->
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
          <div class="chart-placeholder">[销售趋势图]</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="chart-placeholder">[品类/渠道对比图]</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 高频操作快捷入口 -->
    <el-card class="quick-actions" style="margin-top:24px;">
      <template #header>
        <span>快捷操作</span>
      </template>
      <el-space>
        <el-button type="primary" icon="el-icon-s-order">订单处理</el-button>
        <el-button type="success" icon="el-icon-goods">商品管理</el-button>
        <el-button type="warning" icon="el-icon-present">活动配置</el-button>
        <el-button type="info" icon="el-icon-message">客服工单</el-button>
      </el-space>
    </el-card>

    <!-- 动态监控与预警 -->
    <el-card class="monitoring-alerts" style="margin-top:24px;">
      <template #header>
        <span>动态监控与预警</span>
      </template>
      <el-row :gutter="16" class="alerts-list">
        <el-col :span="8">
          <el-alert title="库存预警：0 个低库存商品" type="warning" show-icon />
        </el-col>
        <el-col :span="8">
          <el-alert title="异常订单：0 单" type="error" show-icon />
        </el-col>
        <el-col :span="8">
          <el-alert title="延迟配送：0 单" type="info" show-icon />
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
import { ref } from 'vue'

const overviewCards = [
  { label: '今日销售额', value: '￥0' },
  { label: '订单量', value: '0' },
  { label: '客单价', value: '￥0' },
  { label: '转化率', value: '0%' }
]

const tasks = ref([
  { type: '紧急', desc: '无' },
  { type: '常规', desc: '无' },
  { type: '长期任务', desc: '无' }
])

const messages = ref([
  { content: '暂无新通知' }
])
</script>

<style scoped>
.home-dashboard {
  padding: 24px;
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
</style>

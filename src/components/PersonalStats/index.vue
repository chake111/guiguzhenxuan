<template>
  <el-card class="personal-stats">
    <template #header>
      <div class="card-header">
        <el-icon class="header-icon">
          <DataAnalysis />
        </el-icon>
        <span>我的数据快照</span>
      </div>
    </template>
    <div class="stats-grid">
      <div v-for="stat in personalStats" :key="stat.id" class="stat-item">
        <div class="stat-icon" :style="{ backgroundColor: stat.color }">
          <el-icon color="white">
            <component :is="stat.icon" />
          </el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-trend" :class="stat.trend">
            <el-icon>
              <component :is="stat.trendIcon" />
            </el-icon>
            <span>{{ stat.trendText }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import {
  ChatDotRound,
  Goods,
  DataAnalysis,
  ArrowUp,
  ArrowDown
} from '@element-plus/icons-vue'

interface PersonalStat {
  id: string
  label: string
  value: string
  icon: any
  color: string
  trend: 'up' | 'down'
  trendIcon: any
  trendText: string
}

const personalStats = ref<PersonalStat[]>([
  {
    id: '1',
    label: '今日满意度',
    value: '96.5%',
    icon: markRaw(ChatDotRound),
    color: '#67C23A',
    trend: 'up',
    trendIcon: markRaw(ArrowUp),
    trendText: '+2.3%'
  },
  {
    id: '2',
    label: '未处理工单',
    value: '5',
    icon: markRaw(ChatDotRound),
    color: '#E6A23C',
    trend: 'down',
    trendIcon: markRaw(ArrowDown),
    trendText: '-3'
  },
  {
    id: '3',
    label: '审核通过率',
    value: '92%',
    icon: markRaw(Goods),
    color: '#409EFF',
    trend: 'up',
    trendIcon: markRaw(ArrowUp),
    trendText: '+5%'
  }
])
</script>

<style scoped>
.personal-stats {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.header-icon {
  color: #409EFF;
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  padding: 16px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  margin-bottom: 8px;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
}

.stat-trend.up {
  color: #67C23A;
}

.stat-trend.down {
  color: #F56C6C;
}
</style>

<template>
  <div class="home-container">
    <!-- 用户欢迎区域 -->
    <el-card class="welcome-card" shadow="never">
      <div class="welcome-box">
        <el-image class="avatar" :src="userStore.avatar"></el-image>
        <div class="welcome-content">
          <h3 class="title">
            {{ getTime() }}好,{{ userStore.username }}
          </h3>
          <p class="subtitle">欢迎来到{{ setting.title }}</p>
          <p class="description">{{ getWelcomeMessage() }}</p>
        </div>
        <div class="weather-info">
          <el-icon><component :is="weatherIcon" /></el-icon>
          <span>{{ weatherInfo }}</span>
        </div>
      </div>
    </el-card>

    <!-- 数据统计 -->
    <StatisticsCard />

    <el-row :gutter="20">
      <!-- 快捷操作 -->
      <el-col :span="16">
        <QuickActions />

        <!-- 图表区域 -->
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>销售趋势</span>
              <el-radio-group v-model="chartType" size="small">
                <el-radio-button value="week">本周</el-radio-button>
                <el-radio-button value="month">本月</el-radio-button>
                <el-radio-button value="year">本年</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <div class="chart-placeholder">
              <el-icon :size="60" color="#ddd"><TrendCharts /></el-icon>
              <p>图表组件待开发</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 侧边栏 -->
      <el-col :span="8">
        <RecentActivity />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref,markRaw } from 'vue'
import { useUserStore } from '@/stores/user'
import { getTime } from '@/utils/time'
import setting from '@/setting.ts'
import StatisticsCard from '@/components/StatisticsCard/index.vue'
import QuickActions from '@/components/QuickActions/index.vue'
import RecentActivity from '@/components/RecentActivity/index.vue'
import { Sunny, Cloudy, PartlyCloudy, TrendCharts } from '@element-plus/icons-vue'

let userStore = useUserStore()
const chartType = ref('week')

// 动态天气信息
const getWeatherData = () => {
  const hour = new Date().getHours()
  const weatherConditions = [
    { icon: markRaw(Sunny), text: '晴天 22°C', condition: 'sunny' },
    { icon: markRaw(PartlyCloudy), text: '多云 18°C', condition: 'partly-cloudy' },
    { icon: markRaw(Cloudy), text: '阴天 16°C', condition: 'cloudy' }
  ]

  // 根据时间模拟不同天气
  if (hour >= 6 && hour < 12) {
    return weatherConditions[0] // 上午晴天
  } else if (hour >= 12 && hour < 18) {
    return weatherConditions[1] // 下午多云
  } else {
    return weatherConditions[2] // 晚上阴天
  }
}

const weather = getWeatherData()
const weatherIcon = weather.icon
const weatherInfo = weather.text

// 动态欢迎语
const getWelcomeMessage = () => {
  const hour = new Date().getHours()
  const messages = [
    '新的一天开始了，让我们充满活力地工作吧！',
    '午后时光，继续保持高效的工作状态！',
    '傍晚时分，今天的工作即将收尾，加油！',
    '夜深了，注意休息，明天继续努力！'
  ]

  if (hour >= 6 && hour < 12) {
    return messages[0]
  } else if (hour >= 12 && hour < 18) {
    return messages[1]
  } else if (hour >= 18 && hour < 22) {
    return messages[2]
  } else {
    return messages[3]
  }
}
</script>

<style scoped>
.home-container {
  padding: 20px;
}

.welcome-card {
  margin-bottom: 20px;
  background: linear-gradient(135deg, #409eff 0%, #2c5cdc 100%);
  color: white;
}

.welcome-card :deep(.el-card__body) {
  padding: 30px;
}

.welcome-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.welcome-content {
  flex: 1;
  margin-left: 20px;
}

.title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: white;
}

.subtitle {
  font-size: 16px;
  margin: 0 0 5px 0;
  color: rgba(255, 255, 255, 0.9);
}

.description {
  font-size: 14px;
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
}

.chart-container {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  text-align: center;
  color: #999;
}

.chart-placeholder p {
  margin-top: 10px;
  font-size: 14px;
}
</style>

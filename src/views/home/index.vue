<template>
  <div class="home-container">
    <!-- 欢迎卡片 -->
    <el-card class="welcome-card">
      <div class="welcome-box">
        <el-image class="avatar" :src="userStore.avatar"></el-image>
        <div class="welcome-content">
          <h3 class="title">
            {{ getTime() }}好,{{ userStore.username }}
          </h3>
          <p class="subtitle">欢迎来到{{ setting.title }}</p>
        </div>
        <div class="weather-location-info">
          <div class="weather-info">
            <el-icon>
              <component :is="weatherIcon" />
            </el-icon>
            <span>{{ weatherInfo }}</span>
          </div>
          <div class="location-info">
            <el-icon>
              <Location />
            </el-icon>
            <span>{{ locationInfo }}</span>
          </div>
        </div>
      </div>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="16">
        <WorkBench />
      </el-col>
      <el-col :span="8">
        <PersonalStats />
      </el-col>
    </el-row>
    <QuickActions />
  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { useUserStore } from '@/stores/user'
import { getTime } from '@/utils/time'
import setting from '@/setting.ts'
import QuickActions from '@/components/QuickActions/index.vue'
import WorkBench from '@/components/WorkBench/index.vue'
import MessageCenter from '@/components/MessageCenter/index.vue'
import PersonalStats from '@/components/PersonalStats/index.vue'
import { Sunny, Cloudy, PartlyCloudy, Location } from '@element-plus/icons-vue'

const userStore = useUserStore()

const getWeatherData = () => {
  const hour = new Date().getHours()
  const weatherConditions = [
    { icon: markRaw(Sunny), text: '晴天 32°C', condition: 'sunny' },
    { icon: markRaw(PartlyCloudy), text: '多云 30°C', condition: 'partly-cloudy' },
    { icon: markRaw(Cloudy), text: '阴天 25°C', condition: 'cloudy' }
  ]

  if (hour >= 6 && hour < 12) {
    return weatherConditions[0]
  } else if (hour >= 12 && hour < 18) {
    return weatherConditions[1]
  } else {
    return weatherConditions[2]
  }
}

const weather = getWeatherData()
const weatherIcon = weather.icon
const weatherInfo = weather.text
const locationInfo = '南宁市西乡塘区'
</script>

<style scoped>
.home-container {
  min-height: calc(100vh - 60px);
}

.welcome-card {
  margin-bottom: 20px;
  border: none;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.welcome-content {
  flex: 1;
  margin-left: 20px;
}

.title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 16px;
  margin: 0 0 5px 0;
  opacity: 0.9;
}

.weather-location-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.weather-info,
.location-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.weather-info {
  font-size: 14px;
}

.location-info {
  font-size: 13px;
  opacity: 0.8;
}
</style>

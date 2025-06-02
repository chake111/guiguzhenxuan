<template>
  <div>
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
        <QuickActions />
      </el-col>
      <el-col :span="8">

      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { useUserStore } from '@/stores/user'
import { getTime } from '@/utils/time'
import setting from '@/setting.ts'
import QuickActions from '@/components/QuickActions/index.vue'
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
.welcome-card {
  margin-bottom: 20px;
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
}

.subtitle {
  font-size: 16px;
  margin: 0 0 5px 0;
}

.description {
  font-size: 14px;
  margin: 0;
}

.weather-location-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
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
}

.chart-placeholder p {
  margin-top: 10px;
  font-size: 14px;
}
</style>

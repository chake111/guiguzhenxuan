<template>
  <el-card class="system-alerts" v-if="alerts.length > 0">
    <template #header>
      <div class="card-header">
        <el-icon class="header-icon"><WarningFilled /></el-icon>
        <span>系统异常通告</span>
        <el-badge :value="alerts.length" type="danger" />
      </div>
    </template>
    <div class="alert-list">
      <el-alert
        v-for="alert in alerts"
        :key="alert.id"
        :title="alert.title"
        :type="alert.type"
        :description="alert.description"
        show-icon
        :closable="false"
        class="alert-item"
      >
        <template #default>
          <div class="alert-content">
            <div class="alert-text">
              <div class="alert-title">{{ alert.title }}</div>
              <div class="alert-desc">{{ alert.description }}</div>
            </div>
            <div class="alert-actions">
              <el-button
                type="primary"
                size="small"
                @click="handleAlert(alert)"
              >
                {{ alert.actionText }}
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="alert.contactPerson"
              >
                联系{{ alert.contactPerson }}
              </el-button>
            </div>
          </div>
        </template>
      </el-alert>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import { WarningFilled } from '@element-plus/icons-vue'

interface SystemAlert {
  id: string
  title: string
  description: string
  type: 'error' | 'warning' | 'info'
  actionText: string
  actionPath: string
  contactPerson?: string
}

const router = useRouter()

const alerts = ref<SystemAlert[]>([
  {
    id: '1',
    title: 'XX地区物流异常',
    description: '15笔订单滞留，需要联系物流处理',
    type: 'error',
    actionText: '查看订单',
    actionPath: '/logistics/exception',
    contactPerson: '物流部张经理'
  },
  {
    id: '2',
    title: '优惠券系统故障',
    description: '用户无法正常领取优惠券，请检查配置',
    type: 'warning',
    actionText: '检查配置',
    actionPath: '/promotion/coupon/config',
    contactPerson: '技术部李工'
  }
])

const handleAlert = (alert: SystemAlert) => {
  router.push(alert.actionPath)
}
</script>

<style scoped>
.system-alerts {
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  color: #303133;
}

.header-icon {
  color: #F56C6C;
}

.alert-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alert-item {
  border-radius: 8px;
}

.alert-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.alert-text {
  flex: 1;
}

.alert-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.alert-desc {
  font-size: 14px;
  color: #606266;
}

.alert-actions {
  display: flex;
  gap: 8px;
}
</style>

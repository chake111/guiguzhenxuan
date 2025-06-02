<template>
  <el-card class="recent-activity" shadow="never">
    <template #header>
      <div class="card-header">
        <span>最新动态</span>
        <el-button link size="small">查看更多</el-button>
      </div>
    </template>
    <div class="activity-list">
      <div class="activity-item" v-for="item in activities" :key="item.id">
        <div class="activity-icon" :class="item.type">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
        </div>
        <div class="activity-content">
          <p class="activity-text">{{ item.content }}</p>
          <span class="activity-time">{{ item.time }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import {
  User,
  ShoppingBag,
  Setting,
  Warning,
  Check,
  Delete
} from '@element-plus/icons-vue'

interface Activity {
  id: number
  content: string
  time: string
  type: string
  icon: any
}

// 更真实的活动数据
const activities = ref<Activity[]>([
  {
    id: 1,
    content: '用户 "李明" 完成了订单支付，订单号：#202412150001',
    time: '3分钟前',
    type: 'user',
    icon: markRaw(Check)
  },
  {
    id: 2,
    content: '商品 "华为 Mate 60 Pro" 审核通过并上架',
    time: '8分钟前',
    type: 'product',
    icon: markRaw(ShoppingBag)
  },
  {
    id: 3,
    content: '管理员 "王小二" 更新了商品分类配置',
    time: '15分钟前',
    type: 'system',
    icon: markRaw(Setting)
  },
  {
    id: 4,
    content: '库存预警："小米14 Ultra" 库存仅剩 5 件',
    time: '22分钟前',
    type: 'warning',
    icon: markRaw(Warning)
  },
  {
    id: 5,
    content: '用户 "张三" 申请退款，订单号：#202412140089',
    time: '35分钟前',
    type: 'user',
    icon: markRaw(User)
  },
  {
    id: 6,
    content: '商品 "过期促销活动" 已被系统自动下架',
    time: '1小时前',
    type: 'system',
    icon: markRaw(Delete)
  }
])
</script>

<style scoped>
.recent-activity {
  height: 400px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
}

.activity-list {
  max-height: 320px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.activity-icon.user {
  background-color: #e1f3ff;
  color: #409EFF;
}

.activity-icon.product {
  background-color: #f0f9ff;
  color: #67C23A;
}

.activity-icon.system {
  background-color: #fdf6ec;
  color: #E6A23C;
}

.activity-icon.warning {
  background-color: #fef0f0;
  color: #F56C6C;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 14px;
  color: #333;
  margin: 0 0 5px 0;
  line-height: 1.4;
}

.activity-time {
  font-size: 12px;
  color: #999;
}
</style>

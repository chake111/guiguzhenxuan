<template>
  <el-card class="task-center">
    <template #header>
      <div class="card-header">
        <el-icon class="header-icon"><Clock /></el-icon>
        <span>待处理任务</span>
        <el-badge :value="urgentCount" class="urgent-badge" type="danger" />
      </div>
    </template>
    <div class="task-list">
      <div v-for="task in prioritizedTasks" :key="task.id"
           :class="['task-item', `priority-${task.priority}`]"
           @click="handleTaskClick(task)">
        <div class="task-icon">
          <el-icon :color="getPriorityColor(task.priority)">
            <component :is="task.icon" />
          </el-icon>
        </div>
        <div class="task-content">
          <div class="task-title">{{ task.title }}</div>
          <div class="task-meta">
            <span class="task-time">{{ task.waitTime }}</span>
            <el-tag :type="getPriorityType(task.priority)" size="small">
              {{ getPriorityText(task.priority) }}
            </el-tag>
          </div>
        </div>
        <div class="task-action">
          <el-button type="primary" size="small" @click.stop="quickHandle(task)">
            立即处理
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import {
  Clock,
  Warning,
  ShoppingCart,
  Money,
  ChatDotRound,
  Box
} from '@element-plus/icons-vue'

interface Task {
  id: string
  title: string
  priority: 'urgent' | 'normal' | 'low'
  waitTime: string
  icon: any
  path: string
  type: string
}

const router = useRouter()

const tasks = ref<Task[]>([
  {
    id: '1',
    title: '待发货超时订单（15笔）',
    priority: 'urgent',
    waitTime: '超时12小时',
    icon: markRaw(ShoppingCart),
    path: '/order/pending',
    type: 'order'
  },
  {
    id: '2',
    title: '售后冲突预警（3笔）',
    priority: 'urgent',
    waitTime: '待处理2小时',
    icon: markRaw(Warning),
    path: '/service/conflict',
    type: 'service'
  },
  {
    id: '3',
    title: '待审核商品（8个）',
    priority: 'normal',
    waitTime: '待审核1天',
    icon: markRaw(Box),
    path: '/product/audit',
    type: 'product'
  },
  {
    id: '4',
    title: '待处理退款（12笔）',
    priority: 'normal',
    waitTime: '平均等待6小时',
    icon: markRaw(Money),
    path: '/finance/refund',
    type: 'finance'
  },
  {
    id: '5',
    title: '待回复工单（5个）',
    priority: 'normal',
    waitTime: '最长等待4小时',
    icon: markRaw(ChatDotRound),
    path: '/service/tickets',
    type: 'service'
  }
])

const prioritizedTasks = computed(() => {
  return tasks.value.sort((a, b) => {
    const priorityOrder = { urgent: 0, normal: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })
})

const urgentCount = computed(() => {
  return tasks.value.filter(task => task.priority === 'urgent').length
})

const getPriorityColor = (priority: string) => {
  const colors = {
    urgent: '#F56C6C',
    normal: '#E6A23C',
    low: '#909399'
  }
  return colors[priority] || '#909399'
}

const getPriorityType = (priority: string) => {
  const types = {
    urgent: 'danger',
    normal: 'warning',
    low: 'info'
  }
  return types[priority] || 'info'
}

const getPriorityText = (priority: string) => {
  const texts = {
    urgent: '紧急',
    normal: '常规',
    low: '低优先级'
  }
  return texts[priority] || '普通'
}

const handleTaskClick = (task: Task) => {
  router.push(task.path)
}

const quickHandle = (task: Task) => {
  router.push(task.path)
}
</script>

<style scoped>
.task-center {
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
  color: #E6A23C;
}

.task-list {
  max-height: 400px;
  overflow-y: auto;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  background: #fafafa;
}

.task-item:hover {
  background-color: #f0f9ff;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.priority-urgent {
  border-left-color: #F56C6C;
  background: linear-gradient(135deg, #fef0f0 0%, #fde2e2 100%);
}

.priority-normal {
  border-left-color: #E6A23C;
  background: linear-gradient(135deg, #fdf6ec 0%, #fed7aa 100%);
}

.priority-low {
  border-left-color: #909399;
  background: linear-gradient(135deg, #f4f4f5 0%, #e5e7eb 100%);
}

.task-icon {
  margin-right: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}

.task-content {
  flex: 1;
}

.task-title {
  font-weight: 500;
  margin-bottom: 8px;
  color: #303133;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-time {
  font-size: 12px;
  color: #909399;
}

.task-action {
  margin-left: 16px;
}
</style>

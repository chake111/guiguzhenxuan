<template>
  <el-card class="message-center">
    <template #header>
      <div class="card-header">
        <el-icon class="header-icon"><Message /></el-icon>
        <span>协作消息中心</span>
        <el-badge :value="unreadCount" type="danger" />
      </div>
    </template>
    <el-tabs v-model="activeTab" class="message-tabs">
      <el-tab-pane label="审批请求" name="approval">
        <div class="message-list">
          <div v-for="msg in approvalMessages" :key="msg.id"
               class="message-item" @click="handleMessage(msg)">
            <el-avatar :src="msg.avatar" :size="40" />
            <div class="message-content">
              <div class="message-header">
                <span class="sender">{{ msg.sender }}</span>
                <span class="time">{{ msg.time }}</span>
              </div>
              <div class="message-text">{{ msg.content }}</div>
            </div>
            <div class="message-actions">
              <el-button type="success" size="small" @click.stop="approve(msg)">
                同意
              </el-button>
              <el-button type="danger" size="small" @click.stop="reject(msg)">
                拒绝
              </el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统通知" name="system">
        <div class="message-list">
          <div v-for="msg in systemMessages" :key="msg.id"
               class="message-item" @click="handleMessage(msg)">
            <div class="system-icon">
              <el-icon color="#409EFF"><Bell /></el-icon>
            </div>
            <div class="message-content">
              <div class="message-header">
                <span class="sender">系统通知</span>
                <span class="time">{{ msg.time }}</span>
              </div>
              <div class="message-text">{{ msg.content }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="协作需求" name="collaboration">
        <div class="message-list">
          <div v-for="msg in collaborationMessages" :key="msg.id"
               class="message-item" @click="handleMessage(msg)">
            <el-avatar :src="msg.avatar" :size="40" />
            <div class="message-content">
              <div class="message-header">
                <span class="sender">{{ msg.sender }}</span>
                <span class="time">{{ msg.time }}</span>
              </div>
              <div class="message-text">{{ msg.content }}</div>
            </div>
            <div class="message-actions">
              <el-button type="primary" size="small" @click.stop="reply(msg)">
                回复
              </el-button>
              <el-button type="text" size="small" @click.stop="forward(msg)">
                转派
              </el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import { Message, Bell } from '@element-plus/icons-vue'

interface MessageItem {
  id: string
  sender: string
  content: string
  time: string
  avatar?: string
  type: 'approval' | 'system' | 'collaboration'
  read: boolean
}

const activeTab = ref('approval')

const messages = ref<MessageItem[]>([
  {
    id: '1',
    sender: '张三',
    content: '请审核双11预算申请，总金额500万',
    time: '2小时前',
    avatar: '/avatars/zhangsan.jpg',
    type: 'approval',
    read: false
  },
  {
    id: '2',
    sender: '系统',
    content: '您提交的促销活动已通过审核',
    time: '1小时前',
    type: 'system',
    read: false
  },
  {
    id: '3',
    sender: '仓储部-李四',
    content: '请求修改SKU发货时效，从24小时调整为48小时',
    time: '30分钟前',
    avatar: '/avatars/lisi.jpg',
    type: 'collaboration',
    read: false
  }
])

const approvalMessages = computed(() =>
  messages.value.filter(msg => msg.type === 'approval')
)

const systemMessages = computed(() =>
  messages.value.filter(msg => msg.type === 'system')
)

const collaborationMessages = computed(() =>
  messages.value.filter(msg => msg.type === 'collaboration')
)

const unreadCount = computed(() =>
  messages.value.filter(msg => !msg.read).length
)

const handleMessage = (msg: MessageItem) => {
  msg.read = true
}

const approve = (msg: MessageItem) => {
  console.log('同意:', msg.id)
}

const reject = (msg: MessageItem) => {
  console.log('拒绝:', msg.id)
}

const reply = (msg: MessageItem) => {
  console.log('回复:', msg.id)
}

const forward = (msg: MessageItem) => {
  console.log('转派:', msg.id)
}
</script>

<style scoped>
.message-center {
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
  color: #409EFF;
}

.message-tabs {
  margin-top: -10px;
}

.message-list {
  max-height: 300px;
  overflow-y: auto;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-bottom: 8px;
}

.message-item:hover {
  background-color: #f5f7fa;
}

.message-item:last-child {
  border-bottom: none;
}

.system-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e6f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.message-content {
  flex: 1;
  margin-left: 12px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.sender {
  font-weight: 500;
  color: #303133;
}

.time {
  font-size: 12px;
  color: #909399;
}

.message-text {
  font-size: 14px;
  color: #606266;
  line-height: 1.4;
}

.message-actions {
  display: flex;
  gap: 8px;
  margin-left: 12px;
}
</style>

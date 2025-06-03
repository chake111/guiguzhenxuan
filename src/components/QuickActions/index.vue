<template>
  <el-card icon="" class="quick-actions">
    <template #header>
      <div class="card-header">
        <el-icon color="#67C23A" style="margin-right: 5px;" size="large">
          <Compass/>
        </el-icon>
        <span>快捷操作</span>
      </div>
    </template>
    <el-row :gutter="15">
      <el-col :span="4" v-for="action in quickActions" :key="action.name">
        <div class="action-item" @click="handleAction(action.path)">
          <div class="action-icon" :style="{ backgroundColor: action.color }">
            <el-icon :size="24" color="white">
              <component :is="action.icon" />
            </el-icon>
          </div>
          <p class="action-name">{{ action.name }}</p>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { useRouter } from 'vue-router'
import {
  Plus,
  Goods,
  User,
  DataAnalysis,
  Setting,
  Document
} from '@element-plus/icons-vue'

const router = useRouter()

interface QuickAction {
  name: string
  icon: any
  color: string
  path: string
}

const quickActions: QuickAction[] = [
  {
    name: '新增商品',
    icon: markRaw(Plus),
    color: '#409EFF',
    path: '/product/spu'
  },
  {
    name: '商品管理',
    icon: markRaw(Goods),
    color: '#67C23A',
    path: '/product/trademark'
  },
  {
    name: '用户管理',
    icon: markRaw(User),
    color: '#E6A23C',
    path: '/acl/user'
  },
  {
    name: '数据报表',
    icon: markRaw(DataAnalysis),
    color: '#9C27B0',
    path: '/screen'
  },
  {
    name: '订单管理',
    icon: markRaw(Document),
    color: '#FF9800',
    path: '/order/list'
  },
  {
    name: '系统设置',
    icon: markRaw(Setting),
    color: '#F56C6C',
    path: '/acl/role'
  }
]

const handleAction = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.quick-actions {
  margin-bottom: 20px;
}

.card-header {
  font-weight: bold;
  font-size: 16px;
}

.action-item {
  text-align: center;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-item:hover {
  transform: translateY(-2px);
}

.action-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}

.action-name {
  font-size: 14px;
  margin: 0;
}
</style>

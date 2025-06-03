<template>
  <el-card class="work-bench">
    <template #header>
      <div class="card-header">
        <el-icon class="header-icon">
          <Notebook />
        </el-icon>
        <span>我的今日工作流</span>
        <el-button link @click="customizeWorkbench">
          <el-icon>
            <Setting />
          </el-icon>
          自定义
        </el-button>
      </div>
    </template>
    <el-row :gutter="16">
      <el-col :span="8" v-for="module in workModules" :key="module.id">
        <div class="work-module" @click="openModule(module)">
          <div class="module-header">
            <el-icon :color="module.color">
              <component :is="module.icon" />
            </el-icon>
            <span class="module-title">{{ module.title }}</span>
          </div>
          <div class="module-content">
            <div class="module-stats">
              <span class="stat-number">{{ module.count }}</span>
              <span class="stat-label">{{ module.label }}</span>
            </div>
            <div class="module-progress">
              <el-progress :percentage="module.progress" :color="module.color" :show-text="false" :stroke-width="4" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 快捷草稿箱 -->
    <div class="draft-section" v-if="drafts.length > 0">
      <h4>
        <el-icon>
          <Document />
        </el-icon>
        快捷草稿箱
      </h4>
      <div class="draft-list">
        <div v-for="draft in drafts" :key="draft.id" class="draft-item" @click="continueDraft(draft)">
          <el-icon>
            <Document />
          </el-icon>
          <span>{{ draft.title }}</span>
          <el-tag size="small" type="info">{{ draft.type }}</el-tag>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import {
  Setting,
  Document,
  Notebook,
  Goods,
  ChatDotRound,
  DataAnalysis
} from '@element-plus/icons-vue'

interface WorkModule {
  id: string
  title: string
  icon: any
  color: string
  count: number
  label: string
  progress: number
  path: string
}

interface Draft {
  id: string
  title: string
  type: string
  path: string
}

const router = useRouter()

const workModules = ref<WorkModule[]>([
  {
    id: '1',
    title: '商品审核',
    icon: markRaw(Goods),
    color: '#67C23A',
    count: 8,
    label: '待审核',
    progress: 65,
    path: '/product/audit'
  },
  {
    id: '2',
    title: '工单处理',
    icon: markRaw(ChatDotRound),
    color: '#409EFF',
    count: 5,
    label: '待回复',
    progress: 80,
    path: '/service/tickets'
  },
  {
    id: '3',
    title: '数据分析',
    icon: markRaw(DataAnalysis),
    color: '#9C27B0',
    count: 3,
    label: '待生成',
    progress: 45,
    path: '/analytics/reports'
  }
])

const drafts = ref<Draft[]>([
  {
    id: '1',
    title: '618促销活动配置',
    type: '活动',
    path: '/promotion/edit/1'
  },
  {
    id: '2',
    title: '新品iPhone16发布',
    type: '商品',
    path: '/product/edit/2'
  }
])

const openModule = (module: WorkModule) => {
  router.push(module.path)
}

const continueDraft = (draft: Draft) => {
  router.push(draft.path)
}

const customizeWorkbench = () => {
  console.log('自定义工作台')
}
</script>

<style scoped>
.work-bench {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.header-icon {
  color: #9C27B0;
}

.work-module {
  border: solid 1px #E4E7ED;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 140px;
}

.work-module:hover {
  transform: translateY(-2px);
}

.module-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.module-title {
  font-weight: 500;
}

.module-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.module-stats {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 28px;
  font-weight: bold;
}

.stat-label {
  font-size: 12px;
}

.module-progress {
  width: 60px;
}

.draft-section {
  margin-top: 24px;
  padding-top: 20px;
}

.draft-section h4 {
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.draft-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.draft-item {
  border: solid 1px #E4E7ED;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.draft-item:hover {
  transform: translateX(4px);
}
</style>

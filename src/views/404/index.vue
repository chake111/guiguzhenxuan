<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-icon">
        <el-icon><WarningFilled /></el-icon>
      </div>
      <div class="error-code">404</div>
      <div class="error-title">页面未找到</div>
      <div class="error-desc">抱歉，您访问的页面不存在或已被移除</div>
      <el-button class="back-btn" type="primary" @click="goHome">
        <span>返回首页</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { WarningFilled } from '@element-plus/icons-vue';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  background-image: radial-gradient(circle at 1% 1%, #f0f2f5 0%, #e6f7ff 100%);
}

.not-found-content {
  text-align: center;
  padding: 3rem;
  max-width: 500px;
  animation: fadeIn 0.6s ease-in-out;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.error-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background-color: #fef0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

.error-icon .el-icon {
  font-size: 40px;
  color: #e6a23c;
}

.error-code {
  font-size: 7rem;
  font-weight: bold;
  background: linear-gradient(45deg, #409eff, #67c23a);
  -webkit-background-clip: text;
  color: transparent;
  line-height: 1;
  margin-bottom: 1rem;
  text-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  animation: scaleIn 0.5s ease-out;
}

.error-title {
  font-size: 2rem;
  color: #303133;
  margin-bottom: 1rem;
  font-weight: 500;
}

.error-desc {
  font-size: 1.1rem;
  color: #606266;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.back-btn {
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.5);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(230, 162, 60, 0.4);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(230, 162, 60, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(230, 162, 60, 0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .not-found-content {
    padding: 2rem;
    margin: 0 1.5rem;
  }

  .error-code {
    font-size: 5rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-desc {
    font-size: 1rem;
  }
}
</style>

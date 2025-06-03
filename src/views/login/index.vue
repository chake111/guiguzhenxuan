<template>
  <div class="login-container">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <!-- 主要内容区域 -->
    <div class="login-content">
      <!-- 左侧品牌区域 -->
      <div class="brand-section">
        <div class="brand-content">
          <div class="logo">
            <img src="@/assets/images/login_form.png" alt="Logo" />
          </div>
          <h1 class="brand-title">后台管理系统</h1>
          <p class="brand-subtitle">现代化的管理平台</p>
          <div class="feature-list">
            <div class="feature-item">
              <el-icon>
                <Check />
              </el-icon>
              <span>安全可靠</span>
            </div>
            <div class="feature-item">
              <el-icon>
                <Check />
              </el-icon>
              <span>高效便捷</span>
            </div>
            <div class="feature-item">
              <el-icon>
                <Check />
              </el-icon>
              <span>智能分析</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧登录表单区域 -->
      <div class="form-section">
        <div class="form-container">
          <div class="form-header">
            <h2>欢迎回来</h2>
            <p>请登录您的账号以继续使用</p>
          </div>

          <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForms" size="large">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名" ref="usernameInput"
                @keyup.enter="focusPassword" class="form-input">
                <template #prefix>
                  <el-icon class="input-icon">
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" show-password placeholder="请输入密码"
                ref="passwordInput" @keyup.enter="login" class="form-input">
                <template #prefix>
                  <el-icon class="input-icon">
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <div class="form-options">
              <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
              <el-link type="primary" :underline="false" @click="$router.push('/forgot-password')">忘记密码？</el-link>
            </div>

            <el-form-item>
              <el-button :loading="loading" class="login-btn" type="primary" @click="login" size="large">
                <span v-if="!loading">立即登录</span>
                <span v-else>登录中...</span>
              </el-button>
            </el-form-item>
          </el-form>

          <div class="form-footer">
            <p>还没有账号？ <el-link type="primary" :underline="false" @click="$router.push('/register')">立即注册</el-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { User, Lock, Check } from '@element-plus/icons-vue'
import { nextTick, reactive, ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import type { loginForm } from '@/api/acl/user/type';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';

// 添加记住密码的响应式变量
let rememberPassword = ref(false)
let loginForm = reactive({ username: "", password: "" })
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
let loading = ref(false)

let loginForms = ref()
const usernameInput = ref()
const passwordInput = ref()

// 组件挂载时读取本地存储的用户信息
onMounted(() => {
  const savedUsername = localStorage.getItem('rememberedUsername')
  const savedPassword = localStorage.getItem('rememberedPassword')
  const isRemembered = localStorage.getItem('rememberPassword') === 'true'

  if (isRemembered && savedUsername && savedPassword) {
    loginForm.username = savedUsername
    loginForm.password = savedPassword
    rememberPassword.value = true
  }
})

const focusPassword = () => {
  nextTick(() => {
    passwordInput.value?.focus();
  });
};

const login = async () => {
  await loginForms.value.validate();
  loading.value = true
  try {
    await userStore.userLogin(loginForm);

    // 处理记住密码逻辑
    if (rememberPassword.value) {
      // 保存用户名和密码到本地存储
      localStorage.setItem('rememberedUsername', loginForm.username)
      localStorage.setItem('rememberedPassword', loginForm.password)
      localStorage.setItem('rememberPassword', 'true')
    } else {
      // 清除本地存储的用户信息
      localStorage.removeItem('rememberedUsername')
      localStorage.removeItem('rememberedPassword')
      localStorage.removeItem('rememberPassword')
    }

    let redirect: any = $route.query.redirect;
    $router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: "欢迎回来",
      title: `hi,${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
      closeIcon: 'none'
    })
    loading.value = false
  }
}

const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length < 5) {
    callback(new Error("账号长度至少五位"));
  } else if (value.length > 10) {
    callback(new Error("账号长度至多十位"));
  } else {
    callback();
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error("密码长度至少六位"));
  } else if (value.length > 15) {
    callback(new Error("密码长度至多十五位"));
  } else {
    callback();
  }
}

const rules = {
  username: [
    { trigger: 'change', required: true, validator: validatorUserName },
    { trigger: 'blur', required: true, message: "账号不能为空" },
  ],
  password: [
    { trigger: 'change', required: true, validator: validatorPassword },
    { trigger: 'blur', required: true, message: "密码不能为空" },
  ],
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5; // 与首页背景色保持一致
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  .circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(79, 70, 229, 0.1); // 更淡的主题色，与首页风格一致
    animation: float 6s ease-in-out infinite;

    &.circle-1 {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }

    &.circle-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
      animation-delay: 2s;
    }

    &.circle-3 {
      width: 100px;
      height: 100px;
      bottom: 20%;
      left: 20%;
      animation-delay: 4s;
    }
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }

  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.3;
  }
}

.login-content {
  position: relative;
  z-index: 2;
  display: flex;
  width: 90%;
  max-width: 1200px;
  height: 600px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.brand-section {
  flex: 1;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
    opacity: 0.3;
  }

  .brand-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 40px;

    .logo {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 50px;
        height: 50px;
        object-fit: contain;
      }
    }

    .brand-title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
      background: linear-gradient(45deg, #fff, #e0e7ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .brand-subtitle {
      font-size: 16px;
      opacity: 0.9;
      margin-bottom: 40px;
      line-height: 1.6;
    }

    .feature-list {
      .feature-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        font-size: 14px;

        .el-icon {
          margin-right: 8px;
          color: #10b981;
        }
      }
    }
  }
}

.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.form-container {
  width: 100%;
  max-width: 400px;

  .form-header {
    text-align: center;
    margin-bottom: 40px;

    h2 {
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 8px;
    }

    p {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.5;
    }
  }

  .login-form {
    .el-form-item {
      margin-bottom: 24px;

      .form-input {
        height: 50px;

        :deep(.el-input__wrapper) {
          border-radius: 8px;
          box-shadow: 0 0 0 1px #e5e7eb;
          transition: all 0.3s ease;

          &:hover {
            box-shadow: 0 0 0 1px #d1d5db;
          }

          &.is-focus {
            box-shadow: 0 0 0 2px #4f46e5;
          }
        }

        :deep(.el-input__inner) {
          height: 48px;
          font-size: 16px;
          padding-left: 45px;
        }

        .input-icon {
          color: #9ca3af;
          font-size: 18px;
        }
      }
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      font-size: 14px;

      .el-checkbox {
        :deep(.el-checkbox__label) {
          color: #6b7280;
        }
      }
    }

    .login-btn {
      width: 100%;
      height: 50px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      border: none;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  .form-footer {
    text-align: center;
    margin-top: 24px;

    p {
      color: #6b7280;
      font-size: 14px;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .login-content {
    flex-direction: column;
    width: 95%;
    height: auto;
    min-height: 600px;
  }

  .brand-section {
    flex: none;
    height: 200px;

    .brand-content {
      padding: 20px;

      .brand-title {
        font-size: 24px;
      }

      .feature-list {
        display: none;
      }
    }
  }

  .form-section {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 20px;
  }

  .login-content {
    width: 100%;
    border-radius: 8px;
  }

  .form-container {
    .form-header h2 {
      font-size: 24px;
    }
  }
}
</style>

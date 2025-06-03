<template>
  <el-tooltip effect="light" content="刷新">
    <el-button size="small" icon="Refresh" circle style="border: 1px solid #ccc;" @click="updateRefresh"></el-button>
  </el-tooltip>
  <el-tooltip effect="light" :content="content">
    <el-button size="small" icon="FullScreen" circle style="border: 1px solid #ccc;" @click="fullScreen"></el-button>
  </el-tooltip>
  <el-popover placement="bottom" width="200px" trigger="hover">
    <template #reference>
      <el-button size="small" icon="Setting" circle style="border: 1px solid #ccc;"></el-button>
    </template>
    <div>
      <el-form>
        <el-form-item label="暗黑模式">
          <el-switch @change="changeThemeColor" v-model="layoutSettingStore.isDark">
            <template #inactive-action>
              <el-icon>
                <Moon color="black"></Moon>
              </el-icon>
            </template>
            <template #active-action>
              <el-icon>
                <Sunny color="black"></Sunny>
              </el-icon>
            </template>
          </el-switch>
        </el-form-item>
        <el-form-item label="菜单模式">
          <el-radio-group v-model="layoutSettingStore.menuMode">
            <el-radio label="vertical">垂直</el-radio>
            <el-radio label="horizontal">水平</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </el-popover>
  <img :src="userStore.avatar"
    style="height: 24px; width: 24px; margin: 0px 10px; border: 1px solid #001121; border-radius: 15px;">
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon-right">
        <arrow-down></arrow-down>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang='ts'>
import { useLayoutSettingStore } from '@/stores/modules/types/setting';
import { useUserStore } from '@/stores/user';
import { nextTick, ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const layoutSettingStore = useLayoutSettingStore();
const userStore = useUserStore();
const $router = useRouter();
const $route = useRoute();
const content = ref("全屏");

const changeThemeColor = () => {
  const html = document.documentElement;
  if (layoutSettingStore.isDark) {
    html.classList.add('dark');
    html.setAttribute('data-theme', 'dark');
  } else {
    html.classList.remove('dark');
    html.removeAttribute('data-theme');
  }
}

// 页面加载时立即应用主题
onMounted(() => {
  changeThemeColor();
});

// 监听主题变化
watch(() => layoutSettingStore.isDark, (newVal) => {
  changeThemeColor();
}, { immediate: true });

const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
}

const fullScreen = () => {
  const full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
    content.value = "退出全屏";
  } else {
    document.exitFullscreen();
    content.value = "全屏";
  }
}

const logout = async () => {
  await userStore.userLogout();
  nextTick(() => {
    $router.push({ path: '/login', query: { redirect: $route.path } });
  })
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
<script lang="ts">
export default {
  name: "Setting",
}
</script>
<style scoped></style>

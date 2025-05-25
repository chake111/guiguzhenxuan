<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{ fold: LayoutSettingStore.fold }">
      <transition name="slider-content-fade" mode="out-in">
        <div class="slider-content" :key="String(LayoutSettingStore.fold)">
          <Logo />
          <el-scrollbar class="scrollbar">
            <el-menu :collapse="LayoutSettingStore.fold" router :default-active="$route.path" background-color="#001529"
              text-color="white">
              <Menu :menuList="userStore.menuRoutes"></Menu>
            </el-menu>
          </el-scrollbar>
        </div>
      </transition>
    </div>
    <div class="layout_tabbar" :class="{ fold: LayoutSettingStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{ fold: LayoutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Main from './main/index.vue';
import Tabbar from './tabbar/index.vue'
import { useUserStore } from '@/stores/user';
import { useLayoutSettingStore } from '@/stores/modules/types/setting';
let userStore = useUserStore();
let LayoutSettingStore = useLayoutSettingStore()
</script>
<script lang="ts">
export default {
  name: "Layout",
}
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-menu-background;
    transition: width 0.3s cubic-bezier(.55, 0, .1, 1);
    overflow: hidden; // 防止内容溢出

    .slider-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: opacity 0.3s cubic-bezier(.55, 0, .1, 1), transform 0.3s cubic-bezier(.55, 0, .1, 1);
      background: $base-menu-menu-background;
    }

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: width 0.3s cubic-bezier(.55, 0, .1, 1), left 0.3s cubic-bezier(.55, 0, .1, 1);

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: width 0.3s cubic-bezier(.55, 0, .1, 1), left 0.3s cubic-bezier(.55, 0, .1, 1);

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}

/* 侧边栏内容淡入淡出动画 */
.slider-content-fade-enter-active,
.slider-content-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(.55, 0, .1, 1), transform 0.3s cubic-bezier(.55, 0, .1, 1);
}

.slider-content-fade-enter-from,
.slider-content-fade-leave-to {
  opacity: 0;
  transform: translateX(-16px) scale(0.98);
}

.slider-content-fade-enter-to,
.slider-content-fade-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}
</style>

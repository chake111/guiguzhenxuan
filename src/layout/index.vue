<template>
  <div class="layout_container" :class="{ 'horizontal-layout': LayoutSettingStore.menuMode === 'horizontal' }">
    <!-- 水平菜单模式 -->
    <template v-if="LayoutSettingStore.menuMode === 'horizontal'">
      <div class="layout_header">
        <div class="header_left">
          <Logo />
        </div>
        <div class="header_menu">
          <el-scrollbar class="scrollbar">
            <el-menu mode="horizontal" router :default-active="$route.path" background-color="#001529" text-color="white">
              <Menu :menuList="userStore.menuRoutes"></Menu>
            </el-menu>
          </el-scrollbar>
        </div>
      </div>
      <div class="layout_tabbar horizontal">
        <Tabbar></Tabbar>
      </div>
      <div class="layout_main horizontal">
        <Main></Main>
      </div>
    </template>

    <!-- 垂直菜单模式 -->
    <template v-else>
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
    </template>
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

  // 水平布局样式
  &.horizontal-layout {
    display: flex;
    flex-direction: column;

    .layout_header {
      display: flex;
      align-items: center;
      height: 60px;
      background: $base-menu-menu-background;
      border-bottom: 1px solid #e8e8e8;
      position: relative;
      z-index: 1000;

      .header_left {
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .header_menu {
        flex: 1;
        overflow: hidden;

        .scrollbar {
          height: 60px;
        }

        .el-menu {
          border: none;
          height: 60px;
        }
      }
    }

    .layout_tabbar.horizontal {
      width: 100%;
      height: $base-tabbar-height;
      position: relative;
      z-index: 999;
      flex-shrink: 0;
    }

    .layout_main.horizontal {
      flex: 1;
      width: 100%;
      padding: $base-main-padding;
      overflow: auto;
      position: relative;
    }
  }

  // 垂直布局样式（只在非水平布局时生效）
  &:not(.horizontal-layout) {
    .layout_slider {
      color: white;
      width: $base-menu-width;
      height: 100vh;
      background: $base-menu-menu-background;
      transition: all 0.3s;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1001;

      .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);

        .el-scrollbar__wrap {
          overflow-x: hidden;
        }

        .el-menu {
          border-right: none;
        }
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
      transition: all 0.3s;
      z-index: 1000;

      &.fold {
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
      }
    }

    .layout_main {
      position: absolute;
      width: calc(100% - $base-menu-width);
      height: calc(100% - $base-tabbar-height);
      left: $base-menu-width;
      top: $base-tabbar-height;
      padding: $base-main-padding;
      overflow: auto;
      transition: all 0.3s;

      &.fold {
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
      }
    }
  }
}

.slider-content-fade-enter-active,
.slider-content-fade-leave-active {
  transition: all 0.3s ease;
}

.slider-content-fade-enter-from,
.slider-content-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>

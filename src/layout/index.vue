<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{ fold: LayoutSettingStore.fold ? true : false }">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <el-menu :collapse="LayoutSettingStore.fold" router :default-active="$route.path"
                    background-color="#001529" text-color="white" >
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar" :class="{ fold: LayoutSettingStore.fold ? true : false }">
            <Tabbar></Tabbar>
        </div>
        <div class="layout_main" :class="{ fold: LayoutSettingStore.fold ? true : false }">
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
        transition: all 0.3s;

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
        transition: all 0.3s;

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
        transition: all 0.3s;


        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>
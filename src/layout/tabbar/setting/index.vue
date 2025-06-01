<template>
    <el-tooltip effect="light" content="刷新">
        <el-button  size="small" icon="Refresh" circle style="border: 1px solid #ccc;" @click="updateRefresh"></el-button>
    </el-tooltip>
    <el-tooltip effect="light" :content="content">
        <el-button size="small" icon="FullScreen" circle style="border: 1px solid #ccc;" @click="fullScreen"></el-button>
    </el-tooltip>
    <el-tooltip effect="light" content="设置">
        <el-button size="small" icon="Setting" circle style="border: 1px solid #ccc;"></el-button>
    </el-tooltip>
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
import { nextTick, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
let layoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
let content = ref("全屏");
const updateRefresh = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
}
const fullScreen = () => {
    let full = document.fullscreenElement;
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
<script lang="ts">
export default {
    name: "Setting",
}
</script>
<style scoped></style>

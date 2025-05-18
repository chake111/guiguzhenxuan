<template>
    <el-tooltip effect="light" :content="layoutSettingStore.fold ? '展开' : '折叠'" placement="top">
        <el-icon style="margin-right: 10px;" @click="changeIcon">
            <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
        </el-icon>
    </el-tooltip>
    <el-breadcrumb separator-icon="ArrowRight">
        <transition-group name="breadcrumb-fade" tag="span" class="breadcrumb-group">
            <el-breadcrumb-item
                v-for="(item, index) in $route.matched"
                :key="index === 0 ? item.path : item.path + '-' + $route.fullPath"
                v-show="item.meta.title"
                :to="item.path"
            >
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup lang='ts'>
import { useLayoutSettingStore } from "@/stores/modules/types/setting";
import { useRoute } from "vue-router";
let layoutSettingStore = useLayoutSettingStore();
let $route = useRoute();
const changeIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold;
}
</script>
<script lang="ts">
export default {
    name: "Breadcrumb",
}
</script>

<style scoped>
.breadcrumb-group {
    display: inline-flex;
    align-items: center;
    overflow: hidden;
}
.breadcrumb-fade-enter-active {
    transition:
        opacity 0.7s cubic-bezier(.23,1.12,.67,1.01),
        transform 0.7s cubic-bezier(.23,1.12,.67,1.01),
        filter 0.7s cubic-bezier(.23,1.12,.67,1.01),
        box-shadow 0.7s cubic-bezier(.23,1.12,.67,1.01);
    position: relative;
    will-change: opacity, transform, filter, box-shadow;
}
.breadcrumb-fade-leave-active {
    transition: none;
    position: absolute;
}
.breadcrumb-fade-enter-from {
    opacity: 0;
    transform: translateX(48px) scale(0.8) rotateZ(-8deg);
    box-shadow: 0 12px 32px 0 rgba(91,134,229,0.18);
    filter: blur(4px);
}
.breadcrumb-fade-enter-to {
    opacity: 1;
    transform: translateX(0) scale(1) rotateZ(0deg);
    box-shadow: 0 0 0 0 rgba(0,0,0,0);
    filter: blur(0);
}
.breadcrumb-fade-leave-from,
.breadcrumb-fade-leave-to {
    opacity: 0;
    transform: translateX(0) scale(1) rotateZ(0deg);
    position: absolute;
    box-shadow: none;
    filter: blur(0);
}

.breadcrumb-group > .el-breadcrumb-item:nth-child(1) {
    transition-delay: 0ms;
}
.breadcrumb-group > .el-breadcrumb-item:nth-child(2) {
    transition-delay: 120ms;
}
.breadcrumb-group > .el-breadcrumb-item:nth-child(3) {
    transition-delay: 240ms;
}
.breadcrumb-group > .el-breadcrumb-item:nth-child(4) {
    transition-delay: 360ms;
}
.breadcrumb-group > .el-breadcrumb-item:nth-child(5) {
    transition-delay: 480ms;
}
</style>
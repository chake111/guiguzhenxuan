<template>
    <div>
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" v-if="flag" />
            </transition>
        </router-view>
    </div>
</template>

<script setup lang='ts'>
import { nextTick, ref, watch } from 'vue';
import { useLayoutSettingStore } from '@/stores/modules/types/setting';
let LayoutSettingStore = useLayoutSettingStore();
let flag = ref(true);
watch(() => LayoutSettingStore.refresh,() => {
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    })
})
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
    transition:
        opacity 0.5s cubic-bezier(.55,0,.1,1),
        transform 0.5s cubic-bezier(.55,0,.1,1),
        box-shadow 0.5s cubic-bezier(.55,0,.1,1);
    will-change: opacity, transform, box-shadow;
    z-index: 1;
}
.fade-leave-active {
    position: absolute;
    width: 100%;
    z-index: 0;
}
.fade-enter-from {
    opacity: 0;
    transform: translateY(32px) scale(0.98);
    box-shadow: 0 12px 32px 0 rgba(91,134,229,0.10);
}
.fade-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
    box-shadow: 0 0 0 0 rgba(0,0,0,0);
}
.fade-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
    box-shadow: 0 0 0 0 rgba(0,0,0,0);
}
.fade-leave-to {
    opacity: 0;
    transform: translateY(-24px) scale(0.96);
    box-shadow: 0 8px 24px 0 rgba(91,134,229,0.08);
}
</style>

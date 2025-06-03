<template>
  <div class="logo" :class="{ horizontal: LayoutSettingStore.menuMode === 'horizontal' }">
    <img :class="{ fold: LayoutSettingStore.fold ? true : false }" :src="setting.logo" alt="">
    <p :class="{ fold: LayoutSettingStore.fold ? true : false }" v-show="LayoutSettingStore.menuMode === 'vertical' || !LayoutSettingStore.fold">{{ setting.title }}</p>
  </div>
</template>

<script setup lang='ts'>
import setting from '@/setting';
import { useLayoutSettingStore } from '@/stores/modules/types/setting';
const LayoutSettingStore = useLayoutSettingStore();
</script>

<style scoped lang="scss">
.logo {
  color: white;
  display: flex;
  height: $base-menu-logo-height;
  align-items: center;
  padding: 20px;

  &.horizontal {
    height: 60px;
    padding: 0 20px;
  }

  img {
    width: 40px;
    height: 40px;
    transition:
      width 0.3s cubic-bezier(.55,0,.1,1),
      height 0.3s cubic-bezier(.55,0,.1,1),
      transform 0.5s cubic-bezier(.23,1.12,.67,1.01),
      filter 0.5s cubic-bezier(.23,1.12,.67,1.01);
    will-change: width, height, transform, filter;

    &.fold {
      width: 20px;
      height: 20px;
    }
    &:not(.fold) {
      animation: logo-bounce-in 0.6s cubic-bezier(.23,1.12,.67,1.01);
    }
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
    transition: margin-left 0.3s cubic-bezier(.55,0,.1,1), opacity 0.5s ease;

    &.fold {
      display: none;
    }
    &:not(.fold) {
      animation: logo-title-fade-in 0.9s ease both;
    }
  }
}

@keyframes logo-bounce-in {
  0% {
    transform: scale(0.7) rotate(-18deg);
    filter: blur(2px) brightness(0.8);
    opacity: 0.5;
  }
  60% {
    transform: scale(1.15) rotate(8deg);
    filter: blur(0.5px) brightness(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    filter: blur(0) brightness(1);
    opacity: 1;
  }
}

@keyframes logo-title-fade-in {
  0% {
    opacity: 0;
    transform: translateX(-30px) scale(0.95);
  }
  60% {
    opacity: 0.7;
    transform: translateX(8px) scale(1.03);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
</style>
<script lang="ts">
export default {
    name: "Logo",
}
</script>

<style lang="scss" scoped>
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 20px;
    transition: all 0.3s;

    img {
        width: 40px;
        height: 40px;
        transition:
            width 0.3s cubic-bezier(.55,0,.1,1),
            height 0.3s cubic-bezier(.55,0,.1,1),
            transform 0.5s cubic-bezier(.23,1.12,.67,1.01),
            filter 0.5s cubic-bezier(.23,1.12,.67,1.01);
        will-change: width, height, transform, filter;

        &.fold {
            width: 20px;
            height: 20px;
        }
        &:not(.fold) {
            animation: logo-bounce-in 0.6s cubic-bezier(.23,1.12,.67,1.01);
        }
    }

    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 10px;
        transition: margin-left 0.3s cubic-bezier(.55,0,.1,1), opacity 0.5s ease;

        &.fold {
            display: none;
        }
        &:not(.fold) {
            animation: logo-title-fade-in 0.9s ease both;
        }
    }
}

@keyframes logo-bounce-in {
    0% {
        transform: scale(0.7) rotate(-18deg);
        filter: blur(2px) brightness(0.8);
        opacity: 0.5;
    }
    60% {
        transform: scale(1.15) rotate(8deg);
        filter: blur(0.5px) brightness(1.1);
        opacity: 1;
    }
    100% {
        transform: scale(1) rotate(0deg);
        filter: blur(0) brightness(1);
        opacity: 1;
    }
}

@keyframes logo-title-fade-in {
    0% {
        opacity: 0;
        transform: translateX(-30px) scale(0.95);
    }
    60% {
        opacity: 0.7;
        transform: translateX(8px) scale(1.03);
    }
    100% {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}
</style>

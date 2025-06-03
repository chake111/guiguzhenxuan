import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useLayoutSettingStore = defineStore('SettingStore', () => {
  // 从localStorage读取初始值，如果没有则使用默认值
  const fold = ref(JSON.parse(localStorage.getItem('layout-fold') || 'false'));
  const refresh = ref(false);
  const isDark = ref(JSON.parse(localStorage.getItem('layout-isDark') || 'false'));
  const menuMode = ref(localStorage.getItem('layout-menuMode') || 'vertical');

  // 监听变化并保存到localStorage
  watch(fold, (newVal) => {
    localStorage.setItem('layout-fold', JSON.stringify(newVal));
  });

  watch(isDark, (newVal) => {
    localStorage.setItem('layout-isDark', JSON.stringify(newVal));
  });

  watch(menuMode, (newVal) => {
    localStorage.setItem('layout-menuMode', newVal);
  });

  return { fold, refresh, isDark, menuMode };
})

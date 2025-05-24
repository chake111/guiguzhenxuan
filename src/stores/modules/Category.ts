import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import type { CategoryResponseData, CategoryObj } from "@/api/product/attr/type";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useCategoryStore = defineStore('Category', () => {
  let c1Arr = ref<CategoryObj[]>([]);
  let c1Id = ref<number | string>('');
  let c2Arr = ref<CategoryObj[]>([]);
  let c2Id = ref<number | string>('');
  let c3Arr = ref<CategoryObj[]>([]);
  let c3Id = ref<number | string>('');

  const getC1 = async () => {
    let result: CategoryResponseData = await reqC1();
    if (result.code == 200) {
      c1Arr.value = result.data;
    }
  }

  const getC2 = async () => {
    if (!c1Id.value) {
      c2Arr.value = [];
      return;
    }
    let result: CategoryResponseData = await reqC2(Number(c1Id.value));
    if (result.code == 200) {
      c2Arr.value = result.data;
    }
  }

  const getC3 = async () => {
    if (!c2Id.value) {
      c3Arr.value = [];
      return;
    }
    let result: CategoryResponseData = await reqC3(Number(c2Id.value));
    if (result.code == 200) {
      c3Arr.value = result.data;
    }
  }

  return {
    c1Arr,
    c1Id,
    c2Arr,
    c2Id,
    c3Arr,
    c3Id,
    getC1,
    getC2,
    getC3
  };
})

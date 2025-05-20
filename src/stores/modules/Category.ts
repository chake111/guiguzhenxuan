import { reqC1 } from "@/api/product/attr";
import type { CategoryResponseData, CategoryObj } from "@/api/product/attr/type";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useCategoryStore = defineStore('Category', () => {
  let c1Arr = ref<CategoryObj[]>([]);
  let c1Id = ref('');
  const getC1 = async () => {
    let result: CategoryResponseData = await reqC1();
    if (result.code == 200) {
      c1Arr.value = result.data;
    }
  }
  return { c1Arr, c1Id, getC1 };
})

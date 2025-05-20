import type { CategoryObj } from "@/api/product/attr/type";
import type { RouteRecordRaw } from "vue-router";
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[],
  username: string,
  avatar: string,
}

export interface CategoryState {
  c1Id: number | null,
  c1Arr: CategoryObj[],
  c2Id: number | null,
  c2Arr: CategoryObj[],
  c3Id: number | null,
  c3Arr: CategoryObj[]
}

import type { CategoryObj } from "@/api/product/attr/type";
import type { RouteRecordRaw } from "vue-router";
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[],
  username: string,
  avatar: string,
}

export interface CategoryState {
  c1Id: number | string,
  c1Arr: CategoryObj[]
}

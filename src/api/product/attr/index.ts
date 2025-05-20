import request from "@/utils/request";
import type { CategoryResponseData } from "./type";

// 不要写死 /api 或空字符串，全部走 request 实例，request 实例的 baseURL 已自动读取 VITE_APP_BASE_API

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
export const reqC2 = (category1Id: number) => request.get<any, CategoryResponseData>(API.C2_URL + category1Id);
export const reqC3 = (category2Id: number) => request.get<any, CategoryResponseData>(API.C3_URL + category2Id);

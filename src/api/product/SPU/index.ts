import request from "@/utils/request";
import type { HasSpuResponseData } from "./type";

enum API {
  HASSUP_URL = '/admin/product',
}

export const reqHasSpu = (page: number, limit: number, category3Id: number | string) => request.get<any,HasSpuResponseData>(API.HASSUP_URL + `${page}/${limit}/?category3Id=${category3Id}`);

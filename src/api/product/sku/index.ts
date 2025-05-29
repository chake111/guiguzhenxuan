import request from "@/utils/request";
import type { SkuResponseData } from "./type";

enum API {
  SKU_URL = "/admin/product/list/",
  SALE_URL = "/admin/product/onSale/",
  CANCELSALE_URL = "/admin/product/cancelSale/",
}
export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`);
export const reqSale = (skuId: number) => request.get<any, any>(API.SALE_URL + skuId);
export const reqCancelSale = (skuId: number) => request.get<any, any>(API.CANCELSALE_URL + skuId);

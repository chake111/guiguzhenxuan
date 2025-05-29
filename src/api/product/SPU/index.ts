import request from "@/utils/request";
import type { HasSpuResponseData, AllTradeMark, SpuHasImg, SaleAttrResponse, HasSaleAttrResponseData, SpuData, SkuData, SkuInfoData } from "./type";

enum API {
  HASSUP_URL = '/admin/product',
  ALLTRADEMARK_URL = '/admin/product/getTrademarkList',
  IMAGE_URL = '/admin/product/spuImageList',
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList',
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  SKUINFO = '/admin/product/findBySpuId/',
  REMOVESPU_URL = '/admin/product/deleteSpu/',
}
export const reqHasSpu = (page: number, limit: number, category3Id: number | string) =>
  request.get<any, HasSpuResponseData>(`${API.HASSUP_URL}/${page}/${limit}?category3Id=${category3Id}`);
export const reqAllTradeMark = () => request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL);
export const reqSpuImageList = (spuId: number) => request.get<any, SpuHasImg>(API.IMAGE_URL + spuId);
export const reqSpuHasSaleAttr = (spuId: number) => request.get<any, SaleAttrResponse>(API.SPUHASSALEATTR_URL + spuId);
export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data);
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
}
export const reqAddSku = (data: SkuData) => request.post<any, any>(API.ADDSKU_URL, data);
export const reqSkuList = (spuId: number|string) => request.get<any, SkuInfoData>(`${API.SKUINFO}${spuId}`);

import request from "@/utils/request";
import type { HasSpuResponseData,AllTradeMark, SpuHasImg, SaleAttrResponse,HasSaleAttrResponseData } from "./type";

enum API {
  HASSUP_URL = '/admin/product',
  ALLTRADEMARK_URL = '/admin/product/getTrademarkList',
  IMAGE_URL = '/admin/product/spuImageList',
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList',
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
}

export const reqHasSpu = (page: number, limit: number, category3Id: number | string) =>
  request.get<any,HasSpuResponseData>(`${API.HASSUP_URL}/${page}/${limit}?category3Id=${category3Id}`);
export const reqAllTradeMark = () => request.get<any,AllTradeMark>(API.ALLTRADEMARK_URL);
export const reqSpuImageList = (spuId:number) => request.get<any,SpuHasImg>(API.IMAGE_URL+spuId);
export const reqSpuHasSaleAttr = (spuId:number) => request.get<any,SaleAttrResponse>(API.SPUHASSALEATTR_URL+spuId);
export const reqAllSaleAttr = () => request.get<any,HasSaleAttrResponseData>(API.ALLSALEATTR_URL);

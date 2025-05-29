export interface ResponseData {
  code: number,
  message: string,
  ok: boolean,
}

export interface Attr {
  attrId: string | number,
  valueId: string | number,
}

export interface SaleAttr {
  saleAttrId: string | number,
  saleAttrValueId: string | number,
}

export interface SkuData {
  category3Id: string | number,
  spuId: string | number,
  tmId: string | number,
  skuName: string,
  price: string | number,
  weight: string | number,
  skuDesc: string,
  skuAttrValueList: Attr[],
  skuSaleAttrValueList: SaleAttr[],
  skuDefaultImg: string,
  isSale?: number,
  id?: number,
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[],
}

export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[],
    total: number,
    size: number,
    current: number,
    orders: [],
    optimizeCountSql: boolean,
    hitCount: boolean,
    countId: null,
    maxLimit: null,
    searchCount: boolean,
    pages: number,
  },
}


export interface ResponseData {
  code: number,
  message: string,
  ok: boolean,
}

export interface SpuData {
  id?: number,
  spuName: string,
  description: string,
  category3Id: string | number,
  tmId: number,
  spuSaleAttrList: null,
  spuImageList: null,
}

export type Records = SpuData[];

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number,
  }
}
export interface Trademark {
  id: number,
  tmName: string,
  logoUrl: string,
}
export interface AllTradeMark extends ResponseData {
  data: Trademark[],
}

export interface SpuImag {
  id: number,
  createTime: string,
  updateTime: string,
  spuId: number,
  imgName: string,
  imgUrl: string,
}

export interface SpuHasImg extends ResponseData {
  data: SpuImag[],
}

export interface SaleAttrValue {
  id?: number,
  createTime: null,
  updateTime: null,
  spuId: number,
  saleAttrValueName: string,
  saleAttrName: string,
  isChecked: null,
}

export type spuSaleAttrValueList = SaleAttrValue[];

export interface SaleAttr {
  id?: number,
  createTime: null,
  updateTime: null,
  spuId: number,
  saleAttrValueName: string,
  saleAttrName: string,
  spuSaleAttrValueList: spuSaleAttrValueList,
}

export interface SaleAttrResponse extends ResponseData {
  data: SaleAttr[],
}

export interface HasSaleAttr {
  id: number,
  name: string,
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[],
}

export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

export interface SpuData{
  id?:number,
  spuName:string,
  description:string,
  category3Id:string|number,
  tmId:number,
  spuSaleAttrList:null,
  spuImageList:null,
}

export type Records = SpuData[];

export interface HasSpuResponseData extends ResponseData{
  data:{
    records:Records,
    total:number,
    size:number,
    current:number,
    searchCount:boolean,
    pages:number,
  }
}

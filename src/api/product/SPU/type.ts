import type { ResponseData } from "../trademark/type";

export interface SpuData{
  id?:number,
  supName:string,
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

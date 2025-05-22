export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
export type category1Id = number | string | null;
export type category2Id = number | string | null;
export type category3Id = number | string | null;

export interface CategoryObj {
  id: number | string,
  name: string,
  category1Id?: category1Id,
  category2Id?: category2Id,
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

export interface AttrValue {
  id?: number | string,
  valueName: string,
  attrId?: number | string,
  flag?: boolean,
}

export type AttrValueList = AttrValue[];

export interface Attr {
  id?: number | string,
  attrName: string,
  categoryId?: number | string,
  categoryLevel: number,
  attrValueList: AttrValueList,
}
export type AttrList = Attr[];

export interface AttrResponseData extends ResponseData {
  data: Attr[]
}

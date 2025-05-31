export interface ResponseData{
  code:number,
  message:string,
  ok:boolean,
}

export interface RoleData {
  id?:number,
  createTime?:string,
  updateTime?:string,
  roleName:string,
  remark?:null | string,
}

export type Records = RoleData[];

export interface RoleResponseData extends ResponseData {
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    orders:[],
    searchCount: boolean,
    optimizeCountSql: boolean,
    hitCount: boolean,
    countId: null,
    maxLimit: null,
    pages: number
  }
}

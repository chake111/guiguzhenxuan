export interface ResponseData{
  code: number;
  message: string;
  ok: boolean;
}

export interface Permission {
  id:number;
  createTime:string;
  updateTime:string;
  pid:number;
  name:string;
  code:string;
  toCode:null,
  type:number;
  status:null;
  level:number;
  children?: PermissionList;
  select: boolean;
}

export type PermissionList = Permission[];

export interface PermissionResponseData extends ResponseData {
  data: PermissionList;
}

export interface MenuPrams {
  id?: number;
  code:string;
  level:number;
  name:string;
  pid: number;
}

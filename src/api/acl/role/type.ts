export interface ResponseData {
  code: number,
  message: string,
  ok: boolean,
}

export interface RoleData {
  id?: number,
  createTime?: string,
  updateTime?: string,
  roleName: string,
  remark?: null | string,
}

export type Records = RoleData[];

export interface RoleResponseData extends ResponseData {
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    orders: [],
    searchCount: boolean,
    optimizeCountSql: boolean,
    hitCount: boolean,
    countId: null,
    maxLimit: null,
    pages: number
  }
}

export interface MenuData {
  id: number;
  createTime: string;
  updateTime: string;
  pid: number;
  name: string;
  code: string;
  toCode: string;
  type: number;
  status: null;
  level: number;
  children?: MenuList;
  select: boolean;
}

export type MenuList = MenuData[];

export interface MenuResponseData extends ResponseData {
  data: MenuList;
}

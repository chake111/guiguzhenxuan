export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface UserOperationResponse extends ResponseData {
  data: User | null;
}

export interface BatchDeleteResponse extends ResponseData {
  data: null;
}


export interface UserInfo {
  userId: number;
  username: string;
  avatar: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}

export interface UserSearchParams {
  page: number;
  limit: number;
  username?: string;
}

export interface User {
  id?: number;
  createTime?: string;
  updateTime?: string;
  username?: string;
  password?: string;
  name?: string;
  phone?: string;
  roleName?: string;
}

export type Records = User[];

export interface UserResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponseData extends ResponseData {
  data: string;
}

export interface UserInfoResponseData extends ResponseData {
  data:{
    routes: string[];
    buttons: string[];
    roles: string[];
    name:string;
    avatar:string;
  }
}

// 添加用户操作响应类型
export interface UserOperationResponse extends ResponseData {
  data: User | null;
}

// 添加批量删除响应类型
export interface BatchDeleteResponse extends ResponseData {
  data: null;
}

// 完善用户信息类型
export interface UserInfo {
  userId: number;
  username: string;
  avatar: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}

// 添加用户搜索参数类型
export interface UserSearchParams {
  page: number;
  limit: number;
  username?: string;
}

export interface RoleData {
  id?: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark: string;
}

export type AllRole = RoleData[];

export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole;
    allRolesList: AllRole;
  }
}

export interface SetRoleData {
  roleId: number, 
  userId: number;
}

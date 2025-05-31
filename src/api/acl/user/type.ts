export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
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

export interface loginForm {
  username: string;
  password: string;
}
interface dataType {
  token?: string;
  message?: string;
}
export interface loginResponseData {
  code: number;
  data: dataType;
}
interface userInfo {
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
interface user {
  checkUser: userInfo;
}
export interface userResponseData {
  code: number;
  data: user;
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
  roleIdList: number[],
  userId: number;
}

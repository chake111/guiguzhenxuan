import request from "@/utils/request";
import type { AllRoleResponseData, loginForm, loginResponseData, SetRoleData, User, userResponseData } from './type';
import type { UserResponseData } from "./type";

enum API {
  LOGIN_URL = '/user/login',
  USER_INFO_URL = '/user/info',
  ALLUSER_URL = "/admin/acl/user/",
  ADDUSER_URL = "/admin/acl/user/save",
  UPDATEUSER_URL = "/admin/acl/user/update",
  AllROLE_URL = "/admin/acl/user/toAssign/",
  SETROLE_URL = "/admin/acl/user/doAssignRole/",
  DELELETEUSER_URL = "/admin/acl/user/remove/",
  DELETEBATCHUSER_URL = "/admin/acl/user/batchRemove/",
}

export const reqUserInfo = (() => request.get<any, userResponseData>(API.USER_INFO_URL))
export const reqALLUserInfo = (page: number, limit: number,username: string) => request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}/${username}`);
export const reqLogin = ((data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data))
export const reqAddOrUpdateUser = ((data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data);
  } else {
    return request.post<any, any>(API.ALLUSER_URL, data);
  }
});
export const reqAllRole = ((userId: number) => request.get<any, AllRoleResponseData>(API.AllROLE_URL + userId));
export const reqSetUserRole = ((data: SetRoleData) => request.post<any, any>(API.SETROLE_URL, data));
export const reqRemoveUser = (userId: number) => request.delete<any, any>(API.DELELETEUSER_URL + userId);
export const reqRemoveBatchUser = (idList: number[]) => request.delete<any, any>(API.DELETEBATCHUSER_URL, { data: idList });

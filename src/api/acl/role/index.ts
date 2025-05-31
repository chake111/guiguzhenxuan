import request from "@/utils/request";
import type { RoleData, RoleResponseData } from "./type";
enum API {
  ALLROLE_URL = "/admin/acl/role/",
  ADDROLE_URL = "/admin/acl/role/save",
  UPDATEROLE_URL = "/admin/acl/role/update",
  DELETEROLE_URL = "/admin/acl/role/remove/",
  ALLPERMISSION_URL = "/admin/acl/role/toAssign/",
  SETPERMISSION_URL = "/admin/acl/role/doAssignPermission/",
}

export const reqAllRoleList = (page: number, limit: number, roleName: string) => request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`);
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data);
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data);
  }
}

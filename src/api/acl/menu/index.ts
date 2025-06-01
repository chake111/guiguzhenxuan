import request from "@/utils/request";
import type { MenuPrams, PermissionResponseData } from "./type";
enum API {
    ALLPERMISSION_URL = "/admin/acl/permission",
    ADDMENU_URL = "/admin/acl/permission/save",
    UPDATEMENU_URL = "/admin/acl/permission/update",
    DELETEMENU_URL = "/admin/acl/permission/remove/",
}

export const reqAllPermission = () => request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL);
export const reqAddOrUpdateMenu = (data: MenuPrams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data);
  }else{
    return request.post<any, any>(API.ADDMENU_URL, data);
  }

}
export const reqRemoveMenu = (id: number) => request.delete<any, any>(API.DELETEMENU_URL + id);


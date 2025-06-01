import request from "@/utils/request";
import type { PermissionResponseData } from "./type";
enum API{
    ALLPERMISSION_URL = "/api/acl/permission",
    ADDPERMISSION_URL = "/api/acl/permission",
    UPDATEPERMISSION_URL = "/api/acl/permission",
    REMOVEPERMISSION_URL = "/api/acl/permission",
}

export const reqAllPermission = () => request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL);


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

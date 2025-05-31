import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";


let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, 
    timeout: 5000,
})
request.interceptors.request.use(
    (config) => {
        let userStore = useUserStore();
        if (userStore.token) {
            config.headers.token = userStore.token;
        }
        return config;
    }
)
request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        let message = "";
        if (error.response) {
            let status = error.response.status;
            switch (status) {
                case 401:
                    message = "未授权，请登录";
                    break;
                case 403:
                    message = "没有权限，请联系管理员";
                    break;
                case 404:
                    message = "请求地址错误，请检查后重试";
                    break;
                case 500:
                    message = "服务器错误，请稍后再试";
                    break;
                default:
                    message = "请求失败，请稍后再试";
                    break;
            }
        } else {
            message = error.message || "请求失败，请稍后再试";
        }

        ElMessage({
            message,
            type: "error",
            duration: 2000,
        });

        return Promise.reject(error);
    }
)
export default request;


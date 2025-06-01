import { ref } from "vue";
import { defineStore } from "pinia";
import { reqLogin, reqLogout, reqUserInfo } from "@/api/acl/user/index";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoutes } from "@/router/routes";
import type { LoginFormData, LoginResponseData, UserInfoResponseData } from "@/api/acl/user/type";

export const useUserStore = defineStore("User", () => {
  const token = ref<string | null>(GET_TOKEN());
  const menuRoutes = ref(constantRoutes);
  const username = ref('');
  const avatar = ref('');

  const userLogin = async (data: LoginFormData) => {
    let result: LoginResponseData = await reqLogin(data);
    if (result.code == 200) {
      token.value = result.data as string;
      SET_TOKEN(result.data as string);
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  };

  const userInfo = async () => {
    let result: UserInfoResponseData = await reqUserInfo();
    if (result.code == 200) {
      username.value = result.data.name;
      avatar.value = result.data.avatar;
    } else {
      return Promise.reject(new Error(result.message));
    }
  }

  const userLogout = async () => {
    let result: any = await reqLogout();
    if (result.code == 200) {
      token.value = null;
      menuRoutes.value = constantRoutes;
      username.value = '';
      avatar.value = '';
      REMOVE_TOKEN();
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  }

  return {
    token,
    menuRoutes,
    username,
    avatar,
    userLogin,
    userInfo,
    userLogout,
  };
});

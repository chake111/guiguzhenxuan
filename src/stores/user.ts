import { ref } from "vue";
import { defineStore } from "pinia";
import type { loginForm, loginResponseData } from "@/api/acl/user/type";
import { reqLogin, reqUserInfo } from "@/api/acl/user/index";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoutes } from "@/router/routes";

export const useUserStore = defineStore("User", () => {
  const token = ref<string | null>(GET_TOKEN());
  const menuRoutes = ref(constantRoutes);
  const username = ref('');
  const avatar = ref('');

  const userLogin = async (data: loginForm) => {
    const result: loginResponseData = await reqLogin(data);
    if (result.code === 200) {
      token.value = result.data.token as string;
      SET_TOKEN(result.data.token as string);
      return "ok";
    } else {
      return Promise.reject(new Error(result.data.message));
    }
  };

  const userInfo = async () => {
    let result = await reqUserInfo();
    if (result.code == 200) {
      username.value = result.data.checkUser.username;
      avatar.value = result.data.checkUser.avatar;
    } else { }
  }

  const userLogout = () => {
    token.value = '';
    username.value = '';
    avatar.value = '';
    REMOVE_TOKEN();
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

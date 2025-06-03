import { ref } from "vue";
import { defineStore } from "pinia";
import { reqLogin, reqLogout, reqUserInfo } from "@/api/acl/user/index";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoutes, asyncRoute, anyRoute } from "@/router/routes";
import type { LoginFormData, LoginResponseData, UserInfoResponseData } from "@/api/acl/user/type";
import router from '@/router';
import cloneDeep from "lodash/cloneDeep";

export const useUserStore = defineStore("User", () => {
  const token = ref<string | null>(GET_TOKEN());
  const menuRoutes = ref(constantRoutes);
  const username = ref('');
  const avatar = ref('');
  const buttons = ref<string[]>([]);

  const filterAsyncRoute = (asyncRoute: any, routes: any) => {
    return asyncRoute.filter((item: any) => {
      if (routes.includes(item.name)) {
        if (item.children && item.children.length > 0) {
          item.children = filterAsyncRoute(item.children, routes);
        }
        return true;
      }
      return false;
    })
  }
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
      buttons.value = result.data.buttons;
      let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes);
      menuRoutes.value = [...constantRoutes, ...userAsyncRoute, anyRoute];
      [...userAsyncRoute, anyRoute].forEach((route: any) => {
        router.addRoute(route);
      })
      return 'ok';
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
    buttons,
    userLogin,
    userInfo,
    userLogout,
  };
});

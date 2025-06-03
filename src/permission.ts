import router from "@/router";
import setting from "./setting";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
nprogress.configure({ showSpinner: false });
import { useUserStore } from "./stores/user";
import pinia from "./stores";
import { ElMessage } from "element-plus";
let userStore = useUserStore(pinia);
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.start();
  let token = userStore.token;
  let username = userStore.username;
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' });
    } else {
      if (username) {
        next();
      } else {
        try {
          await userStore.userInfo();
          next({...to});
        } catch (error) {
          ElMessage.error(error as any);
          await userStore.userLogout();
          next({ path: '/login', query: { redirect: to.path } });
        }
      }
    }
  } else {
    if (to.path == '/login' || to.path == '/forgot-password' || to.path == '/register') { // 添加对 /register 的判断
      next();
    } else {
      next({ path: '/login', query: { redirect: to.path } });
    }
  }
})
router.afterEach((_to, _from) => {
  nprogress.done();
})

import pinia from "@/stores";
import { useUserStore } from "@/stores/user";
let userStore = useUserStore(pinia);
export const isHasButton = (app: any) => {

  app.directive('has', {
    mounted(el: any, options: any) {
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el);
      }
    }
  });
}

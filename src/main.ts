import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "@/style/index.scss";
import pinia from "@/stores/index";
import router from '@/router';
import App from '@/App.vue'
import * as ElementPlusIconVue from '@element-plus/icons-vue';
import '@/permission';

const app = createApp(App)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconVue)) {
    app.component(key, component)
}
app.use(ElementPlus, { locale: zhCn })
app.use(router)

app.mount('#app')

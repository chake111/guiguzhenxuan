import { fileURLToPath, URL } from 'node:url'

<<<<<<< HEAD
import { defineConfig } from 'vite'
=======
import { defineConfig,loadEnv } from 'vite'
>>>>>>> 99b9f66 (init)
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
<<<<<<< HEAD
import path from 'node:path'
// https://vite.dev/config/
export default defineConfig(({ command }) => {
=======
// https://vite.dev/config/
export default defineConfig(({ command,mode }) => {
  let env = loadEnv(mode,process.cwd());
>>>>>>> 99b9f66 (init)
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      vueJsx(),
      vueDevTools(),
      viteMockServe({
        enable: command === 'serve',
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@use "@/style/variable.scss" as *;',
        },
      },
    },
<<<<<<< HEAD
=======
    server:{
      proxy:{
        [env.VITE_APP_BASE_API]:{
          target: env.VITE_SERVE,
          changeOrigin:true,
          rewrite: (path) => path.replace(/^\/api/,''),
        }
      }
    }
>>>>>>> 99b9f66 (init)
  }
})

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { fileURLToPath, URL } from 'url';

const pathSrc = fileURLToPath(new URL('./src', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${pathSrc}`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  build: {
    assetsDir: '',
  },
  plugins: [
    vue(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
    // Svg图标配置
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [
        resolve(process.cwd(), 'src/assets/icons/display'),
        resolve(process.cwd(), 'src/assets/icons/other'),
      ],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
});

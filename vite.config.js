import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { plugin as mdPlugin } from 'vite-plugin-markdown'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    vueDevTools(),
    vueSetupExtend(),
    mdPlugin({
      mode: ['html', 'toc'],
      markdownIt: {
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          return ''
        },
      },
    }),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: '0.0.0.0' },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        404: fileURLToPath(new URL('./404.html', import.meta.url)),
      },
    },
  },
  css: { preprocessorOptions: { css: { charset: false } } },
})

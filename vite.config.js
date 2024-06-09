import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    base: '',
    server: {
        proxy: {
            '/api': {
                target: "http://krw.ddns.net:8080/",
                changeOrigin: true,
                secure: false,
            }
        }
    }
})

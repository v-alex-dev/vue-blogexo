/**
 * Vite Configuration for BlogExo Vue.js Application
 * Configures build tools, plugins, and development server settings
 */

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Vite configuration object
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), // Vue.js single file component support
    vueDevTools(), // Vue development tools integration
  ],
  resolve: {
    alias: {
      // Set up '@' alias to point to src directory
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

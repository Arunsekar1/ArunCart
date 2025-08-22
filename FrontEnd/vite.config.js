// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7000',
        changeOrigin: true,
        secure: false
      }
    },
     // **This makes SPA routing work**
    fs: {
      strict: false
    }
  },
  build: {
    rollupOptions: {
      input: '/index.html'
    }
  }
})

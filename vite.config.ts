import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'router'
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor'
            if (id.includes('@supabase')) return 'supabase'
            if (id.includes('@mui') || id.includes('@emotion')) return 'mui'
            if (id.includes('@fontsource')) return 'fonts'
            if (id.includes('html5-qrcode')) return 'qrcode'
            if (id.includes('zustand')) return 'state'
            return 'vendor'
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api-hp-registration.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

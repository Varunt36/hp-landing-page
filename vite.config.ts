import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
          'vendor-mui':      ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-qrcode':   ['html5-qrcode'],
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

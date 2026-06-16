import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Newscryst/",
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
        }
      }
    }
  },
  define: {
    'process.env.VITE_NEWS_API': JSON.stringify(process.env.VITE_NEWS_API)
  }
})

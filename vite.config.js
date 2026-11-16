import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Key stays in the dev server process; it is not exposed to client code.
  const apiKey = loadEnv(mode, process.cwd(), '').CURRENTS_API_KEY || ''
  return {
  plugins: [react()],
  base: "/",
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    proxy: {
      '/api/news': {
        target: 'https://api.currentsapi.services',
        changeOrigin: true,
        rewrite: (path) => {
          const q = new URL(path, 'http://localhost').searchParams
          const params = new URLSearchParams({ language: 'en', apiKey })
          if (q.get('type') === 'search') {
            params.set('keywords', q.get('keywords') || '')
            return `/v1/search?${params}`
          }
          params.set('category', q.get('category') || 'general')
          return `/v1/latest-news?${params}`
        },
      },
    },
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
  }
}
})

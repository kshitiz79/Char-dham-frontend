// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/chardham/',
  plugins: [react()],
  server: {
    proxy: {
      // Redirect all requests from "/bookings" to "http://localhost:8000"
      '/bookings': 'http://localhost:8000',
      '/customers': 'http://localhost:8000'
    }
  }
})

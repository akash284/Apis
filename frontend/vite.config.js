import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

// jaha be bhi /api se call hora wahape ye add krdo taki CORS wle errors n aaye
export default defineConfig({
  server: {
    proxy: {
      '/api' :'http://localhost:3000'
    }
  },
  plugins: [react()],
})

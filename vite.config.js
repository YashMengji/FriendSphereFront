import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_SERVER_URL, //URL of backend
        changeOrigin: true, //Changes the origin of the host header to the target URL
      }
    },
  },
  plugins: [react()],
})

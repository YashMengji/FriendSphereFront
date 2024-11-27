import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // DEPLOYMENT ONLY 
    // proxy: {
    //   "/api": {
    //     target: "https://friendsphereback.onrender.com/", //URL of backend
    //     changeOrigin: true, //Changes the origin of the host header to the target URL
    //     rewrite: (path) =>  path.replace(/^\/api/, "")
    //   }
    // },
  },
  plugins: [react()],
})

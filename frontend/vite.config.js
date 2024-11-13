// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        //target: isLocalhost ? 'http://localhost:5000' : 'http://100.83.156.26:5000', // neil tailscale network
        changeOrigin: true,
      },
    },
  },
});

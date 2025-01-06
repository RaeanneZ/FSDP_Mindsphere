// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (e.g., 'development', 'production').
  const env = loadEnv(mode, process.cwd(), ""); // Load all .env variables
  const isLocalhost = process.env.NODE_ENV === "development";

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      proxy: {
        "/api": {
          target: isLocalhost
            ? "http://localhost:5000"
            : "http://100.97.230.39:5000", // neil tailscale network laptop: http://100.83.156.26:5000
          changeOrigin: true,
        },
      },
    },
    define: {
      // Pass your environment variable to the app code
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        // Vite 8 (Rolldown) requires manualChunks as a function, not an object
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("lucide-react")) return "icons";
            if (
              id.includes("react-router") ||
              id.includes("react-dom") ||
              id.includes("/react/")
            ) {
              return "vendor";
            }
          }
        },
      },
    },
  },
});

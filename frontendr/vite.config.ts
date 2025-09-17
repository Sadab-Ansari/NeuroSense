import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Make environment variables available as globals for compatibility
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || mode),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          clerk: ['@clerk/clerk-react'],
          ui: ['@radix-ui/react-slot', '@radix-ui/react-dialog'],
        },
      },
    },
  },
}));

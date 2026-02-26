import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        // intercept calls starting with /backend to the backend server
        "/backend": {
          target: env.VITE_BACKEND_URL, // backend server
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/backend/, ""), //  remove /backend prefix
        },
      },
    },
  };
});

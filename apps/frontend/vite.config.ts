import process from "node:process";
import { defineConfig, loadEnv, type ServerOptions } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(function ({ mode }) {
  const devConfig: { server?: ServerOptions } = {};

  if (mode == "development") {
    const { BACKEND_PORT } = loadEnv(mode, process.cwd(), "");
    devConfig.server = {
      proxy: {
        "/api/v1": {
          target: `http://localhost:${BACKEND_PORT}/`,
          rewrite(path) {
            return path.replace(/^\/api/, "");
          },
        },
      },
    };
  }

  return { plugins: [react()], ...devConfig };
});

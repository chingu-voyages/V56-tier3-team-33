import react from "@vitejs/plugin-react-swc";
import type { UserConfig } from "vite";

// https://vite.dev/config/
export default { plugins: [react()] } satisfies UserConfig;

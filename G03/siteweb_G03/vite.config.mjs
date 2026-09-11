import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { classicStaticHtml } from "../../scripts/classic-static-build.mjs";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist/client",
    modulePreload: false,
    rollupOptions: { output: { format: "iife", inlineDynamicImports: true } },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react(), classicStaticHtml()],
});

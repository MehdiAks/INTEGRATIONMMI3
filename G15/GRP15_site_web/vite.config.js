import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { classicStaticHtml } from '../../scripts/classic-static-build.mjs'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    modulePreload: false,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } },
  },
  plugins: [
    react(),
    tailwindcss(),
    classicStaticHtml(),
  ],
})

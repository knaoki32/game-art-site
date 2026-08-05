import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' — 配信パスに依存しない相対パス出力(Cloudflare Workers static assets でもそのまま動く)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})

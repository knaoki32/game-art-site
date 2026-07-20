import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' — GitHub Pages のサブパス(https://<user>.github.io/<repo>/)配下でも動く相対パス出力
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})

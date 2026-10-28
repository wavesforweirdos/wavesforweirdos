import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // El manifest lo lee scripts/prerender-meta.mjs para encontrar las capturas con hash
  // (y lo borra al terminar: no se publica).
  build: { manifest: true },
})

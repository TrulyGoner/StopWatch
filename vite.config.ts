import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { analyzer } from 'vite-bundle-analyzer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'production' ? [analyzer()] : [])]
}))

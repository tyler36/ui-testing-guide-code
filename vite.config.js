import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const port = 5173
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: port,
    origin: origin,
    strictPort: true,
  },
  plugins: [react()],
})

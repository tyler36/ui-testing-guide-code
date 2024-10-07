import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

let customConfig = {
  plugins: [react()],
}

if (process.env.DDEV_PRIMARY_URL) {
  const port = 5173
  const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`

  customConfig.server = {
    host: '0.0.0.0',
    port: port,
    origin: origin,
    strictPort: true,
  }
}


// https://vitejs.dev/config/
export default defineConfig(customConfig)

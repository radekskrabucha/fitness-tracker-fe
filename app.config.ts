import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import { defineConfig } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'
import IconSpritePlugin from './plugins/iconsSpriteVitePlugin'

export default defineConfig({
  middleware: 'src/utils/middleware',
  vite: {
    plugins: [ValidateEnv({}), tailwindcss(), IconSpritePlugin()]
  },
  server: {
    preset: 'vercel',
    prerender: {
      routes: ['/']
    }
  }
})

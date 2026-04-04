import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    ...tanstackStart({
      prerender: {
        enabled: true,
      },
    }),
    nitro(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, './src'),
    },
  },
})

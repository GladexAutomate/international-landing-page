import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { briefingImagesPlugin } from './scripts/vite-plugin-briefing-images.js'

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'info',
  plugins: [
    base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: false,
      navigationNotifier: false,
      analyticsTracker: false,
      visualEditAgent: false,
    }),
    react(),
    briefingImagesPlugin(),
  ]
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';

export default defineConfig({
  root: 'renderer',
  plugins: [
    react(),
    electron({
      entry: ['electron/main.ts', 'electron/preload.ts'],
    }),
  ],
  build: {
    outDir: '../dist/renderer',
  },
});

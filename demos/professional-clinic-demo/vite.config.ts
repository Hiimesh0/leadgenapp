import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Relative base for seamless GitHub Pages hosting at /Busns/
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});


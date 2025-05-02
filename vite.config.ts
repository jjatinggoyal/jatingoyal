import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rawPlugin from 'vite-raw-plugin';

export default defineConfig({
  plugins: [
    react(),
    rawPlugin({
      fileRegex: /\.(md)$/
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

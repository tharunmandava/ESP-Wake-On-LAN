import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    hmr: true, // Enable Hot Module Replacement (HMR)
    open: true, // Automatically open the browser
    watch: {usePolling: true},
  }
});
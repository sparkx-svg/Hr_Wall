import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base is relative so the build works when served from a GitHub Pages
// project site (https://<user>.github.io/<repo>/) without hardcoding
// the repo name.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});

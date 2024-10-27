import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import fs from 'fs';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
  server: {
    https: {
      key: fs.readFileSync(`./cert/key.pem`),
      cert: fs.readFileSync(`./cert/cert.pem`),
    },
    proxy: {},
    host: true,
  },
});

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [tailwindcss(), sveltekit()],
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
    /*  https: {
      key: fs.readFileSync(`./cert/key.pem`),
      cert: fs.readFileSync(`./cert/cert.pem`),
    }, */
    proxy: {},
    host: true,
  },
});

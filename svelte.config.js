import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    experimental: {
      remoteFunctions: true,
    },
    csrf: {
      trustedOrigins: ['https://aw.terminaldogma.win'],
    },
    alias: {
      '@': './src',
      $constants: './src/constants',
      $stores: './src/stores',
      $utils: './src/utils',
      $interfaces: './src/interfaces',
      $style: './src/style',
    },
    csp: {
      mode: 'hash',
      directives: {
        'object-src': ['none'],
        //'img-src': ['self', 'https://aw.terminaldogma.win', 'data:', 'localhost:8585'],
        'media-src': ['self', 'https:'],
        'frame-src': ['none'],
        'connect-src': ['self', 'https://aw.terminaldogma.win'],
        'worker-src': ['self'],
        'manifest-src': ['self'],
        'base-uri': ['self'],
        'form-action': ['self'],
        'frame-ancestors': ['none'],
      },
    },
  },
  compilerOptions: {
    discloseVersion: false,
    experimental: {
      async: true,
    },
  },
};

export default config;

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      fallback: '200.html',
    }),
    csrf: {
      checkOrigin: true,
    },
    version: {
      name: process.env.npm_package_version,
      pollInterval: 10000,
    },
    alias: {
      '@': './src',
      $components: './src/components',
      $constants: './src/constants',
      $stores: './src/stores',
      $utils: './src/utils',
      $interfaces: './src/interfaces',
      $style: './src/style',
    },
    csp: {
      mode: 'hash',
      directives: {
        'script-src': ['self'],
        'object-src': ['none'],
        'style-src': ['self'],
        'img-src': ['self'],
        'media-src': ['self', 'https:'],
        'frame-src': ['none'],
        'font-src': ['self'],
        'connect-src': ['self'],
        'worker-src': ['self'],
        'manifest-src': ['self'],
        'base-uri': ['self'],
        'form-action': ['self'],
        'frame-ancestors': ['none'],
        'default-src': ['none'],
      },
    },
  },
  compilerOptions: {
    runes: true,
    discloseVersion: false,
  },
};

export default config;

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
      directives: {
        'script-src': ['self'],
      },
      // must be specified with either the `report-uri` or `report-to` directives, or both
      reportOnly: {
        'script-src': ['self'],
        'report-uri': ['/'],
      },
    },
  },
  compilerOptions: {
    runes: true,
    discloseVersion: false,
  },
};

export default config;

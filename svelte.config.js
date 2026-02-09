import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const buildForNext = process.env.BUILD_FOR_NEXT === '1';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: buildForNext ? adapterStatic({ fallback: '200.html' }) : adapterCloudflare(),
    paths: {
      base: buildForNext ? '/svelte' : ''
    }
  }
};

export default config;

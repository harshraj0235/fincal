#!/usr/bin/env node
/**
 * Selects build: Cloudflare Pages (Next.js static export) vs local (Vite).
 * Cloudflare sets CF_PAGES=1. Use "npm run build" - this script picks the right one.
 */
const { execSync } = require('child_process');

const isCloudflare = process.env.CF_PAGES === '1' || process.env.CF_PAGES === 'true';

if (isCloudflare) {
  console.log('🔷 Cloudflare Pages detected - running Next.js static export');
  execSync('npm install --legacy-peer-deps && npm run generate-sitemaps && node scripts/generate-static-params.cjs && next build', {
    stdio: 'inherit',
    shell: true,
  });
} else {
  console.log('📦 Local build - running Vite build');
  execSync('npm run generate-sitemaps && tsc && vite build', {
    stdio: 'inherit',
    shell: true,
  });
}

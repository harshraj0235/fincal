#!/usr/bin/env node
/**
 * Wrapper to run next build with increased heap.
 * CI (e.g. GitHub Actions): 6GB. Cloudflare/local: 3GB.
 */
const { execSync } = require('child_process');
const heap = process.env.CI === 'true' ? 6144 : 3072;
const env = { ...process.env, NODE_OPTIONS: `--max-old-space-size=${heap}` };
// Update browserslist DB to avoid "caniuse-lite is outdated" warning (optional, non-blocking)
try {
  execSync('npx update-browserslist-db@latest --yes', { stdio: 'pipe', env });
} catch (_) { /* ignore */ }
execSync('npx next build', { stdio: 'inherit', env });

#!/usr/bin/env node
/**
 * Wrapper to run next build with increased heap (Cloudflare Pages has ~4GB limit).
 * Ensures NODE_OPTIONS is set for the child process.
 */
process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --max-old-space-size=4096';
const { execSync } = require('child_process');
execSync('npx next build', { stdio: 'inherit' });

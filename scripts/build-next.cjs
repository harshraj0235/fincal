#!/usr/bin/env node
/**
 * Wrapper to run next build. Pass NODE_OPTIONS explicitly to child.
 */
const { execSync } = require('child_process');
const env = { ...process.env, NODE_OPTIONS: '--max-old-space-size=3072' };
execSync('npx next build', { stdio: 'inherit', env });

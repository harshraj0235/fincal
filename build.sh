#!/usr/bin/env bash
# Cloudflare Pages build - produces static out/ (no handler.mjs)
# Use this as Build command in Cloudflare dashboard: bash build.sh
set -e
echo "=== Cloudflare Pages build (static export) ==="
rm -rf node_modules
npm install --legacy-peer-deps
npm run generate-sitemaps
node scripts/generate-static-params.cjs
next build
echo "=== Build complete - output in out/ ==="

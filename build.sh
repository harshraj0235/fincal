#!/usr/bin/env bash
# Cloudflare Pages build - produces .open-next output
# Use this as Build command in Cloudflare dashboard: bash build.sh
set -e
echo "=== Cloudflare Pages build ==="
npm install --legacy-peer-deps
npm run generate-sitemaps
npx opennextjs-cloudflare build
echo "=== Build complete ==="

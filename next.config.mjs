import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use existing src directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Required for OpenNext/Cloudflare: standalone output
  output: 'standalone',
  // SSR enabled for all pages: real HTML in first response (Google, AdSense, E-E-A-T)
  // SSG + ISR: generate static pages, revalidate for incremental updates
  images: {
    unoptimized: true, // Cloudflare: no Next Image optimization; use unoptimized or add IMAGES binding later
  },
  // Reduce memory during build (Cloudflare Pages has limited RAM)
  productionBrowserSourceMaps: false,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  transpilePackages: [],
  experimental: {
    optimizePackageImports: ['react', 'react-dom', 'lucide-react'],
    webpackMemoryOptimizations: true, // Reduce peak memory (Cloudflare Pages OOM)
  },
  // CSP set in public/_headers (object-src 'none' only) to avoid merging with other CSP
  // Note: Avoid overriding react/react-dom aliases - they can cause "cache is not a function"
  // in _not-found page (Next.js/React cache API resolution breaks on Cloudflare build).
  webpack: (config) => {
    const root = process.cwd();
    const nm = path.join(root, 'node_modules');
    const base = config.resolve.alias || {};
    // Only add scheduler if needed for OOM; do NOT alias react/react-dom
    try {
      const schedulerPath = path.join(nm, 'scheduler');
      config.resolve.alias = { ...base, scheduler: schedulerPath };
    } catch (_) {}
    return config;
  },
};

export default nextConfig;

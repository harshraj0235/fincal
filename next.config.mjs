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
  // Keep heavy client-only packages out of server bundle (Cloudflare 25 MiB limit)
  // Note: recharts omitted - conflicts with transpilePackages
  serverExternalPackages: ['xlsx', 'firebase', 'chart.js', 'd3', 'html2canvas', 'jspdf'],
  // Exclude heavy client-only deps from server bundle (moved from experimental in Next 15)
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@ampproject/**',
      'node_modules/@swc/**',
      'node_modules/eslint/**',
      'node_modules/typescript/**',
      'node_modules/@types/**',
      'node_modules/xlsx/**',
      'node_modules/firebase/**',
      'node_modules/@firebase/**',
      'node_modules/chart.js/**',
      'node_modules/react-chartjs-2/**',
      'node_modules/d3/**',
      'node_modules/d3-*/**',
      'node_modules/recharts/**',
      'node_modules/html2canvas/**',
      'node_modules/jspdf/**',
      'node_modules/canvas/**',
      'node_modules/framer-motion/**',
      'node_modules/react-icons/**',
    ],
  },
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
    const src = path.join(root, 'src');
    const base = config.resolve.alias || {};
    // @/ alias for Cloudflare build (module resolution)
    const aliases = {
      ...base,
      '@': src,
    };
    try {
      const schedulerPath = path.join(nm, 'scheduler');
      aliases.scheduler = schedulerPath;
    } catch (_) {}
    config.resolve.alias = aliases;
    return config;
  },
};

export default nextConfig;

import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Static export for Cloudflare Pages (no handler.mjs / 25 MiB limit)
  output: 'export',
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [{ source: '/app', destination: '/', permanent: false }];
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

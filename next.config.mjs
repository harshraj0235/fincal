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
  transpilePackages: [],
  experimental: {
    optimizePackageImports: ['react', 'react-dom', 'lucide-react'],
  },
  // CSP set in public/_headers (object-src 'none' only) to avoid merging with other CSP
  webpack: (config) => {
    const root = process.cwd();
    const nm = path.join(root, 'node_modules');
    const base = config.resolve.alias || {};
    config.resolve.alias = {
      ...base,
      react: path.join(nm, 'react'),
      'react-dom': path.join(nm, 'react-dom'),
      'react/jsx-runtime': path.join(nm, 'react', 'jsx-runtime.js'),
      'react-dom/client': path.join(nm, 'react-dom', 'client.js'),
    };
    try {
      config.resolve.alias.scheduler = path.join(nm, 'scheduler');
    } catch (_) {}
    return config;
  },
};

export default nextConfig;

import { createRequire } from 'module';
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
    // Force single React/react-dom/scheduler instance to avoid unstable_scheduleCallback
    const base = config.resolve.alias || {};
    config.resolve.alias = {
      ...base,
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'react/jsx-runtime': require.resolve('react/jsx-runtime'),
      'react-dom/client': require.resolve('react-dom/client'),
    };
    try {
      config.resolve.alias.scheduler = require.resolve('scheduler');
    } catch (_) {}
    return config;
  },
};

export default nextConfig;

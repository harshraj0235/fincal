/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use existing src directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Required for OpenNext/Cloudflare: standalone output
  output: 'standalone',
  // SSG + ISR: generate static pages, revalidate for incremental updates
  images: {
    unoptimized: true, // Cloudflare: no Next Image optimization; use unoptimized or add IMAGES binding later
  },
  transpilePackages: [],
  experimental: {
    // optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;

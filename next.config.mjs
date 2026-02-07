/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use existing src directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // SSG + ISR: generate static pages, revalidate for incremental updates
  // output: 'export', // uncomment for static export only (no ISR)
  images: {
    unoptimized: true, // set to false if using next/image with remote images
  },
  // Resolve aliases to match existing src imports
  transpilePackages: [],
  experimental: {
    // optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;

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
    // optimizePackageImports: ['lucide-react'],
  },
  // Fix CSP: object-src must be only 'none' (no other source expressions)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "object-src 'none'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript & Lint: skip for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization: use unoptimized for static export / Cloudflare
  images: {
    unoptimized: true,
  },

  // Trailing slashes for cleaner URLs
  trailingSlash: false,

  // Powered-by header removal for security
  poweredByHeader: false,

  // Compress output
  compress: true,
};

export default nextConfig;

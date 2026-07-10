import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: true },
      avif: { lossless: true },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const normalizedId = id.replace(/\\/g, '/');

          if (normalizedId.includes('node_modules')) {
            // React core + scheduler MUST be in same chunk
            if (normalizedId.includes('react/') || normalizedId.includes('react-dom/') ||
              normalizedId.includes('scheduler/') ||
              normalizedId.includes('react-helmet-async/')) {
              return 'vendor-react';
            }
            if (normalizedId.includes('react-router-dom/') || normalizedId.includes('@remix-run/')) {
              return 'vendor-router';
            }
            // Let Rollup handle ALL other node_modules naturally.
            // DO NOT force framer-motion/lucide/d3/recharts/chart.js into manual chunks —
            // they have circular internal dependencies that break when grouped.
            return undefined;
          }

          // Data-heavy source files — safe to split (no circular deps)
          if (normalizedId.includes('src/data/')) {
            if (normalizedId.includes('blogData1')) return 'blog-data-1';
            if (normalizedId.includes('blogData2')) return 'blog-data-2';
            if (normalizedId.includes('blogData') && !normalizedId.includes('blogData1') && !normalizedId.includes('blogData2')) {
              return 'blog-data';
            }
            if (normalizedId.includes('cryptoData')) return 'crypto-data';
            if (normalizedId.includes('allBlogData')) return 'all-blog-data';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 2000,
    reportCompressedSize: false,
  },
  server: {
    port: 5173,
    host: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vite/client', '@vite/env'],
  },
  css: {
    devSourcemap: false,
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
});
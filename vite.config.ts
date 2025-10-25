import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
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
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 3,
        unsafe_arrows: true,
        unsafe_methods: true,
        toplevel: true,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // AGGRESSIVE CODE SPLITTING for <1 MB bundles
          if (id.includes('node_modules')) {
            // Core React
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'react-core';
            }
            // Router
            if (id.includes('react-router')) {
              return 'router';
            }
            // Icons - load on demand
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Charts - separate and lazy
            if (id.includes('recharts') || id.includes('d3') || id.includes('chart')) {
              return 'charts';
            }
            // Helmet - separate
            if (id.includes('helmet')) {
              return 'helmet';
            }
            // All other vendors
            return 'vendors';
          }
          
          // Lazy load ALL blog data
          if (id.includes('blogData') || id.includes('allBlogData')) {
            return 'blog-data';
          }
          
          // Lazy load crypto data
          if (id.includes('crypto')) {
            return 'crypto-data';
          }
          
          // Lazy load calculators
          if (id.includes('/calculators/')) {
            return 'calculators';
          }
          
          // Lazy load pages
          if (id.includes('/pages/')) {
            const match = id.match(/pages\/([^\/]+)/);
            if (match) return `page-${match[1]}`;
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 300,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    assetsInlineLimit: 4096,
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
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
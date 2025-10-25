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
    modulePreload: {
      polyfill: true,
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // FIX: More conservative code splitting to prevent module errors
          if (id.includes('node_modules')) {
            // Keep React together to prevent context errors
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            // Router
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // Icons
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons';
            }
            // Charts
            if (id.includes('recharts') || id.includes('d3') || id.includes('chart')) {
              return 'vendor-charts';
            }
            // All other vendors together
            return 'vendor-libs';
          }
          
          // Lazy load blog data
          if (id.includes('blogData1')) {
            return 'blog-data-1';
          }
          if (id.includes('blogData') && !id.includes('blogData1')) {
            return 'blog-data';
          }
          if (id.includes('allBlogData')) {
            return 'all-blog-data';
          }
          
          // Lazy load crypto
          if (id.includes('crypto')) {
            return 'crypto-data';
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
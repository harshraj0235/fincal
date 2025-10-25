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
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: false,
    modulePreload: {
      polyfill: false,
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn', 'console.error'],
        passes: 3,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        toplevel: true,
        dead_code: true,
        collapse_vars: true,
        reduce_vars: true,
        join_vars: true,
        sequences: true,
        properties: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        hoist_vars: true,
        if_return: true,
        inline: 3,
      },
      mangle: {
        toplevel: true,
        safari10: true,
        properties: false,
      },
      format: {
        comments: false,
        ecma: 2020,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // ULTRA-AGGRESSIVE: Minimal chunks for fastest load
          if (id.includes('node_modules')) {
            // Single vendor chunk for critical dependencies only
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler') || id.includes('react-router')) {
              return 'vendor';
            }
            // Everything else lazy loaded on demand
            return undefined;
          }
          
          // DO NOT load blog data initially - pure lazy
          if (id.includes('blogData') || id.includes('allBlogData') || id.includes('crypto')) {
            return undefined;
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 200,
    cssCodeSplit: false,
    sourcemap: false,
    reportCompressedSize: false,
    assetsInlineLimit: 8192,
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
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
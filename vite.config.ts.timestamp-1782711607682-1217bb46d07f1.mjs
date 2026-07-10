// vite.config.ts
import { defineConfig } from "file:///C:/Users/harshraj/Downloads/fincal-main%20(10)/fincal-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/harshraj/Downloads/fincal-main%20(10)/fincal-main/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import viteCompression from "file:///C:/Users/harshraj/Downloads/fincal-main%20(10)/fincal-main/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\harshraj\\Downloads\\fincal-main (10)\\fincal-main";
var vite_config_default = defineConfig({
  base: "/",
  plugins: [
    react(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz"
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br"
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  build: {
    target: "es2020",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const normalizedId = id.replace(/\\/g, "/");
          if (normalizedId.includes("node_modules")) {
            if (normalizedId.includes("react/") || normalizedId.includes("react-dom/") || normalizedId.includes("scheduler/") || normalizedId.includes("react-helmet-async/")) {
              return "vendor-react";
            }
            if (normalizedId.includes("react-router-dom/") || normalizedId.includes("@remix-run/")) {
              return "vendor-router";
            }
            return void 0;
          }
          if (normalizedId.includes("src/data/")) {
            if (normalizedId.includes("blogData1")) return "blog-data-1";
            if (normalizedId.includes("blogData2")) return "blog-data-2";
            if (normalizedId.includes("blogData") && !normalizedId.includes("blogData1") && !normalizedId.includes("blogData2")) {
              return "blog-data";
            }
            if (normalizedId.includes("cryptoData")) return "crypto-data";
            if (normalizedId.includes("allBlogData")) return "all-blog-data";
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    },
    chunkSizeWarningLimit: 2e3,
    reportCompressedSize: false
  },
  server: {
    port: 5173,
    host: true
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    exclude: ["@vite/client", "@vite/env"]
  },
  css: {
    devSourcemap: false
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === "development")
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxoYXJzaHJhalxcXFxEb3dubG9hZHNcXFxcZmluY2FsLW1haW4gKDEwKVxcXFxmaW5jYWwtbWFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcaGFyc2hyYWpcXFxcRG93bmxvYWRzXFxcXGZpbmNhbC1tYWluICgxMClcXFxcZmluY2FsLW1haW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2hhcnNocmFqL0Rvd25sb2Fkcy9maW5jYWwtbWFpbiUyMCgxMCkvZmluY2FsLW1haW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6ICcvJyxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdml0ZUNvbXByZXNzaW9uKHtcbiAgICAgIHZlcmJvc2U6IHRydWUsXG4gICAgICBkaXNhYmxlOiBmYWxzZSxcbiAgICAgIHRocmVzaG9sZDogMTAyNDAsXG4gICAgICBhbGdvcml0aG06ICdnemlwJyxcbiAgICAgIGV4dDogJy5neicsXG4gICAgfSksXG4gICAgdml0ZUNvbXByZXNzaW9uKHtcbiAgICAgIHZlcmJvc2U6IHRydWUsXG4gICAgICBkaXNhYmxlOiBmYWxzZSxcbiAgICAgIHRocmVzaG9sZDogMTAyNDAsXG4gICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXG4gICAgICBleHQ6ICcuYnInLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzMjAyMCcsXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRJZCA9IGlkLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcblxuICAgICAgICAgIGlmIChub3JtYWxpemVkSWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICAvLyBSZWFjdCBjb3JlICsgc2NoZWR1bGVyIE1VU1QgYmUgaW4gc2FtZSBjaHVua1xuICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRJZC5pbmNsdWRlcygncmVhY3QvJykgfHwgbm9ybWFsaXplZElkLmluY2x1ZGVzKCdyZWFjdC1kb20vJykgfHxcbiAgICAgICAgICAgICAgbm9ybWFsaXplZElkLmluY2x1ZGVzKCdzY2hlZHVsZXIvJykgfHxcbiAgICAgICAgICAgICAgbm9ybWFsaXplZElkLmluY2x1ZGVzKCdyZWFjdC1oZWxtZXQtYXN5bmMvJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItcmVhY3QnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRJZC5pbmNsdWRlcygncmVhY3Qtcm91dGVyLWRvbS8nKSB8fCBub3JtYWxpemVkSWQuaW5jbHVkZXMoJ0ByZW1peC1ydW4vJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3Itcm91dGVyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIExldCBSb2xsdXAgaGFuZGxlIEFMTCBvdGhlciBub2RlX21vZHVsZXMgbmF0dXJhbGx5LlxuICAgICAgICAgICAgLy8gRE8gTk9UIGZvcmNlIGQzL3JlY2hhcnRzL2NoYXJ0LmpzL2ZyYW1lci1tb3Rpb24vbHVjaWRlIGludG8gbWFudWFsIGNodW5rcyBcdTIwMTRcbiAgICAgICAgICAgIC8vIHRoZXkgaGF2ZSBjaXJjdWxhciBpbnRlcm5hbCBkZXBlbmRlbmNpZXMgdGhhdCBicmVhayB3aGVuIGdyb3VwZWQuXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERhdGEtaGVhdnkgc291cmNlIGZpbGVzIFx1MjAxNCBzYWZlIHRvIHNwbGl0IChubyBjaXJjdWxhciBkZXBzKVxuICAgICAgICAgIGlmIChub3JtYWxpemVkSWQuaW5jbHVkZXMoJ3NyYy9kYXRhLycpKSB7XG4gICAgICAgICAgICBpZiAobm9ybWFsaXplZElkLmluY2x1ZGVzKCdibG9nRGF0YTEnKSkgcmV0dXJuICdibG9nLWRhdGEtMSc7XG4gICAgICAgICAgICBpZiAobm9ybWFsaXplZElkLmluY2x1ZGVzKCdibG9nRGF0YTInKSkgcmV0dXJuICdibG9nLWRhdGEtMic7XG4gICAgICAgICAgICBpZiAobm9ybWFsaXplZElkLmluY2x1ZGVzKCdibG9nRGF0YScpICYmICFub3JtYWxpemVkSWQuaW5jbHVkZXMoJ2Jsb2dEYXRhMScpICYmICFub3JtYWxpemVkSWQuaW5jbHVkZXMoJ2Jsb2dEYXRhMicpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnYmxvZy1kYXRhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub3JtYWxpemVkSWQuaW5jbHVkZXMoJ2NyeXB0b0RhdGEnKSkgcmV0dXJuICdjcnlwdG8tZGF0YSc7XG4gICAgICAgICAgICBpZiAobm9ybWFsaXplZElkLmluY2x1ZGVzKCdhbGxCbG9nRGF0YScpKSByZXR1cm4gJ2FsbC1ibG9nLWRhdGEnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA1MTczLFxuICAgIGhvc3Q6IHRydWUsXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICBleGNsdWRlOiBbJ0B2aXRlL2NsaWVudCcsICdAdml0ZS9lbnYnXSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgZGV2U291cmNlbWFwOiBmYWxzZSxcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgX19ERVZfXzogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpLFxuICB9LFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF3VyxTQUFTLG9CQUFvQjtBQUNyWSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8scUJBQXFCO0FBSDVCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGdCQUFnQjtBQUFBLE1BQ2QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLElBQ0QsZ0JBQWdCO0FBQUEsTUFDZCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWMsQ0FBQyxPQUFPO0FBQ3BCLGdCQUFNLGVBQWUsR0FBRyxRQUFRLE9BQU8sR0FBRztBQUUxQyxjQUFJLGFBQWEsU0FBUyxjQUFjLEdBQUc7QUFFekMsZ0JBQUksYUFBYSxTQUFTLFFBQVEsS0FBSyxhQUFhLFNBQVMsWUFBWSxLQUN2RSxhQUFhLFNBQVMsWUFBWSxLQUNsQyxhQUFhLFNBQVMscUJBQXFCLEdBQUc7QUFDOUMscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksYUFBYSxTQUFTLG1CQUFtQixLQUFLLGFBQWEsU0FBUyxhQUFhLEdBQUc7QUFDdEYscUJBQU87QUFBQSxZQUNUO0FBSUEsbUJBQU87QUFBQSxVQUNUO0FBR0EsY0FBSSxhQUFhLFNBQVMsV0FBVyxHQUFHO0FBQ3RDLGdCQUFJLGFBQWEsU0FBUyxXQUFXLEVBQUcsUUFBTztBQUMvQyxnQkFBSSxhQUFhLFNBQVMsV0FBVyxFQUFHLFFBQU87QUFDL0MsZ0JBQUksYUFBYSxTQUFTLFVBQVUsS0FBSyxDQUFDLGFBQWEsU0FBUyxXQUFXLEtBQUssQ0FBQyxhQUFhLFNBQVMsV0FBVyxHQUFHO0FBQ25ILHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLGFBQWEsU0FBUyxZQUFZLEVBQUcsUUFBTztBQUNoRCxnQkFBSSxhQUFhLFNBQVMsYUFBYSxFQUFHLFFBQU87QUFBQSxVQUNuRDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsSUFDdkIsc0JBQXNCO0FBQUEsRUFDeEI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBLElBQ2xELFNBQVMsQ0FBQyxnQkFBZ0IsV0FBVztBQUFBLEVBQ3ZDO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLFNBQVMsS0FBSyxVQUFVLFFBQVEsSUFBSSxhQUFhLGFBQWE7QUFBQSxFQUNoRTtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMoneyPage = location.pathname.startsWith('/money/');

  return (
    <>
      <Helmet>
        {/* Critical CSS for above-the-fold content */}
        <style>{`
          /* Critical CSS for immediate rendering */
          .critical-loading {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
          .critical-loaded {
            opacity: 1;
          }
          
          /* Preload critical fonts */
          @font-face {
            font-family: 'Inter';
            font-display: swap;
            src: url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          }
          
          /* Optimize images */
          img {
            max-width: 100%;
            height: auto;
            loading: lazy;
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Focus styles for accessibility */
          *:focus {
            outline: 2px solid #10B981;
            outline-offset: 2px;
          }
          
          /* Reduce motion for users who prefer it */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/images/hero-bg.jpg" as="image" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//images.pexels.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preconnect for critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" />
        
        {/* Service Worker registration for PWA */}
        <script>
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `}
        </script>
        
        {/* Performance monitoring */}
        <script>
          {`
            // Core Web Vitals monitoring
            if ('PerformanceObserver' in window) {
              // LCP (Largest Contentful Paint)
              new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                  if (entry.value > 2500) {
                    console.warn('LCP is too slow:', entry.value);
                  }
                }
              }).observe({entryTypes: ['largest-contentful-paint']});
              
              // FID (First Input Delay)
              new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                  if (entry.processingStart - entry.startTime > 100) {
                    console.warn('FID is too slow:', entry.processingStart - entry.startTime);
                  }
                }
              }).observe({entryTypes: ['first-input']});
              
              // CLS (Cumulative Layout Shift)
              new PerformanceObserver((entryList) => {
                let clsValue = 0;
                for (const entry of entryList.getEntries()) {
                  if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                  }
                }
                if (clsValue > 0.1) {
                  console.warn('CLS is too high:', clsValue);
                }
              }).observe({entryTypes: ['layout-shift']});
            }
          `}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex">
          {/* Show Sidebar on all pages except home and /money/* routes */}
          {!isHomePage && !isMoneyPage && (
            <div className="hidden lg:block w-64 bg-neutral-50 border-r border-neutral-200">
              <Sidebar />
            </div>
          )}
          
          <div className="flex-1">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

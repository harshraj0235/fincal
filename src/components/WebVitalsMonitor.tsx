import React, { useEffect } from 'react';
import { trackPerformance } from '../utils/analytics';



const WebVitalsMonitor: React.FC = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const monitorWebVitals = () => {
      // Largest Contentful Paint (LCP)
      const observeLCP = () => {
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime: number };

            if (lastEntry) {
              const val = lastEntry.renderTime || (lastEntry as any).loadTime;
              trackPerformance('LCP', val, 'ms');
              if (import.meta.env.DEV) console.log('LCP:', val);
            }
          });

          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
      };

      // First Input Delay (FID)
      const observeFID = () => {
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              trackPerformance('FID', entry.processingStart - entry.startTime, 'ms');
              if (import.meta.env.DEV) console.log('FID:', entry.processingStart - entry.startTime);
            });
          });

          observer.observe({ entryTypes: ['first-input'] });
        }
      };

      // Cumulative Layout Shift (CLS)
      const observeCLS = () => {
        if ('PerformanceObserver' in window) {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });

            trackPerformance('CLS', clsValue, 'score');
            if (import.meta.env.DEV) console.log('CLS:', clsValue);
          });

          observer.observe({ entryTypes: ['layout-shift'] });
        }
      };

      // First Contentful Paint (FCP)
      const observeFCP = () => {
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              trackPerformance('FCP', entry.startTime, 'ms');
              if (import.meta.env.DEV) console.log('FCP:', entry.startTime);
            });
          });

          observer.observe({ entryTypes: ['paint'] });
        }
      };

      // Time to First Byte (TTFB)
      const observeTTFB = () => {
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.responseStart > 0) {
                const ttfb = entry.responseStart - entry.requestStart;
                trackPerformance('TTFB', ttfb, 'ms');
                if (import.meta.env.DEV) console.log('TTFB:', ttfb);
              }
            });
          });

          observer.observe({ entryTypes: ['navigation'] });
        }
      };

      // Initialize all observers
      observeLCP();
      observeFID();
      observeCLS();
      observeFCP();
      observeTTFB();
    };

    // Monitor page load performance
    const monitorPageLoad = () => {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

          if (navigation) {
            // Page load time
            const loadTime = navigation.loadEventEnd - navigation.fetchStart;
            trackPerformance('Page Load Time', loadTime, 'ms');

            // DOM content loaded time
            const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
            trackPerformance('DOM Content Loaded', domContentLoaded, 'ms');

            // Time to interactive
            const timeToInteractive = navigation.domInteractive - navigation.fetchStart;
            trackPerformance('Time to Interactive', timeToInteractive, 'ms');

            if (import.meta.env.DEV) console.log('Page Load Performance:', {
              loadTime,
              domContentLoaded,
              timeToInteractive
            });
          }
        }, 0);
      });
    };

    // Monitor resource loading performance
    const monitorResourcePerformance = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.duration > 1000) { // Log resources taking more than 1 second
              trackPerformance('Slow Resource', entry.duration, 'ms');
              if (import.meta.env.DEV) console.warn('Slow resource detected:', {
                name: entry.name,
                duration: entry.duration,
                size: entry.transferSize
              });
            }
          });
        });

        observer.observe({ entryTypes: ['resource'] });
      }
    };

    // Monitor long tasks
    const monitorLongTasks = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.duration > 50) { // Tasks longer than 50ms
              trackPerformance('Long Task', entry.duration, 'ms');
              if (import.meta.env.DEV) console.warn('Long task detected:', {
                duration: entry.duration,
                startTime: entry.startTime
              });
            }
          });
        });

        observer.observe({ entryTypes: ['longtask'] });
      }
    };

    // Monitor memory usage
    const monitorMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryUsage = {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit
        };

        trackPerformance('Memory Usage', memoryUsage.used, 'bytes');
        if (import.meta.env.DEV) console.log('Memory Usage:', memoryUsage);

        // Check for memory leaks
        if (memoryUsage.used > memoryUsage.limit * 0.8) {
          if (import.meta.env.DEV) console.warn('High memory usage detected:', memoryUsage);
        }
      }
    };

    // Initialize all monitoring
    monitorWebVitals();
    monitorPageLoad();
    monitorResourcePerformance();
    monitorLongTasks();
    monitorMemoryUsage();

    // Monitor memory usage periodically
    const memoryInterval = setInterval(monitorMemoryUsage, 30000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default WebVitalsMonitor;

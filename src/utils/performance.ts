// Performance optimization utilities

// Debounce function for search and input optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll and resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Lazy load images with intersection observer
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/fonts/inter-var.woff2',
    '/images/logo.svg',
    '/images/hero-bg.webp'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.woff2') ? 'font' : 'image';
    if (resource.endsWith('.woff2')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
};

// Optimize Core Web Vitals
export const optimizeCoreWebVitals = () => {
  // Largest Contentful Paint (LCP) optimization
  const optimizeLCP = () => {
    // Preload hero image
    const heroImage = document.querySelector('.hero-image') as HTMLImageElement;
    if (heroImage) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = heroImage.src;
      link.as = 'image';
      document.head.appendChild(link);
    }
  };

  // First Input Delay (FID) optimization
  const optimizeFID = () => {
    // Defer non-critical JavaScript
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
      script.setAttribute('defer', '');
    });
  };

  // Cumulative Layout Shift (CLS) optimization
  const optimizeCLS = () => {
    // Set explicit dimensions for images
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      if (!img.width && !img.height) {
        img.style.aspectRatio = '16/9';
      }
    });

    // Reserve space for dynamic content
    const dynamicElements = document.querySelectorAll('.dynamic-content');
    dynamicElements.forEach(element => {
      element.style.minHeight = '200px';
    });
  };

  optimizeLCP();
  optimizeFID();
  optimizeCLS();
};

// Resource hints for performance
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://api.moneycal.in' },
    { rel: 'preconnect', href: 'https://cdn.moneycal.in' }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.rel === 'preconnect') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
};

// Service Worker registration - DISABLED to fix module script MIME type issues
// Will be re-enabled after proper configuration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production-disabled') {
    try {
      // Unregister existing service workers first
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Service Worker unregistered');
      }
      
      // Register new service worker (currently disabled)
      // const registration = await navigator.serviceWorker.register('/sw.js');
      // console.log('Service Worker registered:', registration);
    } catch (error) {
      console.log('Service Worker operation failed:', error);
    }
  }
};

// Performance monitoring
export const initPerformanceMonitoring = () => {
  // Monitor Core Web Vitals
  if ('web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry);
        }
      });
    });
    observer.observe({ entryTypes: ['longtask'] });
  }
};

// Bundle size optimization
export const optimizeBundleSize = () => {
  // Dynamic imports for non-critical components
  const lazyComponents = {
    // Add lazy components here when they are created
  };

  return lazyComponents;
};

// Memory optimization
export const optimizeMemory = () => {
  // Clean up event listeners
  const cleanup = () => {
    window.removeEventListener('scroll', throttle(() => {}, 100));
    window.removeEventListener('resize', throttle(() => {}, 100));
  };

  // Clean up on page unload
  window.addEventListener('beforeunload', cleanup);

  // Clean up unused objects
  const cleanupInterval = setInterval(() => {
    if (window.gc) {
      window.gc();
    }
  }, 30000);

  return () => {
    cleanup();
    clearInterval(cleanupInterval);
  };
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  preloadCriticalResources();
  addResourceHints();
  optimizeCoreWebVitals();
  initPerformanceMonitoring();
  registerServiceWorker();
  
  // Initialize lazy loading after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
  } else {
    lazyLoadImages();
  }
};

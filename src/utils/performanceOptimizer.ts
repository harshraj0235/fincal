// Ultra performance optimization utilities

// Defer non-critical scripts
export const deferNonCritical = () => {
  if (typeof window === 'undefined') return;

  // Defer heavy third-party scripts
  const deferScript = (src: string, id: string) => {
    if (document.getElementById(id)) return;
    
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    
    // Load after page is fully loaded
    if (document.readyState === 'complete') {
      document.head.appendChild(script);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => document.head.appendChild(script), 3000);
      });
    }
  };

  // Defer analytics and non-critical scripts
  // deferScript('...', 'deferred-analytics');
};

// Optimize images - add width/height to prevent CLS
export const optimizeImageDimensions = () => {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach((img: any) => {
    if (img.naturalWidth && img.naturalHeight) {
      img.setAttribute('width', img.naturalWidth);
      img.setAttribute('height', img.naturalHeight);
    }
  });
};

// Reduce motion for better performance
export const reduceMotion = () => {
  if (typeof window === 'undefined') return false;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  
  return prefersReducedMotion.matches || isSlowDevice;
};

// Lazy load below-the-fold content
export const lazyLoadBelowFold = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const lazyElements = document.querySelectorAll('[data-lazy]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        element.classList.add('loaded');
        observer.unobserve(element);
      }
    });
  }, {
    rootMargin: '100px',
    threshold: 0.01
  });

  lazyElements.forEach(el => observer.observe(el));
};

// Prefetch critical resources
export const prefetchCritical = () => {
  if (typeof window === 'undefined') return;

  const prefetch = (href: string, as: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = as;
    link.href = href;
    document.head.appendChild(link);
  };

  // Prefetch likely next pages
  setTimeout(() => {
    prefetch('/calculators/emi-calculator', 'document');
    prefetch('/calculators/sip-calculator', 'document');
  }, 5000);
};

// Initialize all optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Run on load
  window.addEventListener('load', () => {
    setTimeout(() => {
      optimizeImageDimensions();
      lazyLoadBelowFold();
      prefetchCritical();
      deferNonCritical();
    }, 1000);
  });
};

// Export for use
if (typeof window !== 'undefined') {
  initPerformanceOptimizations();
}


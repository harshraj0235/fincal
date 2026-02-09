// Preload critical resources for better performance
export const preloadCriticalResources = () => {
  // Preload fonts if using custom fonts
  const fonts = [
    // Add your font URLs here if needed
  ];

  fonts.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = fontUrl;
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = [
    // Add critical above-the-fold images here
  ];

  criticalImages.forEach(imageUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageUrl;
    document.head.appendChild(link);
  });
};

// Call this in main.tsx
if (typeof window !== 'undefined') {
  preloadCriticalResources();
}



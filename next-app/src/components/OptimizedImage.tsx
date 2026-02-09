import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: string;
  fallback?: string;
  sizes?: string;
  quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  placeholder,
  fallback = '/images/placeholder.jpg',
  sizes = '100vw',
  quality = 80
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || fallback);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate WebP and optimized image URLs
  const generateOptimizedSrc = (originalSrc: string, format: 'webp' | 'jpg' | 'png' = 'webp') => {
    if (originalSrc.startsWith('data:') || originalSrc.startsWith('blob:')) {
      return originalSrc;
    }

    // For external images, use a proxy service or return original
    if (originalSrc.startsWith('http')) {
      return originalSrc;
    }

    // For local images, generate optimized versions
    const baseUrl = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = format === 'webp' ? 'webp' : originalSrc.split('.').pop();
    
    return `${baseUrl}.${extension}`;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  // Load optimized image when in view
  useEffect(() => {
    if (!isInView) return;

    const loadImage = async () => {
      try {
        // Try WebP first
        const webpSrc = generateOptimizedSrc(src, 'webp');
        const img = new Image();
        
        img.onload = () => {
          setImageSrc(webpSrc);
          setIsLoaded(true);
        };
        
        img.onerror = () => {
          // Fallback to original format
          const fallbackSrc = generateOptimizedSrc(src, 'jpg');
          const fallbackImg = new Image();
          
          fallbackImg.onload = () => {
            setImageSrc(fallbackSrc);
            setIsLoaded(true);
          };
          
          fallbackImg.onerror = () => {
            setImageSrc(fallback);
            setIsError(true);
            setIsLoaded(true);
          };
          
          fallbackImg.src = fallbackSrc;
        };
        
        img.src = webpSrc;
      } catch (error) {
        setImageSrc(fallback);
        setIsError(true);
        setIsLoaded(true);
      }
    };

    loadImage();
  }, [isInView, src, fallback]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
    setImageSrc(fallback);
  };

  // Calculate aspect ratio to prevent layout shift
  const aspectRatio = width && height ? (height / width) * 100 : undefined;
  
  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        paddingBottom: aspectRatio ? `${aspectRatio}%` : height ? `${height}px` : undefined,
        height: !aspectRatio ? (height ? `${height}px` : 'auto') : undefined
      }}
    >
      {/* Placeholder/Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-xs">Image unavailable</p>
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${aspectRatio ? 'absolute inset-0' : ''} ${className}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        sizes={sizes}
        decoding="async"
      />
    </div>
  );
};

export default OptimizedImage;

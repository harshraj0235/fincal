import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
}

export const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  structuredData
}) => {
  const location = useLocation();
  const currentUrl = `https://moneycal.in${location.pathname}`;
  
  // Set default meta tags based on current path
  useEffect(() => {
    // Track page views for analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('config', 'G-MEASUREMENT_ID', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return (
    <Helmet>
      {title && <title>{title} | MoneyCalc India</title>}
      {description && <meta name="description" content={description} />}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      <link rel="canonical" href={canonicalUrl || currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl || currentUrl} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl || currentUrl} />
      {title && <meta property="twitter:title" content={title} />}
      {description && <meta property="twitter:description" content={description} />}
      {ogImage && <meta property="twitter:image" content={ogImage} />}
      
      {/* Structured Data / Schema.org */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOOptimizer;
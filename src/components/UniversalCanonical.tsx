import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UniversalCanonicalProps {
  customCanonical?: string;
  noIndex?: boolean;
  priority?: 'high' | 'normal' | 'low';
}

const UniversalCanonical: React.FC<UniversalCanonicalProps> = ({
  customCanonical,
  noIndex = false,
  priority = 'normal'
}) => {
  const location = useLocation();

  useEffect(() => {
    // Helper function to set meta tags
    const setMeta = (attr: string, value: string, key: string = 'name') => {
      let meta = document.querySelector(`meta[${key}="${attr}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(key, attr);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', value);
    };

    // Generate canonical URL
    const generateCanonicalUrl = (): string => {
      const baseUrl = 'https://moneycal.in';
      
      if (customCanonical) {
        return customCanonical.startsWith('http') ? customCanonical : `${baseUrl}${customCanonical}`;
      }

      // Clean current path
      let cleanPath = location.pathname;
      
      // Remove trailing slashes except for root
      if (cleanPath !== '/' && cleanPath.endsWith('/')) {
        cleanPath = cleanPath.slice(0, -1);
      }
      
      // Remove common problematic parameters and normalize
      cleanPath = cleanPath
        .replace(/\/+/g, '/') // Remove multiple slashes
        .replace(/\?.*$/, '') // Remove query parameters
        .replace(/#.*$/, ''); // Remove hash fragments
      
      return `${baseUrl}${cleanPath}`;
    };

    const canonicalUrl = generateCanonicalUrl();

    // Set canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Set robots meta based on noIndex and priority
    const robotsContent = noIndex 
      ? 'noindex,nofollow' 
      : priority === 'high' 
        ? 'index,follow,max-image-preview:large,max-snippet:-1'
        : priority === 'low'
          ? 'index,follow,max-snippet:150'
          : 'index,follow';
    
    setMeta('robots', robotsContent);
    setMeta('googlebot', robotsContent);
    setMeta('bingbot', robotsContent);

    // Additional SEO-critical meta tags
    setMeta('referrer', 'origin-when-cross-origin');
    setMeta('format-detection', 'telephone=yes');
    
    // Fix duplicate content issues with alternate URLs
    const alternateUrls = [
      canonicalUrl.replace('https://www.moneycal.in', 'https://moneycal.in'),
      canonicalUrl.replace('https://moneycal.in', 'https://www.moneycal.in'),
      canonicalUrl + '/',
      canonicalUrl.replace(/\/$/, '')
    ].filter((url, index, arr) => url !== canonicalUrl && arr.indexOf(url) === index);

    // Remove any existing alternate links to prevent conflicts
    document.querySelectorAll('link[rel="alternate"]').forEach(link => {
      if (link.getAttribute('hreflang')) return; // Keep hreflang alternates
      link.remove();
    });

    // Enhanced structured data for better content understanding
    const generateStructuredData = () => {
      const baseStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": document.title,
        "description": document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        "inLanguage": "en-IN",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://moneycal.in/#website",
          "url": "https://moneycal.in",
          "name": "MoneyCal India",
          "description": "India's Leading Financial Calculator Platform",
          "publisher": {
            "@type": "Organization",
            "@id": "https://moneycal.in/#organization"
          }
        },
        "potentialAction": {
          "@type": "ReadAction",
          "target": canonicalUrl
        },
        "mainContentOfPage": {
          "@type": "WebPageElement",
          "cssSelector": "main, .main-content, .content, [role='main']"
        }
      };

      // Add page-specific structured data
      if (cleanPath.includes('/festival-tools/')) {
        baseStructuredData["@type"] = "SoftwareApplication";
        baseStructuredData["applicationCategory"] = "FinanceApplication";
        baseStructuredData["operatingSystem"] = "Web";
      } else if (cleanPath.includes('/calculators/')) {
        baseStructuredData["@type"] = "SoftwareApplication";
        baseStructuredData["applicationCategory"] = "CalculatorApplication";
        baseStructuredData["operatingSystem"] = "Web";
      } else if (cleanPath.includes('/government-schemes/')) {
        baseStructuredData["@type"] = "GovernmentService";
        baseStructuredData["serviceType"] = "Government Scheme Information";
      } else if (cleanPath.includes('/exceltool/')) {
        baseStructuredData["@type"] = "SoftwareApplication";
        baseStructuredData["applicationCategory"] = "ProductivityApplication";
        baseStructuredData["operatingSystem"] = "Any";
      }

      return baseStructuredData;
    };

    // Inject structured data
    let structuredDataScript = document.querySelector('script[data-canonical-structured-data]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      structuredDataScript.setAttribute('data-canonical-structured-data', 'true');
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(generateStructuredData());

    // Cleanup function
    return () => {
      // Keep canonical and robots as they're essential
      // Only cleanup if component unmounts completely
    };

  }, [location.pathname, location.search, customCanonical, noIndex, priority]);

  return null; // This component only manages head elements
};

export default UniversalCanonical;

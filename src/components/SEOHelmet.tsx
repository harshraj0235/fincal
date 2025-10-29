import React from 'react';

interface SEOHelmetProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  alternateLanguages?: { [key: string]: string };
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqData?: Array<{ question: string; answer: string }>;
  calculatorData?: {
    name: string;
    description: string;
    category: string;
    features: string[];
  };
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  structuredData,
  articlePublishedTime,
  articleModifiedTime,
  author,
  section,
  tags,
  noIndex,
  noFollow,
  alternateLanguages,
  breadcrumbs,
  faqData,
  calculatorData,
}) => {
  React.useEffect(() => {
    const siteName = 'MoneyCal India';
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName} - India's Top Financial Calculators & Tools`;
    document.title = fullTitle;

    // Helper to set or update a meta tag
    const setMeta = (attr: string, value: string, key: string = 'name') => {
      let meta = document.querySelector(`meta[${key}="${attr}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(key, attr);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', value);
    };

    // Standard meta tags
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);

    // Robots
    if (noIndex || noFollow) {
      setMeta('robots', `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`);
    } else {
      // Remove robots if not needed
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.remove();
    }

    // Enhanced Canonical URL handling
    {
      let canonicalHref = url
        ? (url.startsWith('http') ? url : `https://moneycal.in${url}`)
        : window.location.href;
      
      // Normalize URL to prevent duplicates
      canonicalHref = canonicalHref
        .replace(/\/+/g, '/') // Remove multiple slashes
        .replace(/\?.*$/, '') // Remove query parameters
        .replace(/#.*$/, '') // Remove hash fragments
        .replace(/\/$/, '') // Remove trailing slash except for root
        .replace('://', '://'); // Fix protocol separator

      // Ensure it's always https://moneycal.in (no www)
      canonicalHref = canonicalHref.replace('https://www.moneycal.in', 'https://moneycal.in');
      
      // Handle root URL special case
      if (canonicalHref === 'https://moneycal.in') {
        canonicalHref = 'https://moneycal.in/';
      }
      
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalHref);
      
      // Also set og:url to match canonical
      setMeta('og:url', canonicalHref, 'property');
    }

    // Open Graph tags
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', url ? (url.startsWith('http') ? url : `https://moneycal.in${url}`) : window.location.href, 'property');
    setMeta('og:site_name', siteName, 'property');
    setMeta('og:image', image || 'https://moneycal.in/android-chrome-512x512.png', 'property');
    if (articlePublishedTime) setMeta('article:published_time', articlePublishedTime, 'property');
    if (articleModifiedTime) setMeta('article:modified_time', articleModifiedTime, 'property');
    if (author) setMeta('article:author', author, 'property');
    if (section) setMeta('article:section', section, 'property');
    if (tags && tags.length) setMeta('article:tag', tags.join(','), 'property');

    // Twitter Card tags
    setMeta('twitter:card', (image || 'https://moneycal.in/android-chrome-512x512.png') ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image || 'https://moneycal.in/android-chrome-512x512.png');
    setMeta('twitter:site', '@MoneyCalIN');

    // Alternate language links (hreflang)
    if (alternateLanguages) {
      Object.entries(alternateLanguages).forEach(([lang, href]) => {
        let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', 'alternate');
          link.setAttribute('hreflang', lang);
          document.head.appendChild(link);
        }
        link.setAttribute('href', href);
      });
    }

    // Generate structured data
    let finalStructuredData = structuredData;

    // Add breadcrumb structured data if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url.startsWith('http') ? item.url : `https://moneycal.in${item.url}`
        }))
      };

      if (!finalStructuredData) {
        finalStructuredData = breadcrumbData;
      } else if (Array.isArray(finalStructuredData)) {
        finalStructuredData = [...finalStructuredData, breadcrumbData];
      } else {
        finalStructuredData = [finalStructuredData, breadcrumbData];
      }
    }

    // Add FAQ structured data if provided
    if (faqData && faqData.length > 0) {
      const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };

      if (!finalStructuredData) {
        finalStructuredData = faqStructuredData;
      } else if (Array.isArray(finalStructuredData)) {
        finalStructuredData = [...finalStructuredData, faqStructuredData];
      } else {
        finalStructuredData = [finalStructuredData, faqStructuredData];
      }
    }

    // Add calculator structured data if provided
    if (calculatorData) {
      const calculatorStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": calculatorData.name,
        "description": calculatorData.description,
        "url": url ? (url.startsWith('http') ? url : `https://moneycal.in${url}`) : window.location.href,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "featureList": calculatorData.features,
        "audience": {
          "@type": "Audience",
          "audienceType": "Indian Financial Users"
        },
        "publisher": {
          "@type": "Organization",
          "name": "MoneyCal India",
          "url": "https://moneycal.in"
        }
      };

      if (!finalStructuredData) {
        finalStructuredData = calculatorStructuredData;
      } else if (Array.isArray(finalStructuredData)) {
        finalStructuredData = [...finalStructuredData, calculatorStructuredData];
      } else {
        finalStructuredData = [finalStructuredData, calculatorStructuredData];
      }
    }

    // Structured Data (JSON-LD) - isolate per-page script to avoid clobbering global ones
    const dataHash = btoa(unescape(encodeURIComponent(JSON.stringify({ title, url: url || window.location.pathname })))).slice(0, 12);
    const scriptId = `jsonld-helm-${dataHash}`;
    let jsonLdScript = document.querySelector(`script#${scriptId}`) as HTMLScriptElement | null;
    if (finalStructuredData) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.type = 'application/ld+json';
        jsonLdScript.id = scriptId;
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(finalStructuredData);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }

    // Cleanup function: remove alternate links and JSON-LD if component unmounts
    return () => {
      if (alternateLanguages) {
        Object.keys(alternateLanguages).forEach((lang) => {
          const link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
          if (link) link.remove();
        });
      }
      // Do not remove other JSON-LD scripts; only remove our own tagged one
      if (jsonLdScript) jsonLdScript.remove();
    };
  }, [title, description, keywords, image, url, type, structuredData, articlePublishedTime, articleModifiedTime, author, section, tags, noIndex, noFollow, alternateLanguages, breadcrumbs, faqData, calculatorData]);

  return null;
};

export default SEOHelmet;
    }


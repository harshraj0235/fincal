import React from 'react';

interface AdvancedSEOProps {
  pageType: 'home' | 'calculator' | 'blog' | 'category' | 'hub';
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string;
  structuredData?: object;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqData?: Array<{ question: string; answer: string }>;
  calculatorData?: {
    name: string;
    category: string;
    features: string[];
    faqData?: Array<{ question: string; answer: string }>;
  };
  blogData?: {
    author: string;
    publishedTime: string;
    modifiedTime: string;
    category: string;
    tags: string[];
  };
  categoryData?: {
    name: string;
    description: string;
    calculatorCount: number;
  };
  marketData?: {
    nifty50: number;
    sensex: number;
    goldPrice: number;
    dollarRate: number;
  };
}

const AdvancedSEO: React.FC<AdvancedSEOProps> = ({
  pageType,
  title,
  description,
  url,
  image,
  keywords,
  structuredData,
  breadcrumbs,
  faqData,
  calculatorData,
  blogData,
  categoryData,
  marketData
}) => {
  React.useEffect(() => {
    const siteName = 'MoneyCal India';
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName} - India's Leading Financial Platform`;
    
    // Set document title
    document.title = fullTitle;

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

    // Enhanced meta description with current market data
    let enhancedDescription = description;
    if (marketData && pageType === 'home') {
      enhancedDescription = `${description} Live Nifty 50: ${marketData.nifty50.toLocaleString()}, Sensex: ${marketData.sensex.toLocaleString()}, Gold: ₹${marketData.goldPrice.toLocaleString()}/10g, USD/INR: ₹${marketData.dollarRate}.`;
    }

    // Standard meta tags
    setMeta('description', enhancedDescription);
    setMeta('keywords', getEnhancedKeywords());
    setMeta('author', 'MoneyCal India Team');
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('googlebot', 'index, follow');
    setMeta('bingbot', 'index, follow');

    // Language and locale
    setMeta('language', 'en');
    setMeta('geo.region', 'IN');
    setMeta('geo.country', 'India');
    setMeta('geo.placename', 'India');

    // Enhanced Canonical URL handling
    let canonicalHref = url.startsWith('http') ? url : `https://moneycal.in${url}`;
    
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

    // Open Graph tags
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', enhancedDescription, 'property');
    setMeta('og:type', getOGType(), 'property');
    setMeta('og:url', canonicalHref, 'property');
    setMeta('og:site_name', siteName, 'property');
    setMeta('og:image', image || 'https://moneycal.in/android-chrome-512x512.png', 'property');
    setMeta('og:image:width', '1200', 'property');
    setMeta('og:image:height', '630', 'property');
    setMeta('og:image:alt', title, 'property');
    setMeta('og:locale', 'en_IN', 'property');

    // Article specific Open Graph tags
    if (pageType === 'blog' && blogData) {
      setMeta('article:published_time', blogData.publishedTime, 'property');
      setMeta('article:modified_time', blogData.modifiedTime, 'property');
      setMeta('article:author', blogData.author, 'property');
      setMeta('article:section', blogData.category, 'property');
      setMeta('article:tag', blogData.tags.join(','), 'property');
    }

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', enhancedDescription);
    setMeta('twitter:image', image || 'https://moneycal.in/android-chrome-512x512.png');
    setMeta('twitter:site', '@MoneyCalIN');
    setMeta('twitter:creator', '@MoneyCalIN');

    // Additional SEO meta tags
    setMeta('theme-color', '#2563eb');
    setMeta('msapplication-TileColor', '#2563eb');
    setMeta('apple-mobile-web-app-title', siteName);
    setMeta('application-name', siteName);

    // Hreflang for multilingual support
    const hreflang = document.querySelector('link[rel="alternate"][hreflang="en"]');
    if (!hreflang) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', 'en');
      link.setAttribute('href', canonicalHref);
      document.head.appendChild(link);
    }

    // Generate and inject structured data
    const finalStructuredData = generateStructuredData();
    injectStructuredData(finalStructuredData);

    // Generate and inject breadcrumb structured data
    if (breadcrumbs && breadcrumbs.length > 0) {
      injectBreadcrumbStructuredData(breadcrumbs);
    }

    // Generate and inject FAQ structured data
    if (faqData && faqData.length > 0) {
      injectFAQStructuredData(faqData);
    }

  }, [pageType, title, description, url, image, keywords, structuredData, breadcrumbs, faqData, calculatorData, blogData, categoryData, marketData]);

  const getEnhancedKeywords = () => {
    const baseKeywords = 'financial calculator india, EMI calculator, SIP calculator, income tax calculator, mutual fund calculator, loan calculator, investment calculator, personal finance tools, financial planning india, free financial calculator, moneycal india, finance tools india';
    
    if (keywords) {
      return `${keywords}, ${baseKeywords}`;
    }
    
    switch (pageType) {
      case 'home':
        return `${baseKeywords}, finance hub india, comprehensive finance platform, financial education india, investment guidance india, tax planning india, retirement planning india, insurance planning india, banking services india, government schemes india`;
      case 'calculator':
        return `${calculatorData?.name || 'Financial Calculator'}, ${baseKeywords}, financial tools, money management tools, financial planning tools`;
      case 'blog':
        return `${blogData?.tags?.join(', ') || ''}, financial blog india, investment advice india, tax planning india, personal finance india, ${baseKeywords}`;
      case 'category':
        return `${categoryData?.name || 'Financial Tools'}, ${baseKeywords}, financial category, finance tools category`;
      case 'hub':
        return `${baseKeywords}, finance hub, comprehensive finance, all finance tools, complete finance platform, financial resources india`;
      default:
        return baseKeywords;
    }
  };

  const getOGType = () => {
    switch (pageType) {
      case 'blog':
        return 'article';
      case 'calculator':
        return 'website';
      case 'hub':
        return 'website';
      default:
        return 'website';
    }
  };

  const generateStructuredData = () => {
    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "MoneyCal India",
      "url": "https://moneycal.in",
      "description": "India's leading financial platform with 200+ calculators, tools, and expert guidance for personal finance, investments, loans, insurance, and tax planning.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://moneycal.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MoneyCal India",
        "url": "https://moneycal.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://moneycal.in/android-chrome-512x512.png"
        }
      }
    };

    switch (pageType) {
      case 'home':
        return {
          ...baseStructuredData,
          "@type": "WebSite",
          "name": "MoneyCal India - Complete Financial Platform",
          "description": "India's most comprehensive financial platform with 200+ calculators, real-time market data, expert articles, and tools for personal finance, investments, loans, insurance, and tax planning.",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Financial Tools and Calculators",
            "description": "Complete suite of financial calculators and tools",
            "numberOfItems": 200,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "EMI Calculator",
                "url": "https://moneycal.in/calculators/emi-calculator"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "SIP Calculator",
                "url": "https://moneycal.in/calculators/sip-calculator"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Income Tax Calculator",
                "url": "https://moneycal.in/calculators/income-tax-calculator"
              }
            ]
          }
        };

      case 'calculator':
        return {
          ...baseStructuredData,
          "@type": "WebApplication",
          "name": calculatorData?.name || title,
          "description": description,
          "url": `https://moneycal.in${url}`,
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          },
          "featureList": calculatorData?.features || []
        };

      case 'blog':
        return {
          ...baseStructuredData,
          "@type": "Article",
          "headline": title,
          "description": description,
          "url": `https://moneycal.in${url}`,
          "datePublished": blogData?.publishedTime,
          "dateModified": blogData?.modifiedTime,
          "author": {
            "@type": "Person",
            "name": blogData?.author || "MoneyCal India Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "MoneyCal India",
            "logo": {
              "@type": "ImageObject",
              "url": "https://moneycal.in/android-chrome-512x512.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://moneycal.in${url}`
          }
        };

      case 'hub':
        return {
          ...baseStructuredData,
          "@type": "CollectionPage",
          "name": title,
          "description": description,
          "url": `https://moneycal.in${url}`,
          "mainEntity": {
            "@type": "ItemList",
            "name": "Financial Topics and Tools",
            "description": "Comprehensive collection of financial topics, tools, and resources"
          }
        };

      default:
        return baseStructuredData;
    }
  };

  const injectStructuredData = (data: object) => {
    const hash = btoa(unescape(encodeURIComponent(JSON.stringify({ key: 'adv', pageType, url })))).slice(0, 12);
    const scriptId = `jsonld-adv-${hash}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  };

  const injectBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url.startsWith('http') ? crumb.url : `https://moneycal.in${crumb.url}`
      }))
    };

    const hash = btoa(unescape(encodeURIComponent(JSON.stringify(breadcrumbData)))).slice(0, 12);
    const scriptId = `jsonld-bc-${hash}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(breadcrumbData);
  };

  const injectFAQStructuredData = (faqData: Array<{ question: string; answer: string }>) => {
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

    const hash = btoa(unescape(encodeURIComponent(JSON.stringify(faqStructuredData)))).slice(0, 12);
    const scriptId = `jsonld-faq-${hash}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqStructuredData);
  };

  return null; // This component doesn't render anything
};

export default AdvancedSEO;
    const hash = btoa(unescape(encodeURIComponent(JSON.stringify(faqStructuredData)))).slice(0, 12);
    const scriptId = `jsonld-faq-${hash}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqStructuredData);
  };

  return null; // This component doesn't render anything
};

export default AdvancedSEO;


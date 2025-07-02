import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface EnhancedSEOProps {
  title: string;
  description: string;
  keywords?: string;
  url: string;
  image?: string;
  type?: 'website' | 'article' | 'calculator';
  structuredData?: any;
  tags?: string[];
  category?: string;
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  calculatorData?: {
    name: string;
    description: string;
    inputs: string[];
    outputs: string[];
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    estimatedTime: string;
  };
}

declare global {
  interface Window {
    gtag: any;
  }
}

const EnhancedSEO: React.FC<EnhancedSEOProps> = (props) => {
  const {
    title,
    description,
    keywords = '',
    url,
    image = 'https://financegurus.directory/og-image.jpg',
    type = 'website',
    structuredData,
    tags = [],
    category = '',
    author = 'FinanceGurus',
    publishDate,
    modifiedDate,
    breadcrumbs = [],
    faqs = [],
    calculatorData
  } = props;
  
  const canonicalUrl = `https://financegurus.directory${url}`;
  const fullTitle = title.includes('FinanceGurus') ? title : `${title} | FinanceGurus`;
  
  // Enhanced keywords with semantic variations
  const enhancedKeywords = [
    keywords,
    'financial calculator india',
    'free financial tools',
    'investment calculator',
    'loan calculator',
    'tax calculator india',
    'EMI calculator',
    'SIP calculator',
    'financial planning india'
  ].filter(Boolean).join(', ');

  // Generate comprehensive structured data
  const generateStructuredData = () => {
    const baseData: any = {
      "@context": "https://schema.org",
      "@graph": []
    };

    // WebPage schema
    const webPageSchema = {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      "url": canonicalUrl,
      "name": fullTitle,
      "description": description,
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://financegurus.directory/#website"
      },
      "datePublished": publishDate || new Date().toISOString(),
      "dateModified": modifiedDate || new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "@id": "https://financegurus.directory/#organization"
      },
      "publisher": {
        "@type": "Organization", 
        "@id": "https://financegurus.directory/#organization"
      }
    };

    baseData["@graph"].push(webPageSchema);

    // Organization schema
    const organizationSchema = {
      "@type": "Organization",
      "@id": "https://financegurus.directory/#organization",
      "name": "FinanceGurus",
      "url": "https://financegurus.directory",
      "logo": {
        "@type": "ImageObject",
        "url": "https://financegurus.directory/logo.png",
        "width": 300,
        "height": 100
      },
      "description": "India's most comprehensive financial calculator platform",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "areaServed": "IN",
      "sameAs": [
        "https://twitter.com/FinanceGurusIN",
        "https://facebook.com/FinanceGurusIN",
        "https://linkedin.com/company/financegurus"
      ]
    };

    baseData["@graph"].push(organizationSchema);

    // Calculator-specific schema
    if (calculatorData) {
      const calculatorSchema = {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#calculator`,
        "name": calculatorData.name,
        "description": calculatorData.description,
        "url": canonicalUrl,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "featureList": calculatorData.inputs.concat(calculatorData.outputs),
        "category": calculatorData.category,
        "difficultyLevel": calculatorData.difficulty,
        "timeRequired": calculatorData.estimatedTime,
        "isAccessibleForFree": true,
        "inLanguage": "en-IN"
      };

      baseData["@graph"].push(calculatorSchema);
    }

    // Breadcrumbs schema
    if (breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumbs`,
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      };

      baseData["@graph"].push(breadcrumbSchema);
    }

    // FAQ schema
    if (faqs.length > 0) {
      const faqSchema = {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };

      baseData["@graph"].push(faqSchema);
    }

    // Custom structured data
    if (structuredData) {
      if (Array.isArray(structuredData)) {
        baseData["@graph"].push(...structuredData);
      } else {
        baseData["@graph"].push(structuredData);
      }
    }

    return baseData;
  };

  // Performance optimizations
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = image;
    link.as = 'image';
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [image]);

  // Track page views for analytics
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-8HGE6528Q4', {
        page_title: fullTitle,
        page_location: canonicalUrl,
        content_group1: category || 'General',
        content_group2: type
      });

      if (calculatorData) {
        window.gtag('event', 'calculator_view', {
          event_category: 'Calculator Usage',
          event_label: calculatorData.name
        });
      }
    }
  }, [fullTitle, canonicalUrl, category, type, calculatorData]);

  return React.createElement(Helmet, null,
    React.createElement('title', null, fullTitle),
    React.createElement('meta', { name: 'description', content: description }),
    keywords ? React.createElement('meta', { name: 'keywords', content: enhancedKeywords }) : null,
    React.createElement('meta', { name: 'author', content: author }),
    React.createElement('link', { rel: 'canonical', href: canonicalUrl }),
    React.createElement('meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }),
    React.createElement('meta', { property: 'og:type', content: type }),
    React.createElement('meta', { property: 'og:title', content: fullTitle }),
    React.createElement('meta', { property: 'og:description', content: description }),
    React.createElement('meta', { property: 'og:url', content: canonicalUrl }),
    React.createElement('meta', { property: 'og:image', content: image }),
    React.createElement('meta', { name: 'twitter:card', content: 'summary_large_image' }),
    React.createElement('meta', { name: 'twitter:title', content: fullTitle }),
    React.createElement('meta', { name: 'twitter:description', content: description }),
    React.createElement('meta', { name: 'twitter:image', content: image }),
    React.createElement('script', { 
      type: 'application/ld+json',
      dangerouslySetInnerHTML: { __html: JSON.stringify(generateStructuredData()) }
    })
  );
};

export default EnhancedSEO;
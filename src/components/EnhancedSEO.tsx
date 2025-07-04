import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface EnhancedSEOProps {
  // Core SEO fields
  pageType: 'home' | 'calculator' | 'blog' | 'category' | 'article' | 'government-scheme' | 'crypto' | 'astro-finance';
  title: string;
  description: string;
  url: string;
  
  // Enhanced meta fields
  keywords?: string[];
  focusKeyword?: string;
  relatedKeywords?: string[];
  
  // Content freshness signals
  publishedDate?: string;
  lastModified?: string;
  readingTime?: number;
  
  // Author information for E-A-T
  author?: {
    name: string;
    title?: string;
    bio?: string;
  image?: string;
    url?: string;
  };
  
  // Image optimization
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    type?: string;
  };
  
  // Category and tags
  category?: string;
  tags?: string[];
  
  // Google Discover optimization
  discoverOptimized?: {
    highQualityImages: boolean;
    originalReporting: boolean;
    expertiseSignals: boolean;
    freshContent: boolean;
    trendingTopics?: string[];
  };
  
  // Calculator-specific data
  calculatorData?: {
    name: string;
    description: string;
    category: string;
    features: string[];
    faqData?: Array<{ question: string; answer: string }>;
    relatedCalculators?: string[];
  };
  
  // Blog-specific data
  blogData?: {
    excerpt: string;
    tableOfContents?: Array<{ title: string; id: string }>;
    estimatedReadingTime: number;
    wordCount: number;
    lastUpdated: string;
  };
  
  // Government scheme specific
  governmentSchemeData?: {
    schemeName: string;
    benefits: string[];
    eligibility: string[];
    applicationProcess: string[];
    documents: string[];
    officialWebsite?: string;
    helplineNumber?: string;
  };
  
  // Breadcrumbs
  breadcrumbs?: Array<{ name: string; url: string }>;
  
  // Local SEO
  localSEO?: {
    businessName: string;
    address: string;
    phone: string;
    email: string;
    coordinates: { lat: number; lng: number };
  };
  
  // Performance optimization
  preloadResources?: Array<{ href: string; as: string; type?: string }>;
  
  // Social media optimization
  socialMedia?: {
    twitterHandle?: string;
    facebookPage?: string;
    linkedinCompany?: string;
  };
}

const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  pageType,
  title,
  description,
  url,
  keywords = [],
  focusKeyword,
  relatedKeywords = [],
  publishedDate,
  lastModified,
  readingTime,
  author,
  image,
  category,
  tags = [],
  discoverOptimized,
  calculatorData,
  blogData,
  governmentSchemeData,
  breadcrumbs,
  localSEO,
  preloadResources,
  socialMedia
}) => {
  
  // Generate canonical URL
  const canonicalUrl = url.startsWith('http') ? url : `https://moneycal.in${url}`;

  // Generate structured data based on page type
  const generateStructuredData = () => {
    const baseStructuredData = [];
    
    // Organization schema (always present)
    baseStructuredData.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "FinanceGurus",
      "alternateName": "MoneyCal.in",
      "url": "https://moneycal.in",
      "logo": "https://moneycal.in/logo.png",
      "description": "India's most comprehensive financial calculator platform providing free online financial planning tools",
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@moneycal.in",
        "availableLanguage": ["English", "Hindi"]
      },
      "sameAs": [
        "https://twitter.com/FinanceGurusIN",
        "https://facebook.com/FinanceGurusIN",
        "https://linkedin.com/company/financegurus"
      ],
      "areaServed": {
        "@type": "Country",
        "name": "India"
      }
    });
    
    // WebSite schema
    baseStructuredData.push({
      "@context": "https://schema.org",
        "@type": "WebSite",
      "name": "FinanceGurus",
      "url": "https://moneycal.in",
      "description": "India's most comprehensive financial calculator platform",
      "publisher": {
        "@type": "Organization",
        "name": "FinanceGurus"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://moneycal.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
    
    // Page-specific structured data
    switch (pageType) {
      case 'calculator':
        if (calculatorData) {
          baseStructuredData.push({
              "@context": "https://schema.org",
              "@type": "WebApplication",
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
              "featureList": calculatorData.features,
              "audience": {
                "@type": "Audience",
                "audienceType": "Indian Financial Users"
              },
              "publisher": {
                "@type": "Organization",
                "name": "FinanceGurus",
              "url": "https://moneycal.in"
            },
            "datePublished": publishedDate,
            "dateModified": lastModified
          });
          
          // FAQ schema for calculator
          if (calculatorData.faqData && calculatorData.faqData.length > 0) {
            baseStructuredData.push({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": calculatorData.faqData.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            });
          }
        }
        break;
      
      case 'blog':
      case 'article':
      case 'government-scheme':
        baseStructuredData.push({
              "@context": "https://schema.org",
          "@type": "Article",
              "headline": title,
              "description": description,
          "image": image?.url,
          "author": author ? {
                "@type": "Person",
            "name": author.name,
            "url": author.url,
            "jobTitle": author.title,
            "description": author.bio
          } : {
            "@type": "Organization",
            "name": "FinanceGurus"
              },
              "publisher": {
                "@type": "Organization",
                "name": "FinanceGurus",
            "logo": {
              "@type": "ImageObject",
              "url": "https://moneycal.in/logo.png"
            }
          },
          "datePublished": publishedDate,
          "dateModified": lastModified,
          "mainEntityOfPage": canonicalUrl,
          "articleSection": category,
          "keywords": [...keywords, focusKeyword].filter(Boolean).join(', '),
          "wordCount": blogData?.wordCount,
          "timeRequired": `PT${readingTime || blogData?.estimatedReadingTime || 5}M`
        });
        break;
      
      case 'home':
        baseStructuredData.push({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "FinanceGurus - India's Top Financial Calculators & Tools",
          "description": "Comprehensive financial calculators for Indian users. Calculate EMI, SIP, income tax, mutual funds, and more. Free online financial planning tools.",
          "url": "https://moneycal.in",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Financial Calculators",
            "description": "Collection of 50+ financial calculators for Indian users",
            "numberOfItems": 50,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "WebApplication",
                  "name": "EMI Calculator",
                  "description": "Calculate your loan EMI, total interest, and payment schedule",
                  "url": "https://moneycal.in/calculators/emi-calculator"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "WebApplication",
                  "name": "SIP Calculator",
                  "description": "Plan your investments and calculate returns on SIP investments",
                  "url": "https://moneycal.in/calculators/sip-calculator"
                }
              }
            ]
          }
        });
        break;
    }

    // Breadcrumb schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      baseStructuredData.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url.startsWith('http') ? item.url : `https://moneycal.in${item.url}`
        }))
      });
    }
    
    // Local business schema
    if (localSEO) {
      baseStructuredData.push({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": localSEO.businessName,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": localSEO.address,
          "addressCountry": "IN"
        },
        "telephone": localSEO.phone,
        "email": localSEO.email,
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": localSEO.coordinates.lat,
          "longitude": localSEO.coordinates.lng
        }
      });
    }
    
    return baseStructuredData;
  };
  
  // Generate meta keywords string
  const metaKeywords = [...keywords, focusKeyword, ...relatedKeywords].filter(Boolean).join(', ');
  
  // Generate Open Graph data
  const ogData = {
    title: title,
    description: description,
    url: canonicalUrl,
    type: pageType === 'blog' || pageType === 'article' ? 'article' : 'website',
    image: image?.url || 'https://moneycal.in/og-image.jpg',
    siteName: 'FinanceGurus',
    locale: 'en_IN'
  };
  
  // Generate Twitter Card data
  const twitterData = {
    card: image?.url ? 'summary_large_image' : 'summary',
    title: title,
    description: description,
    image: image?.url,
    site: socialMedia?.twitterHandle || '@FinanceGurusIN'
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <meta name="author" content={author?.name || "FinanceGurus"} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={ogData.title} />
      <meta property="og:description" content={ogData.description} />
      <meta property="og:url" content={ogData.url} />
      <meta property="og:type" content={ogData.type} />
      <meta property="og:image" content={ogData.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={ogData.siteName} />
      <meta property="og:locale" content={ogData.locale} />
      {publishedDate && <meta property="article:published_time" content={publishedDate} />}
      {lastModified && <meta property="article:modified_time" content={lastModified} />}
      {author?.name && <meta property="article:author" content={author.name} />}
      {category && <meta property="article:section" content={category} />}
      {tags.length > 0 && <meta property="article:tag" content={tags.join(', ')} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterData.card} />
      <meta name="twitter:title" content={twitterData.title} />
      <meta name="twitter:description" content={twitterData.description} />
      {twitterData.image && <meta name="twitter:image" content={twitterData.image} />}
      <meta name="twitter:site" content={twitterData.site} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="geo.position" content="20.5937;78.9629" />
      <meta name="ICBM" content="20.5937, 78.9629" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="language" content="English" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Google Discover optimization signals */}
      {discoverOptimized?.freshContent && <meta name="article:published_time" content={publishedDate || new Date().toISOString()} />}
      {discoverOptimized?.highQualityImages && image && (
        <meta property="og:image:secure_url" content={image.url} />
      )}
      
      {/* Preload critical resources */}
      {preloadResources?.map((resource, index) => (
        <link
          key={index}
          rel="preload"
          href={resource.href}
          as={resource.as}
          type={resource.type}
        />
      ))}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
      
      {/* Performance monitoring */}
      <script>
        {`
          // Core Web Vitals monitoring
          if ('PerformanceObserver' in window) {
            // LCP (Largest Contentful Paint)
            new PerformanceObserver((entryList) => {
              for (const entry of entryList.getEntries()) {
                if (entry.value > 2500) {
                  console.warn('LCP is too slow:', entry.value);
                }
              }
            }).observe({entryTypes: ['largest-contentful-paint']});
            
            // FID (First Input Delay)
            new PerformanceObserver((entryList) => {
              for (const entry of entryList.getEntries()) {
                if (entry.processingStart - entry.startTime > 100) {
                  console.warn('FID is too slow:', entry.processingStart - entry.startTime);
                }
              }
            }).observe({entryTypes: ['first-input']});
            
            // CLS (Cumulative Layout Shift)
            new PerformanceObserver((entryList) => {
              let clsValue = 0;
              for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                  clsValue += entry.value;
                }
              }
              if (clsValue > 0.1) {
                console.warn('CLS is too high:', clsValue);
              }
            }).observe({entryTypes: ['layout-shift']});
          }
        `}
      </script>
    </Helmet>
  );
};

export default EnhancedSEO;
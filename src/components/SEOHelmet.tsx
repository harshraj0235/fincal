import React from 'react';
import { Helmet } from 'react-helmet-async';

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
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  url = '/',
  type = 'website',
  structuredData,
  articlePublishedTime,
  articleModifiedTime,
  author = 'FinanceGurus Directory',
  section,
  tags = [],
  noIndex = false,
  noFollow = false,
  alternateLanguages = {}
}) => {
  const fullTitle = title.includes('FinanceGurus') ? title : `${title} | FinanceGurus - India's Top Financial Calculators & Tools`;
  const fullUrl = `https://financegurus.directory${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `https://financegurus.directory${image}`;

  // Default structured data for website
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FinanceGurus Directory",
    "url": "https://financegurus.directory",
    "description": "India's comprehensive financial calculators and tools for loans, investments, taxes, and personal finance planning",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://financegurus.directory/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Organization structured data
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FinanceGurus Directory",
    "url": "https://financegurus.directory",
    "logo": "https://financegurus.directory/logo.png",
    "description": "India's leading platform for financial calculators and personal finance tools",
    "sameAs": [
      "https://twitter.com/financegurus",
      "https://linkedin.com/company/financegurus",
      "https://facebook.com/financegurus"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@financegurus.directory"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots Meta */}
      <meta name="robots" content={noIndex ? "noindex" : "index"} />
      {noFollow && <meta name="robots" content="nofollow" />}
      
      {/* Author and Language */}
      <meta name="author" content={author} />
      <meta name="language" content="en-IN" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="geo.placename" content="India" />
      
      {/* Viewport and Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#10B981" />
      <meta name="msapplication-TileColor" content="#10B981" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="FinanceGurus Directory" />
      <meta property="og:locale" content="en_IN" />
      {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}
      {articleModifiedTime && <meta property="article:modified_time" content={articleModifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags.length > 0 && tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@financegurus" />
      <meta name="twitter:creator" content="@financegurus" />

      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content="FinanceGurus Directory" />
      <meta name="apple-mobile-web-app-title" content="FinanceGurus" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Performance and Security */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Alternate Languages */}
      {Object.entries(alternateLanguages).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.pexels.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
      
      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHelmet;

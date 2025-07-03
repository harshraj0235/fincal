import React from 'react';
import SEOHelmet from './SEOHelmet';

interface EnhancedSEOProps {
  pageType: 'calculator' | 'blog' | 'category' | 'home' | 'about' | 'contact';
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string;
  calculatorData?: {
    name: string;
    description: string;
    category: string;
    features: string[];
    faqData?: Array<{ question: string; answer: string }>;
  };
  blogData?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    tags: string[];
    category: string;
  };
  categoryData?: {
    name: string;
    description: string;
    calculatorCount: number;
  };
}

const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  pageType,
  title,
  description,
  url,
  image,
  keywords,
  calculatorData,
  blogData,
  categoryData
}) => {
  // Generate breadcrumbs based on page type
  const generateBreadcrumbs = () => {
    const baseBreadcrumbs = [{ name: 'Home', url: '/' }];
    
    switch (pageType) {
      case 'calculator':
        return [
          ...baseBreadcrumbs,
          { name: 'Calculators', url: '/#categories' },
          { name: calculatorData?.category || 'Calculator', url: '/#categories' },
          { name: calculatorData?.name || 'Calculator', url }
        ];
      case 'blog':
        return [
          ...baseBreadcrumbs,
          { name: 'Blog', url: '/blog' },
          { name: blogData?.category || 'Article', url: '/blog' },
          { name: title, url }
        ];
      case 'category':
        return [
          ...baseBreadcrumbs,
          { name: 'Calculators', url: '/#categories' },
          { name: categoryData?.name || 'Category', url }
        ];
      default:
        return baseBreadcrumbs;
    }
  };

  // Generate structured data based on page type
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": url.startsWith('http') ? url : `https://financegurus.directory${url}`,
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://financegurus.directory/#website"
      }
    };

    switch (pageType) {
      case 'calculator':
        if (calculatorData) {
          return [
            baseData,
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": calculatorData.name,
              "description": calculatorData.description,
              "url": url.startsWith('http') ? url : `https://financegurus.directory${url}`,
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
                "url": "https://financegurus.directory"
              }
            }
          ];
        }
        break;
      
      case 'blog':
        if (blogData) {
          return [
            baseData,
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": title,
              "description": description,
              "url": url.startsWith('http') ? url : `https://financegurus.directory${url}`,
              "datePublished": blogData.publishedTime,
              "dateModified": blogData.modifiedTime || blogData.publishedTime,
              "author": {
                "@type": "Person",
                "name": blogData.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "FinanceGurus",
                "url": "https://financegurus.directory"
              },
              "articleSection": blogData.category,
              "keywords": blogData.tags.join(', ')
            }
          ];
        }
        break;
      
      case 'category':
        if (categoryData) {
          return [
            baseData,
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": categoryData.name,
              "description": categoryData.description,
              "url": url.startsWith('http') ? url : `https://financegurus.directory${url}`,
              "numberOfItems": categoryData.calculatorCount,
              "publisher": {
                "@type": "Organization",
                "name": "FinanceGurus",
                "url": "https://financegurus.directory"
              }
            }
          ];
        }
        break;
    }

    return baseData;
  };

  // Generate FAQ data if available
  const getFAQData = () => {
    if (pageType === 'calculator' && calculatorData?.faqData) {
      return calculatorData.faqData;
    }
    return undefined;
  };

  // Generate enhanced keywords
  const getEnhancedKeywords = () => {
    const baseKeywords = 'financial calculator india, EMI calculator, SIP calculator, income tax calculator, mutual fund calculator, loan calculator, investment calculator, personal finance tools, financial planning india, free financial calculator';
    
    if (keywords) {
      return `${keywords}, ${baseKeywords}`;
    }
    
    switch (pageType) {
      case 'calculator':
        return `${calculatorData?.name || 'Financial Calculator'}, ${baseKeywords}`;
      case 'blog':
        return `${blogData?.tags?.join(', ') || ''}, financial blog india, investment advice, tax planning, ${baseKeywords}`;
      case 'category':
        return `${categoryData?.name || 'Financial Tools'}, ${baseKeywords}`;
      default:
        return baseKeywords;
    }
  };

  // Generate enhanced description
  const getEnhancedDescription = () => {
    if (description.length > 160) {
      return description.substring(0, 157) + '...';
    }
    return description;
  };

  return (
    <SEOHelmet
      title={title}
      description={getEnhancedDescription()}
      keywords={getEnhancedKeywords()}
      url={url}
      image={image || 'https://financegurus.directory/android-chrome-512x512.png'}
      type={pageType === 'blog' ? 'article' : 'website'}
      structuredData={generateStructuredData()}
      breadcrumbs={generateBreadcrumbs()}
      faqData={getFAQData()}
      calculatorData={calculatorData}
      articlePublishedTime={blogData?.publishedTime}
      articleModifiedTime={blogData?.modifiedTime}
      author={blogData?.author}
      section={blogData?.category}
      tags={blogData?.tags}
    />
  );
};

export default EnhancedSEO;
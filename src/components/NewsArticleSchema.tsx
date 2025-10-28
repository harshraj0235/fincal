import React, { useEffect } from 'react';

export interface NewsArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  category: string;
  keywords?: string[];
  articleBody?: string;
}

/**
 * NewsArticle Schema Component
 * Generates proper NewsArticle structured data for Google News and rich snippets
 * Follows Google's best practices for news content
 */
export const NewsArticleSchema: React.FC<NewsArticleSchemaProps> = ({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  category,
  keywords,
  articleBody
}) => {
  useEffect(() => {
    // Generate NewsArticle schema
    const newsArticleSchema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": headline,
      "description": description,
      "url": `https://moneycal.in${url}`,
      "image": image || "https://moneycal.in/android-chrome-512x512.png",
      "datePublished": datePublished,
      "dateModified": dateModified || datePublished,
      "author": {
        "@type": "Person",
        "name": author.name,
        "url": author.url || "https://moneycal.in/about-us"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MoneyCal India",
        "url": "https://moneycal.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://moneycal.in/logo.png",
          "width": 600,
          "height": 60
        }
      },
      "articleSection": category,
      "keywords": keywords?.join(', '),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://moneycal.in${url}`
      },
      "inLanguage": "en-IN",
      "isAccessibleForFree": "True"
    };

    // Add articleBody if provided (improves understanding)
    if (articleBody) {
      newsArticleSchema["articleBody"] = articleBody.substring(0, 500); // First 500 chars
    }

    // BreadcrumbList schema for navigation
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://moneycal.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "News",
          "item": "https://moneycal.in/news"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": category,
          "item": `https://moneycal.in/news/${category.toLowerCase().replace(/\s+/g, '-')}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": headline
        }
      ]
    };

    // Inject NewsArticle schema
    const newsScript = document.createElement('script');
    newsScript.type = 'application/ld+json';
    newsScript.setAttribute('data-schema-type', 'NewsArticle');
    newsScript.textContent = JSON.stringify(newsArticleSchema);
    document.head.appendChild(newsScript);

    // Inject Breadcrumb schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.setAttribute('data-schema-type', 'Breadcrumb');
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // Cleanup
    return () => {
      const schemas = document.querySelectorAll('script[data-schema-type="NewsArticle"], script[data-schema-type="Breadcrumb"]');
      schemas.forEach(script => script.remove());
    };
  }, [headline, url, datePublished, dateModified, author, category]);

  return null;
};

export default NewsArticleSchema;


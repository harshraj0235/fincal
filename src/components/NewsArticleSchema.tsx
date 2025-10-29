import React, { useEffect } from 'react';

interface NewsArticleSchemaProps {
  headline: string;
  description: string;
  author: {
    name: string;
    image?: string;
  };
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  category?: string;
  keywords?: string[];
  publisher?: {
    name: string;
    logo?: string;
  };
}

const NewsArticleSchema: React.FC<NewsArticleSchemaProps> = ({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
  category,
  keywords,
  publisher = {
    name: 'MoneyCal',
    logo: 'https://moneycal.in/logo.png',
  },
}) => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: headline,
      description: description,
      image: {
        '@type': 'ImageObject',
        url: image || 'https://moneycal.in/default-article-image.jpg',
        width: 1200,
        height: 630,
      },
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: author.name,
        ...(author.image && { image: author.image }),
      },
      publisher: {
        '@type': 'Organization',
        name: publisher.name,
        logo: {
          '@type': 'ImageObject',
          url: publisher.logo || 'https://moneycal.in/logo.png',
          width: 600,
          height: 60,
        },
      },
      ...(category && { articleSection: category }),
      ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://moneycal.in${url}`,
      },
      // Additional Google News requirements
      inLanguage: 'en-IN',
      copyrightYear: new Date(datePublished).getFullYear(),
      copyrightHolder: {
        '@type': 'Organization',
        name: 'MoneyCal',
      },
    };

    const scriptId = 'news-article-schema';
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(schema);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [headline, description, author, datePublished, dateModified, image, url, category, keywords, publisher]);

  return null;
};

export default NewsArticleSchema;


import React, { useEffect } from 'react';

interface NewsArticleSchemaProps {
  title: string;
  description: string;
  author: {
    name: string;
    url?: string;
  };
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  publisher?: {
    name: string;
    logo?: string;
  };
}

const NewsArticleSchema: React.FC<NewsArticleSchemaProps> = ({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
  publisher = {
    name: 'MoneyCal',
    logo: 'https://moneycal.in/logo.png',
  },
}) => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: title,
      description: description,
      image: image || 'https://moneycal.in/default-article-image.jpg',
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: author.name,
        url: author.url,
      },
      publisher: {
        '@type': 'Organization',
        name: publisher.name,
        logo: {
          '@type': 'ImageObject',
          url: publisher.logo,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
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
  }, [title, description, author, datePublished, dateModified, image, url, publisher]);

  return null;
};

export default NewsArticleSchema;


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
    url?: string;
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
        url: `https://moneycal.in/news/author/${author.name.toLowerCase().replace(/\s+/g, '-')}`, // Dynamic author URL
      },
      publisher: {
        '@type': 'Organization',
        name: publisher.name,
        url: publisher.url || 'https://moneycal.in',
        logo: {
          '@type': 'ImageObject',
          url: publisher.logo || 'https://moneycal.in/logo.png',
          width: 600,
          height: 60,
        },
      },
      articleSection: category || 'General News',
      wordCount: description.split(/\s+/).length * 10,
      inLanguage: 'en-IN',
      isAccessibleForFree: 'True',
      hasPart: [
        {
          '@type': 'WebPageElement',
          isAccessibleForFree: 'True',
          cssSelector: '.article-body',
        },
      ],
      copyrightYear: new Date(datePublished).getFullYear(),
      copyrightHolder: {
        '@type': 'Organization',
        name: 'MoneyCal',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://moneycal.in${url}`,
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        xpath: [
          '/html/head/title',
          '/html/head/meta[@name="description"]/@content',
        ],
      },
    };

    const scriptId = 'news-article-schema';
    let script = document.getElementById(scriptId);

    if (!script) {
      const newScript = document.createElement('script');
      newScript.id = scriptId;
      newScript.type = 'application/ld+json';
      document.head.appendChild(newScript);
      script = newScript;
    }

    (script as HTMLScriptElement).textContent = JSON.stringify(schema);

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


import React from 'react';

interface YMYLSchemaGeneratorProps {
  contentType: 'article' | 'calculator' | 'guide' | 'tool';
  title: string;
  description: string;
  authorName: string;
  authorTitle?: string;
  publishedDate: string;
  modifiedDate?: string;
  imageUrl?: string;
  wordCount?: number;
  ratingValue?: number;
  reviewCount?: number;
  expertReview?: {
    reviewerName: string;
    reviewerTitle: string;
    reviewRating: number;
  };
  mainEntity?: {
    name: string;
    description: string;
  };
}

interface SchemaConfig {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

const YMYLSchemaGenerator: React.FC<YMYLSchemaGeneratorProps> = ({
  contentType,
  title,
  description,
  authorName,
  authorTitle,
  publishedDate,
  modifiedDate,
  imageUrl,
  wordCount,
  ratingValue,
  reviewCount,
  expertReview,
  mainEntity,
}) => {
  const generateArticleSchema = (): SchemaConfig => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl || 'https://moneycal.in/default-og.jpg',
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      '@type': 'Person',
      name: authorName,
      ...(authorTitle && { jobTitle: authorTitle }),
      url: 'https://moneycal.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MoneyCal India',
      url: 'https://moneycal.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://moneycal.in/logo.png',
        width: 250,
        height: 60,
      },
    },
    mainEntityOfPage: mainEntity
      ? {
          '@type': 'WebPage',
          '@id': `https://moneycal.in/learn/${mainEntity.name.toLowerCase().replace(/\s+/g, '-')}`,
          name: mainEntity.name,
          description: mainEntity.description,
        }
      : undefined,
    wordCount: wordCount || 1500,
    articleBody: 'This is a comprehensive financial education article',
    ...(expertReview && {
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: expertReview.reviewRating,
          bestRating: 5,
          worstRating: 1,
        },
        author: {
          '@type': 'Person',
          name: expertReview.reviewerName,
          jobTitle: expertReview.reviewerTitle,
        },
      },
    }),
  });

  const generateCalculatorSchema = (): SchemaConfig => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description: description,
    url: `https://moneycal.in/tool/${title.toLowerCase().replace(/\s+/g, '-')}`,
    applicationCategory: 'FinanceApplication',
    creator: {
      '@type': 'Person',
      name: authorName,
      ...(authorTitle && { jobTitle: authorTitle }),
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/OnlineOnly',
    },
  });

  const generateGuideSchema = (): SchemaConfig => ({
    '@context': 'https://schema.org',
    '@type': 'Guide',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: authorName,
      ...(authorTitle && { jobTitle: authorTitle }),
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    publisher: {
      '@type': 'Organization',
      name: 'MoneyCal India',
      logo: {
        '@type': 'ImageObject',
        url: 'https://moneycal.in/logo.png',
      },
    },
    image: imageUrl || 'https://moneycal.in/default-og.jpg',
  });

  const getSchema = (): SchemaConfig => {
    switch (contentType) {
      case 'article':
        return generateArticleSchema();
      case 'calculator':
        return generateCalculatorSchema();
      case 'guide':
        return generateGuideSchema();
      default:
        return generateArticleSchema();
    }
  };

  const schema = getSchema();

  // Effect to inject schema into head
  React.useEffect(() => {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify(schema, null, 2);
    schemaScript.id = 'ymyl-schema-generator';

    // Remove any existing schema script
    const existing = document.getElementById('ymyl-schema-generator');
    if (existing) existing.remove();

    document.head.appendChild(schemaScript);

    return () => {
      const script = document.getElementById('ymyl-schema-generator');
      if (script) script.remove();
    };
  }, [schema]);

  return null; // This component only injects schema, doesn't render anything visible
};

export default YMYLSchemaGenerator;

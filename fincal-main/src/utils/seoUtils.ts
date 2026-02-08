// SEO utility functions for enhanced search engine optimization

export const generateMetaTags = (title: string, description: string, keywords: string[]) => {
  return {
    title: `${title} | MoneyCal India`,
    description,
    keywords: keywords.join(', '),
    'og:title': title,
    'og:description': description,
    'og:type': 'article',
    'og:site_name': 'MoneyCal India',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description
  };
};

export const generateStructuredData = (type: string, data: any) => {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
};
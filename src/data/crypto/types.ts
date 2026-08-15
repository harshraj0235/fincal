export interface CryptoBlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: Array<{
    type: 'heading' | 'paragraph' | 'list' | 'subheading';
    text: string;
  }>;
  category: string;
  tags: string[];
  author: string;
  publishedDate: string;
  lastModified: string;
  readTime: string;
  metaDescription: string;
  keywords: string[];
  coverImage?: string;
  authorImage?: string;
  authorTitle?: string;
  authorBio?: string;
  structuredData: {
    '@context': string;
    '@type': string;
    headline: string;
    description: string;
    author: {
      '@type': string;
      name: string;
    };
    publisher: {
      '@type': string;
      name: string;
      logo: {
        '@type': string;
        url: string;
      };
    };
    datePublished: string;
    dateModified: string;
    mainEntityOfPage: {
      '@type': string;
      '@id': string;
    };
    keywords: string;
  };
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: string;
    siteName: string;
  };
}

/**
 * Type definitions for news articles
 */

export interface NewsArticle {
  id: string;
  slug: string;
  category: string;
  subCategory?: string;
  title: string;
  titleEnglish?: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  authorId: string;
  datePublished: string;
  dateModified: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  trending?: boolean;
  readingTime?: number;
  tags?: string[];
  schemaType?: string;
  googleNewsKeywords?: string[];
}


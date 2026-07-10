export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'subheading' | 'image' | 'quote';
  content?: string;
  items?: string[];
  url?: string;
  caption?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: string;
  authorTitle?: string;
  authorImage?: string;
  authorBio?: string;
  metaDescription: string;
  excerpt: string;
  categories: string[];
  keywords: string[];
  date: string;
  coverImage: string;
  content: ContentBlock[];
  featuredImage?: string;
  videoUrl?: string;
  publishedDate?: string;
  lastModified?: string;
  readingTime?: number;
  schema?: any;
  featured?: boolean;
  views?: number;
  structuredData?: any;
  faqSchema?: Array<{
    question: string;
    answer: string;
  }>;
  openGraph?: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
    siteName: string;
  };
  discoverOptimized?: {
    highQualityImages: boolean;
    originalReporting: boolean;
    expertiseSignals: boolean;
    freshContent: boolean;
  };
  metrics?: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;
  expertVerdict?: {
    rating: number;
    summary: string;
    title?: string;
  };
  prosCons?: {
    pros: string[];
    cons: string[];
  };
  relatedLinks?: Array<{
    title: string;
    url: string;
  }>;
}

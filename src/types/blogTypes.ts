export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  authorTitle?: string;
  authorImage?: string;
  authorBio?: string;
  date: string;
  categories: string[];
  coverImage: string;
  excerpt: string;
  content: ContentSection[];
}

export type ContentSection = 
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string }
  | { type: 'subheading'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'quote'; content: string; author?: string };
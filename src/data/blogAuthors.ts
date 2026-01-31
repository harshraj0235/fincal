/**
 * Blog authors for EEAT – used across all blog posts.
 * Only these four authors are used (like news bylines).
 */

export interface BlogAuthor {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  sameAs?: string[];
}

export const BLOG_AUTHORS: BlogAuthor[] = [
  {
    slug: 'harsh-raj',
    name: 'Harsh Raj',
    role: 'Finance & Technology',
    bio: 'Harsh Raj covers personal finance, investments and tech for MoneyCal. Focus on practical tips for Indian readers.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    sameAs: ['https://www.linkedin.com/in/harshitpatel9/', 'https://x.com/harshitx9'],
  },
  {
    slug: 'saurabh-kumar',
    name: 'Saurabh Kumar',
    role: 'Investment & Markets',
    bio: 'Saurabh Kumar writes on mutual funds, stocks and market trends. Helping readers make informed investment decisions.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    sameAs: [],
  },
  {
    slug: 'vikram',
    name: 'Vikram',
    role: 'Tax & Banking',
    bio: 'Vikram specializes in tax planning, banking and compliance for individuals and small businesses in India.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    sameAs: [],
  },
  {
    slug: 'raushan',
    name: 'Raushan',
    role: 'Personal Finance',
    bio: 'Raushan writes on budgeting, savings and financial literacy. Making money management simple for everyone.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop',
    sameAs: [],
  },
];

const AUTHOR_SLUGS = BLOG_AUTHORS.map((a) => a.slug);

export function getAuthorBySlug(slug: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((a) => a.slug === slug);
}

export function getAuthorSlugForIndex(index: number): string {
  return AUTHOR_SLUGS[index % AUTHOR_SLUGS.length];
}

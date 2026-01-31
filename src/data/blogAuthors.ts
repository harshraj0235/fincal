/**
 * Blog authors for EEAT – used across all blog posts.
 * Four authors: Harsh Raj, Raushan Kumar, Saurabh Kumar, Vikram.
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
    role: 'Software Engineer',
    bio: 'Software engineer with a strong interest in finance. Writes on personal finance, investments and tech for MoneyCal, with a focus on practical tips for Indian readers.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    sameAs: ['https://www.linkedin.com/in/harshitpatel9'],
  },
  {
    slug: 'raushan-kumar',
    name: 'Raushan Kumar',
    role: 'BSc Student',
    bio: 'Pursuing BSc with a keen interest in finance. Enjoys sharing knowledge on budgeting, savings and financial literacy to make money management simple for everyone.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop',
    sameAs: ['https://www.facebook.com/share/1AcZ9Jr2nb/'],
  },
  {
    slug: 'saurabh-kumar',
    name: 'Saurabh Kumar',
    role: 'Graduate',
    bio: 'Graduate with a focus on finance. Writes on mutual funds, stocks and market trends, helping readers make informed investment decisions.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    sameAs: ['https://www.facebook.com/share/1DcAwzKb71/'],
  },
  {
    slug: 'vikram',
    name: 'Vikram',
    role: 'Graduate, UPSC Aspirant',
    bio: 'Completed graduation and currently preparing for UPSC. Writes on tax planning, banking and compliance for individuals and small businesses in India.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    sameAs: ['https://www.facebook.com/share/1JE4QNHs1b/'],
  },
];

const AUTHOR_SLUGS = BLOG_AUTHORS.map((a) => a.slug);

export function getAuthorBySlug(slug: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((a) => a.slug === slug);
}

export function getAuthorSlugForIndex(index: number): string {
  return AUTHOR_SLUGS[index % AUTHOR_SLUGS.length];
}

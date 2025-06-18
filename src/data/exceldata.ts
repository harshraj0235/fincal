// src/data/exceldata.ts

export interface PostSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'image' | 'quote';
  content?: string;
  items?: string[];
  url?: string;
  caption?: string;
  author?: string;
}

export interface ExcelBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  authorImage?: string;
  authorTitle?: string;
  authorBio?: string;
  categories: string[];
  content: PostSection[];
}

export const blogPosts: ExcelBlogPost[] = [
  // Example post (add your own)
  {
    id: '1',
    slug: 'excel-formula-tips',
    title: 'Top 10 Excel Formula Tips for Financial Analysis',
    excerpt: 'Master these Excel formulas to boost the speed and accuracy of your financial analysis.',
    coverImage: '/images/excel-formulas.jpg',
    date: '2025-06-10',
    author: 'John Doe',
    authorImage: '',
    authorTitle: 'Finance Analyst',
    authorBio: 'Excel enthusiast and finance professional.',
    categories: ['Excel', 'Financial Analysis'],
    content: [
      { type: 'paragraph', content: 'Learn the most useful Excel formulas for financial modeling and data analysis...' },
      { type: 'heading', content: '1. SUM, AVERAGE, COUNT' },
      { type: 'list', items: ['SUM(range)', 'AVERAGE(range)', 'COUNT(range)'] },
      { type: 'paragraph', content: 'These basic functions help you quickly summarize data.' }
    ]
  },
  // Add more posts here!
];

// Helper functions
export function getBlogPostBySlug(slug: string): ExcelBlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(slug: string, count: number = 3): ExcelBlogPost[] {
  const post = getBlogPostBySlug(slug);
  if (!post) return [];
  // Find posts that share a category, excluding the current post
  const related = blogPosts.filter(
    p => p.slug !== slug && p.categories.some(cat => post.categories.includes(cat))
  );
  // Fallback: fill up with other posts if not enough related
  if (related.length < count) {
    const others = blogPosts.filter(p => p.slug !== slug && !related.includes(p));
    return [...related, ...others].slice(0, count);
  }
  return related.slice(0, count);
}

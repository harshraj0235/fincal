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
  {
    id: '1',
    slug: 'excel-formula-tips',
    title: 'Top 10 Excel Formula Tips for Financial Analysis',
    excerpt: 'Master these Excel formulas to boost your speed and accuracy in financial analysis.',
    coverImage: '/images/excel-formulas.jpg',
    date: '2025-06-10',
    author: 'John Doe',
    authorImage: '',
    authorTitle: 'Finance Analyst',
    authorBio: 'Excel enthusiast and finance professional.',
    categories: ['Excel', 'Financial Analysis'],
    content: [
      { type: 'paragraph', content: 'Learn the most useful Excel formulas for financial modeling and data analysis.' },
      { type: 'heading', content: '1. SUM, AVERAGE, COUNT' },
      { type: 'list', items: ['SUM(range)', 'AVERAGE(range)', 'COUNT(range)'] },
      { type: 'paragraph', content: 'These basic functions help you quickly summarize data.' }
    ]
  },
  {
    id: '2',
    slug: 'pivot-tables-guide',
    title: 'Pivot Tables: The Ultimate Guide',
    excerpt: 'An in-depth guide on using Pivot Tables in Excel for dynamic data analysis.',
    coverImage: '/images/excel-pivot.jpg',
    date: '2025-06-12',
    author: 'Jane Smith',
    authorImage: '',
    authorTitle: 'Excel Trainer',
    authorBio: 'Jane loves teaching Excel to beginners and pros alike.',
    categories: ['Excel', 'Data Analysis'],
    content: [
      { type: 'paragraph', content: 'Pivot Tables are one of the most powerful features in Excel.' },
      { type: 'heading', content: 'Getting Started' },
      { type: 'paragraph', content: 'To insert a Pivot Table, select your data and go to Insert > Pivot Table.' }
    ]
  }
  // Add more posts as needed
];

// Find post by slug
export function getBlogPostBySlug(slug: string): ExcelBlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Get related posts (by shared category, fallback to others)
export function getRelatedPosts(slug: string, count: number = 3): ExcelBlogPost[] {
  const post = getBlogPostBySlug(slug);
  if (!post) return [];
  const related = blogPosts.filter(
    p => p.slug !== slug && p.categories.some(cat => post.categories.includes(cat))
  );
  if (related.length < count) {
    const others = blogPosts.filter(p => p.slug !== slug && !related.includes(p));
    return [...related, ...others].slice(0, count);
  }
  return related.slice(0, count);
}

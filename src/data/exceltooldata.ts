// src/data/exceltooldata.ts

export interface ExcelToolBlogPostSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'image' | 'quote';
  content?: string;
  items?: string[];
  url?: string;
  caption?: string;
  author?: string;
}

export interface ExcelToolBlogPost {
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
  content: ExcelToolBlogPostSection[];
}

export const excelToolBlogPosts: ExcelToolBlogPost[] = [
  {
    id: '1',
    slug: 'excel-formula-shortcuts',
    title: 'Essential Excel Formula Shortcuts',
    excerpt: 'Boost your productivity with these essential Excel formula shortcuts.',
    coverImage: '/images/excel-formulas.jpg',
    date: '2025-06-18',
    author: 'John Excel',
    authorImage: '',
    authorTitle: 'Excel Expert',
    authorBio: 'John has 10+ years experience with Excel for finance.',
    categories: ['Formulas', 'Shortcuts'],
    content: [
      { type: 'paragraph', content: 'Discover time-saving formula shortcuts in Excel that every pro should know!' },
      { type: 'heading', content: 'SUM, AVERAGE, and COUNT' },
      { type: 'list', items: ['SUM(range)', 'AVERAGE(range)', 'COUNT(range)'] },
      { type: 'paragraph', content: 'Use these to quickly summarize data ranges.' },
    ]
  },
  {
    id: '2',
    slug: 'excel-pivot-tables',
    title: 'Mastering Pivot Tables in Excel',
    excerpt: 'Unlock the true power of your data with pivot tables.',
    coverImage: '/images/excel-pivot.jpg',
    date: '2025-06-19',
    author: 'Jane Sheet',
    authorImage: '',
    authorTitle: 'Data Analyst',
    authorBio: 'Jane loves simplifying data analysis for everyone.',
    categories: ['Pivot Tables', 'Analysis'],
    content: [
      { type: 'paragraph', content: 'Pivot Tables make it easy to analyze complex data.' },
      { type: 'heading', content: 'Getting Started' },
      { type: 'paragraph', content: 'Select your data, then Insert > Pivot Table.' }
    ]
  }
];

export function getExcelToolBlogPostBySlug(slug: string): ExcelToolBlogPost | undefined {
  return excelToolBlogPosts.find(post => post.slug === slug);
}

export function getRelatedExcelToolBlogPosts(slug: string, count: number = 3): ExcelToolBlogPost[] {
  const post = getExcelToolBlogPostBySlug(slug);
  if (!post) return [];
  const related = excelToolBlogPosts.filter(
    p => p.slug !== slug && p.categories.some(cat => post.categories.includes(cat))
  );
  if (related.length < count) {
    const others = excelToolBlogPosts.filter(p => p.slug !== slug && !related.includes(p));
    return [...related, ...others].slice(0, count);
  }
  return related.slice(0, count);
}

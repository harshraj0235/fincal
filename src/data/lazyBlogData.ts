// Lazy-loaded blog data — loads only what's needed, in correct priority order.
// blogData.ts (~4MB) and blogData1.ts (~5.4MB) are split into separate chunks by Vite.
import { sanitizeDeepContent } from '../utils/contentSanitizer';

let cache: any[] | null = null;

export const loadAllBlogData = async (): Promise<any[]> => {
  if (cache !== null) return cache;

  const sources: Promise<any[]>[] = [
    // Temporarily disabled: this chunk can crash in production on some deployments.
    // Re-enable after blogData2 modules are normalized and validated end-to-end.
    Promise.resolve([]),
    import('./blogs').then(m => m.blogs || []).catch(() => []),
    import('./seo-blog-posts').then(m => m.seoBlogPosts || []).catch(() => []),
    import('./optimizedBlogPosts').then(m => m.optimizedBlogPosts || []).catch(() => []),
    import('./financePosts').then(m =>
      (m.financePosts || []).map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        date: p.createdAt,
        author: p.author || 'Finance Team',
        excerpt: p.content ? String(p.content).substring(0, 160) + '...' : '',
        content: [{ type: 'paragraph', content: p.content }],
        categories: p.category ? [p.category] : ['Finance'],
        coverImage: p.image || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
        readingTime: 3,
      }))
    ).catch(() => []),
    import('./exceltooldata').then(m => m.excelToolBlogPosts || []).catch(() => []),
    import('./newExcelData').then(m => m.newExcelToolBlogPosts || []).catch(() => []),
    // Large files loaded last  
    import('./blogData').then(m => m.blogPosts || []).catch(() => []),
    import('./blogData1').then(m => m.blogPosts || []).catch(() => []),
  ];

  const results = await Promise.allSettled(sources);
  const posts: any[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled' && Array.isArray(r.value)) {
      posts.push(...r.value);
    }
  }

  const validPosts = sanitizeDeepContent(posts.filter(Boolean));
  cache = validPosts;
  return validPosts;
};

// Backward-compat alias
export const loadBlogData = loadAllBlogData;

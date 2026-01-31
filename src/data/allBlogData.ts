import { blogPosts as blogPosts0 } from './blogData';
import { blogPosts as blogPosts1 } from './blogData1';
import { blogs as newFolderBlogs } from './blogs';
import { diyBusinessBlogs } from './blogData2';
import { getAuthorSlugForIndex } from './blogAuthors';

// Combine all blog posts and enrich with EEAT fields: author (one of 4), lastUpdated, searchableKeywords
const rawPosts = [...diyBusinessBlogs, ...newFolderBlogs, ...blogPosts1, ...blogPosts0];

export const allBlogPosts = rawPosts.map((post: any, index: number) => {
  const categories = post.categories || [];
  const title = post.title || '';
  const excerpt = post.excerpt || '';
  const keywords = [
    ...new Set([
      ...categories,
      ...title.split(/\s+/).filter((w: string) => w.length > 3),
      'personal finance India',
      'investment tips',
      'money management',
    ]),
  ].slice(0, 15);
  return {
    ...post,
    authorSlug: getAuthorSlugForIndex(index),
    lastUpdated: post.lastUpdated || post.date,
    searchableKeywords: keywords,
  };
});

// Helper function to get blog post by slug
export function getBlogPostBySlug(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();
  return allBlogPosts.find((post: any) => (post.slug || '').trim().toLowerCase() === normalizedSlug);
}

// Helper function to get related/suggested posts (same category, then latest)
export function getRelatedPosts(slug: string, count: number) {
  const currentPost = getBlogPostBySlug(slug);
  if (!currentPost) return [];
  const cats = (currentPost as any).categories || [];
  return allBlogPosts
    .filter((p: any) => p.slug !== slug)
    .sort((a: any, b: any) => {
      const aMatch = (a.categories || []).filter((c: string) => cats.includes(c)).length;
      const bMatch = (b.categories || []).filter((c: string) => cats.includes(c)).length;
      if (bMatch !== aMatch) return bMatch - aMatch;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, count);
}

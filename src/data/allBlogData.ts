import { blogPosts as blogPosts0 } from './blogData';
import { blogPosts as blogPosts1 } from './blogData1';
import { blogPosts as blogPosts2 } from './blogdata2';

export const allBlogPosts = [...blogPosts0, ...blogPosts1,...blogPosts2];

// If you have getBlogPostBySlug and getRelatedPosts, re-export or adjust them to use allBlogPosts:
export function getBlogPostBySlug(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();
  return allBlogPosts.find(post => post.slug.trim().toLowerCase() === normalizedSlug);
}

export function getRelatedPosts(slug: string, count: number) {
  const currentPost = getBlogPostBySlug(slug);
  if (!currentPost) return [];
  // Exclude current post, then filter by category, date, etc. as needed
  return allBlogPosts
    .filter(p => p.slug !== slug && p.categories.some(cat => currentPost.categories.includes(cat)))
    .slice(0, count);
}

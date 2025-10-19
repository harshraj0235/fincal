import { blogPosts as blogPosts0 } from './blogData';
import { blogPosts as blogPosts1 } from './blogData1';
import { blogs as newFolderBlogs } from './blogs';
import { diyBusinessBlogs } from './blogData2';

// Combine all blog posts from different sources
export const allBlogPosts = [...diyBusinessBlogs, ...newFolderBlogs, ...blogPosts1, ...blogPosts0];

// Helper function to get blog post by slug
export function getBlogPostBySlug(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();
  return allBlogPosts.find(post => post.slug.trim().toLowerCase() === normalizedSlug);
}

// Helper function to get related posts
export function getRelatedPosts(slug: string, count: number) {
  const currentPost = getBlogPostBySlug(slug);
  if (!currentPost) return [];
  
  // Exclude current post, then filter by category, date, etc. as needed
  return allBlogPosts
    .filter(p => p.slug !== slug && p.categories.some(cat => currentPost.categories.includes(cat)))
    .slice(0, count);
}

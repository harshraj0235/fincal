import { blogPosts as blogPosts0 } from './blogData';
import { blogPosts as blogPosts1 } from './blogData1';
import { blogs as newFolderBlogs } from './blogs';
import { seoBlogPosts } from './seo-blog-posts';
import { optimizedBlogPosts } from './optimizedBlogPosts';
import { financePosts } from './financePosts';
import { excelToolBlogPosts } from './exceltooldata';
import { newExcelToolBlogPosts } from './newExcelData';
import type { BlogPost } from './blogs/types';
import { sanitizeTextContent } from '../utils/contentSanitizer';

const BLOG_AUTHOR = 'Harsh Raj';

function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') return text;
  return sanitizeTextContent(text);
}

/**
 * Simple, non-recursive sanitization for top-level fields
 */
function sanitizePost(post: any): BlogPost {
  if (!post || typeof post !== 'object') return post;

  try {
    const result = { ...post };
    const keysToSanitize = ['title', 'excerpt', 'author', 'metaDescription', 'description'];

    keysToSanitize.forEach(key => {
      if (typeof result[key] === 'string') {
        result[key] = sanitizeText(result[key]);
      }
    });

    // Recursively sanitize content array
    if (Array.isArray(result.content)) {
      result.content = result.content.filter(Boolean).map((section: any) => {
        if (!section || typeof section !== 'object') return section;

        const sanitizedSection = { ...section };
        // Sanitize 'content' field if present (headings, paragraphs, subheadings)
        if (typeof sanitizedSection.content === 'string') {
          sanitizedSection.content = sanitizeText(sanitizedSection.content);
        }
        // Sanitize 'items' field if present (lists)
        if (Array.isArray(sanitizedSection.items)) {
          sanitizedSection.items = sanitizedSection.items
            .filter((item: any) => item !== null && item !== undefined)
            .map((item: any) => {
              if (typeof item === 'string') return sanitizeText(item);
              if (typeof item === 'object' && item.content) return sanitizeText(item.content);
              return item;
            });
        }
        return sanitizedSection;
      });
    } else if (typeof result.content === 'string') {
      // If it's a string, we probably want it as an array of one paragraph to match BlogPost interface
      result.content = [{ type: 'paragraph', content: sanitizeText(result.content) }];
    }

    // Ensure categories is an array
    result.categories = Array.isArray(result.categories) ? result.categories : [];

    // Handle metaDescription and keywords fallback
    result.metaDescription = result.metaDescription || result.excerpt || result.title || '';

    // Ensure excerpt exists
    if (!result.excerpt && result.content) {
      if (typeof result.content === 'string') {
        result.excerpt = result.content.substring(0, 160) + '...';
      } else if (Array.isArray(result.content)) {
        const firstPara = result.content.find((c: any) => c.type === 'paragraph');
        if (firstPara && firstPara.content) {
          result.excerpt = firstPara.content.substring(0, 160) + '...';
        }
      }
    }
    result.excerpt = result.excerpt || '';

    result.keywords = Array.isArray(result.keywords) && result.keywords.length
      ? result.keywords
      : (result.categories.length ? result.categories : []);

    // Ensure author
    result.author = result.author || BLOG_AUTHOR;

    return result as BlogPost;
  } catch (err) {
    console.error('Error sanitizing post:', err);
    return post;
  }
}

function withAuthor(posts: any[]): BlogPost[] {
  if (!Array.isArray(posts)) return [];
  return posts.map(p => sanitizePost(p));
}

const mappedFinancePosts = (financePosts || []).map((p: any) => ({
  ...p,
  id: p.id,
  slug: p.slug,
  title: p.title,
  date: p.createdAt,
  author: p.author,
  excerpt: p.content ? p.content.substring(0, 160) + '...' : '',
  content: [{ type: 'paragraph', content: p.content }],
  categories: p.category ? [p.category] : ['Finance'],
  coverImage: p.image || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80'
}));

// Combine all blog posts; normalize author to single site author for display & SEO
export const allBlogPosts: BlogPost[] = ((): BlogPost[] => {
  try {
    return withAuthor([
      // Temporarily excluded due runtime crash in blog-data-2 chunk on preview/prod.
      ...(Array.isArray(newFolderBlogs) ? newFolderBlogs : []),
      ...(Array.isArray(blogPosts1) ? blogPosts1 : []),
      ...(Array.isArray(blogPosts0) ? blogPosts0 : []),
      ...(Array.isArray(seoBlogPosts) ? seoBlogPosts : []),
      ...(Array.isArray(optimizedBlogPosts) ? optimizedBlogPosts : []),
      ...(Array.isArray(excelToolBlogPosts) ? excelToolBlogPosts : []),
      ...(Array.isArray(newExcelToolBlogPosts) ? newExcelToolBlogPosts : []),
      ...(Array.isArray(mappedFinancePosts) ? mappedFinancePosts : [])
    ]);
  } catch (err) {
    console.error('Error aggregating blog posts:', err);
    return [];
  }
})();

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


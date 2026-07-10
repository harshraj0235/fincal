import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { contentRegistry } from '../cms-content/contentRegistry';
import { cryptoBlogs } from '../data/crypto/index';
import { seoBlogPosts } from '../data/seo-blog-posts';

// Article Pages
import NewsArticlePage from './news/NewsArticlePage';
import BlogPost from './BlogPost';
import CryptoArticlePost from './CryptoArticlePost';
import SEOBlogPost from './SEOBlogPost';
import DiscoverArticlePage from './DiscoverArticlePage';

/**
 * UniversalArticleDispatcher
 * 
 * This component acts as a dynamic router for all article types using the pattern /:category/:slug.
 * It identifies the correct article content based on the slug and category and renders the appropriate page.
 */
const UniversalArticleDispatcher: React.FC = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();

  if (!slug) {
    return <Navigate to="/404" replace />;
  }

  // Handle Discover articles — render directly in React.
  // The static HTML files in public/discover/ serve crawlers & direct visits via Netlify.
  if (category === 'discover' || (typeof window !== 'undefined' && window.location.pathname.startsWith('/discover/'))) {
    return <DiscoverArticlePage />;
  }

  // Handle Web Stories — these are truly static-only, redirect to static HTML.
  if (category === 'web-stories') {
    const targetUrl = `/${category}/${slug}/index.html`;
    if (window.location.pathname !== targetUrl) {
      window.location.replace(targetUrl);
      return null;
    }
    return <Navigate to="/404" replace />;
  }

  // 1. Check News Articles (Highest priority, sync registry is reliable)
  if (contentRegistry.some(a => a.slug === slug)) {
    return <NewsArticlePage />;
  }

  // 2. Check Crypto Articles
  if (category === 'crypto' || cryptoBlogs.some(b => b.slug === slug)) {
    return <CryptoArticlePost />;
  }

  // 3. Check SEO Blog Posts
  if (category === 'finance-blog' || seoBlogPosts.some(s => s.slug === slug)) {
    return <SEOBlogPost />;
  }

  // 4. Fallback to Standard Blog Post
  // This allows BlogPost to handle its own loading (lazy) and its own 404 UI
  // if the post doesn't exist in any of the large data chunks.
  return <BlogPost />;
};

export default UniversalArticleDispatcher;


import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

/** Blog category page - shows blog posts filtered by category from route param. */
export const BlogCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  // Redirect to /blog?category=X to reuse Blog's filtering
  if (category) {
    return <Navigate to={`/blog?category=${encodeURIComponent(category)}`} replace />;
  }

  return <Navigate to="/blog" replace />;
};

export default BlogCategory;

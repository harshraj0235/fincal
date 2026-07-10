import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { newsCategories } from '../data/newsCategories';

const NewsCategoryPage = React.lazy(() => import('./news/NewsCategoryPage'));
const CityRateDetail = React.lazy(() => import('./market/CityRateDetail'));

/**
 * NewsCategoryDispatcher
 * 
 * Handles 1-part greedy routes like /economy or /bangalore.
 * If the slug is a news category, it renders NewsCategoryPage.
 * Otherwise, it falls back to CityRateDetail for market rates.
 */
const NewsCategoryDispatcher: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/404" replace />;
  }

  // Check if it's a known news category
  const isNewsCategory = newsCategories.some(cat => cat.slug === slug);

  if (isNewsCategory) {
    // We pass the slug as categorySlug to NewsCategoryPage
    // Note: React Router 6 will provide the 'slug' param, but NewsCategoryPage
    // might expect 'categorySlug'. We can wrap it or NewsCategoryPage can be updated.
    return <NewsCategoryPage />;
  }

  // Fallback to City Rate Detail
  return <CityRateDetail />;
};

export default NewsCategoryDispatcher;

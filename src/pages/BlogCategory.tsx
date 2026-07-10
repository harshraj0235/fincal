import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const BlogCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const categoryLabel = category ? decodeURIComponent(category) : 'Blog';
  const url = category ? `/blog/category/${category}` : '/blog';

  return (
    <div className="min-h-screen bg-white">
      <SEOHelmet
        title={`${categoryLabel} Articles | MoneyCal India`}
        description={`Browse ${categoryLabel} articles on MoneyCal.`}
        url={url}
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{categoryLabel} Articles</h1>
        <Link to="/blog" reloadDocument className="text-blue-600 hover:text-blue-800">
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogCategory;

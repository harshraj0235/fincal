import React from 'react';
import { useParams } from 'react-router-dom';
import ExcelBlogReader from '../components/ExcelBlogReader';

// Import blog data
import blog133 from '../../excel_blogs/blog_133_boost-your-freelance-income-with-ai-in-excel-2025-133.json';

const ExcelBlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Map of blog slugs to blog data
  const blogMap: { [key: string]: any } = {
    'boost-your-freelance-income-with-ai-in-excel-2025': blog133,
  };

  const blog = blogMap[slug || ''];

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <a 
            href="/excel-tools" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Excel Tools
          </a>
        </div>
      </div>
    );
  }

  return <ExcelBlogReader blog={blog} />;
};

export default ExcelBlogPage;

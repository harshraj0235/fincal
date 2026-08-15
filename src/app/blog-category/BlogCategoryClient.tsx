"use client";
import Link from 'next/link';
import React from 'react';
import { useParams } from 'next/navigation';


const BlogCategory: React.FC = () => {
  const { category } = (useParams<{ category: string }>() || {});
  const categoryLabel = category ? decodeURIComponent(category) : 'Blog';
  const url = category ? `/blog/category/${category}` : '/blog';

  return (
    <div className="min-h-screen bg-white">
      
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{categoryLabel} Articles</h1>
        <Link href="/blog" className="text-blue-600 hover:text-blue-800">
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogCategory;

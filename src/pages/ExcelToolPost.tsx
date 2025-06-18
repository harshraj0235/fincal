// src/pages/ExcelToolPost.tsx

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { getExcelToolBlogPostBySlug, getRelatedExcelToolBlogPosts } from '../data/exceltooldata';

const ExcelToolPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getExcelToolBlogPostBySlug(slug || '');
  const relatedPosts = getRelatedExcelToolBlogPosts(slug || '', 3);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <button onClick={() => navigate('/exceltool')} className="btn mt-4">Back to Excel Tool</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button onClick={() => navigate('/exceltool')} className="flex items-center text-gray-600 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Excel Tool
      </button>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex gap-4 text-xs text-gray-500 mb-6">
        <User className="h-3 w-3" /> {post.author}
        <Calendar className="h-3 w-3" /> {post.date}
        {post.categories.map(cat => (
          <span key={cat} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded flex items-center">
            <Tag className="h-3 w-3 mr-1" />{cat}
          </span>
        ))}
      </div>
      <img src={post.coverImage} alt={post.title} className="w-full rounded mb-6" />
      <div className="prose prose-lg">
        {post.content.map((section, idx) => {
          if (section.type === 'paragraph') return <p key={idx}>{section.content}</p>;
          if (section.type === 'heading') return <h2 key={idx}>{section.content}</h2>;
          if (section.type === 'list') return <ul key={idx}>{section.items?.map((item, i) => <li key={i}>{item}</li>)}</ul>;
          return null;
        })}
      </div>
      <div className="mt-12">
        <h3 className="font-semibold mb-3">Related Articles</h3>
        <div className="flex flex-wrap gap-4">
          {relatedPosts.map(rp => (
            <Link key={rp.id} to={`/exceltool/${rp.slug}`} className="block border p-3 rounded w-56">
              <img src={rp.coverImage} alt={rp.title} className="h-20 w-full object-cover rounded mb-2" />
              <div className="text-sm font-medium">{rp.title}</div>
              <div className="text-xs text-gray-500">{rp.date}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExcelToolPost;

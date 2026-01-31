import React from 'react';
import { CryptoBlogPost } from '../data/crypto/types';

interface CryptoBlogDetailProps {
  blog: CryptoBlogPost;
}

const CryptoBlogDetail: React.FC<CryptoBlogDetailProps> = ({ blog }) => {
  const renderContent = (content: any) => {
    switch (content.type) {
      case 'heading':
        return (
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {content.text}
          </h1>
        );
      case 'subheading':
        return (
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
            {content.text}
          </h2>
        );
      case 'paragraph':
        return (
          <p className="text-gray-700 mb-4 leading-relaxed">
            {content.text}
          </p>
        );
      case 'list':
        return (
          <li className="text-gray-700 mb-2 leading-relaxed">
            {content.text}
          </li>
        );
      default:
        return null;
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {blog.category}
          </span>
          <span className="ml-4 text-sm text-gray-500">
            {blog.readTime}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-6">
          {blog.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>लेखक: {blog.author}</span>
          <span>प्रकाशित: {new Date(blog.publishedDate).toLocaleDateString('hi-IN')}</span>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {blog.content.map((content, index) => {
          if (content.type === 'list') {
            return (
              <ul key={index} className="list-disc pl-6 mb-4">
                {renderContent(content)}
              </ul>
            );
          }
          return (
            <div key={index}>
              {renderContent(content)}
            </div>
          );
        })}
      </div>

      {/* Tags */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">टैग्स:</h3>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blog.structuredData)
        }}
      />
    </article>
  );
};

export default CryptoBlogDetail;

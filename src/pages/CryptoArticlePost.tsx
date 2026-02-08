import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cryptoBlogs } from '../data/crypto';
import SEOHelmet from '../components/SEOHelmet';
import { ArrowLeft, Bitcoin } from 'lucide-react';

const renderContent = (content: any[]) => {
  return content.map((block, idx) => {
    switch (block.type) {
      case 'heading':
        return <h1 key={idx} className="text-3xl font-bold text-yellow-300 mb-4 mt-8">{block.text}</h1>;
      case 'subheading':
        return <h2 key={idx} className="text-2xl font-semibold text-pink-400 mb-3 mt-6">{block.text}</h2>;
      case 'paragraph':
        return <p key={idx} className="text-gray-200 mb-4 text-lg leading-relaxed">{block.text}</p>;
      case 'list':
        return <li key={idx} className="text-gray-200 mb-2">{block.text}</li>;
      default:
        return null;
    }
  });
};

const CryptoArticlePost: React.FC = () => {
  const { slug } = useParams();
  const blog = cryptoBlogs.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <Link to="/crypto" className="text-yellow-400 hover:underline flex items-center gap-2"><ArrowLeft /> Back to Crypto</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white pb-16">
      <SEOHelmet
        title={blog.title}
        description={blog.metaDescription}
        keywords={blog.keywords?.join(', ')}
        url={`/crypto/${blog.slug}`}
        type="article"
        tags={blog.tags}
      />
      <div className="max-w-3xl mx-auto px-4 pt-10">
        <Link to="/crypto" className="text-yellow-400 hover:underline flex items-center gap-2 mb-6"><ArrowLeft /> Back to Crypto</Link>
        <div className="w-full h-64 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-lg mb-6 border-4 border-gray-900 flex items-center justify-center">
          <Bitcoin className="h-24 w-24 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-yellow-300 mb-4">{blog.title}</h1>
        <p className="text-lg text-gray-300 mb-6">{blog.description}</p>
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
          <span>Author: {blog.author}</span>
          <span>Published: {new Date(blog.publishedDate).toLocaleDateString('hi-IN')}</span>
          <span>Read Time: {blog.readTime}</span>
        </div>
        <div className="mb-8">
          {blog.content.map((block, idx) => {
            if (block.type === 'list') {
              return (
                <ul key={idx} className="list-disc list-inside mb-4 text-gray-200">
                  {renderContent([block])}
                </ul>
              );
            }
            return renderContent([block]);
          })}
        </div>
        {/* Tags */}
        <div className="mt-10 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-pink-400 mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-yellow-900 text-yellow-200 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoArticlePost; 
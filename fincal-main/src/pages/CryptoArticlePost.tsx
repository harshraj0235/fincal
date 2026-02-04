import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cryptoBlogs } from '../data/crypto';
import SEOHelmet from '../components/SEOHelmet';
import { ArrowLeft, Bitcoin } from 'lucide-react';
import ReadingProgressBar from '../components/ReadingProgressBar';

type TocItem = {
  id: string;
  text: string;
  level: 'heading' | 'subheading';
};

const truncateText = (text: string, maxLength: number) => {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
};

const extractSummaryPoints = (content: { type: string; text?: string }[], limit: number) => {
  const listPoints = content
    .filter(block => block.type === 'list' && block.text)
    .map(block => block.text as string);

  if (listPoints.length > 0) {
    return listPoints.slice(0, limit).map(item => truncateText(item, 160));
  }

  const paragraphPoints = content
    .filter(block => block.type === 'paragraph' && block.text)
    .map(block => block.text as string);

  return paragraphPoints.slice(0, limit).map(item => truncateText(item, 160));
};

const renderBlock = (block: any, idx: number) => {
  switch (block.type) {
    case 'heading':
      return (
        <h1 id={`section-${idx}`} className="text-3xl font-bold text-yellow-300 mb-4 mt-8 scroll-mt-24">
          {block.text}
        </h1>
      );
    case 'subheading':
      return (
        <h2 id={`section-${idx}`} className="text-2xl font-semibold text-pink-400 mb-3 mt-6 scroll-mt-24">
          {block.text}
        </h2>
      );
    case 'paragraph':
      return <p className="text-gray-200 mb-4 text-lg leading-relaxed">{block.text}</p>;
    case 'list':
      return <li className="text-gray-200 mb-2">{block.text}</li>;
    default:
      return null;
  }
};

const CryptoArticlePost: React.FC = () => {
  const { slug } = useParams();
  const blog = cryptoBlogs.find(b => b.slug === slug);

  const tocItems = useMemo(() => {
    if (!blog) return [];
    return blog.content
      .map((block, idx) => {
        if (block.type === 'heading' || block.type === 'subheading') {
          const text = block.text?.trim();
          if (!text) return null;
          return { id: `section-${idx}`, text, level: block.type } as TocItem;
        }
        return null;
      })
      .filter((item): item is TocItem => item !== null);
  }, [blog]);

  const summaryPoints = useMemo(() => {
    if (!blog) return [];
    return extractSummaryPoints(blog.content, 4);
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <Link to="/crypto" className="text-yellow-400 hover:underline flex items-center gap-2"><ArrowLeft /> Back to Crypto</Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgressBar targetId="crypto-article" />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white pb-16">
        <SEOHelmet
          title={blog.title}
          description={blog.metaDescription}
          keywords={blog.keywords?.join(', ')}
          url={`/crypto/${blog.slug}`}
          type="article"
          tags={blog.tags}
        />
        <div id="crypto-article" className="max-w-3xl mx-auto px-4 pt-10">
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

          {summaryPoints.length > 0 && (
            <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Key takeaways</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-200">
                {summaryPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {tocItems.length > 1 && (
            <div className="mb-8 rounded-xl border border-gray-800 bg-gray-900/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">On this page</p>
              <ul className="space-y-2 text-sm text-gray-300">
                {tocItems.map((item) => (
                  <li key={item.id} className={item.level === 'subheading' ? 'ml-3' : ''}>
                    <a href={`#${item.id}`} className="hover:text-yellow-300 transition-colors">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-8">
            {blog.content.map((block, idx) => {
              if (block.type === 'list') {
                return (
                  <ul key={idx} className="list-disc list-inside mb-4 text-gray-200">
                    {renderBlock(block, idx)}
                  </ul>
                );
              }
              return (
                <div key={idx}>
                  {renderBlock(block, idx)}
                </div>
              );
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
    </>
  );
};

export default CryptoArticlePost; 
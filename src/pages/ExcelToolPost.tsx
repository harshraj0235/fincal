// src/pages/ExcelToolPost.tsx

import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, Download, Share2, ChevronRight } from 'lucide-react';
import { getExcelToolBlogPostBySlug, getRelatedExcelToolBlogPosts } from '../data/exceltooldata';

interface TocItem {
  idx: number;
  text: string | undefined;
  type: 'heading' | 'subheading';
}

const ExcelToolPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getExcelToolBlogPostBySlug(slug || '');
  const relatedPosts = getRelatedExcelToolBlogPosts(slug || '', 3);

  // Table of Contents (for headings/subheadings)
  const toc = useMemo(() => {
    if (!post) return [];
    return post.content
      .map((section, idx) => {
        if (section.type === 'heading' || section.type === 'subheading') {
          return { idx, text: section.content, type: section.type } as TocItem;
        }
        return null;
      })
      .filter((item): item is TocItem => item !== null);
  }, [post]);

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <button onClick={() => navigate('/exceltool')} className="btn mt-4">Back to Excel Tool</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-2 md:px-0 py-8">
      {/* Back Button */}
      <button onClick={() => navigate('/exceltool')} className="flex items-center text-gray-600 mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Excel Tool
      </button>

      {/* Cover Image */}
      <div className="relative mb-6">
        <img src={post.coverImage} alt={post.title} className="w-full h-64 md:h-80 object-cover rounded-xl shadow" />
        {post.downloadLink && (
          <a
            href={post.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 z-10"
          >
            <Download className="h-4 w-4" /> Download Excel
          </a>
        )}
      </div>

      {/* Title & Meta */}
      <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{post.title}</h1>
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
        {post.authorImage && (
          <img src={post.authorImage} alt={post.author} className="h-10 w-10 rounded-full border object-cover" />
        )}
        <div>
          <div className="font-semibold text-gray-800">{post.author}</div>
          {post.authorTitle && <div className="text-xs text-gray-500">{post.authorTitle}</div>}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
        <div className="flex flex-wrap gap-2">
        {post.categories.map(cat => (
          <span key={cat} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded flex items-center">
            <Tag className="h-3 w-3 mr-1" />{cat}
          </span>
        ))}
      </div>
        <button onClick={handleShare} className="ml-auto flex items-center gap-1 px-3 py-1 rounded bg-gray-100 hover:bg-blue-100 text-blue-700 text-xs font-medium">
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>

      {/* Table of Contents */}
      {toc.length > 2 && (
        <div className="mb-8 bg-gray-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="font-semibold mb-2 text-blue-700">Table of Contents</div>
          <ul className="space-y-1">
            {toc.map(item => item && (
              <li key={item.idx}>
                <a
                  href={`#section-${item.idx}`}
                  className="text-blue-700 hover:underline text-sm"
                  onClick={e => {
                    e.preventDefault();
                    const el = document.getElementById(`section-${item.idx}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {item.type === 'subheading' && <ChevronRight className="inline h-3 w-3 mr-1 text-blue-400" />} {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Blog Content */}
      <article className="prose prose-lg max-w-none">
        {post.content.map((section, idx) => {
          if (section.type === 'paragraph') return <p key={idx} id={`section-${idx}`}>{section.content}</p>;
          if (section.type === 'heading') return <h2 key={idx} id={`section-${idx}`}>{section.content}</h2>;
          if (section.type === 'subheading') return <h3 key={idx} id={`section-${idx}`}>{section.content}</h3>;
          if (section.type === 'list') return <ul key={idx} id={`section-${idx}`}>{section.items?.map((item, i) => <li key={i}>{item}</li>)}</ul>;
          if (section.type === 'image') return (
            <figure key={idx} id={`section-${idx}`} className="my-8">
              <img src={section.url} alt={section.caption || ''} className="rounded-lg shadow" />
              {section.caption && <figcaption className="text-center text-gray-500 text-sm mt-2">{section.caption}</figcaption>}
            </figure>
          );
          if (section.type === 'quote') return (
            <blockquote key={idx} id={`section-${idx}`} className="border-l-4 border-blue-400 pl-4 italic text-lg my-6">
              “{section.content}”
              {section.author && <div className="text-right text-sm text-blue-700 mt-2">— {section.author}</div>}
            </blockquote>
          );
          return null;
        })}
      </article>

      {/* Related Articles */}
      <div className="mt-16">
        <h3 className="font-semibold mb-4 text-xl">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map(rp => (
            <Link key={rp.id} to={`/exceltool/${rp.slug}`} className="block bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img src={rp.coverImage} alt={rp.title} className="h-32 w-full object-cover" />
              <div className="p-3">
                <div className="font-medium text-gray-900 line-clamp-2 mb-1">{rp.title}</div>
                <div className="text-xs text-gray-500 mb-1">{new Date(rp.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                <div className="flex flex-wrap gap-1">
                  {rp.categories.slice(0, 2).map(cat => (
                    <span key={cat} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{cat}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExcelToolPost;

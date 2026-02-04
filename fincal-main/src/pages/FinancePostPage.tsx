import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, User, Tag, Share2, BookOpen } from 'lucide-react';
import { getFinancePostBySlug } from '../data/financePosts';
import SEOHelmet from '../components/SEOHelmet';
import ReadingProgressBar from '../components/ReadingProgressBar';

const truncateText = (text: string, maxLength: number) => {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
};

const splitParagraphs = (content: string) => {
  return content
    .split(/\n+/)
    .map((section) => section.trim())
    .filter(Boolean);
};

const extractSummaryPoints = (content: string, limit: number) => {
  const paragraphs = splitParagraphs(content);
  const sentences = content
    .split(/[.!?]\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const source = paragraphs.length >= limit ? paragraphs : sentences;
  return source.slice(0, limit).map((item) => truncateText(item, 160));
};

const FinancePostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const post = getFinancePostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The finance blog post you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate reading time (average 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const contentBlocks = splitParagraphs(post.content);
  const summaryPoints = extractSummaryPoints(post.content, 4);

  // Structured data for SEO
  const postStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.content.substring(0, 160) + "...",
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author || "Anonymous"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Moneycal",
      "url": "https://moneycal.in"
    },
    "datePublished": post.createdAt,
    "dateModified": post.createdAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://moneycal.in/finance/${post.slug}`
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.content.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <ReadingProgressBar targetId="finance-article" />
      <SEOHelmet
        title={`${post.title} - Moneycal Finance Blog`}
        description={post.content.substring(0, 160) + "..."}
        keywords={`finance, ${post.category?.toLowerCase()}, personal finance, investment, moneycal`}
        url={`/finance/${post.slug}`}
        structuredData={postStructuredData}
        tags={[post.category || "Finance", "Personal Finance", "Investment"]}
      />

      <div className="min-h-screen bg-slate-50/60">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Article Header */}
          <article id="finance-article" className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/70 overflow-hidden">
            {/* Featured Image */}
            {post.image && (
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            )}

            {/* Article Content */}
            <div className="p-6 sm:p-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
                {post.category && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                    <Tag size={14} />
                    {post.category}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(post.createdAt)}
                </span>
                {post.author && (
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {post.author}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <BookOpen size={14} />
                  {readingTime} min read
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              {summaryPoints.length > 0 && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Key takeaways</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                    {summaryPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Share Button */}
              <div className="mt-6 flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <div className="text-sm text-gray-500">
                  {wordCount} words
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>

              {/* Content */}
              <div className="prose prose-slate prose-lg max-w-none">
                {contentBlocks.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Video */}
              {post.video && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Video</h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <video
                      controls
                      className="w-full h-full object-cover"
                      poster={post.image}
                    >
                      <source src={post.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {/* External Link */}
              {post.link && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">External Resource</h3>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Visit External Link
                  </a>
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-sm text-gray-500">
                    Published on {formatDate(post.createdAt)}
                  </div>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Back to Finance Reels
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default FinancePostPage; 
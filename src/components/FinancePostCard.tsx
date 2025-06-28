import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, User, Tag, Heart, MessageCircle, Share2 } from 'lucide-react';
import { FinancePost } from '../data/financePosts';

interface FinancePostCardProps {
  post: FinancePost;
  reelMode?: boolean;
}

const FinancePostCard: React.FC<FinancePostCardProps> = ({ post, reelMode }) => {
  // Truncate content to 250 words
  const words = post.content.split(/\s+/);
  const previewWords = words.slice(0, 250);
  const preview = previewWords.join(" ") + (words.length > 250 ? "..." : "");

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: preview,
        url: window.location.origin + `/finance/${post.slug}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/finance/${post.slug}`);
      alert('Link copied to clipboard!');
    }
  };

  if (reelMode) {
    return (
      <div className="relative w-full h-[70vh] max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-end bg-black">
        {/* Background Image/Video */}
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ filter: 'brightness(0.7) blur(0px)' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-700 to-purple-900 z-0 flex items-center justify-center">
            <div className="text-white text-5xl">💰</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

        {/* Overlay Content */}
        <div className="relative z-20 p-6 flex flex-col justify-end h-full">
          {/* Top Row: Category, Date */}
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <Tag size={12} />
              {post.category || 'Finance'}
            </span>
            <span className="flex items-center gap-1 text-xs text-blue-100 ml-2">
              <Calendar size={12} />
              {formatDate(post.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 drop-shadow-lg line-clamp-2">
            {post.title}
          </h3>

          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-1 text-sm text-blue-200 mb-2">
              <User size={14} />
              <span>{post.author}</span>
            </div>
          )}

          {/* Content Preview */}
          <p className="text-base text-blue-100 mb-4 line-clamp-5 drop-shadow">
            {preview}
          </p>

          {/* External Link */}
          {post.link && (
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-300 text-sm hover:text-blue-100 mb-3 transition-colors underline"
            >
              <ExternalLink size={14} />
              External Link
            </a>
          )}

          {/* Actions Row */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-pink-400 transition-colors p-2 rounded-full bg-black/30 hover:bg-black/50">
                <Heart size={22} />
              </button>
              <button className="text-white hover:text-blue-400 transition-colors p-2 rounded-full bg-black/30 hover:bg-black/50">
                <MessageCircle size={22} />
              </button>
              <button className="text-white hover:text-green-400 transition-colors p-2 rounded-full bg-black/30 hover:bg-black/50" onClick={handleShare}>
                <Share2 size={22} />
              </button>
            </div>
            <Link
              to={`/finance/${post.slug}`}
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 text-base font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Classic Card
  return (
    <div className="min-w-[320px] max-w-[320px] bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">💰</div>
              <div className="text-sm font-medium">Finance</div>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <Tag size={12} />
            {post.category || 'Finance'}
          </span>
        </div>
        
        {/* Date Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {post.title}
        </h3>

        {/* Author */}
        {post.author && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <User size={14} />
            <span>{post.author}</span>
          </div>
        )}

        {/* Content Preview */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-6 leading-relaxed">
          {preview}
        </p>

        {/* Word Count */}
        <div className="text-xs text-gray-500 mb-4">
          {words.length} words
        </div>

        {/* External Link */}
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 text-sm hover:text-blue-800 mb-3 transition-colors"
          >
            <ExternalLink size={14} />
            External Link
          </a>
        )}

        {/* Read More Button */}
        <Link
          to={`/finance/${post.slug}`}
          className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm font-medium text-center transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default FinancePostCard; 
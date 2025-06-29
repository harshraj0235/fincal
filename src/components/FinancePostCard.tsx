import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, User, Tag, Heart, MessageCircle, Share2, ChevronUp, ChevronDown, Bookmark, MoreVertical } from 'lucide-react';
import { FinancePost } from '../data/financePosts';

interface FinancePostCardProps {
  post: FinancePost;
  reelMode?: boolean;
  fullPage?: boolean;
  scrollMode?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (post: FinancePost) => void;
  onBookmark?: (postId: string) => void;
}

const FinancePostCard: React.FC<FinancePostCardProps> = ({ 
  post, 
  reelMode, 
  fullPage,
  scrollMode = false,
  onNext,
  onPrev,
  isFirst,
  isLast,
  onLike,
  onComment,
  onShare,
  onBookmark
}) => {
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
    if (onShare) {
      onShare(post);
    } else if (navigator.share) {
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

  // Like handler
  const handleLike = () => {
    if (onLike) {
      onLike(post.id);
    }
  };

  // Comment handler
  const handleComment = () => {
    if (onComment) {
      onComment(post.id);
    }
  };

  // Bookmark handler
  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark(post.id);
    }
  };

  if (reelMode) {
    return (
      <div className={`relative ${fullPage ? 'w-full h-full' : 'w-full h-[70vh] max-w-sm sm:max-w-md'} ${scrollMode ? 'min-h-screen' : 'rounded-2xl'} overflow-hidden shadow-2xl flex flex-col justify-end bg-black`}>
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
            <div className="text-white text-4xl sm:text-5xl">💰</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

        {/* Navigation Hints */}
        {fullPage && !scrollMode && (
          <>
            {!isFirst && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                <ChevronUp size={20} />
              </div>
            )}
            {!isLast && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                <ChevronDown size={20} />
              </div>
            )}
          </>
        )}

        {/* Overlay Content */}
        <div className="relative z-20 p-4 sm:p-6 flex flex-col justify-end h-full">
          {/* Top Row: Category, Date */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Tag size={12} />
              <span className="hidden sm:inline">{post.category || 'Finance'}</span>
              <span className="sm:hidden">{post.category?.slice(0, 8) || 'Finance'}</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-blue-100 ml-2">
              <Calendar size={12} />
              <span className="hidden sm:inline">{formatDate(post.createdAt)}</span>
              <span className="sm:hidden">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className={`${fullPage ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl md:text-3xl'} font-extrabold text-white mb-3 drop-shadow-lg line-clamp-2 leading-tight`}>
            {post.title}
          </h3>

          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-1 text-sm text-blue-200 mb-3">
              <User size={14} />
              <span className="hidden sm:inline">{post.author}</span>
              <span className="sm:hidden">{post.author.length > 15 ? post.author.slice(0, 15) + '...' : post.author}</span>
            </div>
          )}

          {/* Content Preview */}
          <p className={`${fullPage ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} text-blue-100 mb-4 ${scrollMode ? 'line-clamp-none' : 'line-clamp-4 sm:line-clamp-5'} drop-shadow leading-relaxed`}>
            {scrollMode ? post.content : preview}
          </p>

          {/* External Link */}
          {post.link && (
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-300 text-sm hover:text-blue-100 mb-4 transition-colors underline"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">External Link</span>
              <span className="sm:hidden">Link</span>
            </a>
          )}

          {/* Enhanced Actions Row */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={handleLike}
                className="text-white hover:text-pink-400 transition-colors p-2.5 rounded-full bg-black/30 hover:bg-black/50 min-w-[44px] min-h-[44px] flex items-center justify-center group"
                title="Like"
              >
                <Heart size={20} className="group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={handleComment}
                className="text-white hover:text-blue-400 transition-colors p-2.5 rounded-full bg-black/30 hover:bg-black/50 min-w-[44px] min-h-[44px] flex items-center justify-center group"
                title="Comment"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={handleShare}
                className="text-white hover:text-green-400 transition-colors p-2.5 rounded-full bg-black/30 hover:bg-black/50 min-w-[44px] min-h-[44px] flex items-center justify-center group" 
                title="Share"
              >
                <Share2 size={20} className="group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={handleBookmark}
                className="text-white hover:text-yellow-400 transition-colors p-2.5 rounded-full bg-black/30 hover:bg-black/50 min-w-[44px] min-h-[44px] flex items-center justify-center group"
                title="Bookmark"
              >
                <Bookmark size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <Link
              to={`/finance/${post.slug}`}
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all min-h-[44px] flex items-center justify-center group"
            >
              <span className="hidden sm:inline group-hover:scale-105 transition-transform">Read More</span>
              <span className="sm:hidden group-hover:scale-105 transition-transform">Read</span>
            </Link>
          </div>

          {/* Navigation Instructions */}
          {fullPage && !scrollMode && (
            <div className="text-center mt-4 text-blue-200 text-xs opacity-70">
              <p className="hidden sm:block">Use arrow keys, swipe, or click dots to navigate</p>
              <p className="sm:hidden">Swipe or tap dots to navigate</p>
            </div>
          )}

          {/* Scroll Mode Instructions */}
          {scrollMode && (
            <div className="text-center mt-4 text-blue-200 text-xs opacity-70">
              <p>Scroll mode enabled - scroll freely through content</p>
            </div>
          )}
        </div>

        {/* Enhanced Floating Action Buttons - Right Side (Full Page Only) */}
        {fullPage && !scrollMode && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            <button 
              onClick={handleLike}
              className="text-white hover:text-pink-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center group"
              title="Like"
            >
              <Heart size={24} className="group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={handleComment}
              className="text-white hover:text-blue-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center group"
              title="Comment"
            >
              <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={handleShare}
              className="text-white hover:text-green-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center group"
              title="Share"
            >
              <Share2 size={24} className="group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={handleBookmark}
              className="text-white hover:text-yellow-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center group"
              title="Bookmark"
            >
              <Bookmark size={24} className="group-hover:scale-110 transition-transform" />
            </button>
            <button className="text-white hover:text-gray-300 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center group" title="More">
              <MoreVertical size={24} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Regular card view (non-reel mode)
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Card Image */}
      {post.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute top-2 left-2">
            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {post.category || 'Finance'}
            </span>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h3>

        {/* Content Preview */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {preview}
        </p>

        {/* External Link */}
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 text-sm hover:text-blue-800 mb-4 transition-colors underline"
          >
            <ExternalLink size={14} />
            External Link
          </a>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleLike}
              className="text-gray-500 hover:text-pink-500 transition-colors p-2 rounded-full hover:bg-pink-50"
              title="Like"
            >
              <Heart size={18} />
            </button>
            <button 
              onClick={handleComment}
              className="text-gray-500 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-50"
              title="Comment"
            >
              <MessageCircle size={18} />
            </button>
            <button 
              onClick={handleShare}
              className="text-gray-500 hover:text-green-500 transition-colors p-2 rounded-full hover:bg-green-50"
              title="Share"
            >
              <Share2 size={18} />
            </button>
            <button 
              onClick={handleBookmark}
              className="text-gray-500 hover:text-yellow-500 transition-colors p-2 rounded-full hover:bg-yellow-50"
              title="Bookmark"
            >
              <Bookmark size={18} />
            </button>
          </div>
          <Link
            to={`/finance/${post.slug}`}
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinancePostCard; 
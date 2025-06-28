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
}

const FinancePostCard: React.FC<FinancePostCardProps> = ({ 
  post, 
  reelMode, 
  fullPage,
  scrollMode = false,
  onNext,
  onPrev,
  isFirst,
  isLast
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

          {/* Actions Row */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="text-white hover:text-pink-400 transition-colors p-2.5 rounded-full bg-black/30 hover:bg-black/50 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Heart size={20} />
              </button>
              <button className="text-white hover:text-blue-400 transition-colors p-2.5 rounded-full bg-black/30 hover:bg-black/50 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <MessageCircle size={20} />
              </button>
              <button 
                className="text-white hover:text-green-400 transition-colors p-2.5 rounded-full bg-black/30 hover:bg-black/50 min-w-[44px] min-h-[44px] flex items-center justify-center" 
                onClick={handleShare}
              >
                <Share2 size={20} />
              </button>
            </div>
            <Link
              to={`/finance/${post.slug}`}
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all min-h-[44px] flex items-center justify-center"
            >
              <span className="hidden sm:inline">Read More</span>
              <span className="sm:hidden">Read</span>
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

        {/* Floating Action Buttons - Right Side (Full Page Only) */}
        {fullPage && !scrollMode && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            <button className="text-white hover:text-pink-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
              <Heart size={24} />
            </button>
            <button className="text-white hover:text-blue-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
              <MessageCircle size={24} />
            </button>
            <button className="text-white hover:text-green-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
              <Share2 size={24} />
            </button>
            <button className="text-white hover:text-yellow-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
              <Bookmark size={24} />
            </button>
            <button className="text-white hover:text-gray-300 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
              <MoreVertical size={24} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Classic Card
  return (
    <div className="min-w-[280px] sm:min-w-[320px] max-w-[280px] sm:max-w-[320px] bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
      {/* Image Section */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
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
              <div className="text-3xl sm:text-4xl mb-2">💰</div>
              <div className="text-xs sm:text-sm font-medium">Finance</div>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <Tag size={12} />
            <span className="hidden sm:inline">{post.category || 'Finance'}</span>
            <span className="sm:hidden">{post.category?.slice(0, 8) || 'Finance'}</span>
          </span>
        </div>
        
        {/* Date Badge */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Calendar size={12} />
            <span className="hidden sm:inline">{formatDate(post.createdAt)}</span>
            <span className="sm:hidden">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {post.title}
        </h3>

        {/* Author */}
        {post.author && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <User size={14} />
            <span className="hidden sm:inline">{post.author}</span>
            <span className="sm:hidden">{post.author.length > 15 ? post.author.slice(0, 15) + '...' : post.author}</span>
          </div>
        )}

        {/* Content Preview */}
        <p className="text-xs sm:text-sm text-gray-700 mb-4 line-clamp-4 sm:line-clamp-6 leading-relaxed">
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
            <span className="hidden sm:inline">External Link</span>
            <span className="sm:hidden">Link</span>
          </a>
        )}

        {/* Read More Button */}
        <Link
          to={`/finance/${post.slug}`}
          className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm font-medium text-center transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg min-h-[44px] flex items-center justify-center"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default FinancePostCard; 
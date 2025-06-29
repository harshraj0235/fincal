import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, TrendingUp, ChevronUp, ChevronDown, X, Filter, Grid, List, 
  Home, Search, Heart, MessageCircle, Share2, Bookmark, MoreVertical, 
  Edit3, Scroll, ArrowLeft, ArrowRight, Settings, RefreshCw, 
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, 
  ThumbsUp, ThumbsDown, Flag, Copy, ExternalLink, Clock, Eye
} from 'lucide-react';
import { getAllFinancePosts, FinancePost } from '../data/financePosts';
import FinancePostCard from './FinancePostCard';
import FinanceBlogForm from './FinanceBlogForm';

// Category symbols mapping
const categorySymbols: { [key: string]: string } = {
  'All': '🏠',
  'Personal Finance': '💰',
  'Investment': '📈',
  'Tax Planning': '📊',
  'Cryptocurrency': '₿',
  'Real Estate': '🏠',
  'Insurance': '🛡️',
  'Banking': '🏦',
  'Retirement Planning': '👴',
  'Stock Market': '📊',
  'Mutual Funds': '📋',
  'Gold Investment': '🥇',
  'Digital Banking': '📱',
  'Credit Score': '📋',
  'Budgeting': '📝',
  'Saving Tips': '💡',
  'Financial Planning': '🎯',
  'Market Analysis': '📊',
  'Economic News': '📰',
  'Fintech': '⚡'
};

const FinanceReelSection: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFullPage, setIsFullPage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [current, setCurrent] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [scrollMode, setScrollMode] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [viewMode, setViewMode] = useState<'reel' | 'grid' | 'list'>('reel');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const allPosts = getAllFinancePosts();
  
  // Filter posts by category
  const posts = selectedCategory === 'All' 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(allPosts.map(post => post.category).filter(Boolean)))];

  const goNext = () => {
    if (current < posts.length - 1) {
      setCurrent(prev => prev + 1);
      scrollToPost(current + 1);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setCurrent(prev => prev - 1);
      scrollToPost(current - 1);
    }
  };

  const scrollToPost = (index: number) => {
    if (scrollContainerRef.current) {
      const postElement = scrollContainerRef.current.children[index] as HTMLElement;
      if (postElement) {
        postElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Handle scroll events for snap scrolling
  const handleScroll = () => {
    if (!scrollContainerRef.current || isScrolling) return;
    
    setIsScrolling(true);
    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const newIndex = Math.round(scrollTop / containerHeight);
    
    if (newIndex !== current && newIndex >= 0 && newIndex < posts.length) {
      setCurrent(newIndex);
    }
    
    setTimeout(() => setIsScrolling(false), 100);
  };

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      goNext();
    } else if (isDownSwipe) {
      goPrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay && !scrollMode && isFullPage) {
      interval = setInterval(() => {
        if (current < posts.length - 1) {
          goNext();
        } else {
          setCurrent(0);
          scrollToPost(0);
        }
      }, 5000); // 5 seconds per post
    }
    return () => clearInterval(interval);
  }, [autoPlay, current, posts.length, scrollMode, isFullPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'Escape' && isFullPage) {
        setIsFullPage(false);
      }
      if (e.key === 'h' || e.key === 'H') {
        setShowNavbar(!showNavbar);
      }
      if (e.key === 'a' || e.key === 'A') {
        setAutoPlay(!autoPlay);
      }
      if (e.key === 'm' || e.key === 'M') {
        setMuted(!muted);
      }
    };
    
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, posts.length, isFullPage, showNavbar, autoPlay, muted]);

  // Auto-scroll to current post when category changes
  useEffect(() => {
    setCurrent(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedCategory]);

  // Toggle scroll mode
  const toggleScrollMode = () => {
    setScrollMode(!scrollMode);
  };

  // Handle post actions
  const handleLike = (postId: string) => {
    // TODO: Implement like functionality
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: string) => {
    // TODO: Implement comment functionality
    console.log('Comment on post:', postId);
  };

  const handleShare = (post: FinancePost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.slice(0, 100) + '...',
        url: window.location.origin + `/finance/${post.slug}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/finance/${post.slug}`);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = (postId: string) => {
    // TODO: Implement bookmark functionality
    console.log('Bookmarked post:', postId);
  };

  if (isFullPage) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        {/* Enhanced Header with Better Navigation */}
        <div className={`absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/90 via-black/70 to-transparent p-4 transition-all duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex items-center justify-between">
            {/* Left Section: Back, Home, Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFullPage(false)}
                className="text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black/30 hover:bg-black/50"
                title="Exit Full Screen"
              >
                <X size={24} />
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="text-white hover:text-blue-400 transition-colors p-2 rounded-full bg-black/30 hover:bg-black/50"
                title="Go Home"
              >
                <Home size={24} />
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <TrendingUp className="text-blue-400" size={20} />
                <h2 className="text-white text-lg font-semibold">Finance Reels</h2>
              </div>
            </div>
            
            {/* Center Section: Progress and Controls */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-white text-sm">
                <span>{current + 1}</span>
                <span>/</span>
                <span>{posts.length}</span>
              </div>
              
              {/* Auto-play Controls */}
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`p-2 rounded-full transition-all ${
                  autoPlay 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={autoPlay ? "Pause Auto-play" : "Start Auto-play"}
              >
                {autoPlay ? <Pause size={16} /> : <Play size={16} />}
              </button>
              
              {/* Mute Controls */}
              <button
                onClick={() => setMuted(!muted)}
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
                title={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              
              {/* Scroll Mode Toggle */}
              <button
                onClick={toggleScrollMode}
                className={`p-2 rounded-full transition-all ${
                  scrollMode 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={scrollMode ? "Disable Scroll Mode" : "Enable Scroll Mode"}
              >
                <Scroll size={16} />
              </button>
            </div>
            
            {/* Right Section: Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-full shadow-xl hover:scale-110 transition-all"
                title="Add New Post"
              >
                <Plus size={20} />
              </button>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white p-2 rounded-full shadow-xl hover:scale-110 transition-all"
                title="Edit Post"
              >
                <Edit3 size={20} />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
                title="Settings"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Category Filter */}
        <div className={`absolute top-20 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 max-w-md">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 w-12 h-12 rounded-full text-lg font-medium transition-all flex items-center justify-center ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg scale-110'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={category}
              >
                {categorySymbols[category] || '📄'}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute top-20 right-4 z-30 bg-black/90 text-white p-4 rounded-lg shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">View Mode:</span>
                <select 
                  value={viewMode} 
                  onChange={(e) => setViewMode(e.target.value as any)}
                  className="bg-white/20 text-white rounded px-2 py-1 text-sm"
                >
                  <option value="reel">Reel</option>
                  <option value="grid">Grid</option>
                  <option value="list">List</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-play:</span>
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className={`px-3 py-1 rounded text-sm ${autoPlay ? 'bg-green-600' : 'bg-gray-600'}`}
                >
                  {autoPlay ? 'ON' : 'OFF'}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Navbar:</span>
                <button
                  onClick={() => setShowNavbar(!showNavbar)}
                  className={`px-3 py-1 rounded text-sm ${showNavbar ? 'bg-blue-600' : 'bg-gray-600'}`}
                >
                  {showNavbar ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reel Container */}
        <div
          ref={scrollContainerRef}
          className={`h-full ${scrollMode ? 'overflow-y-auto' : 'overflow-y-auto snap-y snap-mandatory'} pt-32`}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`${scrollMode ? 'h-auto min-h-screen' : 'h-full snap-start'} flex items-center justify-center p-2 sm:p-4`}
            >
              <FinancePostCard 
                post={post} 
                reelMode 
                fullPage 
                onNext={goNext}
                onPrev={goPrev}
                isFirst={index === 0}
                isLast={index === posts.length - 1}
                scrollMode={scrollMode}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onBookmark={handleBookmark}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Floating Action Buttons - Right Side */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          <button 
            onClick={() => handleLike(posts[current]?.id || '')}
            className="text-white hover:text-pink-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg group"
            title="Like"
          >
            <Heart size={24} className="group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={() => handleComment(posts[current]?.id || '')}
            className="text-white hover:text-blue-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg group"
            title="Comment"
          >
            <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={() => handleShare(posts[current])}
            className="text-white hover:text-green-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg group"
            title="Share"
          >
            <Share2 size={24} className="group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={() => handleBookmark(posts[current]?.id || '')}
            className="text-white hover:text-yellow-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg group"
            title="Bookmark"
          >
            <Bookmark size={24} className="group-hover:scale-110 transition-transform" />
          </button>
          <button className="text-white hover:text-gray-300 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg group" title="More">
            <MoreVertical size={24} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Enhanced Progress Dots - Left Side */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {posts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrent(idx);
                scrollToPost(idx);
              }}
              className={`block w-3 h-3 rounded-full transition-all hover:scale-125 ${
                idx === current 
                  ? 'bg-blue-400 scale-125 shadow-lg' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              title={`Go to post ${idx + 1}`}
            />
          ))}
        </div>

        {/* Enhanced Navigation Arrows */}
        {current > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 group"
            title="Previous Post"
          >
            <ChevronUp size={24} className="group-hover:scale-110 transition-transform" />
          </button>
        )}
        
        {current < posts.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 group"
            title="Next Post"
          >
            <ChevronDown size={24} className="group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/80 text-white text-xs px-3 py-2 rounded-lg opacity-70 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>H Hide Nav</span>
            <span>A Auto-play</span>
            <span>M Mute</span>
            <span>ESC Exit</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 py-4 sm:py-8">
        {/* Enhanced Header with Better Layout */}
        <div className="absolute top-4 sm:top-6 left-0 right-0 z-30 px-4">
          <div className="flex items-center justify-between">
            {/* Left: Title and Description */}
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow flex items-center gap-2">
                <TrendingUp className="text-blue-400" size={24} />
                <span className="hidden sm:inline">Finance Reels</span>
                <span className="sm:hidden">Reels</span>
              </h2>
            </div>
            
            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 sm:p-3 rounded-full shadow-xl hover:scale-110 transition-all group"
                title="Add New Post"
              >
                <Plus size={18} className="group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white p-2 sm:p-3 rounded-full shadow-xl hover:scale-110 transition-all group"
                title="Edit Post"
              >
                <Edit3 size={18} className="group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={toggleScrollMode}
                className={`p-2 sm:p-3 rounded-full shadow-xl hover:scale-110 transition-all group ${
                  scrollMode 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={scrollMode ? "Disable Scroll Mode" : "Enable Scroll Mode"}
              >
                <Scroll size={18} className="group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => setIsFullPage(true)}
                className="bg-white/20 text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all group"
                title="Full Screen Mode"
              >
                <Maximize2 size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
          
          <p className="text-blue-200 text-sm sm:text-base mt-2 text-center">
            Latest insights, tips, and strategies from the finance community
          </p>
        </div>

        {/* Enhanced Category Filter */}
        <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-xs sm:max-w-md px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full text-base sm:text-lg font-medium transition-all flex items-center justify-center hover:scale-110 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg scale-110'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={category}
              >
                {categorySymbols[category] || '📄'}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Reel Content */}
        <div className="relative w-full flex flex-col items-center justify-center mt-32 sm:mt-36">
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            disabled={current === 0}
            className={`absolute left-1/2 -translate-x-1/2 top-0 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-all group ${
              current === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
            } sm:hidden`}
            aria-label="Previous Reel"
          >
            <ChevronUp size={24} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Reel Card */}
          <div className="w-full max-w-sm sm:max-w-md mx-auto flex items-center justify-center min-h-[60vh] px-2 sm:px-4">
            <FinancePostCard 
              post={posts[current]} 
              reelMode 
              onNext={goNext}
              onPrev={goPrev}
              isFirst={current === 0}
              isLast={current === posts.length - 1}
              scrollMode={scrollMode}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onBookmark={handleBookmark}
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goNext}
            disabled={current === posts.length - 1}
            className={`absolute left-1/2 -translate-x-1/2 bottom-0 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-all group ${
              current === posts.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
            } sm:hidden`}
            aria-label="Next Reel"
          >
            <ChevronDown size={24} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Enhanced Progress Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {posts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`block w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all hover:scale-125 ${
                  idx === current 
                    ? 'bg-blue-400 scale-125 shadow-lg' 
                    : 'bg-blue-100 opacity-60 hover:opacity-80'
                }`}
                title={`Go to post ${idx + 1}`}
              />
            ))}
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => handleLike(posts[current]?.id || '')}
              className="text-white hover:text-pink-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg group"
              title="Like"
            >
              <Heart size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => handleComment(posts[current]?.id || '')}
              className="text-white hover:text-blue-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg group"
              title="Comment"
            >
              <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => handleShare(posts[current])}
              className="text-white hover:text-green-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg group"
              title="Share"
            >
              <Share2 size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => handleBookmark(posts[current]?.id || '')}
              className="text-white hover:text-yellow-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg group"
              title="Bookmark"
            >
              <Bookmark size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Post Counter */}
          <div className="text-white text-sm mt-4 opacity-70">
            {current + 1} of {posts.length} posts
          </div>
        </div>
      </section>

      {/* Blog Form Modal */}
      <FinanceBlogForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
};

export default FinanceReelSection; 
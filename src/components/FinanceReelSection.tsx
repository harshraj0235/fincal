import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, TrendingUp, ChevronUp, ChevronDown, X, 
  Home, Heart, MessageCircle, Share2, Bookmark, 
  Edit3, Scroll, Settings, RefreshCw, 
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, 
  ThumbsUp, ThumbsDown, Flag, Copy, ExternalLink, Clock, Eye,
  MousePointer, Smartphone, Monitor
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
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [infiniteScroll, setInfiniteScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const allPosts = getAllFinancePosts();
  
  // Filter posts by category
  const posts = selectedCategory === 'All' 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  // Get unique categories with proper typing
  const categories = ['All', ...Array.from(new Set(allPosts.map(post => post.category).filter((category): category is string => Boolean(category)))];

  // Helper function to get category symbol
  const getCategorySymbol = (category: string): string => {
    return categorySymbols[category] || '📄';
  };

  const goNext = () => {
    if (current < posts.length - 1) {
      setCurrent(prev => prev + 1);
      scrollToPost(current + 1);
    } else if (infiniteScroll) {
      setCurrent(0);
      scrollToPost(0);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setCurrent(prev => prev - 1);
      scrollToPost(current - 1);
    } else if (infiniteScroll) {
      setCurrent(posts.length - 1);
      scrollToPost(posts.length - 1);
    }
  };

  const scrollToPost = (index: number) => {
    if (scrollContainerRef.current) {
      const postElement = scrollContainerRef.current.children[index] as HTMLElement;
      if (postElement) {
        const behavior = scrollSpeed === 'slow' ? 'smooth' : scrollSpeed === 'fast' ? 'auto' : 'smooth';
        postElement.scrollIntoView({ behavior, block: 'start' });
      }
    }
  };

  // Enhanced scroll handling with direction detection
  const handleScroll = () => {
    if (!scrollContainerRef.current || isScrolling) return;
    
    setIsScrolling(true);
    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;
    
    // Calculate scroll progress
    const progress = (scrollTop / (scrollHeight - containerHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
    
    // Detect scroll direction
    const newIndex = Math.round(scrollTop / containerHeight);
    if (newIndex !== current && newIndex >= 0 && newIndex < posts.length) {
      setScrollDirection(newIndex > current ? 'down' : 'up');
      setCurrent(newIndex);
    }
    
    // Hide scroll indicator after scrolling
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    setShowScrollIndicator(false);
    scrollTimeoutRef.current = setTimeout(() => {
      setShowScrollIndicator(true);
      setScrollDirection(null);
    }, 2000);
    
    setTimeout(() => setIsScrolling(false), 100);
  };

  // Enhanced touch/swipe handling with momentum
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [touchStartTime, setTouchStartTime] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setTouchStartTime(Date.now());
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !touchStartTime) return;
    
    const distance = touchStart - touchEnd;
    const duration = Date.now() - touchStartTime;
    const velocity = Math.abs(distance) / duration;
    
    const isUpSwipe = distance > 50 || (distance > 20 && velocity > 0.5);
    const isDownSwipe = distance < -50 || (distance < -20 && velocity > 0.5);

    if (isUpSwipe) {
      goNext();
    } else if (isDownSwipe) {
      goPrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setTouchStartTime(null);
  };

  // Auto-play functionality with scroll mode support
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay && !scrollMode && isFullPage) {
      const intervalTime = scrollSpeed === 'slow' ? 7000 : scrollSpeed === 'fast' ? 3000 : 5000;
      interval = setInterval(() => {
        if (current < posts.length - 1) {
          goNext();
        } else if (infiniteScroll) {
          setCurrent(0);
          scrollToPost(0);
        } else {
          setAutoPlay(false);
        }
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [autoPlay, current, posts.length, scrollMode, isFullPage, infiniteScroll, scrollSpeed]);

  // Enhanced keyboard navigation
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
      if (e.key === 'i' || e.key === 'I') {
        setInfiniteScroll(!infiniteScroll);
      }
      if (e.key === 's' || e.key === 'S') {
        setScrollSpeed(prev => prev === 'slow' ? 'normal' : prev === 'normal' ? 'fast' : 'slow');
      }
    };
    
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, posts.length, isFullPage, showNavbar, autoPlay, muted, infiniteScroll, scrollSpeed]);

  // Auto-scroll to current post when category changes
  useEffect(() => {
    setCurrent(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedCategory]);

  // Toggle scroll mode with enhanced features
  const toggleScrollMode = () => {
    setScrollMode(!scrollMode);
    if (!scrollMode) {
      // Enable scroll mode
      setShowScrollIndicator(true);
    }
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

  // Scroll to top function
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ 
        top: scrollContainerRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  if (isFullPage) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        {/* Enhanced Header with Scroll Controls */}
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
              
              {/* Scroll Speed Control */}
              <select
                value={scrollSpeed}
                onChange={(e) => setScrollSpeed(e.target.value as any)}
                className="bg-black/30 text-white text-xs rounded px-2 py-1 border border-white/20"
                title="Scroll Speed"
              >
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
              </select>
              
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
              
              {/* Infinite Scroll Toggle */}
              <button
                onClick={() => setInfiniteScroll(!infiniteScroll)}
                className={`p-2 rounded-full transition-all ${
                  infiniteScroll 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={infiniteScroll ? "Disable Infinite Scroll" : "Enable Infinite Scroll"}
              >
                <RefreshCw size={16} />
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
                {getCategorySymbol(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Settings Panel */}
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
                <span className="text-sm">Infinite Scroll:</span>
                <button
                  onClick={() => setInfiniteScroll(!infiniteScroll)}
                  className={`px-3 py-1 rounded text-sm ${infiniteScroll ? 'bg-purple-600' : 'bg-gray-600'}`}
                >
                  {infiniteScroll ? 'ON' : 'OFF'}
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

        {/* Enhanced Reel Container with Scroll Features */}
        <div
          ref={scrollContainerRef}
          className={`h-full finance-reel-scroll-container finance-reel-smooth-scroll finance-reel-touch-scroll finance-reel-scroll-optimized ${scrollMode ? 'overflow-y-auto' : 'overflow-y-auto snap-y snap-mandatory'} pt-32 scroll-smooth`}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`finance-reel-snap-item ${scrollMode ? 'h-auto min-h-screen' : 'h-full snap-start'} flex items-center justify-center p-2 sm:p-4`}
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
          
          {/* Scroll End Indicator */}
          {scrollMode && (
            <div className="finance-reel-scroll-end">
              <div className="finance-reel-scroll-end-icon">🎉</div>
              <p>You've reached the end of the Finance Reels!</p>
              <p className="text-sm opacity-70 mt-2">Keep scrolling to explore more content</p>
            </div>
          )}
        </div>

        {/* Enhanced Scroll Progress Bar */}
        {showScrollIndicator && scrollMode && (
          <div className="finance-reel-scroll-progress">
            <div 
              className="finance-reel-scroll-progress-bar"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}

        {/* Enhanced Scroll Direction Indicator */}
        {scrollDirection && (
          <div className="finance-reel-scroll-direction">
            {scrollDirection === 'up' ? '↑ Scrolling Up' : '↓ Scrolling Down'}
          </div>
        )}

        {/* Scroll Speed Indicator */}
        {scrollMode && (
          <div className="finance-reel-scroll-speed">
            Speed: {scrollSpeed.charAt(0).toUpperCase() + scrollSpeed.slice(1)}
          </div>
        )}

        {/* Infinite Scroll Indicator */}
        {infiniteScroll && (
          <div className="finance-reel-infinite-indicator">
            <RefreshCw size={14} className="animate-spin" />
            Infinite Scroll Active
          </div>
        )}

        {/* Enhanced Keyboard Shortcuts Help */}
        <div className="finance-reel-scroll-instructions">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>H Hide Nav</span>
            <span>A Auto-play</span>
            <span>I Infinite</span>
            <span>S Speed</span>
            <span>ESC Exit</span>
          </div>
        </div>

        {/* Quick Scroll Buttons */}
        {scrollMode && (
          <>
            <button
              onClick={scrollToTop}
              className="absolute left-4 bottom-20 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 group"
              title="Scroll to Top"
            >
              <ChevronUp size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={scrollToBottom}
              className="absolute left-4 bottom-32 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 group"
              title="Scroll to Bottom"
            >
              <ChevronDown size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 py-4 sm:py-8">
        {/* Enhanced Header with Scroll Controls */}
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
              {/* Scroll Speed Controls */}
              <div className="finance-reel-speed-controls">
                <button
                  onClick={() => setScrollSpeed('slow')}
                  className={`finance-reel-speed-btn ${scrollSpeed === 'slow' ? 'active' : ''}`}
                  title="Slow Scroll"
                >
                  Slow
                </button>
                <button
                  onClick={() => setScrollSpeed('normal')}
                  className={`finance-reel-speed-btn ${scrollSpeed === 'normal' ? 'active' : ''}`}
                  title="Normal Scroll"
                >
                  Normal
                </button>
                <button
                  onClick={() => setScrollSpeed('fast')}
                  className={`finance-reel-speed-btn ${scrollSpeed === 'fast' ? 'active' : ''}`}
                  title="Fast Scroll"
                >
                  Fast
                </button>
              </div>
              
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
                className={`p-2 sm:p-3 rounded-full shadow-xl hover:scale-110 transition-all group finance-reel-scroll-toggle ${
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
                {getCategorySymbol(category)}
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

          {/* Scroll Mode Indicator */}
          {scrollMode && (
            <div className="text-white text-xs mt-2 opacity-50 flex items-center gap-1">
              <Scroll size={12} />
              Scroll Mode Active
            </div>
          )}
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
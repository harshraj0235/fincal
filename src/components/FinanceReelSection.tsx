import React, { useState, useRef, useEffect } from 'react';
import { Plus, TrendingUp, ChevronUp, ChevronDown, X, Filter, Grid, List, Home, Search, Heart, MessageCircle, Share2, Bookmark, MoreVertical } from 'lucide-react';
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
    };
    
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, posts.length, isFullPage]);

  // Auto-scroll to current post when category changes
  useEffect(() => {
    setCurrent(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedCategory]);

  if (isFullPage) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        {/* Header with Add Post Button */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFullPage(false)}
                className="text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black/30 hover:bg-black/50"
              >
                <X size={24} />
              </button>
              <h2 className="text-white text-lg font-semibold hidden sm:block">Finance Reels</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-full shadow-xl hover:scale-110 transition-all"
                title="Add Post"
              >
                <Plus size={20} />
              </button>
              <span className="text-white text-sm">
                {current + 1} of {posts.length}
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter - Mobile Optimized */}
        <div className="absolute top-16 left-0 right-0 z-30 bg-gradient-to-b from-black/60 to-transparent p-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
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

        {/* Reel Container */}
        <div
          ref={scrollContainerRef}
          className="h-full overflow-y-auto snap-y snap-mandatory pt-32"
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="h-full snap-start flex items-center justify-center p-2 sm:p-4"
            >
              <FinancePostCard 
                post={post} 
                reelMode 
                fullPage 
                onNext={goNext}
                onPrev={goPrev}
                isFirst={index === 0}
                isLast={index === posts.length - 1}
              />
            </div>
          ))}
        </div>

        {/* Floating Action Buttons - Right Side */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          <button className="text-white hover:text-pink-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg">
            <Heart size={24} />
          </button>
          <button className="text-white hover:text-blue-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg">
            <MessageCircle size={24} />
          </button>
          <button className="text-white hover:text-green-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg">
            <Share2 size={24} />
          </button>
          <button className="text-white hover:text-yellow-400 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg">
            <Bookmark size={24} />
          </button>
          <button className="text-white hover:text-gray-300 transition-colors p-3 rounded-full bg-black/40 hover:bg-black/70 shadow-lg">
            <MoreVertical size={24} />
          </button>
        </div>

        {/* Progress Dots - Left Side */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {posts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrent(idx);
                scrollToPost(idx);
              }}
              className={`block w-3 h-3 rounded-full transition-all ${
                idx === current 
                  ? 'bg-blue-400 scale-125 shadow-lg' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows - Mobile Optimized */}
        {current > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 sm:hidden"
          >
            <ChevronUp size={24} />
          </button>
        )}
        
        {current < posts.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 sm:hidden"
          >
            <ChevronDown size={24} />
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 py-4 sm:py-8">
        {/* Header with Add Post Button */}
        <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow flex items-center justify-center gap-2">
              <TrendingUp className="text-blue-400" size={24} />
              <span className="hidden sm:inline">Finance Reels</span>
              <span className="sm:hidden">Reels</span>
            </h2>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 sm:p-3 rounded-full shadow-xl hover:scale-110 transition-all ml-2"
              title="Add Post"
            >
              <Plus size={18} />
            </button>
          </div>
          <p className="text-sm sm:text-lg text-blue-100 font-medium drop-shadow hidden sm:block">
            Latest insights, tips, and strategies from the finance community
          </p>
        </div>

        {/* Category Filter - Mobile Optimized */}
        <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-xs sm:max-w-md px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full text-base sm:text-lg font-medium transition-all flex items-center justify-center ${
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

        {/* Action Buttons */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30">
          <button
            onClick={() => setIsFullPage(true)}
            className="bg-white/20 text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all"
            title="Full Screen"
          >
            <Grid size={18} />
          </button>
        </div>

        {/* Reel Content */}
        <div className="w-full flex flex-col items-center justify-center min-h-[70vh] mt-24 sm:mt-20">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
              <div className="text-6xl sm:text-7xl mb-4">📝</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No Posts Yet</h3>
              <p className="text-blue-200 mb-6 text-sm sm:text-base">
                Be the first to share your finance insights and tips!
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto text-base sm:text-lg font-semibold"
              >
                <Plus size={20} />
                Create First Post
              </button>
            </div>
          ) : (
            <div className="relative w-full flex flex-col items-center justify-center">
              {/* Up Arrow */}
              <button
                onClick={goPrev}
                disabled={current === 0}
                className={`absolute left-1/2 -translate-x-1/2 top-0 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-all ${current === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'} sm:hidden`}
                aria-label="Previous Reel"
              >
                <ChevronUp size={24} />
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
                />
              </div>

              {/* Down Arrow */}
              <button
                onClick={goNext}
                disabled={current === posts.length - 1}
                className={`absolute left-1/2 -translate-x-1/2 bottom-0 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-all ${current === posts.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'} sm:hidden`}
                aria-label="Next Reel"
              >
                <ChevronDown size={24} />
              </button>

              {/* Progress Dots */}
              <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                {posts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`block w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                      idx === current 
                        ? 'bg-blue-400 scale-125 shadow-lg' 
                        : 'bg-blue-100 opacity-60 hover:opacity-80'
                    }`}
                  />
                ))}
              </div>

              {/* Full Page Button */}
              <button
                onClick={() => setIsFullPage(true)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                title="Full Screen"
              >
                <Grid size={18} />
              </button>
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
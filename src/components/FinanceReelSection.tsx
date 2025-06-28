import React, { useState, useRef, useEffect } from 'react';
import { Plus, TrendingUp, ChevronUp, ChevronDown, X, Filter, Grid, List } from 'lucide-react';
import { getAllFinancePosts, FinancePost } from '../data/financePosts';
import FinancePostCard from './FinancePostCard';
import FinanceBlogForm from './FinanceBlogForm';

const FinanceReelSection: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFullPage, setIsFullPage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [current, setCurrent] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
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
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFullPage(false)}
                className="text-white hover:text-gray-300 transition-colors p-2"
              >
                <X size={24} />
              </button>
              <h2 className="text-white text-lg font-semibold">Finance Reels</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white text-sm">
                {current + 1} of {posts.length}
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="absolute top-16 left-0 right-0 z-30 bg-gradient-to-b from-black/60 to-transparent p-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Reel Container */}
        <div
          ref={scrollContainerRef}
          className="h-full overflow-y-auto snap-y snap-mandatory"
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="h-full snap-start flex items-center justify-center p-4"
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

        {/* Navigation Arrows */}
        {current > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
          >
            <ChevronUp size={24} />
          </button>
        )}
        
        {current < posts.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
          >
            <ChevronDown size={24} />
          </button>
        )}

        {/* Progress Dots */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
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
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 py-8">
        {/* Header */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center">
          <h2 className="text-4xl font-extrabold text-white drop-shadow mb-1 flex items-center justify-center gap-2">
            <TrendingUp className="text-blue-400" size={36} />
            Finance Reels
          </h2>
          <p className="text-lg text-blue-100 font-medium drop-shadow">
            Latest insights, tips, and strategies from the finance community
          </p>
        </div>

        {/* Category Filter */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-md">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 z-30 flex gap-2">
          <button
            onClick={() => setIsFullPage(true)}
            className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all"
            title="Full Screen"
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-full shadow-xl hover:scale-110 transition-all"
            title="Add Post"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Reel Content */}
        <div className="w-full flex flex-col items-center justify-center min-h-[70vh] mt-20">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="text-7xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Posts Yet</h3>
              <p className="text-blue-200 mb-6">
                Be the first to share your finance insights and tips!
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto text-lg font-semibold"
              >
                <Plus size={24} />
                Create First Post
              </button>
            </div>
          ) : (
            <div className="relative w-full flex flex-col items-center justify-center">
              {/* Up Arrow */}
              <button
                onClick={goPrev}
                disabled={current === 0}
                className={`absolute left-1/2 -translate-x-1/2 top-0 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-all ${current === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}`}
                aria-label="Previous Reel"
              >
                <ChevronUp size={32} />
              </button>

              {/* Reel Card */}
              <div className="w-full max-w-md mx-auto flex items-center justify-center min-h-[60vh]">
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
                className={`absolute left-1/2 -translate-x-1/2 bottom-0 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-all ${current === posts.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}`}
                aria-label="Next Reel"
              >
                <ChevronDown size={32} />
              </button>

              {/* Progress Dots */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                {posts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`block w-3 h-3 rounded-full transition-all ${
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
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                title="Full Screen"
              >
                <Grid size={20} />
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
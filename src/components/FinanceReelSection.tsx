import React, { useState } from 'react';
import { Plus, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';
import { getAllFinancePosts } from '../data/financePosts';
import FinancePostCard from './FinancePostCard';
import FinanceBlogForm from './FinanceBlogForm';

const FinanceReelSection: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const posts = getAllFinancePosts();
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((prev) => (prev < posts.length - 1 ? prev + 1 : prev));
  const goPrev = () => setCurrent((prev) => (prev > 0 ? prev - 1 : prev));

  // Keyboard navigation
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [posts.length]);

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

        {/* Add Post Floating Button */}
        <button
          onClick={() => setIsFormOpen(true)}
          className="fixed bottom-8 right-8 z-30 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all flex items-center gap-2"
        >
          <Plus size={24} />
        </button>

        {/* Reel Content */}
        <div className="w-full flex flex-col items-center justify-center min-h-[70vh]">
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
                <FinancePostCard post={posts[current]} reelMode />
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
                  <span
                    key={idx}
                    className={`block w-3 h-3 rounded-full ${idx === current ? 'bg-blue-400 scale-125 shadow-lg' : 'bg-blue-100 opacity-60'}`}
                  />
                ))}
              </div>
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
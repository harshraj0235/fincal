import React, { useState } from 'react';
import { Plus, TrendingUp } from 'lucide-react';
import { getAllFinancePosts } from '../data/financePosts';
import FinancePostCard from './FinancePostCard';
import FinanceBlogForm from './FinanceBlogForm';

const FinanceReelSection: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const posts = getAllFinancePosts();

  return (
    <>
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center sm:justify-start gap-2">
                <TrendingUp className="text-blue-600" size={32} />
                Finance Reels
              </h2>
              <p className="text-lg text-gray-600">
                Latest insights, tips, and strategies from the finance community
              </p>
            </div>
            
            {/* Add Post Button */}
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Add Your Post
            </button>
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Yet</h3>
              <p className="text-gray-600 mb-6">
                Be the first to share your finance insights and tips!
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <Plus size={20} />
                Create First Post
              </button>
            </div>
          ) : (
            <div className="relative">
              {/* Scrollable Container */}
              <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                {posts.map((post) => (
                  <FinancePostCard key={post.id} post={post} />
                ))}
              </div>
              
              {/* Scroll Indicators */}
              <div className="flex justify-center mt-4">
                <div className="flex space-x-2">
                  {posts.length > 3 && (
                    <>
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-8 bg-white rounded-lg px-6 py-4 shadow-md">
              <div>
                <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
                <div className="text-sm text-gray-600">Total Posts</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {posts.filter(post => post.category === 'Investment').length}
                </div>
                <div className="text-sm text-gray-600">Investment</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {posts.filter(post => post.category === 'Personal Finance').length}
                </div>
                <div className="text-sm text-gray-600">Personal Finance</div>
              </div>
            </div>
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
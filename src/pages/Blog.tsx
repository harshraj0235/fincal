import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { loadAllBlogData } from '../data/lazyBlogData';
import { ResponsiveAd } from '../components/BannerAd';

const ITEMS_PER_PAGE = 12;

export const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [allBlogPosts, setAllBlogPosts] = useState<any[]>([]);

  // Lazy load blog data
  useEffect(() => {
    let isActive = true;
    const loadPosts = async () => {
      try {
        const posts = await loadAllBlogData();
        if (isActive && Array.isArray(posts) && posts.length > 0) {
          // Sort by latest
          const sorted = posts.filter(Boolean).sort((a, b) => {
              const dateA = a.date ? new Date(a.date).getTime() : 0;
              const dateB = b.date ? new Date(b.date).getTime() : 0;
              return dateB - dateA;
          });
          setAllBlogPosts(sorted);
        }
      } catch (err) {
        console.error('Blog load error:', err);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };
    loadPosts();
    return () => { isActive = false; };
  }, []);

  const totalPages = Math.ceil(allBlogPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = allBlogPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
      if (currentPage < totalPages) {
          setCurrentPage(prev => prev + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

  const handlePrevPage = () => {
      if (currentPage > 1) {
          setCurrentPage(prev => prev - 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <SEOHelmet
        title="MoneyCal Blog - Financial Guides, Taxes, Investing & Banking | MoneyCal.in"
        description="Read expert financial guides, investing tips, tax updates, and money management insights tailored for India."
        keywords="financial blog, investment tips, tax advice, money management, india finance"
        url="/blog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section like Discover */}
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Personal <span className="text-blue-600">Finance</span> Blog
            </h1>
            <p className="text-lg text-slate-600">
                Expert financial guides, investing tips, tax updates, and money management insights.
            </p>
        </div>

        <div className="mb-10">
            <ResponsiveAd slot="blog-top" />
        </div>

        {/* Articles Grid */}
        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 animate-pulse">
                    <div className="h-48 bg-slate-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ))}
            </div>
        ) : allBlogPosts.length === 0 ? (
            <div className="text-center py-20">
                <p className="text-slate-500 text-lg">No articles found.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post) => (
                    <Link 
                        key={post.id || post.slug} 
                        to={`/blog/${post.slug}`} 
                        className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col"
                    >
                        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                            <img 
                                src={post.coverImage || post.featuredImage || 'https://via.placeholder.com/600x400'} 
                                alt={post.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-blue-500" />
                                    {post.date && !isNaN(new Date(post.date).getTime()) 
                                        ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                        : 'Recently'}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <User className="w-4 h-4 text-blue-500" />
                                    {post.author || 'MoneyCal Team'}
                                </div>
                            </div>
                            
                            <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </h2>
                            
                            <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow">
                                {post.excerpt || post.description || post.metaDescription || (post.content && post.content.find((c: any) => c.type === 'paragraph')?.content)}
                            </p>
                            
                            <div className="flex items-center text-blue-600 font-semibold text-sm mt-auto">
                                Read Article
                                <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}

        {/* Pagination Controls */}
        {!isLoading && totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
                <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" /> Previous
                </button>
                
                <div className="text-slate-600 font-medium">
                    Page {currentPage} of {totalPages}
                </div>
                
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

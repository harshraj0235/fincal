import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, ChevronRight, User, ArrowRight, ChevronLeft } from 'lucide-react';
import { discoverMetadata as discoverArticles } from '../data/discover/metadata';
import { ResponsiveAd } from '../components/BannerAd';

const ITEMS_PER_PAGE = 10;

export const Discover = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Sort by date (newest first), safely handling invalid dates
    const sortedArticles = [...discoverArticles].sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        const validA = isNaN(dateA) ? 0 : dateA;
        const validB = isNaN(dateB) ? 0 : dateB;
        return validB - validA;
    });

    const totalPages = Math.ceil(sortedArticles.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentArticles = sortedArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
            <Helmet>
                <title>Google Discover Stories & Articles - MoneyCal</title>
                <meta name="description" content="Read the latest Google Discover finance stories, IPO reviews, and investment tips by MoneyCal." />
                <link rel="canonical" href="https://moneycal.in/discover" />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Discover <span className="text-blue-600">Finance</span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Top trending stories, in-depth IPO reviews, and expert financial insights.
                    </p>
                </div>

                <div className="mb-10">
                    <ResponsiveAd slot="discover-top" />
                </div>

                {/* Articles Grid */}
                {sortedArticles.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No discover articles found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentArticles.map((article) => (
                            <a 
                                key={article.id} 
                                href={`/discover/${article.slug}/`} 
                                className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                                    <img 
                                        src={article.coverImage} 
                                        alt={article.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            {article.date && !isNaN(new Date(article.date).getTime()) 
                                                ? new Date(article.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'short', day: 'numeric' })
                                                : ''}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-4 h-4 text-blue-500" />
                                            {article.author}
                                        </div>
                                    </div>
                                    
                                    <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {article.title}
                                    </h2>
                                    
                                    <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow">
                                        {article.snippet}
                                    </p>
                                    
                                    <div className="flex items-center text-blue-600 font-semibold text-sm mt-auto">
                                        Read Article
                                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
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

export default Discover;

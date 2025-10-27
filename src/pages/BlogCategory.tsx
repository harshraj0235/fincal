import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Clock, 
  Eye, 
  ArrowLeft,
  Grid,
  List,
  BookOpen,
  Filter
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { loadAllBlogData } from '../data/lazyBlogData';

const BlogCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [allBlogPosts, setBlogPosts] = useState<any[]>([]);
  const postsPerPage = 12;

  // Lazy load blog data
  useEffect(() => {
    loadAllBlogData().then(posts => {
      setBlogPosts(posts);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  // Format category for display
  const formatCategory = (cat: string) => {
    return cat?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || '';
  };

  // Filter posts by category
  const categoryPosts = allBlogPosts.filter(post => 
    post.categories?.some((cat: string) => 
      cat.toLowerCase().replace(/\s+/g, '-') === category?.toLowerCase()
    ) || 
    post.category?.toLowerCase().replace(/\s+/g, '-') === category?.toLowerCase()
  );

  // Further filter by search term
  const filteredPosts = categoryPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.date || b.publishDate).getTime() - new Date(a.date || a.publishDate).getTime();
      case 'oldest':
        return new Date(a.date || a.publishDate).getTime() - new Date(b.date || b.publishDate).getTime();
      case 'popular':
        return (b.views || 0) - (a.views || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  const categoryTitle = formatCategory(category || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-lg text-neutral-600">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (categoryPosts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12">
        <SEOHelmet 
          title={`${categoryTitle} Articles - MoneyCal`}
          description={`Browse articles about ${categoryTitle.toLowerCase()} on MoneyCal`}
          canonical={`/blog/category/${category}`}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Blog</span>
            </button>
          </div>
          <div className="text-center py-16">
            <BookOpen className="h-24 w-24 text-neutral-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">No Articles Found</h2>
            <p className="text-lg text-neutral-600 mb-8">
              We don't have any articles in the "{categoryTitle}" category yet.
            </p>
            <Link 
              to="/blog" 
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12">
      <SEOHelmet 
        title={`${categoryTitle} Articles - MoneyCal`}
        description={`Browse ${categoryPosts.length} articles about ${categoryTitle.toLowerCase()} including guides, tips, and insights on MoneyCal`}
        canonical={`/blog/category/${category}`}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Blog</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              {categoryTitle} Articles
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              {categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
              
              <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid/List */}
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">No articles match your search</h3>
            <p className="text-neutral-600">Try adjusting your search terms or browse all articles.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12"
            : "space-y-6 mb-12"
          }>
            {paginatedPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {post.image && (
                  <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'}>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6 flex-1">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                      {categoryTitle}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-neutral-900 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  {post.excerpt && (
                    <p className="text-neutral-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date || post.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime || '5 min read'}
                      </div>
                      {post.views && (
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center mt-4 text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Read More
                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-neutral-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  page === currentPage
                    ? 'bg-primary-600 text-white'
                    : 'border border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-neutral-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCategory;

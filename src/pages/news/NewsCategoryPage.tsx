import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Eye,
  Filter,
  Grid,
  List,
  Search
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { newsCategories, getCategoryBySlug } from '../../data/newsCategories';

const NewsCategoryPage: React.FC = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const category = getCategoryBySlug(categorySlug || '');

  if (!category) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Category Not Found</h2>
            <Link to="/news" className="text-primary-600 hover:text-primary-800">
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Mock articles - replace with actual data from your CMS/database
  const mockArticles = [
    {
      id: '1',
      headline: 'Sample Article in ' + category.name,
      excerpt: 'This is a placeholder. Connect to your article database or CMS.',
      image: 'https://via.placeholder.com/400x250',
      datePublished: new Date().toISOString(),
      author: { name: 'MoneyCal Editor' },
      subcategory: category.subcategories[0]?.slug || '',
      readTime: 5,
      views: 1250,
      trending: true
    }
  ];

  const filteredArticles = mockArticles.filter(article => 
    (selectedSubcategory === 'all' || article.subcategory === selectedSubcategory) &&
    (searchTerm === '' || article.headline.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <SEOHelmet
        title={`${category.name} News - Latest Updates & Analysis | MoneyCal`}
        description={category.description}
        keywords={category.subcategories.flatMap(sub => sub.keywords).join(', ')}
        url={`/news/${category.slug}`}
        type="website"
      />

      {/* Category Hero */}
      <div className={`bg-gradient-to-r from-${category.color}-600 to-${category.color}-800 text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/news')}
            className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to News Home
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-4 bg-white/20 rounded-lg backdrop-blur-sm`}>
              <TrendingUp className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
              <p className="text-xl text-white/90">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Subcategory Filter */}
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Topics</option>
              {category.subcategories.map(sub => (
                <option key={sub.id} value={sub.slug}>{sub.name}</option>
              ))}
            </select>

            {/* Sort & View */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg"
              >
                <option value="latest">Latest First</option>
                <option value="trending">Trending</option>
                <option value="popular">Most Popular</option>
              </select>
              
              <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategory Quick Links */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Browse Topics</h2>
          <div className="flex flex-wrap gap-3">
            {category.subcategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(sub.slug)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedSubcategory === sub.slug
                    ? `bg-${category.color}-600 text-white shadow-md`
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          : "space-y-6"
        }>
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'}>
                <img 
                  src={article.image} 
                  alt={article.headline}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 flex-1">
                {article.trending && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                  <Link to={`/news/${category.slug}/${article.id}`}>
                    {article.headline}
                  </Link>
                </h3>
                
                <p className="text-neutral-600 mb-4 line-clamp-3">{article.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.datePublished).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime} min
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {article.views?.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Placeholder for pagination */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">No articles found</h3>
            <p className="text-neutral-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCategoryPage;


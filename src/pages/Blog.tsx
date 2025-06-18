import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogData';

// Full categories list
const categories = [
  'All Categories',
  'Government Schemes',
  'Investment',
  'Tax Planning',
  'Retirement Planning',
  'Rural Finance',
  'Senior Citizens',
  'Financial Inclusion',
  'Home Loans',
  'Real Estate',
  'EMI Calculation',
  'Financial Planning',
  'Mutual Funds',
  'SIP',
  'Lumpsum',
  'Wealth Management',
  'Corpus Calculation',
  'Income Tax',
  'Government Regulations',
  'Insurance',
  'Social Security',
  'Stock Market',
  'Automotive',
  'Sustainable Energy',
  'Rural Development',
  'Employment',
  'Economy',
  'ETFs',
  'Cryptocurrency',
  'Green Bonds',
  'Technology',
  'Startups',
  'Green Energy',
  'Electric Vehicles',
  'Wealth Creation',
  'Gen Z',
  'Cost-Effective Investing',
  'Agriculture',
  'Farm Loans',
  'Budget',
  'SME',
  'Financial Freedom',
  'Social Welfare',
  'Government Policies',
  'Millennials',
  'Young Professionals',
  'ETF',
  'Bank',
  'PMAY',
  'Business Loan',
  'Infrastructure',
  'Defence',
  'Export'
];

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' ||
      post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Finance Blog</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Expert insights, tips, and guides to help you make better financial decisions
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/3 lg:w-1/4 space-y-6">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Categories</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                    selectedCategory === category
                      ? 'bg-primary-100 text-primary-800 font-medium'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Government Scheme Guides</h3>
            <p className="text-sm text-primary-700 mb-3">
              Explore our comprehensive guides on various government financial schemes in India.
            </p>
            <Link
              to="/blog/category/government-schemes"
              className="text-sm font-medium text-primary-700 hover:text-primary-800 flex items-center"
            >
              View all guides
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Write for Us</h3>
            <p className="text-sm text-primary-700 mb-3">
              Share your financial expertise with our community. We welcome guest contributions from finance professionals.
            </p>
            <Link
              to="/blog/write"
              className="text-sm font-medium text-primary-700 hover:text-primary-800 flex items-center"
            >
              Learn more
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <p className="text-lg text-neutral-600">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center text-xs text-neutral-500 mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-neutral-600 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map(category => (
                        <span
                          key={category}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;

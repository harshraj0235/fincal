import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Calendar, Users, Eye, Share2, BookOpen, Target, BarChart3 } from 'lucide-react';

interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  trendScore: number;
  searchVolume: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  opportunity: 'High' | 'Medium' | 'Low';
  lastUpdated: string;
  relatedKeywords: string[];
}

const ContentMarketingHub: React.FC = () => {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'trend' | 'volume' | 'opportunity'>('trend');

  // Trending finance topics for 2025
  const financeTopics: TrendingTopic[] = [
    {
      id: 'crypto-tax-2025',
      title: 'Cryptocurrency Tax Planning India 2025',
      description: 'Complete guide to crypto taxation, TDS implications, and optimization strategies for Indian investors.',
      category: 'Tax Planning',
      trendScore: 95,
      searchVolume: 45000,
      difficulty: 'Medium',
      opportunity: 'High',
      lastUpdated: '2025-01-15',
      relatedKeywords: ['crypto tax india', 'bitcoin tax', 'cryptocurrency taxation', 'TDS crypto', 'crypto investment tax']
    },
    {
      id: 'nps-vs-epf-2025',
      title: 'NPS vs EPF: Which is Better for Retirement Planning?',
      description: 'Comprehensive comparison of NPS and EPF for retirement planning in India with tax benefits analysis.',
      category: 'Retirement Planning',
      trendScore: 88,
      searchVolume: 32000,
      difficulty: 'Easy',
      opportunity: 'High',
      lastUpdated: '2025-01-14',
      relatedKeywords: ['NPS vs EPF', 'retirement planning india', 'pension fund', 'employee provident fund', 'national pension system']
    },
    {
      id: 'mutual-fund-sip-2025',
      title: 'Best SIP Mutual Funds for 2025: Complete Guide',
      description: 'Top-performing SIP mutual funds, selection criteria, and portfolio optimization strategies.',
      category: 'Investment',
      trendScore: 92,
      searchVolume: 68000,
      difficulty: 'Medium',
      opportunity: 'High',
      lastUpdated: '2025-01-13',
      relatedKeywords: ['best SIP funds', 'mutual fund SIP', 'top performing mutual funds', 'SIP investment', 'mutual fund selection']
    },
    {
      id: 'home-loan-interest-rates-2025',
      title: 'Home Loan Interest Rates 2025: Complete Comparison',
      description: 'Current home loan rates, eligibility criteria, and tips to get the best interest rates.',
      category: 'Home Loans',
      trendScore: 85,
      searchVolume: 55000,
      difficulty: 'Easy',
      opportunity: 'Medium',
      lastUpdated: '2025-01-12',
      relatedKeywords: ['home loan rates', 'home loan interest', 'home loan eligibility', 'best home loan', 'home loan comparison']
    },
    {
      id: 'stock-market-basics-2025',
      title: 'Stock Market Basics for Beginners in India 2025',
      description: 'Complete beginner guide to stock market investing, trading basics, and risk management.',
      category: 'Stock Market',
      trendScore: 90,
      searchVolume: 78000,
      difficulty: 'Easy',
      opportunity: 'High',
      lastUpdated: '2025-01-11',
      relatedKeywords: ['stock market basics', 'beginner investing', 'how to invest in stocks', 'stock trading basics', 'share market india']
    },
    {
      id: 'tax-saving-investments-2025',
      title: 'Best Tax Saving Investments Under Section 80C 2025',
      description: 'Complete guide to tax-saving investments, ELSS funds, PPF, and other Section 80C options.',
      category: 'Tax Planning',
      trendScore: 87,
      searchVolume: 42000,
      difficulty: 'Medium',
      opportunity: 'High',
      lastUpdated: '2025-01-10',
      relatedKeywords: ['tax saving investments', 'section 80C', 'ELSS funds', 'PPF investment', 'tax planning']
    },
    {
      id: 'gold-investment-2025',
      title: 'Gold Investment Guide India 2025: SGB vs Physical Gold',
      description: 'Complete comparison of gold investment options including SGB, gold ETFs, and physical gold.',
      category: 'Gold Investment',
      trendScore: 82,
      searchVolume: 35000,
      difficulty: 'Easy',
      opportunity: 'Medium',
      lastUpdated: '2025-01-09',
      relatedKeywords: ['gold investment', 'SGB vs physical gold', 'gold ETF', 'sovereign gold bond', 'gold price prediction']
    },
    {
      id: 'personal-finance-budgeting-2025',
      title: 'Personal Finance Budgeting: 50/30/20 Rule in India',
      description: 'Complete guide to personal finance budgeting, expense tracking, and financial goal setting.',
      category: 'Personal Finance',
      trendScore: 89,
      searchVolume: 48000,
      difficulty: 'Easy',
      opportunity: 'High',
      lastUpdated: '2025-01-08',
      relatedKeywords: ['personal finance', 'budgeting tips', '50 30 20 rule', 'expense tracking', 'financial planning']
    }
  ];

  useEffect(() => {
    setTrendingTopics(financeTopics);
  }, []);

  const filteredTopics = trendingTopics.filter(topic => 
    selectedCategory === 'all' || topic.category === selectedCategory
  );

  const sortedTopics = [...filteredTopics].sort((a, b) => {
    switch (sortBy) {
      case 'trend':
        return b.trendScore - a.trendScore;
      case 'volume':
        return b.searchVolume - a.searchVolume;
      case 'opportunity':
        const opportunityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return opportunityOrder[b.opportunity] - opportunityOrder[a.opportunity];
      default:
        return 0;
    }
  });

  const categories = ['all', ...Array.from(new Set(trendingTopics.map(topic => topic.category)))];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Content Marketing Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover trending finance topics, analyze search volumes, and create content that ranks on Google. 
            Stay ahead of the competition with data-driven content strategies.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{trendingTopics.length}</div>
            <div className="text-gray-600">Trending Topics</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {trendingTopics.reduce((sum, topic) => sum + topic.searchVolume, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Search Volume</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {trendingTopics.filter(topic => topic.opportunity === 'High').length}
            </div>
            <div className="text-gray-600">High Opportunity</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">2025</div>
            <div className="text-gray-600">Latest Trends</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'trend' | 'volume' | 'opportunity')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="trend">Trend Score</option>
                <option value="volume">Search Volume</option>
                <option value="opportunity">Opportunity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trending Topics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedTopics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {topic.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                      {topic.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOpportunityColor(topic.opportunity)}`}>
                      {topic.opportunity}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{topic.trendScore}</div>
                    <div className="text-xs text-gray-600">Trend Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{topic.searchVolume.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Search Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{topic.category}</div>
                    <div className="text-xs text-gray-600">Category</div>
                  </div>
                </div>

                {/* Keywords */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Related Keywords:</div>
                  <div className="flex flex-wrap gap-1">
                    {topic.relatedKeywords.slice(0, 4).map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                      >
                        {keyword}
                      </span>
                    ))}
                    {topic.relatedKeywords.length > 4 && (
                      <span className="text-xs text-gray-500">
                        +{topic.relatedKeywords.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Updated {new Date(topic.lastUpdated).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <BookOpen className="w-4 h-4" />
                    </button>
                    <Link
                      to={`/finance-blog/${topic.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                    >
                      Create Content
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Create High-Ranking Content?</h3>
          <p className="text-lg mb-6 opacity-90">
            Use our content marketing insights to create SEO-optimized articles that rank on Google and drive traffic to your finance platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/finance-blog"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              View Finance Blog
            </Link>
            <Link
              to="/comprehensive-finance-hub"
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Finance Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentMarketingHub;

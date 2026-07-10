import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Target, BarChart3, Eye, DollarSign, Users, Calendar } from 'lucide-react';

interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cpc: number;
  competition: 'Low' | 'Medium' | 'High';
  trend: 'Rising' | 'Stable' | 'Declining';
  opportunity: 'High' | 'Medium' | 'Low';
  relatedKeywords: string[];
}

const KeywordResearchHub: React.FC = () => {
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'volume' | 'difficulty' | 'opportunity'>('volume');

  // Comprehensive finance keywords for India 2025
  const financeKeywords: KeywordData[] = [
    {
      keyword: 'personal finance india',
      searchVolume: 45000,
      difficulty: 'Medium',
      cpc: 12.50,
      competition: 'High',
      trend: 'Rising',
      opportunity: 'High',
      relatedKeywords: ['personal finance planning', 'money management india', 'financial planning tips']
    },
    {
      keyword: 'mutual fund sip calculator',
      searchVolume: 68000,
      difficulty: 'Easy',
      cpc: 8.75,
      competition: 'Medium',
      trend: 'Rising',
      opportunity: 'High',
      relatedKeywords: ['sip calculator', 'mutual fund calculator', 'sip investment calculator']
    },
    {
      keyword: 'home loan interest rates 2025',
      searchVolume: 55000,
      difficulty: 'Medium',
      cpc: 15.25,
      competition: 'High',
      trend: 'Stable',
      opportunity: 'Medium',
      relatedKeywords: ['home loan rates', 'home loan calculator', 'best home loan rates']
    },
    {
      keyword: 'tax saving investments 2025',
      searchVolume: 42000,
      difficulty: 'Medium',
      cpc: 18.50,
      competition: 'High',
      trend: 'Rising',
      opportunity: 'High',
      relatedKeywords: ['section 80c investments', 'tax planning', 'elss funds']
    },
    {
      keyword: 'stock market basics for beginners',
      searchVolume: 78000,
      difficulty: 'Easy',
      cpc: 6.25,
      competition: 'Medium',
      trend: 'Rising',
      opportunity: 'High',
      relatedKeywords: ['how to invest in stocks', 'stock market guide', 'beginner investing']
    },
    {
      keyword: 'cryptocurrency investment india',
      searchVolume: 35000,
      difficulty: 'Hard',
      cpc: 22.75,
      competition: 'High',
      trend: 'Rising',
      opportunity: 'Medium',
      relatedKeywords: ['bitcoin investment', 'crypto trading', 'digital currency india']
    },
    {
      keyword: 'retirement planning india',
      searchVolume: 28000,
      difficulty: 'Easy',
      cpc: 14.50,
      competition: 'Medium',
      trend: 'Stable',
      opportunity: 'High',
      relatedKeywords: ['nps vs epf', 'pension planning', 'retirement corpus']
    },
    {
      keyword: 'gold investment options india',
      searchVolume: 32000,
      difficulty: 'Easy',
      cpc: 9.75,
      competition: 'Medium',
      trend: 'Stable',
      opportunity: 'Medium',
      relatedKeywords: ['gold etf', 'sovereign gold bond', 'gold price prediction']
    },
    {
      keyword: 'credit card comparison india',
      searchVolume: 45000,
      difficulty: 'Medium',
      cpc: 16.25,
      competition: 'High',
      trend: 'Rising',
      opportunity: 'Medium',
      relatedKeywords: ['best credit cards', 'credit card offers', 'credit card benefits']
    },
    {
      keyword: 'insurance planning india',
      searchVolume: 38000,
      difficulty: 'Medium',
      cpc: 19.50,
      competition: 'High',
      trend: 'Stable',
      opportunity: 'High',
      relatedKeywords: ['life insurance', 'health insurance', 'term insurance']
    },
    {
      keyword: 'real estate investment india',
      searchVolume: 41000,
      difficulty: 'Hard',
      cpc: 25.75,
      competition: 'High',
      trend: 'Stable',
      opportunity: 'Medium',
      relatedKeywords: ['property investment', 'reits india', 'real estate trends']
    },
    {
      keyword: 'budgeting tips india',
      searchVolume: 25000,
      difficulty: 'Easy',
      cpc: 7.25,
      competition: 'Low',
      trend: 'Rising',
      opportunity: 'High',
      relatedKeywords: ['expense tracking', 'money saving tips', 'financial planning']
    },
    {
      keyword: 'loan Calculator india',
      searchVolume: 62000,
      difficulty: 'Easy',
      cpc: 11.50,
      competition: 'Medium',
      trend: 'Rising',
      opportunity: 'High',
      relatedKeywords: ['emi calculator', 'personal loan calculator', 'loan comparison']
    },
    {
      keyword: 'investment options for beginners',
      searchVolume: 36000,
      difficulty: 'Easy',
      cpc: 8.25,
      competition: 'Medium',
      trend: 'Rising',
      opportunity: 'High',
      relatedKeywords: ['beginner investment', 'safe investment options', 'investment guide']
    },
    {
      keyword: 'financial goals planning',
      searchVolume: 22000,
      difficulty: 'Easy',
      cpc: 13.75,
      competition: 'Low',
      trend: 'Rising',
      opportunity: 'High',
      relatedKeywords: ['goal based investing', 'financial planning', 'wealth building']
    }
  ];

  useEffect(() => {
    setKeywords(financeKeywords);
  }, []);

  const filteredKeywords = keywords.filter(keyword => {
    const matchesSearch = keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         keyword.relatedKeywords.some(related => 
                           related.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'high-opportunity' && keyword.opportunity === 'High') ||
                           (selectedCategory === 'low-competition' && keyword.competition === 'Low') ||
                           (selectedCategory === 'high-volume' && keyword.searchVolume > 50000);
    
    return matchesSearch && matchesCategory;
  });

  const sortedKeywords = [...filteredKeywords].sort((a, b) => {
    switch (sortBy) {
      case 'volume':
        return b.searchVolume - a.searchVolume;
      case 'difficulty': {
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
      case 'opportunity': {
        const opportunityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return opportunityOrder[b.opportunity] - opportunityOrder[a.opportunity];
      }
      default:
        return 0;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Rising': return 'text-green-600';
      case 'Stable': return 'text-blue-600';
      case 'Declining': return 'text-red-600';
      default: return 'text-gray-600';
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

  const totalSearchVolume = keywords.reduce((sum, keyword) => sum + keyword.searchVolume, 0);
  const highOpportunityKeywords = keywords.filter(k => k.opportunity === 'High').length;
  const lowCompetitionKeywords = keywords.filter(k => k.competition === 'Low').length;
  const averageCPC = keywords.reduce((sum, keyword) => sum + keyword.cpc, 0) / keywords.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Keyword Research Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover high-value finance keywords, analyze search volumes, and identify content opportunities 
            to dominate Google search results for finance-related queries in India.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Search className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{keywords.length}</div>
            <div className="text-gray-600">Total Keywords</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {totalSearchVolume.toLocaleString()}
            </div>
            <div className="text-gray-600">Total Search Volume</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{highOpportunityKeywords}</div>
            <div className="text-gray-600">High Opportunity</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">₹{averageCPC.toFixed(2)}</div>
            <div className="text-gray-600">Avg. CPC</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Keywords</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search keywords or related terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Keywords</option>
                <option value="high-opportunity">High Opportunity</option>
                <option value="low-competition">Low Competition</option>
                <option value="high-volume">High Volume (50k+)</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'volume' | 'difficulty' | 'opportunity')}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="volume">Search Volume</option>
                <option value="difficulty">Difficulty (Easy First)</option>
                <option value="opportunity">Opportunity Score</option>
              </select>
            </div>
          </div>
        </div>

        {/* Keywords Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Finance Keywords Analysis ({sortedKeywords.length} results)
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Keyword
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Search Volume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Competition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPC
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opportunity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedKeywords.map((keyword, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{keyword.keyword}</div>
                      <div className="text-sm text-gray-500">
                        {keyword.relatedKeywords.slice(0, 2).join(', ')}
                        {keyword.relatedKeywords.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{keyword.searchVolume.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(keyword.difficulty)}`}>
                        {keyword.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCompetitionColor(keyword.competition)}`}>
                        {keyword.competition}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{keyword.cpc.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${getTrendColor(keyword.trend)}`}>
                        {keyword.trend}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOpportunityColor(keyword.opportunity)}`}>
                        {keyword.opportunity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Dominate Finance Keywords?</h3>
          <p className="text-lg mb-6 opacity-90">
            Use our keyword research insights to create content that ranks on Google and drives organic traffic to your finance platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Export Keywords
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200">
              Create Content Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordResearchHub;

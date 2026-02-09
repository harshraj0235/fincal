import React, { useState, useEffect } from 'react';
import { Link, ExternalLink, TrendingUp, Target, Users, Globe, Award, Search, Filter, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface BacklinkOpportunity {
  id: string;
  domain: string;
  domainRating: number;
  traffic: number;
  relevance: 'High' | 'Medium' | 'Low';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  opportunity: 'High' | 'Medium' | 'Low';
  contactEmail?: string;
  contactForm?: string;
  socialMedia?: string[];
  contentType: string;
  description: string;
  status: 'pending' | 'contacted' | 'responded' | 'secured' | 'rejected';
  lastContact?: string;
  notes?: string;
}

const BacklinkHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'outreach' | 'tracking'>('opportunities');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [opportunities, setOpportunities] = useState<BacklinkOpportunity[]>([]);

  // Sample backlink opportunities
  const sampleOpportunities: BacklinkOpportunity[] = [
    {
      id: '1',
      domain: 'economictimes.indiatimes.com',
      domainRating: 85,
      traffic: 15000000,
      relevance: 'High',
      difficulty: 'Hard',
      opportunity: 'High',
      contactEmail: 'editorial@economictimes.com',
      socialMedia: ['@EconomicTimes'],
      contentType: 'Finance News',
      description: 'Leading financial news website in India. High authority domain with excellent finance content.',
      status: 'pending'
    },
    {
      id: '2',
      domain: 'moneylife.in',
      domainRating: 72,
      traffic: 2500000,
      relevance: 'High',
      difficulty: 'Medium',
      opportunity: 'High',
      contactEmail: 'contact@moneylife.in',
      socialMedia: ['@MoneyLifeIndia'],
      contentType: 'Personal Finance',
      description: 'Popular personal finance website with strong community engagement and expert content.',
      status: 'pending'
    },
    {
      id: '3',
      domain: 'livemint.com',
      domainRating: 78,
      traffic: 8000000,
      relevance: 'High',
      difficulty: 'Hard',
      opportunity: 'Medium',
      contactEmail: 'feedback@livemint.com',
      socialMedia: ['@livemint'],
      contentType: 'Business & Finance',
      description: 'Leading business and finance publication with high-quality content and strong readership.',
      status: 'pending'
    },
    {
      id: '4',
      domain: 'financialexpress.com',
      domainRating: 75,
      traffic: 5000000,
      relevance: 'High',
      difficulty: 'Medium',
      opportunity: 'High',
      contactEmail: 'editor@financialexpress.com',
      socialMedia: ['@FinancialExpress'],
      contentType: 'Financial News',
      description: 'Established financial news platform with comprehensive coverage of Indian financial markets.',
      status: 'pending'
    },
    {
      id: '5',
      domain: 'businesstoday.in',
      domainRating: 70,
      traffic: 3000000,
      relevance: 'High',
      difficulty: 'Medium',
      opportunity: 'High',
      contactEmail: 'web@businesstoday.in',
      socialMedia: ['@BusinessToday'],
      contentType: 'Business Magazine',
      description: 'Popular business magazine with strong online presence and finance-focused content.',
      status: 'pending'
    },
    {
      id: '6',
      domain: 'indianexpress.com',
      domainRating: 82,
      traffic: 12000000,
      relevance: 'Medium',
      difficulty: 'Hard',
      opportunity: 'Medium',
      contactEmail: 'editor@indianexpress.com',
      socialMedia: ['@IndianExpress'],
      contentType: 'General News',
      description: 'Major Indian news website with dedicated business and finance sections.',
      status: 'pending'
    },
    {
      id: '7',
      domain: 'zeebiz.com',
      domainRating: 68,
      traffic: 2000000,
      relevance: 'High',
      difficulty: 'Easy',
      opportunity: 'High',
      contactEmail: 'contact@zeebiz.com',
      socialMedia: ['@ZeeBusiness'],
      contentType: 'Business News',
      description: 'Business news platform with strong focus on financial markets and investment advice.',
      status: 'pending'
    },
    {
      id: '8',
      domain: 'cnbctv18.com',
      domainRating: 73,
      traffic: 4000000,
      relevance: 'High',
      difficulty: 'Medium',
      opportunity: 'High',
      contactEmail: 'editorial@cnbctv18.com',
      socialMedia: ['@CNBCTV18'],
      contentType: 'Business TV',
      description: 'Leading business news channel with comprehensive online presence and finance content.',
      status: 'pending'
    },
    {
      id: '9',
      domain: 'business-standard.com',
      domainRating: 76,
      traffic: 6000000,
      relevance: 'High',
      difficulty: 'Medium',
      opportunity: 'High',
      contactEmail: 'webmaster@business-standard.com',
      socialMedia: ['@bsindia'],
      contentType: 'Business Newspaper',
      description: 'Established business newspaper with strong online presence and finance expertise.',
      status: 'pending'
    },
    {
      id: '10',
      domain: 'thehindubusinessline.com',
      domainRating: 74,
      traffic: 3500000,
      relevance: 'High',
      difficulty: 'Medium',
      opportunity: 'High',
      contactEmail: 'editor@thehindubusinessline.com',
      socialMedia: ['@businessline'],
      contentType: 'Business News',
      description: 'Respected business publication with comprehensive financial coverage and expert analysis.',
      status: 'pending'
    }
  ];

  useEffect(() => {
    setOpportunities(sampleOpportunities);
  }, []);

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'high-opportunity' && opportunity.opportunity === 'High') ||
                         (selectedFilter === 'easy-difficulty' && opportunity.difficulty === 'Easy') ||
                         (selectedFilter === 'high-relevance' && opportunity.relevance === 'High');
    
    const matchesSearch = opportunity.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.contentType.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secured': return 'text-green-600 bg-green-100';
      case 'responded': return 'text-blue-600 bg-blue-100';
      case 'contacted': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalOpportunities = opportunities.length;
  const highOpportunityCount = opportunities.filter(o => o.opportunity === 'High').length;
  const easyDifficultyCount = opportunities.filter(o => o.difficulty === 'Easy').length;
  const highRelevanceCount = opportunities.filter(o => o.relevance === 'High').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Backlink Building Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover high-quality backlink opportunities, manage outreach campaigns, and track your link building progress. 
            Build authority and improve your Google rankings with strategic backlinks.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Link className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalOpportunities}</div>
            <div className="text-gray-600">Total Opportunities</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{highOpportunityCount}</div>
            <div className="text-gray-600">High Opportunity</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{easyDifficultyCount}</div>
            <div className="text-gray-600">Easy Difficulty</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{highRelevanceCount}</div>
            <div className="text-gray-600">High Relevance</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'opportunities' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Opportunities
            </button>
            <button
              onClick={() => setActiveTab('outreach')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'outreach' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Outreach
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'tracking' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tracking
            </button>
          </div>
        </div>

        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Opportunities</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search domains, content types, or descriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter Opportunities</label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">All Opportunities</option>
                    <option value="high-opportunity">High Opportunity</option>
                    <option value="easy-difficulty">Easy Difficulty</option>
                    <option value="high-relevance">High Relevance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Opportunities List */}
            <div className="space-y-6">
              {filteredOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{opportunity.domain}</h3>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-3">{opportunity.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>DR: {opportunity.domainRating}</span>
                        <span>Traffic: {opportunity.traffic.toLocaleString()}</span>
                        <span>Type: {opportunity.contentType}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRelevanceColor(opportunity.relevance)}`}>
                        {opportunity.relevance} Relevance
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(opportunity.difficulty)}`}>
                        {opportunity.difficulty} Difficulty
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOpportunityColor(opportunity.opportunity)}`}>
                        {opportunity.opportunity} Opportunity
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      {opportunity.contactEmail && (
                        <button className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 transition-colors">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">Contact</span>
                        </button>
                      )}
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">Analyze</span>
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium">
                      Start Outreach
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Outreach Tab */}
        {activeTab === 'outreach' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Outreach Campaign Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Templates</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Guest Post Pitch</h4>
                    <p className="text-sm text-gray-600">Template for guest post opportunities</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Resource Page Link</h4>
                    <p className="text-sm text-gray-600">Template for resource page inclusion</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Broken Link Building</h4>
                    <p className="text-sm text-gray-600">Template for broken link replacement</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Outreach Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Emails Sent</span>
                    <span className="font-semibold text-gray-900">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Responses Received</span>
                    <span className="font-semibold text-gray-900">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Links Secured</span>
                    <span className="font-semibold text-gray-900">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-semibold text-gray-900">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Backlink Tracking</h2>
            
            <div className="text-center py-12">
              <Link className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Backlinks Tracked Yet</h3>
              <p className="text-gray-600">Start your outreach campaigns to begin tracking backlinks</p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Build Authority with Strategic Backlinks</h3>
          <p className="text-lg mb-6 opacity-90">
            Leverage our backlink opportunities to improve your domain authority and Google rankings. 
            Start building relationships with high-authority finance websites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Start Outreach
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-200">
              View Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacklinkHub;

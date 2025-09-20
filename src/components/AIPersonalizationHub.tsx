import React, { useState, useEffect } from 'react';
import { Brain, Target, TrendingUp, Users, Star, Clock, Bookmark, ThumbsUp, Eye, Filter, Search, Zap, Award, BarChart3 } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  interests: string[];
  goals: string[];
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  investmentAmount: string;
  timeHorizon: string;
  location: string;
  age: number;
  income: string;
}

interface PersonalizedContent {
  id: string;
  title: string;
  type: 'article' | 'video' | 'calculator' | 'tool';
  category: string;
  relevanceScore: number;
  reason: string;
  thumbnail?: string;
  duration?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  url: string;
  isRecommended: boolean;
  userEngagement?: {
    views: number;
    likes: number;
    bookmarks: number;
  };
}

interface AIInsight {
  id: string;
  type: 'trend' | 'opportunity' | 'warning' | 'tip';
  title: string;
  description: string;
  confidence: number;
  actionRequired: boolean;
  category: string;
}

const AIPersonalizationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'recommendations' | 'insights' | 'analytics'>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<PersonalizedContent[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Sample user profile
  const sampleProfile: UserProfile = {
    id: '1',
    name: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    experience: 'Intermediate',
    interests: ['Stock Market', 'Mutual Funds', 'Tax Planning', 'Real Estate'],
    goals: ['Retirement Planning', 'Wealth Building', 'Tax Optimization'],
    riskTolerance: 'Moderate',
    investmentAmount: '₹50,000 - ₹1,00,000',
    timeHorizon: '5-10 years',
    location: 'Mumbai',
    age: 32,
    income: '₹8-12 Lakhs'
  };

  // Sample personalized recommendations
  const sampleRecommendations: PersonalizedContent[] = [
    {
      id: '1',
      title: 'Best SIP Mutual Funds for Moderate Risk Investors',
      type: 'article',
      category: 'Mutual Funds',
      relevanceScore: 95,
      reason: 'Matches your moderate risk tolerance and SIP investment preference',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      difficulty: 'Intermediate',
      tags: ['sip', 'mutual funds', 'moderate risk', 'investment'],
      url: '/finance-blog/best-sip-mutual-funds-moderate-risk',
      isRecommended: true,
      userEngagement: { views: 12500, likes: 890, bookmarks: 234 }
    },
    {
      id: '2',
      title: 'Tax Saving Investments Under Section 80C',
      type: 'calculator',
      category: 'Tax Planning',
      relevanceScore: 92,
      reason: 'Aligns with your tax optimization goals and income bracket',
      difficulty: 'Beginner',
      tags: ['tax saving', 'section 80c', 'investment', 'tax planning'],
      url: '/calculators/tax-saving-investments',
      isRecommended: true,
      userEngagement: { views: 8900, likes: 567, bookmarks: 189 }
    },
    {
      id: '3',
      title: 'Real Estate Investment Guide for Mumbai',
      type: 'video',
      category: 'Real Estate',
      relevanceScore: 88,
      reason: 'Location-specific content for Mumbai real estate market',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop',
      duration: '35:20',
      difficulty: 'Intermediate',
      tags: ['real estate', 'mumbai', 'property investment', 'location specific'],
      url: '/video/real-estate-mumbai-guide',
      isRecommended: true,
      userEngagement: { views: 15600, likes: 1200, bookmarks: 456 }
    },
    {
      id: '4',
      title: 'Retirement Planning Calculator',
      type: 'calculator',
      category: 'Retirement Planning',
      relevanceScore: 85,
      reason: 'Matches your retirement planning goal and age group',
      difficulty: 'Beginner',
      tags: ['retirement', 'planning', 'calculator', 'future planning'],
      url: '/calculators/retirement-planning',
      isRecommended: true,
      userEngagement: { views: 11200, likes: 789, bookmarks: 312 }
    },
    {
      id: '5',
      title: 'Stock Market Analysis for 2025',
      type: 'article',
      category: 'Stock Market',
      relevanceScore: 82,
      reason: 'Matches your stock market interest and investment timeline',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop',
      difficulty: 'Advanced',
      tags: ['stock market', 'analysis', '2025', 'market trends'],
      url: '/finance-blog/stock-market-analysis-2025',
      isRecommended: true,
      userEngagement: { views: 18900, likes: 1456, bookmarks: 678 }
    }
  ];

  // Sample AI insights
  const sampleInsights: AIInsight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'High-Yield Investment Opportunity',
      description: 'Based on your profile, you might benefit from exploring ELSS funds for tax saving with potential for higher returns.',
      confidence: 87,
      actionRequired: true,
      category: 'Investment'
    },
    {
      id: '2',
      type: 'trend',
      title: 'Rising Interest in ESG Investing',
      description: 'Users with similar profiles are increasingly interested in ESG (Environmental, Social, Governance) mutual funds.',
      confidence: 92,
      actionRequired: false,
      category: 'Trend'
    },
    {
      id: '3',
      type: 'tip',
      title: 'Optimize Your SIP Timing',
      description: 'Consider starting your SIPs in the first week of the month for better cost averaging based on market patterns.',
      confidence: 78,
      actionRequired: false,
      category: 'Strategy'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Review Your Risk Allocation',
      description: 'Your current portfolio might be too conservative for your age and income level. Consider increasing equity exposure.',
      confidence: 85,
      actionRequired: true,
      category: 'Portfolio'
    }
  ];

  useEffect(() => {
    setUserProfile(sampleProfile);
    setRecommendations(sampleRecommendations);
    setInsights(sampleInsights);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'trend': return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case 'warning': return <Target className="w-5 h-5 text-red-600" />;
      case 'tip': return <Zap className="w-5 h-5 text-yellow-600" />;
      default: return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'border-green-200 bg-green-50';
      case 'trend': return 'border-blue-200 bg-blue-50';
      case 'warning': return 'border-red-200 bg-red-50';
      case 'tip': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const analyzeProfile = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Simulate AI analysis completion
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Personalization Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized finance recommendations powered by AI. Our intelligent system analyzes your profile, 
            preferences, and goals to deliver the most relevant content and insights.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'profile' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'recommendations' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Recommendations
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'insights' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              AI Insights
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'analytics' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && userProfile && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
              <button
                onClick={analyzeProfile}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Update Analysis'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{userProfile.name}</p>
                      <p className="text-sm text-gray-600">{userProfile.location}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Age:</span>
                      <span className="ml-2 font-medium">{userProfile.age}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Income:</span>
                      <span className="ml-2 font-medium">{userProfile.income}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Experience:</span>
                      <span className="ml-2 font-medium">{userProfile.experience}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Risk Tolerance:</span>
                      <span className="ml-2 font-medium">{userProfile.riskTolerance}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interests & Goals */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests & Goals</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Interests:</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.interests.map((interest, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Goals:</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.goals.map((goal, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Investment Amount:</span>
                      <span className="ml-2 font-medium">{userProfile.investmentAmount}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Time Horizon:</span>
                      <span className="ml-2 font-medium">{userProfile.timeHorizon}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Personalized Recommendations</h2>
              <p className="text-gray-600 mb-6">
                Content tailored specifically for your profile, interests, and goals.
              </p>
            </div>

            {recommendations.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start space-x-4">
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRelevanceColor(item.relevanceScore)}`}>
                          {item.relevanceScore}% Match
                        </span>
                        {item.isRecommended && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Recommended
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{item.reason}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {item.userEngagement?.views.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {item.userEngagement?.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Bookmark className="w-4 h-4 mr-1" />
                          {item.userEngagement?.bookmarks.toLocaleString()}
                        </span>
                        {item.duration && (
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {item.duration}
                          </span>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                        View Content
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Insights</h2>
              <p className="text-gray-600 mb-6">
                Intelligent analysis and recommendations based on your profile and market trends.
              </p>
            </div>

            {insights.map((insight) => (
              <div key={insight.id} className={`border rounded-lg p-6 ${getInsightColor(insight.type)}`}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          {insight.confidence}% confidence
                        </span>
                        {insight.actionRequired && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Action Required
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{insight.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Category: {insight.category}
                      </span>
                      {insight.actionRequired && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                          Take Action
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personalization Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">Content Relevance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
                <div className="text-gray-600">Engagement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">23</div>
                <div className="text-gray-600">Personalized Items</div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Experience AI-Powered Personalization</h3>
          <p className="text-lg mb-6 opacity-90">
            Get content and insights tailored specifically for your financial goals and preferences. 
            Our AI learns from your behavior to provide increasingly relevant recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Update Profile
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              View All Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPersonalizationHub;

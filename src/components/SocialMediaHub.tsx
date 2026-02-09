import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle, Heart, Eye, Users, TrendingUp, Calendar } from 'lucide-react';

interface SocialMediaPost {
  id: string;
  platform: string;
  content: string;
  image?: string;
  hashtags: string[];
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    views: number;
  };
  scheduledTime?: string;
  status: 'draft' | 'scheduled' | 'published';
}

const SocialMediaHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'schedule' | 'analytics'>('create');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [postContent, setPostContent] = useState('');
  const [hashtags, setHashtags] = useState('');

  // Sample social media posts
  const samplePosts: SocialMediaPost[] = [
    {
      id: '1',
      platform: 'Facebook',
      content: '💰 New Blog Post: Complete Guide to Personal Finance in India 2025! Learn budgeting, saving strategies, investment planning, and wealth building techniques. Read now: moneycal.in/finance-blog/complete-guide-personal-finance-india-2025',
      hashtags: ['#PersonalFinance', '#IndiaFinance', '#InvestmentPlanning', '#WealthBuilding'],
      engagement: { likes: 245, shares: 67, comments: 23, views: 1250 },
      status: 'published'
    },
    {
      id: '2',
      platform: 'Twitter',
      content: '📊 Stock Market Basics for Beginners in India 2025! From NSE/BSE to fundamental analysis - everything you need to know to start investing. Check out our comprehensive guide! 🚀',
      hashtags: ['#StockMarket', '#Investing', '#IndiaStocks', '#BeginnerGuide'],
      engagement: { likes: 189, shares: 45, comments: 12, views: 890 },
      status: 'published'
    },
    {
      id: '3',
      platform: 'LinkedIn',
      content: '💡 Tax Planning Tip: Section 80C investments can save you up to ₹45,000 in taxes (for 30% tax bracket). Our latest guide covers ELSS, PPF, EPF, and NPS options. Perfect timing for year-end tax planning!',
      hashtags: ['#TaxPlanning', '#Section80C', '#Investment', '#TaxSaving'],
      engagement: { likes: 156, shares: 34, comments: 18, views: 2100 },
      status: 'published'
    },
    {
      id: '4',
      platform: 'Instagram',
      content: '🏠 Home Loan Interest Rates Update: Current rates range from 8.50% to 9.80% p.a. Our comprehensive guide helps you compare lenders and get the best deal. Link in bio!',
      hashtags: ['#HomeLoan', '#InterestRates', '#RealEstate', '#PropertyInvestment'],
      engagement: { likes: 298, shares: 89, comments: 45, views: 3400 },
      status: 'published'
    }
  ];

  const platforms = [
    { name: 'Facebook', icon: Facebook, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Twitter', icon: Twitter, color: 'text-blue-400', bgColor: 'bg-blue-50' },
    { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', bgColor: 'bg-blue-50' },
    { name: 'Instagram', icon: Instagram, color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { name: 'YouTube', icon: Youtube, color: 'text-red-600', bgColor: 'bg-red-50' }
  ];

  const trendingHashtags = [
    '#PersonalFinance', '#IndiaFinance', '#InvestmentPlanning', '#TaxPlanning',
    '#StockMarket', '#MutualFunds', '#HomeLoan', '#RealEstate',
    '#WealthBuilding', '#FinancialPlanning', '#MoneyManagement', '#InvestmentTips'
  ];

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handlePost = () => {
    // Handle posting logic here
    console.log('Posting to platforms:', selectedPlatforms);
    console.log('Content:', postContent);
    console.log('Hashtags:', hashtags);
    
    // Reset form
    setPostContent('');
    setHashtags('');
    setSelectedPlatforms([]);
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find(p => p.name === platform);
    return platformData ? platformData.icon : Share2;
  };

  const getPlatformColor = (platform: string) => {
    const platformData = platforms.find(p => p.name === platform);
    return platformData ? platformData.color : 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Social Media Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create, schedule, and analyze your social media content to drive traffic to your finance platform. 
            Share valuable finance insights and build your online presence.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'create' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Create Post
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'schedule' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'analytics' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Create Post Tab */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Social Media Post</h2>
            
            {/* Platform Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Platforms</label>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.name}
                      onClick={() => handlePlatformToggle(platform.name)}
                      className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedPlatforms.includes(platform.name)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-2 ${platform.color}`} />
                      <span className="text-sm font-medium">{platform.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Post Content</label>
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Write your post content here... Share valuable finance insights, tips, or promote your latest blog posts!"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={4}
              />
              <div className="text-sm text-gray-500 mt-2">
                {postContent.length}/280 characters
              </div>
            </div>

            {/* Hashtags */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Hashtags</label>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="Add relevant hashtags separated by spaces..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              
              {/* Trending Hashtags */}
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Trending Hashtags:</p>
                <div className="flex flex-wrap gap-2">
                  {trendingHashtags.map((hashtag) => (
                    <button
                      key={hashtag}
                      onClick={() => setHashtags(prev => prev + (prev ? ' ' : '') + hashtag)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {hashtag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Post Button */}
            <div className="flex justify-end">
              <button
                onClick={handlePost}
                disabled={!postContent.trim() || selectedPlatforms.length === 0}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Post to {selectedPlatforms.length} Platform{selectedPlatforms.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Scheduled Posts</h2>
            
            <div className="space-y-4">
              {samplePosts.filter(post => post.status === 'scheduled').length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Scheduled Posts</h3>
                  <p className="text-gray-600">Create and schedule your first post to get started!</p>
                </div>
              ) : (
                samplePosts
                  .filter(post => post.status === 'scheduled')
                  .map((post) => {
                    const Icon = getPlatformIcon(post.platform);
                    return (
                      <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon className={`w-5 h-5 mr-3 ${getPlatformColor(post.platform)}`} />
                            <div>
                              <h3 className="font-semibold text-gray-900">{post.platform}</h3>
                              <p className="text-sm text-gray-600">{post.content.substring(0, 100)}...</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Scheduled for</p>
                            <p className="font-semibold text-gray-900">{post.scheduledTime}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">12.5K</div>
                <div className="text-gray-600">Total Views</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">2.8K</div>
                <div className="text-gray-600">Total Likes</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Share2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">435</div>
                <div className="text-gray-600">Total Shares</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">198</div>
                <div className="text-gray-600">Total Comments</div>
              </div>
            </div>

            {/* Recent Posts Performance */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Posts Performance</h2>
              
              <div className="space-y-4">
                {samplePosts.map((post) => {
                  const Icon = getPlatformIcon(post.platform);
                  return (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <Icon className={`w-6 h-6 mr-4 mt-1 ${getPlatformColor(post.platform)}`} />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{post.platform}</h3>
                            <p className="text-sm text-gray-600 mb-2">{post.content.substring(0, 120)}...</p>
                            <div className="flex flex-wrap gap-2">
                              {post.hashtags.slice(0, 3).map((hashtag, index) => (
                                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  {hashtag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="font-semibold text-gray-900">{post.engagement.likes}</div>
                              <div className="text-gray-600">Likes</div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{post.engagement.shares}</div>
                              <div className="text-gray-600">Shares</div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{post.engagement.comments}</div>
                              <div className="text-gray-600">Comments</div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{post.engagement.views}</div>
                              <div className="text-gray-600">Views</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Build Your Finance Community</h3>
          <p className="text-lg mb-6 opacity-90">
            Share valuable finance insights, engage with your audience, and drive traffic to your comprehensive finance platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-pink-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Start Posting
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors duration-200">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaHub;

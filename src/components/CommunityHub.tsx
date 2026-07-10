import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, TrendingUp, Star, ThumbsUp, Reply, Share2, Bookmark, Search, Filter, Award, Clock, Eye } from 'lucide-react';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    verified: boolean;
    joinDate: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  replies: number;
  isPinned: boolean;
  isLocked: boolean;
  isResolved: boolean;
  lastReply?: {
    author: string;
    time: string;
  };
}

interface CommunityCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  postCount: number;
  memberCount: number;
  color: string;
}

const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discussions' | 'categories' | 'members' | 'trending'>('discussions');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [categories, setCategories] = useState<CommunityCategory[]>([]);

  // Sample community posts
  const samplePosts: CommunityPost[] = [
    {
      id: '1',
      title: 'Best SIP Mutual Funds for Long-term Investment (2025)',
      content: 'I am planning to start a SIP for long-term wealth building. Can anyone suggest the best mutual funds for a 10-year horizon? I am 28 years old with moderate risk tolerance.',
      author: {
        name: 'Rajesh Kumar',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        level: 'Intermediate',
        verified: true,
        joinDate: '2024-01-15'
      },
      category: 'Mutual Funds',
      tags: ['sip', 'mutual funds', 'long-term', 'investment'],
      createdAt: '2025-01-14T10:30:00Z',
      updatedAt: '2025-01-14T10:30:00Z',
      views: 1250,
      likes: 45,
      replies: 12,
      isPinned: true,
      isLocked: false,
      isResolved: false,
      lastReply: {
        author: 'Priya Sharma',
        time: '2 hours ago'
      }
    },
    {
      id: '2',
      title: 'Tax Saving Options Under Section 80C - Need Help!',
      content: 'I need to invest ₹1.5 lakhs under Section 80C before March 31st. What are the best options considering I already have EPF and PPF? Looking for suggestions.',
      author: {
        name: 'Amit Patel',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        level: 'Beginner',
        verified: false,
        joinDate: '2024-11-20'
      },
      category: 'Tax Planning',
      tags: ['tax saving', 'section 80c', 'investment', 'march deadline'],
      createdAt: '2025-01-13T15:45:00Z',
      updatedAt: '2025-01-13T15:45:00Z',
      views: 890,
      likes: 23,
      replies: 8,
      isPinned: false,
      isLocked: false,
      isResolved: true,
      lastReply: {
        author: 'Dr. Sneha Reddy',
        time: '1 day ago'
      }
    },
    {
      id: '3',
      title: 'Real Estate vs Stock Market - Which is Better for 2025?',
      content: 'I have ₹10 lakhs to invest and I am confused between real estate and stock market. Given the current market conditions, which would be a better choice for 2025?',
      author: {
        name: 'Vikram Singh',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        level: 'Advanced',
        verified: true,
        joinDate: '2023-08-10'
      },
      category: 'Investment Strategy',
      tags: ['real estate', 'stock market', 'investment comparison', '2025'],
      createdAt: '2025-01-12T09:20:00Z',
      updatedAt: '2025-01-12T09:20:00Z',
      views: 2100,
      likes: 67,
      replies: 25,
      isPinned: false,
      isLocked: false,
      isResolved: false,
      lastReply: {
        author: 'Rahul Mehta',
        time: '3 hours ago'
      }
    },
    {
      id: '4',
      title: 'Home Loan Interest Rate Comparison - January 2025',
      content: 'I am planning to take a home loan of ₹50 lakhs. Can anyone share the current interest rates from different banks? Also, any tips for negotiating better rates?',
      author: {
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        level: 'Intermediate',
        verified: true,
        joinDate: '2024-03-22'
      },
      category: 'Home Loans',
      tags: ['home loan', 'interest rates', 'banks', 'negotiation'],
      createdAt: '2025-01-11T14:15:00Z',
      updatedAt: '2025-01-11T14:15:00Z',
      views: 1560,
      likes: 34,
      replies: 15,
      isPinned: false,
      isLocked: false,
      isResolved: false,
      lastReply: {
        author: 'Banking Expert',
        time: '5 hours ago'
      }
    },
    {
      id: '5',
      title: 'Crypto Investment Strategy for Beginners',
      content: 'I am new to cryptocurrency and want to start with a small amount. What would be a good strategy for beginners? Should I go for Bitcoin, Ethereum, or other altcoins?',
      author: {
        name: 'Sneha Reddy',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        level: 'Beginner',
        verified: false,
        joinDate: '2024-12-05'
      },
      category: 'Cryptocurrency',
      tags: ['cryptocurrency', 'bitcoin', 'ethereum', 'beginners'],
      createdAt: '2025-01-10T11:30:00Z',
      updatedAt: '2025-01-10T11:30:00Z',
      views: 980,
      likes: 28,
      replies: 18,
      isPinned: false,
      isLocked: false,
      isResolved: false,
      lastReply: {
        author: 'Crypto Expert',
        time: '6 hours ago'
      }
    }
  ];

  // Sample categories
  const sampleCategories: CommunityCategory[] = [
    {
      id: '1',
      name: 'Mutual Funds',
      description: 'Discuss SIP, lump sum investments, fund selection, and performance analysis',
      icon: '📈',
      postCount: 245,
      memberCount: 1250,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: '2',
      name: 'Stock Market',
      description: 'Share insights about stocks, market analysis, and trading strategies',
      icon: '📊',
      postCount: 189,
      memberCount: 980,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: '3',
      name: 'Tax Planning',
      description: 'Tax saving strategies, deductions, and compliance discussions',
      icon: '🧾',
      postCount: 156,
      memberCount: 750,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: '4',
      name: 'Home Loans',
      description: 'Home loan advice, interest rates, and property investment tips',
      icon: '🏠',
      postCount: 134,
      memberCount: 650,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      id: '5',
      name: 'Investment Strategy',
      description: 'Portfolio management, asset allocation, and investment planning',
      icon: '🎯',
      postCount: 198,
      memberCount: 890,
      color: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: '6',
      name: 'Cryptocurrency',
      description: 'Digital assets, blockchain technology, and crypto investment strategies',
      icon: '₿',
      postCount: 167,
      memberCount: 720,
      color: 'bg-yellow-100 text-yellow-800'
    }
  ];

  useEffect(() => {
    setPosts(samplePosts);
    setCategories(sampleCategories);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-red-600 bg-red-100';
      case 'Advanced': return 'text-purple-600 bg-purple-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Beginner': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const totalPosts = posts.length;
  const totalReplies = posts.reduce((sum, post) => sum + post.replies, 0);
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join India's largest finance community. Ask questions, share insights, and learn from 
            thousands of investors, experts, and finance enthusiasts.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalPosts}</div>
            <div className="text-gray-600">Active Discussions</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Reply className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalReplies}</div>
            <div className="text-gray-600">Total Replies</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</div>
            <div className="text-gray-600">Total Views</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <ThumbsUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalLikes}</div>
            <div className="text-gray-600">Total Likes</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'discussions' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Discussions
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'categories' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'members' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'trending' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Discussions</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search discussions, topics, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                            {post.isPinned && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pinned
                              </span>
                            )}
                            {post.isResolved && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Resolved
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <span className="font-medium">{post.author.name}</span>
                            {post.author.verified && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Verified
                              </span>
                            )}
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(post.author.level)}`}>
                              {post.author.level}
                            </span>
                            <span>•</span>
                            <span>{formatTimeAgo(post.createdAt)}</span>
                          </div>
                        </div>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {post.views.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {post.likes}
                          </span>
                          <span className="flex items-center">
                            <Reply className="w-4 h-4 mr-1" />
                            {post.replies}
                          </span>
                          {post.lastReply && (
                            <span className="text-xs">
                              Last reply by {post.lastReply.author} {post.lastReply.time}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{category.postCount}</div>
                    <div className="text-xs text-gray-600">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{category.memberCount}</div>
                    <div className="text-xs text-gray-600">Members</div>
                  </div>
                </div>
                
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium">
                  Join Discussion
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Community Members</h2>
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Member Directory (Planned)</h3>
              <p className="text-gray-600">We're working on a comprehensive member directory with rankings and achievements.</p>
            </div>
          </div>
        )}

        {/* Trending Tab */}
        {activeTab === 'trending' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Topics</h2>
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trending Analysis (Planned)</h3>
              <p className="text-gray-600">We're building advanced trending analysis to show the most popular topics and discussions.</p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Join the Finance Community</h3>
          <p className="text-lg mb-6 opacity-90">
            Connect with thousands of investors, ask questions, share insights, and learn from the community. 
            Your financial journey becomes easier when you're not alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Start Discussion
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200">
              Browse Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;

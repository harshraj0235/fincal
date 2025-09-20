import React, { useState, useEffect } from 'react';
import { Play, Clock, Eye, ThumbsUp, Share2, Download, Bookmark, Search, Filter, TrendingUp, Users, Award, Star } from 'lucide-react';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  instructor: string;
  instructorAvatar: string;
  publishedDate: string;
  videoUrl: string;
  transcript?: string;
  resources?: string[];
  rating: number;
  isPremium: boolean;
}

const VideoContentHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState<VideoContent[]>([]);

  // Sample video content
  const sampleVideos: VideoContent[] = [
    {
      id: '1',
      title: 'Complete Guide to Personal Finance in India 2025',
      description: 'Learn everything about personal finance management, budgeting, saving, and investing in India. Perfect for beginners who want to take control of their financial future.',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop',
      duration: '45:30',
      views: 125000,
      likes: 8900,
      category: 'Personal Finance',
      difficulty: 'Beginner',
      tags: ['budgeting', 'saving', 'personal finance', 'india'],
      instructor: 'Dr. Rajesh Kumar',
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      publishedDate: '2025-01-10',
      videoUrl: '#',
      transcript: 'Complete transcript available...',
      resources: ['Budget Template', 'Investment Checklist', 'Tax Planning Guide'],
      rating: 4.8,
      isPremium: false
    },
    {
      id: '2',
      title: 'Stock Market Investing for Beginners in India',
      description: 'Master the basics of stock market investing in India. Learn about NSE, BSE, fundamental analysis, and how to start your investment journey.',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop',
      duration: '38:15',
      views: 98000,
      likes: 7200,
      category: 'Stock Market',
      difficulty: 'Beginner',
      tags: ['stocks', 'nse', 'bse', 'investing', 'beginners'],
      instructor: 'Priya Sharma',
      instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      publishedDate: '2025-01-08',
      videoUrl: '#',
      transcript: 'Complete transcript available...',
      resources: ['Stock Analysis Template', 'Risk Assessment Guide'],
      rating: 4.7,
      isPremium: false
    },
    {
      id: '3',
      title: 'Advanced Tax Planning Strategies for High Earners',
      description: 'Learn advanced tax planning techniques for high-income individuals in India. Maximize your savings through legal tax optimization strategies.',
      thumbnail: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=225&fit=crop',
      duration: '52:20',
      views: 67000,
      likes: 5600,
      category: 'Tax Planning',
      difficulty: 'Advanced',
      tags: ['tax planning', 'high earners', 'tax optimization', 'advanced'],
      instructor: 'Amit Patel',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      publishedDate: '2025-01-05',
      videoUrl: '#',
      transcript: 'Complete transcript available...',
      resources: ['Tax Planning Checklist', 'Investment Options Guide'],
      rating: 4.9,
      isPremium: true
    },
    {
      id: '4',
      title: 'Mutual Fund SIP vs Lump Sum Investment Analysis',
      description: 'Detailed comparison of SIP and lump sum investments in mutual funds. Learn when to use each strategy for maximum returns.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      duration: '41:45',
      views: 89000,
      likes: 6800,
      category: 'Mutual Funds',
      difficulty: 'Intermediate',
      tags: ['mutual funds', 'sip', 'lump sum', 'investment strategy'],
      instructor: 'Sneha Reddy',
      instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      publishedDate: '2025-01-03',
      videoUrl: '#',
      transcript: 'Complete transcript available...',
      resources: ['SIP Calculator', 'Investment Comparison Tool'],
      rating: 4.6,
      isPremium: false
    },
    {
      id: '5',
      title: 'Real Estate Investment Guide for Indian Markets',
      description: 'Complete guide to real estate investment in India. Learn about property evaluation, financing options, and market trends.',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=225&fit=crop',
      duration: '48:10',
      views: 76000,
      likes: 5900,
      category: 'Real Estate',
      difficulty: 'Intermediate',
      tags: ['real estate', 'property investment', 'home loan', 'market analysis'],
      instructor: 'Vikram Singh',
      instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      publishedDate: '2025-01-01',
      videoUrl: '#',
      transcript: 'Complete transcript available...',
      resources: ['Property Evaluation Checklist', 'Loan Comparison Tool'],
      rating: 4.5,
      isPremium: false
    },
    {
      id: '6',
      title: 'Cryptocurrency Investment Strategies for Indian Investors',
      description: 'Learn about cryptocurrency investment in India, regulatory compliance, and risk management strategies for digital assets.',
      thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop',
      duration: '44:25',
      views: 112000,
      likes: 8200,
      category: 'Cryptocurrency',
      difficulty: 'Intermediate',
      tags: ['cryptocurrency', 'bitcoin', 'blockchain', 'digital assets'],
      instructor: 'Rahul Mehta',
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      publishedDate: '2024-12-28',
      videoUrl: '#',
      transcript: 'Complete transcript available...',
      resources: ['Crypto Portfolio Tracker', 'Risk Assessment Guide'],
      rating: 4.7,
      isPremium: true
    }
  ];

  useEffect(() => {
    setVideos(sampleVideos);
  }, []);

  const filteredVideos = videos.filter(video => {
    const matchesTab = activeTab === 'all' || video.difficulty.toLowerCase() === activeTab;
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesTab && matchesCategory && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(videos.map(video => video.category)))];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const totalVideos = videos.length;
  const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
  const totalLikes = videos.reduce((sum, video) => sum + video.likes, 0);
  const averageRating = videos.length > 0 
    ? videos.reduce((sum, video) => sum + video.rating, 0) / videos.length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Video Content Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master finance with our comprehensive video library. Learn from industry experts through 
            high-quality educational videos covering all aspects of personal finance and investment.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Play className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalVideos}</div>
            <div className="text-gray-600">Video Courses</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</div>
            <div className="text-gray-600">Total Views</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <ThumbsUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalLikes.toLocaleString()}</div>
            <div className="text-gray-600">Total Likes</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Videos</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search videos, topics, or instructors..."
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
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Difficulty Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Levels
            </button>
            <button
              onClick={() => setActiveTab('beginner')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'beginner' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Beginner
            </button>
            <button
              onClick={() => setActiveTab('intermediate')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'intermediate' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Intermediate
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'advanced' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Advanced
            </button>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Video Thumbnail */}
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                    <Play className="w-6 h-6 text-purple-600 ml-1" />
                  </button>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </span>
                </div>
                {video.isPremium && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Premium
                    </span>
                  </div>
                )}
              </div>

              {/* Video Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                    {video.difficulty}
                  </span>
                  <div className="flex items-center">
                    {renderStars(video.rating)}
                    <span className="ml-1 text-sm text-gray-600">({video.rating})</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {video.description}
                </p>

                {/* Instructor */}
                <div className="flex items-center mb-4">
                  <img
                    src={video.instructorAvatar}
                    alt={video.instructor}
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{video.instructor}</p>
                    <p className="text-xs text-gray-500">{video.publishedDate}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {video.views.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {video.likes.toLocaleString()}
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {video.category}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {video.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <button className="flex-1 mr-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium">
                    Watch Now
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Videos Found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Master Finance with Expert Videos</h3>
          <p className="text-lg mb-6 opacity-90">
            Learn from industry experts through our comprehensive video library. 
            From beginner basics to advanced strategies, we have everything you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Start Learning
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200">
              View All Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoContentHub;

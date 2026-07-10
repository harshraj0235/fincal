import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageCircle, Share2, Bookmark, Eye, TrendingUp, Users, Award, Target } from 'lucide-react';

interface UserReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  verified: boolean;
  tool: string;
}

interface UserRating {
  toolId: string;
  toolName: string;
  averageRating: number;
  totalRatings: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const UserEngagementHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'ratings' | 'interactions'>('reviews');
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [ratings, setRatings] = useState<UserRating[]>([]);

  // Sample user reviews
  const sampleReviews: UserReview[] = [
    {
      id: '1',
      userName: 'Rajesh Kumar',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      title: 'Excellent EMI Calculator!',
      content: 'This EMI Calculator helped me plan my home loan perfectly. The detailed breakdown and prepayment options are very useful. Highly recommended for anyone planning to take a home loan.',
      date: '2025-01-14',
      helpful: 23,
      verified: true,
      tool: 'EMI Calculator'
    },
    {
      id: '2',
      userName: 'Priya Sharma',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      title: 'Great SIP Calculator',
      content: 'The SIP Calculator is amazing! It shows the power of compounding clearly. I used it to plan my mutual fund investments and the results are exactly as calculated. Very accurate and user-friendly.',
      date: '2025-01-13',
      helpful: 18,
      verified: true,
      tool: 'SIP Calculator'
    },
    {
      id: '3',
      userName: 'Amit Patel',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 4,
      title: 'Good Tax Calculator',
      content: 'The tax Calculator is helpful for understanding my tax liability. The interface is clean and easy to use. Would be great if it could handle more complex tax scenarios.',
      date: '2025-01-12',
      helpful: 15,
      verified: true,
      tool: 'Tax Calculator'
    },
    {
      id: '4',
      userName: 'Sneha Reddy',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      title: 'Perfect for Investment Planning',
      content: 'I love the comprehensive finance blog and calculators. The content is well-researched and the tools are very practical. This platform has become my go-to resource for all financial planning.',
      date: '2025-01-11',
      helpful: 31,
      verified: true,
      tool: 'Finance Blog'
    },
    {
      id: '5',
      userName: 'Vikram Singh',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      title: 'Outstanding Platform!',
      content: 'MoneyCal India is the best finance platform I have used. The calculators are accurate, the content is comprehensive, and the user experience is excellent. Highly recommended for all Indians.',
      date: '2025-01-10',
      helpful: 42,
      verified: true,
      tool: 'Overall Platform'
    }
  ];

  // Sample ratings data
  const sampleRatings: UserRating[] = [
    {
      toolId: 'emi-calculator',
      toolName: 'EMI Calculator',
      averageRating: 4.8,
      totalRatings: 1247,
      ratingDistribution: { 5: 892, 4: 245, 3: 78, 2: 23, 1: 9 }
    },
    {
      toolId: 'sip-calculator',
      toolName: 'SIP Calculator',
      averageRating: 4.7,
      totalRatings: 1089,
      ratingDistribution: { 5: 756, 4: 234, 3: 67, 2: 22, 1: 10 }
    },
    {
      toolId: 'tax-calculator',
      toolName: 'Tax Calculator',
      averageRating: 4.6,
      totalRatings: 892,
      ratingDistribution: { 5: 623, 4: 189, 3: 54, 2: 18, 1: 8 }
    },
    {
      toolId: 'home-loan-calculator',
      toolName: 'Home Loan Calculator',
      averageRating: 4.9,
      totalRatings: 1567,
      ratingDistribution: { 5: 1203, 4: 267, 3: 67, 2: 21, 1: 9 }
    },
    {
      toolId: 'mutual-fund-calculator',
      toolName: 'Mutual Fund Calculator',
      averageRating: 4.7,
      totalRatings: 934,
      ratingDistribution: { 5: 678, 4: 189, 3: 45, 2: 15, 1: 7 }
    }
  ];

  useEffect(() => {
    setReviews(sampleReviews);
    setRatings(sampleRatings);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingPercentage = (count: number, total: number) => {
    return total > 0 ? (count / total) * 100 : 0;
  };

  const totalReviews = reviews.length;
  const totalRatings = ratings.reduce((sum, rating) => sum + rating.totalRatings, 0);
  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum, rating) => sum + rating.averageRating, 0) / ratings.length 
    : 0;
  const totalHelpful = reviews.reduce((sum, review) => sum + review.helpful, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            User Engagement Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what our users say about MoneyCal India. Read reviews, check ratings, and see how our 
            finance tools are helping thousands of Indians make better financial decisions.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalRatings.toLocaleString()}</div>
            <div className="text-gray-600">Total Ratings</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalReviews}</div>
            <div className="text-gray-600">User Reviews</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <ThumbsUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalHelpful}</div>
            <div className="text-gray-600">Helpful Votes</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'reviews' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              User Reviews
            </button>
            <button
              onClick={() => setActiveTab('ratings')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'ratings' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tool Ratings
            </button>
            <button
              onClick={() => setActiveTab('interactions')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'interactions' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              User Interactions
            </button>
          </div>
        </div>

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-600">{review.tool}</span>
                          {review.verified && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4">{review.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">Reply</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                        <Bookmark className="w-4 h-4" />
                        <span className="text-sm">Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ratings Tab */}
        {activeTab === 'ratings' && (
          <div className="space-y-6">
            {ratings.map((rating) => (
              <div key={rating.toolId} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{rating.toolName}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        {renderStars(Math.round(rating.averageRating))}
                      </div>
                      <span className="text-lg font-semibold text-gray-900">
                        {rating.averageRating.toFixed(1)}
                      </span>
                      <span className="text-gray-600">
                        ({rating.totalRatings.toLocaleString()} ratings)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {rating.totalRatings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Ratings</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-700 w-8">{star}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${getRatingPercentage(rating.ratingDistribution[star as keyof typeof rating.ratingDistribution], rating.totalRatings)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">
                        {rating.ratingDistribution[star as keyof typeof rating.ratingDistribution]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactions Tab */}
        {activeTab === 'interactions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Eye className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Page Views</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">2.5M+</div>
              <p className="text-gray-600">Monthly page views across all tools</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Growth</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">+45%</div>
              <p className="text-gray-600">Month-over-month user growth</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Engagement Rate</h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">78%</div>
              <p className="text-gray-600">Average user engagement rate</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Award className="w-8 h-8 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Return Users</h3>
              <div className="text-3xl font-bold text-orange-600 mb-2">65%</div>
              <p className="text-gray-600">Percentage of returning users</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Share2 className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Shares</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">12.5K</div>
              <p className="text-gray-600">Total social media shares</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Bookmark className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Saved Tools</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-2">8.9K</div>
              <p className="text-gray-600">Tools bookmarked by users</p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Join Thousands of Satisfied Users</h3>
          <p className="text-lg mb-6 opacity-90">
            Experience the power of our comprehensive finance platform. Calculate, plan, and optimize your financial future with India's most trusted finance tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Try Our Tools
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Read Finance Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEngagementHub;

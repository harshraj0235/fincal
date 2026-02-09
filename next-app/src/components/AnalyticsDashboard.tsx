import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Eye, Clock, DollarSign, Target, Award, Activity, Zap, Globe, Smartphone, Monitor, Search, Share2, Bookmark, ThumbsUp, MessageCircle } from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  totalSessions: number;
  totalPageViews: number;
  averageSessionDuration: string;
  bounceRate: number;
  conversionRate: number;
  revenue: number;
  topPages: Array<{
    page: string;
    views: number;
    uniqueVisitors: number;
    bounceRate: number;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    percentage: number;
  }>;
  deviceBreakdown: Array<{
    device: string;
    percentage: number;
    icon: React.ReactNode;
  }>;
  userEngagement: Array<{
    metric: string;
    value: number;
    change: number;
    icon: React.ReactNode;
  }>;
  contentPerformance: Array<{
    content: string;
    type: string;
    views: number;
    engagement: number;
    conversion: number;
  }>;
  seoMetrics: Array<{
    metric: string;
    value: string;
    status: 'good' | 'warning' | 'critical';
  }>;
}

const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'traffic' | 'content' | 'seo' | 'revenue'>('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  // Sample analytics data
  const sampleData: AnalyticsData = {
    totalUsers: 125000,
    totalSessions: 180000,
    totalPageViews: 450000,
    averageSessionDuration: '4m 32s',
    bounceRate: 42.5,
    conversionRate: 8.7,
    revenue: 125000,
    topPages: [
      { page: '/finance-categories', views: 45000, uniqueVisitors: 32000, bounceRate: 35.2 },
      { page: '/loan-tools', views: 38000, uniqueVisitors: 28000, bounceRate: 28.5 },
      { page: '/finance-blog', views: 35000, uniqueVisitors: 25000, bounceRate: 45.8 },
      { page: '/community', views: 32000, uniqueVisitors: 22000, bounceRate: 52.3 },
      { page: '/ai-personalization', views: 28000, uniqueVisitors: 20000, bounceRate: 38.7 }
    ],
    trafficSources: [
      { source: 'Organic Search', visitors: 75000, percentage: 60.0 },
      { source: 'Direct', visitors: 25000, percentage: 20.0 },
      { source: 'Social Media', visitors: 15000, percentage: 12.0 },
      { source: 'Referral', visitors: 10000, percentage: 8.0 }
    ],
    deviceBreakdown: [
      { device: 'Mobile', percentage: 65, icon: <Smartphone className="w-5 h-5" /> },
      { device: 'Desktop', percentage: 30, icon: <Monitor className="w-5 h-5" /> },
      { device: 'Tablet', percentage: 5, icon: <Monitor className="w-5 h-5" /> }
    ],
    userEngagement: [
      { metric: 'Page Views', value: 450000, change: 12.5, icon: <Eye className="w-5 h-5" /> },
      { metric: 'Sessions', value: 180000, change: 8.3, icon: <Activity className="w-5 h-5" /> },
      { metric: 'Users', value: 125000, change: 15.7, icon: <Users className="w-5 h-5" /> },
      { metric: 'Engagement Rate', value: 78.5, change: 5.2, icon: <Zap className="w-5 h-5" /> },
      { metric: 'Social Shares', value: 12500, change: 22.1, icon: <Share2 className="w-5 h-5" /> },
      { metric: 'Bookmarks', value: 8900, change: 18.6, icon: <Bookmark className="w-5 h-5" /> },
      { metric: 'Comments', value: 5600, change: 31.4, icon: <MessageCircle className="w-5 h-5" /> },
      { metric: 'Likes', value: 23400, change: 14.8, icon: <ThumbsUp className="w-5 h-5" /> }
    ],
    contentPerformance: [
      { content: 'Finance Categories Hub', type: 'Page', views: 45000, engagement: 78.5, conversion: 12.3 },
      { content: 'Complete Personal Finance Guide', type: 'Article', views: 32000, engagement: 82.1, conversion: 15.7 },
      { content: 'EMI Calculator', type: 'Tool', views: 28000, engagement: 65.4, conversion: 8.9 },
      { content: 'Investment Planning Guide', type: 'Article', views: 25000, engagement: 75.8, conversion: 11.2 },
      { content: 'Tax Calculator', type: 'Tool', views: 22000, engagement: 71.3, conversion: 9.6 },
      { content: 'Community Discussions', type: 'Community', views: 18000, engagement: 88.7, conversion: 6.4 }
    ],
    seoMetrics: [
      { metric: 'Core Web Vitals', value: 'Good', status: 'good' },
      { metric: 'Page Speed', value: '2.1s', status: 'good' },
      { metric: 'Mobile Usability', value: '100%', status: 'good' },
      { metric: 'Indexed Pages', value: '1,250', status: 'good' },
      { metric: 'Backlinks', value: '2,450', status: 'good' },
      { metric: 'Domain Authority', value: '68', status: 'good' },
      { metric: 'Organic Traffic', value: '+25%', status: 'good' },
      { metric: 'Keyword Rankings', value: '1,850', status: 'good' }
    ]
  };

  useEffect(() => {
    setAnalyticsData(sampleData);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Comprehensive platform performance and user engagement metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.totalUsers)}</p>
                <p className="text-sm text-green-600">+15.7% from last month</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.totalPageViews)}</p>
                <p className="text-sm text-green-600">+12.5% from last month</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Session</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.averageSessionDuration}</p>
                <p className="text-sm text-green-600">+8.3% from last month</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.conversionRate}%</p>
                <p className="text-sm text-green-600">+5.2% from last month</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'overview' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('traffic')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'traffic' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Traffic
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'content' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'seo' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              SEO
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'revenue' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Revenue
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Engagement */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
              <div className="space-y-4">
                {analyticsData.userEngagement.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.metric}</p>
                        <p className="text-sm text-gray-600">{formatNumber(item.value)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Pages</h3>
              <div className="space-y-4">
                {analyticsData.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{page.page}</p>
                      <p className="text-sm text-gray-600">{formatNumber(page.views)} views</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{formatNumber(page.uniqueVisitors)} unique</p>
                      <p className="text-sm text-gray-500">{page.bounceRate}% bounce</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Traffic Tab */}
        {activeTab === 'traffic' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traffic Sources */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
              <div className="space-y-4">
                {analyticsData.trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{source.source}</p>
                        <p className="text-sm text-gray-600">{formatNumber(source.visitors)} visitors</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{source.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
              <div className="space-y-4">
                {analyticsData.deviceBreakdown.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {device.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{device.device}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{device.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Content</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Views</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Engagement</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.contentPerformance.map((content, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{content.content}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {content.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{formatNumber(content.views)}</td>
                      <td className="py-3 px-4 text-gray-600">{content.engagement}%</td>
                      <td className="py-3 px-4 text-gray-600">{content.conversion}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsData.seoMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">₹{formatNumber(analyticsData.revenue)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Premium Subscriptions</p>
                    <p className="text-xl font-bold text-blue-600">₹85,000</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Ad Revenue</p>
                    <p className="text-xl font-bold text-purple-600">₹40,000</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Monthly Growth</span>
                  <span className="text-green-600 font-medium">+18.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quarterly Growth</span>
                  <span className="text-green-600 font-medium">+42.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Yearly Growth</span>
                  <span className="text-green-600 font-medium">+156.7%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Optimize Your Platform Performance</h3>
          <p className="text-lg mb-6 opacity-90">
            Use these insights to improve user experience, increase engagement, and maximize your platform's potential. 
            Data-driven decisions lead to better results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Generate Report
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Set Up Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

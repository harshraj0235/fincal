import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  Building, 
  Search,
  Clock,
  Calendar,
  BookOpen,
  BarChart3,
  CreditCard,
  Star,
  Bookmark,
  Grid,
  List,
  Phone,
  Zap,
  Shield,
  Globe,
  Users,
  Target,
  Award,
  Play,
  Eye,
  Share2,
  Heart,
  TrendingDown,
  Activity
} from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { SearchBar } from '../components/SearchBar';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const HomeNew: React.FC = () => {
  const [popularCalculators, setPopularCalculators] = useState<any[]>([]);
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [cryptoNews, setCryptoNews] = useState<any[]>([]);
  const [governmentNews, setGovernmentNews] = useState<any[]>([]);
  const [excelTools, setExcelTools] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animation trigger
    setIsVisible(true);
    
    // Set popular calculators
    setPopularCalculators([
      { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate your loan EMI, total interest, and payment schedule', category: 'Loan Calculators', icon: '💰' },
      { id: 'sip-calculator', name: 'SIP Calculator', description: 'Plan your investments and calculate returns on SIP investments', category: 'Investment Calculators', icon: '📈' },
      { id: 'income-tax-calculator', name: 'Income Tax Calculator', description: 'Calculate your income tax liability under old and new tax regimes', category: 'Tax Calculators', icon: '📊' },
      { id: 'mutual-fund-overlap-checker', name: 'Mutual Fund Overlap Checker', description: 'Check portfolio overlap between mutual funds to optimize diversification', category: 'Investments & Wealth Management', icon: '🎯' },
      { id: 'asset-allocation-planner', name: 'Asset Allocation Planner', description: 'Create a balanced portfolio based on your risk profile', category: 'Investments & Wealth Management', icon: '⚖️' },
      { id: 'credit-card-finder', name: 'Credit Card Finder', description: 'Find the best credit card based on your spending patterns', category: 'Banking & Finance Tools', icon: '💳' }
    ]);
    
    // Set latest news
    setLatestNews([
      {
        id: 1,
        title: "RBI Announces New Digital Lending Guidelines for 2025",
        excerpt: "The Reserve Bank of India has introduced comprehensive guidelines for digital lending platforms to enhance transparency and protect consumers.",
        category: "Banking",
        date: "2025-01-15",
        image: "https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "5 min read",
        views: "2.5K",
        trending: true
      },
      {
        id: 2,
        title: "SEBI Approves New Mutual Fund Categories for Retail Investors",
        excerpt: "Market regulator SEBI has approved new mutual fund categories specifically designed for retail investors with better risk management.",
        category: "Investments",
        date: "2025-01-14",
        image: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "4 min read",
        views: "1.8K"
      },
      {
        id: 3,
        title: "Government Launches New Tax Benefits for Startup Investments",
        excerpt: "The government has announced new tax incentives for investments in startups and small businesses to boost entrepreneurship.",
        category: "Tax",
        date: "2025-01-13",
        image: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "6 min read",
        views: "3.2K",
        trending: true
      },
      {
        id: 4,
        title: "Digital Rupee Pilot Program Shows 200% Growth in Adoption",
        excerpt: "The Reserve Bank of India's digital rupee pilot program has shown remarkable growth with increased adoption in retail transactions.",
        category: "Digital Banking",
        date: "2025-01-12",
        image: "https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "4 min read",
        views: "1.5K"
      }
    ]);
    
    // Set crypto news
    setCryptoNews([
      {
        id: 1,
        title: "Bitcoin Surges Past $50,000 as Institutional Adoption Grows",
        excerpt: "Bitcoin has reached a new milestone as major institutions continue to show interest in cryptocurrency investments.",
        category: "Cryptocurrency",
        date: "2025-01-15",
        image: "https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "3 min read",
        views: "4.1K",
        trending: true
      },
      {
        id: 2,
        title: "RBI's Digital Rupee Pilot Program Shows Promising Results",
        excerpt: "The Reserve Bank of India's digital rupee pilot program has shown positive results with increased adoption in retail transactions.",
        category: "Digital Currency",
        date: "2025-01-14",
        image: "https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "4 min read",
        views: "2.8K"
      }
    ]);
    
    // Set government schemes news
    setGovernmentNews([
      {
        id: 1,
        title: "PM-KISAN Scheme Extended with Enhanced Benefits for Farmers",
        excerpt: "The government has extended the PM-KISAN scheme with additional benefits for small and marginal farmers across India.",
        category: "Government Schemes",
        date: "2025-01-15",
        image: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "5 min read",
        views: "3.7K"
      },
      {
        id: 2,
        title: "Ayushman Bharat Coverage Expanded to Include More Beneficiaries",
        excerpt: "The Ayushman Bharat health insurance scheme has been expanded to cover additional beneficiaries with enhanced coverage limits.",
        category: "Healthcare",
        date: "2025-01-14",
        image: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "4 min read",
        views: "2.1K"
      }
    ]);
    
    // Set excel tools
    setExcelTools([
      {
        id: 1,
        title: "Advanced Financial Modeling Template",
        description: "Comprehensive Excel template for financial modeling and analysis",
        category: "Finance",
        downloads: 1250,
        rating: 4.8,
        featured: true
      },
      {
        id: 2,
        title: "Budget Planning Dashboard",
        description: "Interactive Excel dashboard for personal and business budget planning",
        category: "Budgeting",
        downloads: 890,
        rating: 4.6
      },
      {
        id: 3,
        title: "Investment Portfolio Tracker",
        description: "Excel tool to track and analyze investment portfolio performance",
        category: "Investments",
        downloads: 1100,
        rating: 4.9,
        featured: true
      }
    ]);
  }, []);

  // Stats data
  const stats = [
    { label: "Active Users", value: "50K+", icon: Users, color: "text-blue-600" },
    { label: "Calculators", value: "100+", icon: Calculator, color: "text-green-600" },
    { label: "Success Rate", value: "99.9%", icon: Target, color: "text-purple-600" },
    { label: "Trust Score", value: "4.9/5", icon: Award, color: "text-orange-600" }
  ];

  // News card component
  const NewsCard = ({ news, featured = false }: { news: any; featured?: boolean }) => (
    <Link to={`/news/${news.id}`} className="group">
      <div className={`bg-white rounded-xl lg:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${featured ? 'col-span-2 row-span-2' : ''}`}>
        <div className="relative overflow-hidden">
          <img 
            src={news.image} 
            alt={news.title}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${featured ? 'h-64 lg:h-80' : 'h-48 lg:h-56'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 lg:top-4 left-3 lg:left-4">
            <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-semibold ${news.trending ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'}`}>
              {news.trending ? '🔥 Trending' : news.category}
            </span>
          </div>
          <div className="absolute top-3 lg:top-4 right-3 lg:right-4 flex gap-1 lg:gap-2">
            <button className="bg-white/20 backdrop-blur-sm p-1.5 lg:p-2 rounded-full hover:bg-white/30 transition-colors">
              <Bookmark className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
            </button>
            <button className="bg-white/20 backdrop-blur-sm p-1.5 lg:p-2 rounded-full hover:bg-white/30 transition-colors">
              <Share2 className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
            </button>
          </div>
        </div>
        <div className="p-4 lg:p-6">
          <h3 className={`font-bold text-gray-900 mb-2 lg:mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors ${featured ? 'text-lg lg:text-2xl' : 'text-base lg:text-xl'}`}>
            {news.title}
          </h3>
          <p className={`text-gray-600 mb-3 lg:mb-4 line-clamp-2 ${featured ? 'text-sm lg:text-lg' : 'text-sm lg:text-base'}`}>
            {news.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500">
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>{news.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>{news.views}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 lg:gap-2">
              <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
              <span>{new Date(news.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  // Calculator card component
  const CalculatorCard = ({ calculator }: { calculator: any }) => (
    <Link to={`/calculators/${calculator.id}`} className="group">
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 lg:p-6 border border-gray-100 transform hover:-translate-y-2 hover:scale-105">
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg lg:rounded-xl flex items-center justify-center text-xl lg:text-2xl">
            {calculator.icon}
          </div>
          <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 group-hover:text-primary-600 transition-colors transform group-hover:translate-x-1" />
        </div>
        <h3 className="font-bold text-gray-900 mb-2 lg:mb-3 text-base lg:text-lg group-hover:text-primary-600 transition-colors">
          {calculator.name}
        </h3>
        <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 leading-relaxed">
          {calculator.description}
        </p>
        <span className="inline-block bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 px-2 lg:px-3 py-1 rounded-full text-xs font-medium">
          {calculator.category}
        </span>
      </div>
    </Link>
  );

  // Feature card component
  const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any; title: string; description: string; color: string }) => (
    <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`w-10 h-10 lg:w-12 lg:h-12 ${color} bg-opacity-10 rounded-lg lg:rounded-xl flex items-center justify-center mb-3 lg:mb-4`}>
        <Icon className={`h-5 w-5 lg:h-6 lg:w-6 ${color}`} />
      </div>
      <h3 className="font-bold text-gray-900 mb-2 text-sm lg:text-base">{title}</h3>
      <p className="text-gray-600 text-xs lg:text-sm">{description}</p>
    </div>
  );

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="Moneycal.in - India's Premier Financial News & Tools Portal"
        description="Stay updated with latest financial news, crypto updates, government schemes, and use free financial calculators. Comprehensive financial tools and news for Indian users."
        keywords="financial news india, crypto news, government schemes, financial calculators, EMI calculator, SIP calculator, income tax calculator, mutual fund calculator, personal finance india"
        url="/"
        tags={["financial news", "crypto", "government schemes", "calculators", "personal finance", "investment", "banking"]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section with Breaking News */}
        <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-12 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breaking News Ticker */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-2xl mb-8 flex items-center gap-4 shadow-lg">
              <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold animate-pulse">BREAKING</span>
              <div className="flex-1 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  <span className="mr-12">🚀 RBI Announces New Digital Lending Guidelines for 2025</span>
                  <span className="mr-12">📈 Bitcoin Surges Past $50,000 as Institutional Adoption Grows</span>
                  <span className="mr-12">💼 SEBI Approves New Mutual Fund Categories for Retail Investors</span>
                  <span className="mr-12">🏦 Digital Rupee Pilot Program Shows 200% Growth in Adoption</span>
                </div>
              </div>
            </div>
            
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
               <div className="text-center lg:text-left">
                 <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                   <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 lg:mb-8 leading-tight text-white">
                     Your Gateway to
                     <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent animate-pulse">
                       Financial Intelligence
                     </span>
                   </h1>
                   <p className="text-base sm:text-lg lg:text-xl mb-8 lg:mb-10 text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                     Stay ahead with the latest financial news, crypto updates, government schemes, and powerful financial calculators designed for Indian users.
                   </p>
                   <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
                     <Link 
                       to="/blog" 
                       className="group bg-white text-primary-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-2xl transform hover:-translate-y-1 hover:scale-105"
                     >
                       📰 Read Latest News
                       <ArrowRight className="inline-block ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
                     </Link>
                     <Link 
                       to="/#categories" 
                       className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-xl hover:shadow-2xl transition-all px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-2xl transform hover:-translate-y-1 hover:scale-105"
                     >
                       🧮 Use Calculators
                       <Calculator className="inline-block ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform" />
                     </Link>
                   </div>
                 </div>
               </div>
               <div className="block lg:hidden">
                 <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20">
                   <div className="mb-4">
                     <div className="text-primary-600 font-semibold mb-2 text-sm uppercase tracking-wide">📊 Live Market Updates</div>
                     <div className="text-lg font-bold text-neutral-900">Financial Markets</div>
                   </div>
                   <div className="space-y-3">
                     <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                         <span className="text-xs font-medium text-gray-700">Sensex</span>
                       </div>
                       <span className="text-sm font-bold text-green-600">72,500 (+1.2%)</span>
                     </div>
                     <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                         <span className="text-xs font-medium text-gray-700">Nifty</span>
                       </div>
                       <span className="text-sm font-bold text-red-600">21,800 (-0.3%)</span>
                     </div>
                     <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                         <span className="text-xs font-medium text-gray-700">Bitcoin</span>
                       </div>
                       <span className="text-sm font-bold text-green-600">$51,200 (+5.1%)</span>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary-400 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl transform rotate-3 z-10 border border-white/20">
                    <div className="transform -rotate-3">
                      <div className="mb-6">
                        <div className="text-primary-600 font-semibold mb-2 text-sm uppercase tracking-wide">📊 Live Market Updates</div>
                        <div className="text-2xl font-bold text-neutral-900">Financial Markets</div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-700">Sensex</span>
                          </div>
                          <span className="text-lg font-bold text-green-600">72,500 (+1.2%)</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-700">Nifty</span>
                          </div>
                          <span className="text-lg font-bold text-red-600">21,800 (-0.3%)</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-700">Bitcoin</span>
                          </div>
                          <span className="text-lg font-bold text-green-600">$51,200 (+5.1%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 ${stat.color} bg-opacity-10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4`}>
                    <stat.icon className={`h-6 w-6 lg:h-8 lg:w-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">{stat.value}</div>
                  <div className="text-sm lg:text-base text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 text-blue-600 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 text-green-600 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
                <div className="text-gray-600">Calculators</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 text-purple-600 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 text-orange-600 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
                <div className="text-gray-600">Trust Score</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-8 lg:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-4">Find What You Need</h2>
              <p className="text-gray-600 text-sm lg:text-base">Search across calculators, news, tools, and more</p>
            </div>
            <SearchBar />
          </div>
        </section>

        {/* Featured News Section */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 lg:mb-12 gap-4">
              <div>
                <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">🔥 Featured News</h2>
                <p className="text-gray-600 text-sm lg:text-lg">Stay updated with the latest financial developments</p>
              </div>
              <Link to="/blog" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 text-sm lg:text-lg group self-start sm:self-center">
                View All News <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {latestNews.map((news, index) => (
                <NewsCard key={news.id} news={news} featured={index === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">Why Choose Moneycal.in?</h2>
              <p className="text-gray-600 text-sm lg:text-lg max-w-3xl mx-auto">Comprehensive financial tools and insights designed specifically for Indian users</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              <FeatureCard 
                icon={Shield} 
                title="Trusted & Secure" 
                description="Bank-grade security with 99.9% uptime and data protection"
                color="text-green-600"
              />
              <FeatureCard 
                icon={Zap} 
                title="Lightning Fast" 
                description="Instant calculations and real-time market data updates"
                color="text-yellow-600"
              />
              <FeatureCard 
                icon={Globe} 
                title="India Focused" 
                description="Tailored for Indian financial markets and regulations"
                color="text-blue-600"
              />
              <FeatureCard 
                icon={Users} 
                title="Community Driven" 
                description="Join 50K+ users making smarter financial decisions"
                color="text-purple-600"
              />
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">Quick Navigation</h2>
              <p className="text-gray-600 text-sm lg:text-lg">Access all our services with one click</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-6">
              <Link to="/blog" className="bg-gradient-to-br from-primary-500 to-primary-600 p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group transform hover:-translate-y-2">
                <BookOpen className="h-8 w-8 lg:h-10 lg:w-10 text-white mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold text-sm lg:text-base">Latest News</span>
              </Link>
              <Link to="/crypto" className="bg-gradient-to-br from-green-500 to-green-600 p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group transform hover:-translate-y-2">
                <TrendingUp className="h-8 w-8 lg:h-10 lg:w-10 text-white mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold text-sm lg:text-base">Crypto News</span>
              </Link>
              <Link to="/government-schemes" className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group transform hover:-translate-y-2">
                <Building className="h-8 w-8 lg:h-10 lg:w-10 text-white mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold text-sm lg:text-base">Govt Schemes</span>
              </Link>
              <Link to="/exceltool" className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group transform hover:-translate-y-2">
                <BarChart3 className="h-8 w-8 lg:h-10 lg:w-10 text-white mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold text-sm lg:text-base">Excel Tools</span>
              </Link>
              <Link to="/missed-call-banking-directory" className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group transform hover:-translate-y-2">
                <Phone className="h-8 w-8 lg:h-10 lg:w-10 text-white mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold text-sm lg:text-base">Banking</span>
              </Link>
              <Link to="/bank-tools" className="bg-gradient-to-br from-red-500 to-red-600 p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group transform hover:-translate-y-2">
                <CreditCard className="h-8 w-8 lg:h-10 lg:w-10 text-white mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold text-sm lg:text-base">Bank Tools</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Crypto News Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 lg:mb-12 gap-4">
              <div>
                <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">🚀 Crypto & Digital Currency</h2>
                <p className="text-gray-600 text-sm lg:text-lg">Latest updates from the cryptocurrency world</p>
              </div>
              <Link to="/crypto" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 text-sm lg:text-lg group self-start sm:self-center">
                View All Crypto News <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
              {cryptoNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </div>
        </section>

        {/* Government Schemes Section */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 lg:mb-12 gap-4">
              <div>
                <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">🏛️ Government Schemes</h2>
                <p className="text-gray-600 text-sm lg:text-lg">Latest government initiatives and benefits</p>
              </div>
              <Link to="/government-schemes" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 text-sm lg:text-lg group self-start sm:self-center">
                View All Schemes <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
              {governmentNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </div>
        </section>

        {/* Excel Tools Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 lg:mb-12 gap-4">
              <div>
                <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">📊 Excel Tools & Templates</h2>
                <p className="text-gray-600 text-sm lg:text-lg">Professional Excel tools for financial analysis</p>
              </div>
              <Link to="/exceltool" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 text-sm lg:text-lg group self-start sm:self-center">
                View All Tools <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                              {excelTools.map((tool) => (
                  <div key={tool.id} className="bg-white rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 lg:p-6 border border-gray-100 transform hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg lg:rounded-xl flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400 fill-current" />
                        <span className="text-xs lg:text-sm font-semibold">{tool.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 lg:mb-3 text-base lg:text-lg">{tool.title}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 leading-relaxed">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-block bg-purple-100 text-purple-700 px-2 lg:px-3 py-1 rounded-full text-xs font-medium">
                        {tool.category}
                      </span>
                      <span className="text-xs lg:text-sm text-gray-500">{tool.downloads} downloads</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Financial Calculators Section */}
        <section id="categories" className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">🧮 Financial Calculators</h2>
              <p className="text-gray-600 text-sm lg:text-lg max-w-3xl mx-auto">
                Comprehensive financial calculators to help you make informed decisions about loans, investments, taxes, and more.
              </p>
            </div>
            
            {/* Popular Calculators */}
            <div className="mb-8 lg:mb-12">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">🔥 Popular Calculators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                {popularCalculators.map((calculator) => (
                  <CalculatorCard key={calculator.id} calculator={calculator} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3 lg:mb-4">Stay Updated</h2>
            <p className="text-white/90 mb-6 lg:mb-8 text-sm lg:text-lg">
              Get the latest financial news, market updates, and exclusive insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-base lg:text-lg"
              />
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:-translate-y-1 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

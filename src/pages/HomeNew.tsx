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
  Phone
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
  
  useEffect(() => {
    // Set popular calculators
    setPopularCalculators([
      { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate your loan EMI, total interest, and payment schedule', category: 'Loan Calculators' },
      { id: 'sip-calculator', name: 'SIP Calculator', description: 'Plan your investments and calculate returns on SIP investments', category: 'Investment Calculators' },
      { id: 'income-tax-calculator', name: 'Income Tax Calculator', description: 'Calculate your income tax liability under old and new tax regimes', category: 'Tax Calculators' },
      { id: 'mutual-fund-overlap-checker', name: 'Mutual Fund Overlap Checker', description: 'Check portfolio overlap between mutual funds to optimize diversification', category: 'Investments & Wealth Management' },
      { id: 'asset-allocation-planner', name: 'Asset Allocation Planner', description: 'Create a balanced portfolio based on your risk profile', category: 'Investments & Wealth Management' },
      { id: 'credit-card-finder', name: 'Credit Card Finder', description: 'Find the best credit card based on your spending patterns', category: 'Banking & Finance Tools' }
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
        readTime: "5 min read"
      },
      {
        id: 2,
        title: "SEBI Approves New Mutual Fund Categories for Retail Investors",
        excerpt: "Market regulator SEBI has approved new mutual fund categories specifically designed for retail investors with better risk management.",
        category: "Investments",
        date: "2025-01-14",
        image: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "4 min read"
      },
      {
        id: 3,
        title: "Government Launches New Tax Benefits for Startup Investments",
        excerpt: "The government has announced new tax incentives for investments in startups and small businesses to boost entrepreneurship.",
        category: "Tax",
        date: "2025-01-13",
        image: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "6 min read"
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
        readTime: "3 min read"
      },
      {
        id: 2,
        title: "RBI's Digital Rupee Pilot Program Shows Promising Results",
        excerpt: "The Reserve Bank of India's digital rupee pilot program has shown positive results with increased adoption in retail transactions.",
        category: "Digital Currency",
        date: "2025-01-14",
        image: "https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "4 min read"
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
        readTime: "5 min read"
      },
      {
        id: 2,
        title: "Ayushman Bharat Coverage Expanded to Include More Beneficiaries",
        excerpt: "The Ayushman Bharat health insurance scheme has been expanded to cover additional beneficiaries with enhanced coverage limits.",
        category: "Healthcare",
        date: "2025-01-14",
        image: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        readTime: "4 min read"
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
        rating: 4.8
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
        rating: 4.9
      }
    ]);
  }, []);

  // News card component
  const NewsCard = ({ news, featured = false }: { news: any; featured?: boolean }) => (
    <Link to={`/news/${news.id}`} className="group">
      <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${featured ? 'col-span-2 row-span-2' : ''}`}>
        <div className="relative overflow-hidden">
          <img 
            src={news.image} 
            alt={news.title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${featured ? 'h-64' : 'h-48'}`}
          />
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {news.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
              <Bookmark className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className={`font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
            {news.title}
          </h3>
          <p className={`text-gray-600 mb-3 line-clamp-2 ${featured ? 'text-base' : 'text-sm'}`}>
            {news.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{news.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
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
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
        </div>
        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {calculator.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {calculator.description}
        </p>
        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
          {calculator.category}
        </span>
      </div>
    </Link>
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
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Breaking News */}
        <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-8 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breaking News Ticker */}
            <div className="bg-red-600 text-white py-2 px-4 rounded-lg mb-6 flex items-center gap-3">
              <span className="bg-white text-red-600 px-2 py-1 rounded text-xs font-bold">BREAKING</span>
              <div className="flex-1 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  <span className="mr-8">RBI Announces New Digital Lending Guidelines for 2025</span>
                  <span className="mr-8">Bitcoin Surges Past $50,000 as Institutional Adoption Grows</span>
                  <span className="mr-8">SEBI Approves New Mutual Fund Categories for Retail Investors</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
                  Your Gateway to
                  <span className="block text-yellow-300">Financial Intelligence</span>
                </h1>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto lg:mx-0">
                  Stay ahead with the latest financial news, crypto updates, government schemes, and powerful financial calculators.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    to="/blog" 
                    className="btn bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all px-8 py-4 text-lg font-medium rounded-xl"
                  >
                    Read Latest News
                  </Link>
                  <Link 
                    to="/#categories" 
                    className="btn bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg hover:shadow-xl transition-all px-8 py-4 text-lg font-medium rounded-xl"
                  >
                    Use Calculators
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary-400 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="bg-white p-8 rounded-2xl shadow-2xl transform rotate-3 z-10 backdrop-blur-sm bg-opacity-95">
                    <div className="transform -rotate-3">
                      <div className="mb-4">
                        <div className="text-primary-600 font-semibold mb-1 text-sm">Latest News</div>
                        <div className="text-xl font-bold text-neutral-900">Financial Markets Update</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Sensex: 72,500 (+1.2%)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Nifty: 21,800 (-0.3%)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Bitcoin: $51,200 (+5.1%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Featured News Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured News</h2>
                <p className="text-gray-600">Stay updated with the latest financial developments</p>
              </div>
              <Link to="/blog" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                View All News <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestNews.map((news, index) => (
                <NewsCard key={news.id} news={news} featured={index === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-8 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Quick Navigation</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link to="/blog" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
                <BookOpen className="h-8 w-8 text-primary-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-900">Latest News</span>
              </Link>
              <Link to="/crypto" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-900">Crypto News</span>
              </Link>
              <Link to="/government-schemes" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
                <Building className="h-8 w-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-900">Govt Schemes</span>
              </Link>
              <Link to="/exceltool" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
                <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-900">Excel Tools</span>
              </Link>
              <Link to="/missed-call-banking-directory" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
                <Phone className="h-8 w-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-900">Banking</span>
              </Link>
              <Link to="/bank-tools" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
                <CreditCard className="h-8 w-8 text-red-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-900">Bank Tools</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Crypto News Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Crypto & Digital Currency</h2>
                <p className="text-gray-600">Latest updates from the cryptocurrency world</p>
              </div>
              <Link to="/crypto" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                View All Crypto News <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cryptoNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </div>
        </section>

        {/* Government Schemes Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Government Schemes</h2>
                <p className="text-gray-600">Latest government initiatives and benefits</p>
              </div>
              <Link to="/government-schemes" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                View All Schemes <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {governmentNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </div>
        </section>

        {/* Excel Tools Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Excel Tools & Templates</h2>
                <p className="text-gray-600">Professional Excel tools for financial analysis</p>
              </div>
              <Link to="/exceltool" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                View All Tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {excelTools.map((tool) => (
                <div key={tool.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{tool.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {tool.category}
                    </span>
                    <span className="text-sm text-gray-500">{tool.downloads} downloads</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Calculators Section */}
        <section id="categories" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Calculators</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive financial calculators to help you make informed decisions about loans, investments, taxes, and more.
              </p>
            </div>
            
            {/* Popular Calculators */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Calculators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularCalculators.map((calculator) => (
                  <CalculatorCard key={calculator.id} calculator={calculator} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-white/90 mb-8">
              Get the latest financial news, market updates, and exclusive insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

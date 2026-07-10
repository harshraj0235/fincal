import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart2, 
  PieChart, 
  BookOpen, 
  Search, 
  ArrowRight,
  Target,
  Zap,
  ShieldCheck,
  Globe,
  Award,
  CircleDollarSign
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const StockMarketHub: React.FC = () => {
  const featuredModules = [
    {
      title: 'IPO Hub',
      description: 'Track ongoing, upcoming and closed IPOs with GMP and subscription status.',
      icon: <Target className="w-8 h-8 text-emerald-500" />,
      link: '/ipo',
      color: 'emerald'
    },
    {
      title: 'Stock Basics',
      description: 'Start your journey from zero with our comprehensive market basics course.',
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      link: '/stock-market/stock-market-basics',
      color: 'blue'
    },
    {
      title: 'Technical Analysis',
      description: 'Learn chart patterns, indicators, and price action strategies.',
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      link: '/stock-market/technical-analysis',
      color: 'purple'
    },
    {
      title: 'Market Analysis',
      description: 'Real-time insights and deep dives into current market trends.',
      icon: <BarChart2 className="w-8 h-8 text-amber-500" />,
      link: '/market-analysis',
      color: 'amber'
    }
  ];

  const tools = [
    { name: 'CAGR Calculator', link: '/calculators/cagr-calculator', icon: <TrendingUp className="w-5 h-5" /> },
    { name: 'P/E Ratio Calculator', link: '/calculators/pe-ratio-calculator', icon: <PieChart className="w-5 h-5" /> },
    { name: 'Intrinsic Value', link: '/calculators/intrinsic-value-calculator', icon: <CircleDollarSign className="w-5 h-5" /> },
    { name: 'Stock Screener', link: '/calculators/stock-screener', icon: <Search className="w-5 h-5" /> },
  ];

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="Stock Market Hub - IPOs, Analysis & Learning | MoneyCal"
        description="Your gateway to Indian stock markets. Access IPO trackers, stock market basics, technical analysis guides, and premium calculators."
        url="/stock-market-hub"
      />

      <div className="min-h-screen bg-gray-50/50 pb-20">
        {/* Modern Hero Section */}
        <div className="bg-white border-b border-gray-100 pt-16 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-6 tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5" />
              Smart Investing Starts Here
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Master the <span className="text-blue-600">Stock Market</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Track IPOs in real-time, learn advanced trading strategies, and use premium analysis tools to build your wealth in the Indian equity markets.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/ipo" reloadDocument className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2">
                Check Today's IPOs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/stock-market/stock-market-basics" className="px-6 py-3 bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 font-bold rounded-xl transition-all">
                Start Learning
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Sections Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredModules.map((module, idx) => (
              <Link 
                key={idx} 
                to={module.link}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-${module.color}-50 text-${module.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {module.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {module.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {module.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools & Analytics Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 overflow-hidden relative shadow-sm">
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                  Premium <span className="text-blue-600">Analysis Tools</span>
                </h2>
                <p className="text-gray-500 text-base mb-8 leading-relaxed max-w-xl">
                  Evaluate stocks like a professional with our suite of valuation and performance calculators. Integrated data to help you make informed decisions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tools.map((tool, idx) => (
                    <Link 
                      key={idx} 
                      to={tool.link}
                      className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors shadow-sm">
                        {tool.icon}
                      </div>
                      <span className="font-bold text-gray-700 group-hover:text-gray-900 text-sm">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full max-w-md">
                <div className="relative p-2 rounded-3xl bg-gray-900 shadow-xl shadow-gray-200/50 transform rotate-1">
                  <div className="bg-gray-800 rounded-[22px] p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-24 h-2 bg-gray-700 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40"></div>
                    </div>
                    <div className="h-40 w-full bg-gradient-to-t from-blue-500/10 to-transparent border-b border-white/5 relative overflow-hidden flex items-end">
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <TrendingUp className="w-24 h-24 text-blue-500" />
                      </div>
                      {/* Mock Chart Lines */}
                      <div className="w-full flex items-end gap-1 h-32 px-4 justify-around">
                        {[40, 60, 45, 80, 55, 90, 75, 100].map((h, i) => (
                          <div key={i} className="w-2 bg-blue-500/40 rounded-t" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-700/50 rounded-lg"></div>
                      <div className="h-4 w-2/3 bg-gray-700/30 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* E-E-A-T Signal Footer section for Stock Market */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Accurate Data</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Directly sourced from verified exchanges and official filings.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Expert Coverage</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Technical insights simplified for both beginners and pros.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Trusted Reviews</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Every analysis and calculation reviewed by our financial desk.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockMarketHub;

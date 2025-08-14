import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, ArrowRight, TrendingUp, DollarSign, PieChart, Building, Shield, ChevronRight, Clock, Eye, Share2, Bookmark } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { CategorySection } from '../components/CategorySection';
import { SearchBar } from '../components/SearchBar';
import { governmentSchemes } from '../data/governmentSchemesData';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const Home: React.FC = () => {
  const [popularCalculators, setPopularCalculators] = useState<Array<{id: string; name: string; description: string; category: string}>>([]);
  const location = useLocation();
  const categoriesRef = useRef<HTMLElement>(null);
  const allCalculatorsRef = useRef<HTMLDivElement>(null);
  
  // Featured news stories
  const featuredStories = [
    {
      id: 1,
      title: "RBI Maintains Repo Rate at 6.5% - What This Means for Your Loans",
      excerpt: "The Reserve Bank of India keeps the repo rate unchanged for the eighth consecutive time, providing relief to borrowers but affecting savings rates.",
      category: "Banking & Finance",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
      readTime: "5 min read",
      date: "2025-01-29",
      views: "12.5K"
    },
    {
      id: 2,
      title: "New Tax Benefits for Home Loan Borrowers in Budget 2025",
      excerpt: "The government announces enhanced tax deductions for home loan interest payments, making homeownership more affordable for middle-class families.",
      category: "Tax & Policy",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
      readTime: "4 min read",
      date: "2025-01-28",
      views: "8.9K"
    },
    {
      id: 3,
      title: "Sensex Hits 75,000: What's Driving the Market Rally?",
      excerpt: "India's benchmark index reaches new heights as foreign investors pour money into Indian equities, driven by strong economic fundamentals.",
      category: "Markets",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      readTime: "6 min read",
      date: "2025-01-27",
      views: "15.2K"
    }
  ];

  // Latest news
  const latestNews = [
    {
      id: 1,
      title: "Mutual Fund SIP Investments Reach Record High in March 2025",
      category: "Investments",
      date: "2 hours ago",
      views: "3.2K"
    },
    {
      id: 2,
      title: "Gold Prices Surge to All-Time High - Should You Invest Now?",
      category: "Commodities",
      date: "4 hours ago",
      views: "5.1K"
    },
    {
      id: 3,
      title: "New Digital Banking Features Launched by Major Banks",
      category: "Banking",
      date: "6 hours ago",
      views: "2.8K"
    },
    {
      id: 4,
      title: "Cryptocurrency Regulations: What's New in 2025?",
      category: "Crypto",
      date: "8 hours ago",
      views: "7.4K"
    },
    {
      id: 5,
      title: "Insurance Sector Reforms: Better Coverage for Middle Class",
      category: "Insurance",
      date: "10 hours ago",
      views: "4.6K"
    }
  ];
  
  useEffect(() => {
    // Get popular calculators from different categories
    const popular = [
      { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate your loan EMI, total interest, and payment schedule', category: 'Loan Calculators' },
      { id: 'sip-calculator', name: 'SIP Calculator', description: 'Plan your investments and calculate returns on SIP investments', category: 'Investment Calculators' },
      { id: 'income-tax-calculator', name: 'Income Tax Calculator', description: 'Calculate your income tax liability under old and new tax regimes', category: 'Tax Calculators' },
      { id: 'mutual-fund-overlap-checker', name: 'Mutual Fund Overlap Checker', description: 'Check portfolio overlap between mutual funds to optimize diversification', category: 'Investments & Wealth Management' },
      { id: 'asset-allocation-planner', name: 'Asset Allocation Planner', description: 'Create a balanced portfolio based on your risk profile', category: 'Investments & Wealth Management' },
      { id: 'credit-card-finder', name: 'Credit Card Finder', description: 'Find the best credit card based on your spending patterns', category: 'Banking & Finance Tools' }
    ];
    
    setPopularCalculators(popular);
  }, []);
  
  // Structured data for the home page
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "MoneyCal - India's Premier Financial News & Calculator Portal",
    "description": "Latest financial news, market updates, and comprehensive financial calculators for Indian users. Stay informed with breaking news and expert analysis.",
    "url": "https://moneycal.in",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Financial Calculators",
      "description": "Collection of 50+ financial calculators for Indian users",
      "numberOfItems": calculatorCategories.reduce((total, cat) => total + cat.calculators.length, 0),
      "itemListElement": calculatorCategories.flatMap((category, catIndex) =>
        category.calculators.map((calculator, calcIndex) => ({
          "@type": "ListItem",
          "position": catIndex * 10 + calcIndex + 1,
          "item": {
            "@type": "WebApplication",
            "name": calculator.name,
            "description": calculator.description,
            "url": `https://moneycal.in/calculators/${calculator.id}`,
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            }
          }
        }))
      )
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://moneycal.in"
        }
      ]
    }
  };
  
  // Scroll to categories section if hash is present
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.substring(1);
      
      if (hash === 'categories' && allCalculatorsRef.current) {
        allCalculatorsRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (categoriesRef.current) {
        const categoryElement = document.getElementById(hash);
        if (categoryElement) {
          categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [location.hash]);

  // Get category icon based on category ID
  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return <Building className="h-6 w-6 text-white" />;
      case 'investment-calculators': return <TrendingUp className="h-6 w-6 text-white" />;
      case 'tax-calculators': return <DollarSign className="h-6 w-6 text-white" />;
      default: return <Calculator className="h-6 w-6 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHelmet 
        title="MoneyCal - India's Premier Financial News & Calculator Portal"
        description="Latest financial news, market updates, and comprehensive financial calculators for Indian users. Stay informed with breaking news and expert analysis."
        keywords="financial news, market updates, financial calculators, EMI calculator, SIP calculator, income tax calculator, Indian finance"
        structuredData={homeStructuredData}
      />
      
      {/* Hero Section with Featured Stories */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Featured Story */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={featuredStories[0].image} 
                  alt={featuredStories[0].title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-red-600 px-2 py-1 rounded text-xs font-semibold">
                      {featuredStories[0].category}
                    </span>
                    <span className="text-sm opacity-80">{featuredStories[0].date}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                    {featuredStories[0].title}
                  </h1>
                  <p className="text-gray-200 mb-4 line-clamp-2">
                    {featuredStories[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredStories[0].readTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{featuredStories[0].views}</span>
                      </span>
                    </div>
                    <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Featured Stories */}
            <div className="space-y-6">
              {featuredStories.slice(1).map((story) => (
                <div key={story.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-600 px-2 py-1 rounded text-xs font-semibold text-white">
                        {story.category}
                      </span>
                      <span className="text-xs text-gray-500">{story.date}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{story.readTime}</span>
                      <span>{story.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
            <Link to="/blog" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <div key={news.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-700">
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-500">{news.date}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{news.views} views</span>
                  <div className="flex items-center space-x-2">
                    <button className="hover:text-primary-600">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="hover:text-primary-600">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Calculators Section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Financial Tools</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access our comprehensive collection of financial calculators and tools designed specifically for Indian users
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCalculators.map((calculator) => (
              <Link
                key={calculator.id}
                to={`/calculators/${calculator.id}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Calculator className="h-6 w-6 text-primary-600" />
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                    {calculator.category}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{calculator.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{calculator.description}</p>
                <div className="flex items-center text-primary-600 font-semibold text-sm">
                  <span>Try Calculator</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/#categories"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              View All Calculators
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Government Schemes Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Government Schemes & Benefits</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest government schemes and financial benefits available for Indian citizens
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governmentSchemes.slice(0, 6).map((scheme) => (
              <div key={scheme.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{scheme.name}</h3>
                    <p className="text-sm text-gray-500">{scheme.category}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{scheme.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Active
                  </span>
                  <Link
                    to={`/government-schemes/${scheme.id}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/government-schemes"
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
            >
              View All Schemes
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* All Calculators Section */}
      <section ref={allCalculatorsRef} className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Financial Calculators</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive collection of financial calculators covering loans, investments, taxes, and more
            </p>
          </div>
          
          <div className="space-y-12">
            {calculatorCategories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Banner */}
      <WhatsAppBanner />
      
      {/* Astro Finance Button */}
      <AstroFinanceButton />
    </div>
  );
};

export default Home;

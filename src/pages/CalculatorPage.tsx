import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCalculatorById, getAllCalculators } from '../data/calculatorData';
import { ArrowLeft, Calculator, TrendingUp, DollarSign, Shield, Clock, Users, Star, Share2, Bookmark, ExternalLink } from 'lucide-react';
import EnhancedSEO from '../components/EnhancedSEO';

interface CalculatorFAQ {
  question: string;
  answer: string;
}

interface CalculatorFeatures {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const CalculatorPage: React.FC = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  const [activeTab, setActiveTab] = useState<'calculator' | 'guide' | 'faq' | 'related'>('calculator');
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const calculator = getCalculatorById(calculatorId || '');
  const allCalculators = getAllCalculators();
  
  // Enhanced FAQ data for SEO
  const enhancedFAQs: CalculatorFAQ[] = [
    {
      question: `What is ${calculator?.name} and how does it work?`,
      answer: `${calculator?.description}. Our ${calculator?.name} uses industry-standard formulas and algorithms to provide accurate calculations for Indian financial scenarios. Simply enter your details and get instant results.`
    },
    {
      question: `Is the ${calculator?.name} free to use?`,
      answer: `Yes, our ${calculator?.name} is completely free to use. No registration, subscription, or hidden charges. You can use it unlimited times for your financial planning needs.`
    },
    {
      question: `How accurate are the calculations from ${calculator?.name}?`,
      answer: `Our ${calculator?.name} uses precise mathematical formulas and is regularly updated with current market rates and regulations. However, results should be used for planning purposes and verified with financial institutions.`
    },
    {
      question: `Can I use ${calculator?.name} on mobile devices?`,
      answer: `Absolutely! Our ${calculator?.name} is fully responsive and optimized for all devices including smartphones, tablets, and desktop computers. You can access it anywhere, anytime.`
    },
    {
      question: `What information do I need to use ${calculator?.name}?`,
      answer: `The required information varies by calculator type. Generally, you'll need basic financial details like amounts, time periods, interest rates, and other relevant parameters. Each calculator has clear input fields with helpful tooltips.`
    }
  ];
  
  // Enhanced features for the calculator
  const calculatorFeatures: CalculatorFeatures[] = [
    {
      name: "Instant Calculations",
      description: "Get results in real-time with our optimized algorithms",
      icon: <Calculator className="h-6 w-6" />
    },
    {
      name: "Mobile Optimized",
      description: "Works perfectly on all devices and screen sizes",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      name: "Free to Use",
      description: "No registration, no subscription, no hidden charges",
      icon: <DollarSign className="h-6 w-6" />
    },
    {
      name: "Secure & Private",
      description: "Your data stays on your device, never stored on servers",
      icon: <Shield className="h-6 w-6" />
    },
    {
      name: "Regular Updates",
      description: "Updated with latest rates, regulations, and market data",
      icon: <Clock className="h-6 w-6" />
    },
    {
      name: "Trusted by Millions",
      description: "Used by over 10 lakh+ users across India",
      icon: <Users className="h-6 w-6" />
    }
  ];
  
  // Get related calculators
  const relatedCalculators = calculator?.relatedCalculators 
    ? allCalculators.filter(calc => calculator.relatedCalculators?.includes(calc.id)).slice(0, 6)
    : allCalculators.slice(0, 6);
  
  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Calculators", url: "/calculators" },
    { name: calculator?.category || "Financial Calculators", url: `/category/${calculator?.category?.toLowerCase().replace(/\s+/g, '-')}` },
    { name: calculator?.name || "Calculator", url: `/calculators/${calculatorId}` }
  ];
  
  // SEO optimization data
  const seoData = {
    pageType: 'calculator' as const,
    title: `${calculator?.name} 2025 - Free Online Calculator | Calculate ${calculator?.name} Instantly`,
    description: `${calculator?.description} Use our free online ${calculator?.name} to get accurate calculations instantly. No registration required. Trusted by millions of Indian users.`,
    url: `/calculators/${calculatorId}`,
    keywords: [
      `${calculator?.name} calculator`,
      `${calculator?.name} 2025`,
      `free ${calculator?.name}`,
      `online ${calculator?.name}`,
      `${calculator?.name} India`,
      ...(calculator?.keywords || [])
    ],
    focusKeyword: `${calculator?.name} calculator`,
    relatedKeywords: [
      `${calculator?.name} calculation`,
      `${calculator?.name} formula`,
      `${calculator?.name} online tool`,
      `${calculator?.name} free calculator`,
      `${calculator?.name} India calculator`
    ],
    publishedDate: "2024-01-01T00:00:00Z",
    lastModified: new Date().toISOString(),
    readingTime: 5,
    author: {
      name: "FinanceGurus Team",
      title: "Financial Calculator Experts",
      bio: "Our team of financial experts has developed comprehensive calculators to help Indian users make informed financial decisions.",
      image: "/authors/financegurus-team.jpg",
      url: "https://moneycal.in/about-us"
    },
    image: {
      url: `https://moneycal.in/images/${calculatorId}-calculator.jpg`,
      alt: `${calculator?.name} Calculator - Free Online Tool`,
      width: 1200,
      height: 630
    },
    category: calculator?.category,
    tags: calculator?.keywords || [],
    discoverOptimized: {
      highQualityImages: true,
      originalReporting: true,
      expertiseSignals: true,
      freshContent: true,
      trendingTopics: ["Financial Planning 2025", "Online Calculators", "Financial Tools"]
    },
    calculatorData: {
      name: calculator?.name || "Financial Calculator",
      description: calculator?.description || "Free online financial calculator",
      category: calculator?.category || "Financial Calculators",
      features: calculatorFeatures.map(f => f.name),
      faqData: enhancedFAQs,
      relatedCalculators: relatedCalculators.map(calc => calc.name)
    },
    breadcrumbs,
    preloadResources: [
      { href: "/src/components/Calculator.tsx", as: "script", type: "module" },
      { href: "/src/index.css", as: "style" }
    ]
  };
  
  if (!calculator) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Calculator Not Found</h1>
        <p className="text-neutral-600 mb-8">The calculator you're looking for doesn't exist or may have been moved.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <EnhancedSEO {...seoData} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.name}>
              {index > 0 && <span>/</span>}
              <Link 
                to={crumb.url} 
                className="hover:text-primary-600 transition-colors"
              >
                {crumb.name}
              </Link>
            </React.Fragment>
          ))}
        </nav>
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">
                {calculator.name} 2025
              </h1>
              <p className="text-lg text-neutral-600 mb-4">
                {calculator.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-neutral-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>10L+ users</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  <span>4.8/5 rating</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Updated 2025</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {calculatorFeatures.map((feature, index) => (
              <div key={index} className="text-center p-4 bg-neutral-50 rounded-lg">
                <div className="flex justify-center mb-2 text-primary-600">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-medium text-neutral-900 mb-1">
                  {feature.name}
                </h3>
                <p className="text-xs text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-neutral-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'calculator', label: 'Calculator', icon: <Calculator className="h-4 w-4" /> },
              { id: 'guide', label: 'How to Use', icon: <TrendingUp className="h-4 w-4" /> },
              { id: 'faq', label: 'FAQ', icon: <Shield className="h-4 w-4" /> },
              { id: 'related', label: 'Related Tools', icon: <ExternalLink className="h-4 w-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'calculator' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    {calculator.name}
                  </h2>
                  
                  {/* Calculator Form Placeholder */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Principal Amount (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="Enter amount"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Interest Rate (%)
                        </label>
                        <input
                          type="number"
                          placeholder="Enter rate"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Time Period
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          placeholder="Years"
                          className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="number"
                          placeholder="Months"
                          className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <button className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                      Calculate {calculator.name}
                    </button>
                  </div>
                  
                  {/* Results Section */}
                  <div className="mt-8 p-6 bg-primary-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">
                      Calculation Results
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">₹0</div>
                        <div className="text-sm text-neutral-600">Total Amount</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">₹0</div>
                        <div className="text-sm text-neutral-600">Interest Earned</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Quick Links */}
                  <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                      Quick Links
                    </h3>
                    <div className="space-y-3">
                      <Link 
                        to="/blog"
                        className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        <span>Financial Blog</span>
                      </Link>
                      <Link 
                        to="/calculators"
                        className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
                      >
                        <Calculator className="h-4 w-4 mr-2" />
                        <span>All Calculators</span>
                      </Link>
                      <Link 
                        to="/contact-us"
                        className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <span>Contact Support</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Related Calculators */}
                  <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                      Related Calculators
                    </h3>
                    <div className="space-y-3">
                      {relatedCalculators.slice(0, 4).map(calc => (
                        <Link
                          key={calc.id}
                          to={`/calculators/${calc.id}`}
                          className="block p-3 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                        >
                          <div className="font-medium text-neutral-900 mb-1">
                            {calc.name}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {calc.category}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'guide' && (
            <div className="prose prose-lg max-w-none">
              <h2>How to Use {calculator.name}</h2>
              <p>
                Our {calculator.name} is designed to be simple and user-friendly. Follow these steps to get accurate calculations:
              </p>
              
              <h3>Step 1: Enter Basic Information</h3>
              <p>
                Start by entering the basic information required for the calculation. This typically includes:
              </p>
              <ul>
                <li>Principal amount or investment amount</li>
                <li>Interest rate or expected return</li>
                <li>Time period (years/months)</li>
                <li>Any additional parameters specific to this calculator</li>
              </ul>
              
              <h3>Step 2: Review and Calculate</h3>
              <p>
                Double-check your inputs to ensure accuracy. Click the "Calculate" button to get instant results.
              </p>
              
              <h3>Step 3: Understand Results</h3>
              <p>
                The calculator will display detailed results including:
              </p>
              <ul>
                <li>Total amount or final value</li>
                <li>Interest earned or returns generated</li>
                <li>Breakdown of calculations</li>
                <li>Additional insights and recommendations</li>
              </ul>
              
              <h3>Important Notes</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Disclaimer:</strong> Results are for planning purposes only. Please verify calculations with your financial advisor or institution before making any financial decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Frequently Asked Questions
              </h2>
              
              {enhancedFAQs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'related' && (
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Related Financial Tools
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCalculators.map(calc => (
                  <Link
                    key={calc.id}
                    to={`/calculators/${calc.id}`}
                    className="block bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg hover:border-primary-300 transition-all duration-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                        <Calculator className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">
                          {calc.name}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {calc.category}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-700 mb-4">
                      {calc.keywords.slice(0, 3).join(', ')}
                    </p>
                    <div className="flex items-center text-sm text-primary-600">
                      <span>Try Calculator</span>
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

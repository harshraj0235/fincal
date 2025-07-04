import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, TrendingUp, DollarSign, Shield, Clock, Users, Star, 
  Share2, Bookmark, ExternalLink, Info, AlertCircle, CheckCircle,
  Smartphone, Monitor, Tablet, Download, Copy, RefreshCw
} from 'lucide-react';
import EnhancedSEO from './EnhancedSEO';

interface CalculatorInput {
  id: string;
  label: string;
  type: 'range' | 'number' | 'select' | 'toggle';
  value: number | string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: Array<{ value: string; label: string }>;
  description?: string;
  tooltip?: string;
  required?: boolean;
}

interface CalculatorResult {
  label: string;
  value: number | string;
  unit?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  icon?: React.ReactNode;
  description?: string;
}

interface CalculatorFAQ {
  question: string;
  answer: string;
}

interface EnhancedCalculatorProps {
  // Calculator identity
  id: string;
  name: string;
  description: string;
  category: string;
  
  // SEO optimization
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  relatedKeywords?: string[];
  
  // Calculator functionality
  inputs: CalculatorInput[];
  onCalculate: (values: Record<string, number | string>) => CalculatorResult[];
  
  // Enhanced features
  features?: Array<{
    name: string;
    description: string;
    icon: React.ReactNode;
  }>;
  
  // FAQ section
  faqs?: CalculatorFAQ[];
  
  // Related calculators
  relatedCalculators?: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
  }>;
  
  // Tips and insights
  tips?: string[];
  
  // Calculator-specific data
  calculatorData?: {
    formula?: string;
    assumptions?: string[];
    limitations?: string[];
    lastUpdated?: string;
  };
}

export const EnhancedCalculator: React.FC<EnhancedCalculatorProps> = ({
  id,
  name,
  description,
  category,
  seoTitle,
  seoDescription,
  focusKeyword,
  relatedKeywords = [],
  inputs,
  onCalculate,
  features = [],
  faqs = [],
  relatedCalculators = [],
  tips = [],
  calculatorData
}) => {
  const [inputValues, setInputValues] = useState<Record<string, number | string>>({});
  const [results, setResults] = useState<CalculatorResult[]>([]);
  const [activeTab, setActiveTab] = useState<'calculator' | 'guide' | 'faq' | 'related'>('calculator');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [copiedResult, setCopiedResult] = useState<string | null>(null);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  const calculatorRef = useRef<HTMLDivElement>(null);
  
  // Initialize input values
  useEffect(() => {
    const initialValues: Record<string, number | string> = {};
    inputs.forEach(input => {
      initialValues[input.id] = input.value;
    });
    setInputValues(initialValues);
  }, [inputs]);
  
  // Detect device type
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate results when inputs change
  useEffect(() => {
    if (Object.keys(inputValues).length > 0) {
      const calculatedResults = onCalculate(inputValues);
      setResults(calculatedResults);
    }
  }, [inputValues, onCalculate]);
  
  // Handle input changes
  const handleInputChange = (inputId: string, value: number | string) => {
    setInputValues(prev => ({
      ...prev,
      [inputId]: value
    }));
  };
  
  // Copy result to clipboard
  const copyResult = async (result: CalculatorResult) => {
    try {
      const textToCopy = `${result.label}: ${result.value}${result.unit || ''}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopiedResult(result.label);
      setTimeout(() => setCopiedResult(null), 2000);
    } catch (error) {
      console.error('Failed to copy result:', error);
    }
  };
  
  // Share calculator
  const shareCalculator = async () => {
    const shareData = {
      title: `${name} - FinanceGurus`,
      text: description,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Calculator URL copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing calculator:', error);
    }
  };
  
  // Reset calculator
  const resetCalculator = () => {
    const initialValues: Record<string, number | string> = {};
    inputs.forEach(input => {
      initialValues[input.id] = input.value;
    });
    setInputValues(initialValues);
  };
  
  // Generate SEO data
  const seoData = {
    pageType: 'calculator' as const,
    title: seoTitle || `${name} 2025 - Free Online Calculator | Calculate ${name} Instantly`,
    description: seoDescription || `${description} Use our free online ${name} to get accurate calculations instantly. No registration required. Trusted by millions of Indian users.`,
    url: `/calculators/${id}`,
    keywords: [
      `${name} calculator`,
      `${name} 2025`,
      `free ${name}`,
      `online ${name}`,
      `${name} India`,
      ...relatedKeywords
    ],
    focusKeyword: focusKeyword || `${name} calculator`,
    relatedKeywords: [
      `${name} calculation`,
      `${name} formula`,
      `${name} online tool`,
      `${name} free calculator`,
      `${name} India calculator`
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
      url: `https://moneycal.in/images/${id}-calculator.jpg`,
      alt: `${name} Calculator - Free Online Tool`,
      width: 1200,
      height: 630
    },
    category: category,
    tags: relatedKeywords,
    discoverOptimized: {
      highQualityImages: true,
      originalReporting: true,
      expertiseSignals: true,
      freshContent: true,
      trendingTopics: ["Financial Planning 2025", "Online Calculators", "Financial Tools"]
    },
    calculatorData: {
      name: name,
      description: description,
      category: category,
      features: features.map(f => f.name),
      faqData: faqs,
      relatedCalculators: relatedCalculators.map(calc => calc.name)
    },
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Calculators", url: "/calculators" },
      { name: category, url: `/category/${category.toLowerCase().replace(/\s+/g, '-')}` },
      { name: name, url: `/calculators/${id}` }
    ]
  };
  
  return (
    <>
      <EnhancedSEO {...seoData} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={calculatorRef}>
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">
                {name} 2025
              </h1>
              <p className="text-lg text-neutral-600 mb-4">
                {description}
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
                <div className="flex items-center">
                  {deviceType === 'mobile' && <Smartphone className="h-4 w-4 mr-1" />}
                  {deviceType === 'tablet' && <Tablet className="h-4 w-4 mr-1" />}
                  {deviceType === 'desktop' && <Monitor className="h-4 w-4 mr-1" />}
                  <span className="capitalize">{deviceType} optimized</span>
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
                title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
              >
                <Bookmark className="h-5 w-5" />
              </button>
              <button 
                onClick={shareCalculator}
                className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                title="Share calculator"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button 
                onClick={resetCalculator}
                className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                title="Reset calculator"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Feature Highlights */}
          {features.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {features.map((feature, index) => (
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
          )}
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-neutral-200 mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'calculator', label: 'Calculator', icon: <Calculator className="h-4 w-4" /> },
              { id: 'guide', label: 'How to Use', icon: <Info className="h-4 w-4" /> },
              { id: 'faq', label: 'FAQ', icon: <AlertCircle className="h-4 w-4" /> },
              { id: 'related', label: 'Related Tools', icon: <ExternalLink className="h-4 w-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
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
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-primary-600" />
                    {name}
                  </h2>
                  
                  {/* Calculator Inputs */}
                  <div className="space-y-6">
                    {inputs.map((input) => (
                      <div key={input.id} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label htmlFor={input.id} className="text-sm font-medium text-neutral-700">
                            {input.label}
                            {input.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {input.tooltip && (
                            <div className="relative group">
                              <Info className="h-4 w-4 text-neutral-400 cursor-help" />
                              <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-neutral-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                {input.tooltip}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {input.type === 'range' && (
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-neutral-500">
                                {inputValues[input.id]}{input.unit}
                              </span>
                              <input 
                                type="number"
                                value={inputValues[input.id]}
                                onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value) || 0)}
                                className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                                min={input.min}
                                max={input.max}
                                step={input.step}
                              />
                            </div>
                            <input 
                              type="range" 
                              id={input.id}
                              min={input.min} 
                              max={input.max} 
                              step={input.step} 
                              value={inputValues[input.id] as number} 
                              onChange={(e) => handleInputChange(input.id, Number(e.target.value))}
                              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between mt-1 text-xs text-neutral-500">
                              <span>{input.min}{input.unit}</span>
                              <span>{input.max}{input.unit}</span>
                            </div>
                          </div>
                        )}
                        
                        {input.type === 'number' && (
                          <input 
                            type="number"
                            id={input.id}
                            value={inputValues[input.id]}
                            onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            min={input.min}
                            max={input.max}
                            step={input.step}
                            placeholder={`Enter ${input.label.toLowerCase()}`}
                          />
                        )}
                        
                        {input.type === 'select' && (
                          <select 
                            id={input.id}
                            value={inputValues[input.id] as string}
                            onChange={(e) => handleInputChange(input.id, e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            {input.options?.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}
                        
                        {input.type === 'toggle' && (
                          <div className="flex items-center">
                            <button
                              onClick={() => handleInputChange(input.id, !inputValues[input.id])}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                inputValues[input.id] ? 'bg-primary-600' : 'bg-neutral-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  inputValues[input.id] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                            <span className="ml-3 text-sm text-neutral-700">
                              {inputValues[input.id] ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        )}
                        
                        {input.description && (
                          <p className="text-xs text-neutral-500">{input.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Results Section */}
                  {results.length > 0 && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-100">
                      <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Calculation Results
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.map((result, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg border border-neutral-200 relative group">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-neutral-700">
                                {result.label}
                              </span>
                              <button
                                onClick={() => copyResult(result)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-neutral-100 rounded"
                                title="Copy result"
                              >
                                <Copy className="h-4 w-4 text-neutral-500" />
                              </button>
                            </div>
                            <div className="flex items-center">
                              {result.icon && <span className="mr-2">{result.icon}</span>}
                              <span className={`text-xl font-bold ${
                                result.color === 'success' ? 'text-success-600' :
                                result.color === 'warning' ? 'text-warning-600' :
                                result.color === 'danger' ? 'text-danger-600' :
                                result.color === 'primary' ? 'text-primary-600' :
                                'text-neutral-900'
                              }`}>
                                {typeof result.value === 'number' ? 
                                  new Intl.NumberFormat('en-IN', {
                                    style: 'currency',
                                    currency: 'INR',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                  }).format(result.value) : 
                                  result.value
                                }{result.unit}
                              </span>
                            </div>
                            {result.description && (
                              <p className="text-xs text-neutral-500 mt-1">{result.description}</p>
                            )}
                            {copiedResult === result.label && (
                              <div className="absolute top-2 right-2 flex items-center text-xs text-success-600">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Copied!
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Quick Tips */}
                  {tips.length > 0 && (
                    <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                        <Info className="w-5 h-5 mr-2 text-accent-600" />
                        Pro Tips
                      </h3>
                      <div className="space-y-3">
                        {tips.map((tip, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-success-600 mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-sm text-neutral-700">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Related Calculators */}
                  {relatedCalculators.length > 0 && (
                    <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                        Related Calculators
                      </h3>
                      <div className="space-y-3">
                        {relatedCalculators.map(calc => (
                          <a
                            key={calc.id}
                            href={calc.url}
                            className="block p-3 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                          >
                            <div className="font-medium text-neutral-900 mb-1">
                              {calc.name}
                            </div>
                            <div className="text-sm text-neutral-600">
                              {calc.description}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Calculator Info */}
                  {calculatorData && (
                    <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                        Calculator Info
                      </h3>
                      <div className="space-y-3 text-sm text-neutral-700">
                        {calculatorData.lastUpdated && (
                          <div>
                            <span className="font-medium">Last Updated:</span> {calculatorData.lastUpdated}
                          </div>
                        )}
                        {calculatorData.assumptions && calculatorData.assumptions.length > 0 && (
                          <div>
                            <span className="font-medium">Assumptions:</span>
                            <ul className="mt-1 ml-4 list-disc">
                              {calculatorData.assumptions.map((assumption, index) => (
                                <li key={index}>{assumption}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {calculatorData.limitations && calculatorData.limitations.length > 0 && (
                          <div>
                            <span className="font-medium">Limitations:</span>
                            <ul className="mt-1 ml-4 list-disc">
                              {calculatorData.limitations.map((limitation, index) => (
                                <li key={index}>{limitation}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'guide' && (
            <div className="prose prose-lg max-w-none">
              <h2>How to Use {name}</h2>
              <p>
                Our {name} is designed to be simple and user-friendly. Follow these steps to get accurate calculations:
              </p>
              
              <h3>Step 1: Enter Your Information</h3>
              <p>
                Start by entering the required information in the input fields. Each field has clear labels and helpful tooltips to guide you.
              </p>
              
              <h3>Step 2: Review and Calculate</h3>
              <p>
                Double-check your inputs to ensure accuracy. The calculator will automatically update results as you change values.
              </p>
              
              <h3>Step 3: Understand Results</h3>
              <p>
                Review the detailed results and use the copy feature to save or share your calculations.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
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
              
              {faqs.map((faq, index) => (
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
                  <a
                    key={calc.id}
                    href={calc.url}
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
                          {calc.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-primary-600">
                      <span>Try Calculator</span>
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}; 
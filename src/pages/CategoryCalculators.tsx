import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { calculatorCategories } from '../data/calculatorData';
import { categorySeoData } from '../data/categorySeoData';
import { 
  Building, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Shield, 
  Search,
  ArrowLeft,
  IndianRupee,
  X
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import AstroFinanceButton from '../components/AstroFinanceButton';
import { ResponsiveAd } from '../components/BannerAd';

const getCategoryIcon = (categoryId: string) => {
  switch(categoryId) {
    case 'loan-calculators': return <Building className="h-10 w-10 text-blue-600 mb-4" />;
    case 'investment-calculators': return <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />;
    case 'tax-calculators': return <DollarSign className="h-10 w-10 text-blue-600 mb-4" />;
    case 'retirement-calculators': return <PieChart className="h-10 w-10 text-blue-600 mb-4" />;
    case 'business-calculators': return <Building className="h-10 w-10 text-blue-600 mb-4" />;
    case 'property-calculators': return <Building className="h-10 w-10 text-blue-600 mb-4" />;
    case 'insurance-calculators': return <Shield className="h-10 w-10 text-blue-600 mb-4" />;
    case 'banking-calculators': return <IndianRupee className="h-10 w-10 text-blue-600 mb-4" />;
    case 'fintech-payments': return <IndianRupee className="h-10 w-10 text-blue-600 mb-4" />;
    case 'investments-wealth-management': return <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />;
    case 'personal-finance': return <PieChart className="h-10 w-10 text-blue-600 mb-4" />;
    default: return <IndianRupee className="h-10 w-10 text-blue-600 mb-4" />;
  }
};

const CategoryCalculators: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const category = calculatorCategories.find(cat => cat.id === categoryId);

  useEffect(() => {
    if (!category) {
      navigate('/calculators');
    }
  }, [category, navigate]);

  if (!category) {
    return (
      <div className="min-h-screen bg-[#f7f9fa] pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The requested category could not be found.</p>
          <Link
            to="/calculators"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to All Categories
          </Link>
        </div>
      </div>
    );
  }

  const filteredCalculators = category.calculators.filter(calculator =>
    calculator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calculator.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const categoryKeywords = Array.from(new Set(category.calculators.flatMap(calc => calc.keywords || []).slice(0, 24)));
  
  const faqItems = [
    {
      question: `What is included in ${category.name}?`,
      answer: `This category includes calculators that help with ${category.description.toLowerCase()}`
    },
    {
      question: `Which ${category.name.toLowerCase()} calculator should I start with?`,
      answer: 'Start with the most common goal in this category and compare two scenarios to understand the impact of rate or tenure changes.'
    },
    {
      question: 'Are these calculators accurate for India?',
      answer: 'Yes. They use standard formulas commonly used by Indian banks and financial institutions.'
    }
  ];

  return (
    <>
      <AstroFinanceButton />
      <SEOHelmet
        title={`${category.name} - Financial Calculators | MoneyCal.in`}
        description={`Explore all ${category.name.toLowerCase()} calculators. Compare tools, estimate outcomes, and choose the right plan for your needs.`}
        keywords={[`${category.name} calculators`, 'financial calculators', ...categoryKeywords].join(', ')}
        url={`/calculators/category/${categoryId}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators' },
          { name: category.name, url: `/calculators/category/${categoryId}` }
        ]}
        faqData={faqItems}
        tags={[category.name, 'calculator category', 'financial tools', 'India calculators']}
        structuredData={{}}
      />

      <div className="min-h-screen bg-[#f7f9fa] pt-8 pb-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12 flex flex-col items-center">
            {getCategoryIcon(category.id)}
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              {category.name}
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl">
              {category.description}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16 relative">
            <div className="relative group shadow-sm rounded-full">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder={`Search ${category.name.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-14 pr-12 py-4 bg-white border border-gray-200 rounded-full text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center mb-8">
            <ResponsiveAd />
          </div>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filteredCalculators.map(calculator => (
              <Link
                key={calculator.id}
                to={`/calculators/${calculator.id}`}
                className="bg-white border border-gray-200 rounded-[1rem] p-6 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:border-gray-300 transition-all duration-300 flex flex-col group h-full"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {calculator.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                    {calculator.description}
                  </p>
                </div>
                <div className="mt-auto flex justify-end">
                   <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ArrowLeft className="w-4 h-4 rotate-135" style={{ transform: 'rotate(135deg)' }} />
                   </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mb-16">
             <Link
               to="/calculators"
               className="inline-flex flex-col items-center justify-center text-blue-600 hover:text-blue-800 font-semibold transition-colors group"
             >
               <span className="flex items-center mb-2">
                 <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                 Back to all categories
               </span>
               <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Building className="w-5 h-5" />
               </div>
             </Link>
          </div>

          {/* SEO Content Section */}
          {!searchTerm && categorySeoData[category.id] && (
            <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-sm mb-16">
               <div className="prose prose-blue max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600" dangerouslySetInnerHTML={{ __html: categorySeoData[category.id] }} />
            </div>
          )}

          {/* No Results */}
          {filteredCalculators.length === 0 && (
            <div className="text-center py-16 bg-white border border-gray-200 dashed rounded-2xl">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No calculators found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold"
              >
                Clear Search
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default CategoryCalculators;

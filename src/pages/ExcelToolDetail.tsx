import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Star, Users, FileSpreadsheet, ArrowLeft, ExternalLink } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { getExcelToolBySlug } from '../data/excelToolsData';
import SimpleDailyExpenseTracker from './SimpleDailyExpenseTracker';
import MonthlyBudgetPlanner from './MonthlyBudgetPlanner';
import InvoiceGeneratorBusiness from './InvoiceGeneratorBusiness';
import MonthlyBudgetTracker from './MonthlyBudgetTracker';
import DebtPayoffCalculator from './DebtPayoffCalculator';
import InvestmentPortfolioTracker from './InvestmentPortfolioTracker';
import NetWorthCalculator from './NetWorthCalculator';
import VacationBudgetPlanner from './VacationBudgetPlanner';

const ExcelToolDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = getExcelToolBySlug(slug || '');

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Excel Tool Not Found</h1>
          <p className="text-gray-600 mb-4">The Excel tool you're looking for doesn't exist.</p>
          <Link
            to="/excel-tools"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Excel Tools
          </Link>
        </div>
      </div>
    );
  }

  if (slug === 'simple-daily-expense-tracker') {
    return <SimpleDailyExpenseTracker />;
  }
  if (slug === 'monthly-budget-planner') {
    return <MonthlyBudgetPlanner />;
  }
  if (slug === 'invoice-generator-business') {
    return <InvoiceGeneratorBusiness />;
  }
  if (slug === 'monthly-budget-tracker') {
    return <MonthlyBudgetTracker />;
  }
  if (slug === 'debt-payoff-calculator') {
    return <DebtPayoffCalculator />;
  }
  if (slug === 'investment-portfolio-tracker') {
    return <InvestmentPortfolioTracker />;
  }
  if (slug === 'net-worth-calculator') {
    return <NetWorthCalculator />;
  }
  if (slug === 'vacation-budget-planner') {
    return <VacationBudgetPlanner />;
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "description": tool.description,
    "url": `https://financegurus.directory/excel-tools/${tool.slug}`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Microsoft Excel",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "author": {
      "@type": "Organization",
      "name": "FinanceGurus",
      "url": "https://financegurus.directory"
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <SEOHelmet
        title={tool.seoTitle}
        description={tool.seoDescription}
        keywords={tool.keywords.join(', ')}
        url={`/excel-tools/${tool.slug}`}
        structuredData={structuredData}
        tags={tool.keywords}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link to="/excel-tools" className="hover:text-blue-600">Excel Tools</Link>
              <span>/</span>
              <span className="text-gray-900">{tool.title}</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tool Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tool.difficulty)}`}>
                    {tool.difficulty}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {tool.title}
                </h1>

                <p className="text-lg text-gray-600 mb-6">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href={tool.downloadLink}
                    download
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Free
                  </a>
                  <Link
                    to="/excel-tools"
                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Browse All Tools
                  </Link>
                </div>

                {/* SEO Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{tool.difficulty}</div>
                    <div className="text-sm text-gray-600">Difficulty</div>
                  </div>
                </div>
              </div>

              {/* Tool Preview */}
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <FileSpreadsheet className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Excel Template Preview</h3>
                  <p className="text-gray-600">Professional Excel template with automated calculations and visual reports</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tool.features.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tool.useCases.map((useCase, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">{useCase}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Target Audience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tool.targetAudience.map((audience, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900">{audience}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Keywords Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Target Keywords</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {tool.keywords.map((keyword, index) => (
                <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Long Tail Keywords Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Long Tail Keywords</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tool.longTailKeywords.map((keyword, index) => (
                <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">{keyword}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tool.internalLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {link.split('/').pop()?.replace(/-/g, ' ')}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Download Your Free Excel Tool?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get started with professional financial management today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={tool.downloadLink}
                download
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Now
              </a>
              <Link
                to="/excel-tools"
                className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ExcelToolDetail; 
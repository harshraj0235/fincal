import React from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Link, useParams } from 'react-router-dom';
import { Calculator, Clock, BookOpen, Users, TrendingUp, CheckCircle, ArrowLeft } from 'lucide-react';

const ToolPlaceholder: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const toolName = toolId ? toolId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Financial Tool';

  const upcomingTools = [
    {
      name: 'Advanced Investment Portfolio Tracker',
      description: 'Track your investments across multiple asset classes with real-time performance analytics',
      category: 'Investment',
      eta: 'Coming Soon'
    },
    {
      name: 'Comprehensive Tax Planning Calculator',
      description: 'Plan your taxes efficiently with deductions, exemptions, and tax-saving strategies',
      category: 'Tax Planning',
      eta: 'Coming Soon'
    },
    {
      name: 'Retirement Planning Suite',
      description: 'Plan your retirement with multiple scenarios and investment strategies',
      category: 'Retirement',
      eta: 'Coming Soon'
    },
    {
      name: 'Business Financial Analysis Tool',
      description: 'Analyze business performance with advanced financial ratios and metrics',
      category: 'Business',
      eta: 'Coming Soon'
    }
  ];

  const existingTools = [
    { name: 'EMI Calculator', url: '/calculators/emi-calculator', category: 'Loan' },
    { name: 'SIP Calculator', url: '/calculators/sip-calculator', category: 'Investment' },
    { name: 'Income Tax Calculator', url: '/calculators/income-tax-calculator', category: 'Tax' },
    { name: 'Mutual Fund Calculator', url: '/calculators/mutual-fund-calculator', category: 'Investment' },
    { name: 'PPF Calculator', url: '/calculators/ppf-calculator', category: 'Investment' },
    { name: 'FD Calculator', url: '/calculators/fd-calculator', category: 'Investment' }
  ];

  return (
    <>
      <SEOHelmet
        title={`${toolName} - Financial Calculator | MoneyCal.in`}
        description={`Explore ${toolName} and other comprehensive financial calculators on MoneyCal.in. Get accurate calculations for loans, investments, taxes, and more.`}
        keywords={`${toolName.toLowerCase()}, financial calculator, money calculator, investment calculator, loan calculator, tax calculator`}
        url={`/tools/${toolId}`}
        type="website"
        image="/images/financial-tools.jpg"
        tags={["financial calculators", "investment tools", "loan calculators", "tax planning"]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                {toolName}
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're working hard to bring you the most comprehensive {toolName.toLowerCase()} with advanced features and accurate calculations.
            </p>
          </div>

          {/* Development Status */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Under Development</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our team is currently developing this advanced financial tool with cutting-edge features, 
                real-time data integration, and comprehensive analysis capabilities. We're ensuring it meets 
                the highest standards of accuracy and user experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Research Phase</h3>
                  <p className="text-sm text-gray-600">Complete</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Development</h3>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Testing</h3>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Available Tools */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-2 text-green-600" />
              Available Financial Tools
            </h2>
            <p className="text-gray-600 mb-6">
              While we work on {toolName}, explore our comprehensive collection of financial calculators 
              that are ready to help you with your financial planning needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {existingTools.map((tool, index) => (
                <Link
                  key={index}
                  to={tool.url}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{tool.name}</h3>
                  <p className="text-sm text-gray-600">Ready to use</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Tools */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
              Upcoming Advanced Tools
            </h2>
            <p className="text-gray-600 mb-6">
              We're constantly expanding our financial toolkit to provide you with the most comprehensive 
              suite of financial planning and analysis tools.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTools.map((tool, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                      {tool.category}
                    </span>
                    <span className="text-sm text-gray-500">{tool.eta}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Preview */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What to Expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Advanced Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Real-time data integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Multiple calculation scenarios
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Detailed analysis reports
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Export and sharing capabilities
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">User Experience</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Mobile-responsive design
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Intuitive interface
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Fast and accurate calculations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Educational resources included
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Be the first to know when {toolName} is ready! We'll notify you as soon as it's available 
              with all the advanced features you need for your financial planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Available Tools
              </Link>
              <Link
                to="/contact-us"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
      </div>
    </div>
    </>
  );
};

export default ToolPlaceholder; 

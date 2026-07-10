import React from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Link, useParams } from 'react-router-dom';
import { IndianRupee, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react';

const ToolPlaceholder: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const toolName = toolId ? toolId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Financial Tool';

  const recommendedGuides = [
    {
      name: 'Loan Planning Checklist',
      description: 'Understand EMI affordability, tenure impact, and prepayment strategy.',
      category: 'Loans'
    },
    {
      name: 'Investment Basics',
      description: 'Build a SIP plan, compare mutual funds, and track long-term goals.',
      category: 'Investing'
    },
    {
      name: 'Tax Saving Playbook',
      description: 'Compare regimes, plan deductions, and estimate yearly tax liability.',
      category: 'Tax'
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
        title={`${toolName} - Financial Tool | MoneyCal.in`}
        description={`Explore ${toolName} and other comprehensive financial calculators on MoneyCal.in. Get accurate calculations for loans, investments, taxes, and more.`}
        keywords={`${toolName.toLowerCase()}, financial tools, money management, investment planning, loan calculator, tax calculator`}
        url={`/tools/${toolId}`}
        type="website"
        noIndex={true}
        noFollow={true}
        image="/images/financial-tools.jpg"
        tags={["financial calculators", "investment tools", "loan calculators", "tax planning"]}
        calculatorData={{
          name: toolName,
          description: `${toolName} helps Indian users plan and compare scenarios with transparent assumptions and clear outputs.`,
          category: "FinanceApplication",
          features: [
            "Scenario comparison",
            "Result explanations",
            "Mobile responsive",
            "Shareable outputs"
          ],
          authorName: "MoneyCal Editorial Team"
        }}
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
              <IndianRupee className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                {toolName}
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We could not find a dedicated page for <span className="font-semibold">{toolName}</span>. Explore our tool directory and
              use the recommendations below to get the answers you need.
            </p>
          </div>

          {/* Tool Directory */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Find the right MoneyCal tool</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Use our curated tools and guides to plan loans, taxes, investments, and savings. You can also visit the
                full tools hub to discover the best match for your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/tools" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Browse all tools
                </Link>
                <Link to="/calculators" className="inline-flex items-center px-4 py-2 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50">
                  Explore calculators
                </Link>
                <Link to="/learn" className="inline-flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                  Learn finance
                </Link>
              </div>
            </div>
          </div>

          {/* Available Tools */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <IndianRupee className="h-6 w-6 mr-2 text-green-600" />
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

          {/* Recommended Guides */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
              Recommended Guides
            </h2>
            <p className="text-gray-600 mb-6">
              Start with these curated resources to get clarity before using advanced calculators.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedGuides.map((tool, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                      {tool.category}
                    </span>
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

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">How {toolName} Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Step-by-step</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Define your inputs such as amount, rate, and duration.</li>
                  <li>Choose a scenario and review results side-by-side.</li>
                  <li>Adjust assumptions to see sensitivity to changes.</li>
                  <li>Save or share the output with a unique link.</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Worked example</h3>
                <p className="text-gray-700 mb-2">
                  Suppose you need a quick estimate. Enter sample values and compare two scenarios. One with conservative assumptions and another with moderate assumptions. Evaluate total impact and monthly effects before deciding.
                </p>
                <p className="text-gray-700">
                  This approach prevents over-optimism and highlights realistic outcomes for Indian users considering taxes, inflation, and market variation.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Mistakes to Avoid</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                Ignoring fees, exit loads, or taxes when comparing outcomes.
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                Using unrealistic return or interest assumptions without sensitivity checks.
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                Not aligning results with your risk profile and time horizon.
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                Missing small charges that compound into noticeable differences.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">FAQs</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">Is {toolName} free to use?</h3>
                <p className="text-gray-700">Yes. All MoneyCal tools are free to use in your browser with no mandatory sign-up.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Are the outputs compliant?</h3>
                <p className="text-gray-700">Tools follow standard formulas and educational assumptions. For final filings, verify against official sources and your advisor.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">How can I share my results?</h3>
                <p className="text-gray-700">Use the share button to copy a link with your inputs so others can review the same scenario.</p>
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

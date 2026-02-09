import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, FileText, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface ITRFormInfo {
  formType: string;
  description: string;
  eligibility: string[];
  documents: string[];
  features: string[];
  status: 'recommended' | 'eligible' | 'not-eligible';
}

const ITRFormTypeHelper: React.FC = () => {
  const [income, setIncome] = useState('');
  const [incomeSource, setIncomeSource] = useState('');
  const [hasBusiness, setHasBusiness] = useState(false);
  const [hasCapitalGains, setHasCapitalGains] = useState(false);
  const [hasForeignAssets, setHasForeignAssets] = useState(false);
  const [hasPartnership, setHasPartnership] = useState(false);
  const [result, setResult] = useState<ITRFormInfo | null>(null);

  const determineITRForm = () => {
    if (!income || !incomeSource) {
      alert('Please fill in all required fields');
      return;
    }

    const incomeAmount = parseFloat(income);
    let recommendedForm: ITRFormInfo;

    // ITR-1 (Sahaj) - For individuals with salary/pension income
    if (incomeSource === 'salary' && incomeAmount <= 5000000 && !hasBusiness && !hasCapitalGains && !hasForeignAssets && !hasPartnership) {
      recommendedForm = {
        formType: 'ITR-1 (Sahaj)',
        description: 'Simplified form for individuals with salary, pension, or interest income up to ₹50 lakhs',
        eligibility: [
          'Individual taxpayers',
          'Income from salary/pension',
          'Income from one house property',
          'Income from other sources (interest, etc.)',
          'Total income up to ₹50 lakhs'
        ],
        documents: [
          'Form 16 from employer',
          'Bank statements',
          'Investment proofs',
          'Property details (if applicable)',
          'Interest certificates'
        ],
        features: [
          'Simplest form to fill',
          'No business income',
          'No capital gains',
          'No foreign assets',
          'No partnership income'
        ],
        status: 'recommended'
      };
    }
    // ITR-2 - For individuals with capital gains or multiple properties
    else if (hasCapitalGains || (incomeSource === 'multiple' && !hasBusiness)) {
      recommendedForm = {
        formType: 'ITR-2',
        description: 'For individuals with capital gains, multiple properties, or foreign assets',
        eligibility: [
          'Individual taxpayers',
          'Capital gains income',
          'Multiple house properties',
          'Foreign assets/income',
          'No business income'
        ],
        documents: [
          'Capital gains statements',
          'Property sale documents',
          'Foreign asset details',
          'Bank statements',
          'Investment proofs'
        ],
        features: [
          'Handles capital gains',
          'Multiple properties',
          'Foreign assets reporting',
          'No business income',
          'Comprehensive income reporting'
        ],
        status: 'recommended'
      };
    }
    // ITR-3 - For individuals with business income
    else if (hasBusiness || hasPartnership) {
      recommendedForm = {
        formType: 'ITR-3',
        description: 'For individuals with business income, partnership income, or professional income',
        eligibility: [
          'Individual taxpayers',
          'Business income',
          'Partnership income',
          'Professional income',
          'Any business-related income'
        ],
        documents: [
          'Business accounts',
          'Partnership deed',
          'Professional certificates',
          'Business expenses',
          'Audit reports (if applicable)'
        ],
        features: [
          'Business income reporting',
          'Partnership income',
          'Professional income',
          'Business expenses',
          'Audit requirements'
        ],
        status: 'recommended'
      };
    }
    // ITR-4 (Sugam) - For presumptive taxation
    else if (incomeSource === 'business' && incomeAmount <= 2000000) {
      recommendedForm = {
        formType: 'ITR-4 (Sugam)',
        description: 'For individuals with presumptive business income up to ₹2 crores',
        eligibility: [
          'Individual taxpayers',
          'Presumptive business income',
          'Income up to ₹2 crores',
          'No audit required',
          'Simplified business reporting'
        ],
        documents: [
          'Business income details',
          'Bank statements',
          'Basic business records',
          'No detailed accounts required',
          'Presumptive income calculation'
        ],
        features: [
          'Presumptive taxation',
          'No detailed accounts',
          'Simplified business reporting',
          'No audit requirement',
          'Easy to file'
        ],
        status: 'recommended'
      };
    }
    // Default to ITR-2 for complex cases
    else {
      recommendedForm = {
        formType: 'ITR-2',
        description: 'Comprehensive form for individuals with complex income sources',
        eligibility: [
          'Individual taxpayers',
          'Complex income sources',
          'Multiple income types',
          'Foreign income/assets',
          'High-value transactions'
        ],
        documents: [
          'All income certificates',
          'Property documents',
          'Investment proofs',
          'Foreign asset details',
          'Bank statements'
        ],
        features: [
          'Comprehensive reporting',
          'All income types',
          'Foreign assets',
          'Complex calculations',
          'Detailed documentation'
        ],
        status: 'recommended'
      };
    }

    setResult(recommendedForm);
  };

  const resetForm = () => {
    setIncome('');
    setIncomeSource('');
    setHasBusiness(false);
    setHasCapitalGains(false);
    setHasForeignAssets(false);
    setHasPartnership(false);
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="ITR Form Type Helper - Choose the Right ITR Form | MoneyCal"
        description="Determine the correct ITR form for your income sources. Get guidance on ITR-1, ITR-2, ITR-3, and ITR-4 forms with detailed eligibility criteria."
        keywords="ITR form type, ITR-1, ITR-2, ITR-3, ITR-4, income tax return form, tax filing form, ITR eligibility"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ITR Form Type Helper
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Choose the right ITR form based on your income sources and circumstances
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-blue-600" />
                  Income Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Income (₹)
                    </label>
                    <input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="Enter your total income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Income Source
                    </label>
                    <select
                      value={incomeSource}
                      onChange={(e) => setIncomeSource(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select income source</option>
                      <option value="salary">Salary/Pension</option>
                      <option value="business">Business</option>
                      <option value="multiple">Multiple Sources</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Additional Income Sources</label>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasBusiness"
                        checked={hasBusiness}
                        onChange={(e) => setHasBusiness(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="hasBusiness" className="ml-2 text-sm text-gray-700">
                        Business Income
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasCapitalGains"
                        checked={hasCapitalGains}
                        onChange={(e) => setHasCapitalGains(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="hasCapitalGains" className="ml-2 text-sm text-gray-700">
                        Capital Gains
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasForeignAssets"
                        checked={hasForeignAssets}
                        onChange={(e) => setHasForeignAssets(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="hasForeignAssets" className="ml-2 text-sm text-gray-700">
                        Foreign Assets/Income
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasPartnership"
                        checked={hasPartnership}
                        onChange={(e) => setHasPartnership(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="hasPartnership" className="ml-2 text-sm text-gray-700">
                        Partnership Income
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={determineITRForm}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Determine ITR Form
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-3">Related Tax Tools</h3>
                    <div className="space-y-2 text-sm">
                      <a href="/tax-tools/stcg-ltcg-classifier" className="block text-blue-700 hover:text-blue-900">
                        • STCG vs LTCG Classifier
                      </a>
                      <a href="/tax-tools/equity-tax-estimator" className="block text-blue-700 hover:text-blue-900">
                        • Equity Tax Estimator
                      </a>
                      <a href="/tax-tools/turnover-calculator-itr" className="block text-blue-700 hover:text-blue-900">
                        • Turnover Calculator for ITR
                      </a>
                      <a href="/tax-tools/section-80c-tally-analyzer" className="block text-blue-700 hover:text-blue-900">
                        • Section 80C Tally Analyzer
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  Recommended ITR Form
                </h2>

                {result ? (
                  <div className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                        <h3 className="text-xl font-bold text-green-900">{result.formType}</h3>
                      </div>
                      <p className="text-green-800">{result.description}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Eligibility Criteria</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {result.eligibility.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Required Documents</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {result.documents.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {result.features.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-purple-500 mr-2">→</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Important Notes</h4>
                      <ul className="space-y-1 text-sm text-yellow-800">
                        <li>• Verify all income sources before filing</li>
                        <li>• Keep all supporting documents ready</li>
                        <li>• Use our <a href="/tax-tools/equity-tax-estimator" className="underline">Equity Tax Estimator</a> for accurate calculations</li>
                        <li>• Consider using our <a href="/tax-tools/section-80c-tally-analyzer" className="underline">Section 80C Analyzer</a> for deductions</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter your income details to determine the correct ITR form</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Complete Guide to ITR Forms in India
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <h3>Understanding ITR Forms</h3>
                <p>
                  Income Tax Return (ITR) forms are the official documents used to file income tax returns in India. 
                  Choosing the correct ITR form is crucial for accurate tax filing and compliance. Our ITR Form Type Helper 
                  guides you through the selection process based on your income sources and circumstances.
                </p>

                <h3>Types of ITR Forms</h3>
                
                <h4>ITR-1 (Sahaj)</h4>
                <p>
                  The simplest form for individuals with basic income sources. Use our <a href="/tax-tools/equity-tax-estimator" className="text-blue-600 hover:text-blue-800">Equity Tax Estimator</a> 
                  to calculate your tax liability before filing ITR-1.
                </p>
                <ul>
                  <li>Salary/pension income</li>
                  <li>One house property</li>
                  <li>Other sources (interest, etc.)</li>
                  <li>Total income up to ₹50 lakhs</li>
                </ul>

                <h4>ITR-2</h4>
                <p>
                  For individuals with capital gains or multiple properties. Use our <a href="/tax-tools/stcg-ltcg-classifier" className="text-blue-600 hover:text-blue-800">STCG vs LTCG Classifier</a> 
                  to determine your capital gains category.
                </p>
                <ul>
                  <li>Capital gains income</li>
                  <li>Multiple house properties</li>
                  <li>Foreign assets/income</li>
                  <li>No business income</li>
                </ul>

                <h4>ITR-3</h4>
                <p>
                  For individuals with business or partnership income. Use our <a href="/tax-tools/turnover-calculator-itr" className="text-blue-600 hover:text-blue-800">Turnover Calculator</a> 
                  to estimate your business income accurately.
                </p>
                <ul>
                  <li>Business income</li>
                  <li>Partnership income</li>
                  <li>Professional income</li>
                  <li>Audit requirements</li>
                </ul>

                <h4>ITR-4 (Sugam)</h4>
                <p>
                  For presumptive taxation of business income. Simplified form for small businesses and professionals.
                </p>
                <ul>
                  <li>Presumptive business income</li>
                  <li>Income up to ₹2 crores</li>
                  <li>No detailed accounts required</li>
                  <li>Simplified reporting</li>
                </ul>

                <h3>Related Tax Tools</h3>
                <p>
                  Enhance your tax filing process with our comprehensive suite of tax calculators:
                </p>
                <ul>
                  <li><a href="/tax-tools/stcg-ltcg-classifier" className="text-blue-600 hover:text-blue-800">STCG vs LTCG Classifier</a> - Determine capital gains category</li>
                  <li><a href="/tax-tools/equity-tax-estimator" className="text-blue-600 hover:text-blue-800">Equity Tax Estimator</a> - Calculate equity investment taxes</li>
                  <li><a href="/tax-tools/turnover-calculator-itr" className="text-blue-600 hover:text-blue-800">Turnover Calculator</a> - Estimate business turnover</li>
                  <li><a href="/tax-tools/section-80c-tally-analyzer" className="text-blue-600 hover:text-blue-800">Section 80C Analyzer</a> - Maximize tax deductions</li>
                  <li><a href="/tax-tools/dividend-tax-estimator" className="text-blue-600 hover:text-blue-800">Dividend Tax Calculator</a> - Calculate dividend tax liability</li>
                </ul>

                <h3>Tips for Choosing the Right ITR Form</h3>
                <ol>
                  <li>Identify all your income sources</li>
                  <li>Check for capital gains transactions</li>
                  <li>Verify business income requirements</li>
                  <li>Consider foreign assets/income</li>
                  <li>Use our calculators for accurate estimates</li>
                  <li>Consult tax professionals for complex cases</li>
                </ol>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ITRFormTypeHelper;

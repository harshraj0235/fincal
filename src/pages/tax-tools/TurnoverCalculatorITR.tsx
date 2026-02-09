import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, AlertCircle, FileText, TrendingUp, CheckCircle } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface TurnoverResult {
  totalTurnover: number;
  recommendedITR: string;
  description: string;
  requirements: string[];
  color: string;
  icon: React.ReactNode;
}

const TurnoverCalculatorITR: React.FC = () => {
  const [businessIncome, setBusinessIncome] = useState('');
  const [professionalIncome, setProfessionalIncome] = useState('');
  const [salaryIncome, setSalaryIncome] = useState('');
  const [housePropertyIncome, setHousePropertyIncome] = useState('');
  const [capitalGainsIncome, setCapitalGainsIncome] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [result, setResult] = useState<TurnoverResult | null>(null);

  const calculateTurnover = () => {
    const business = parseFloat(businessIncome) || 0;
    const professional = parseFloat(professionalIncome) || 0;
    const salary = parseFloat(salaryIncome) || 0;
    const houseProperty = parseFloat(housePropertyIncome) || 0;
    const capitalGains = parseFloat(capitalGainsIncome) || 0;
    const other = parseFloat(otherIncome) || 0;

    const totalTurnover = business + professional + salary + houseProperty + capitalGains + other;

    let recommendedITR = '';
    let description = '';
    let requirements: string[] = [];
    let color = '';
    let icon: React.ReactNode = <FileText className="h-5 w-5" />;

    if (totalTurnover <= 500000) {
      recommendedITR = 'ITR-1 (Sahaj)';
      description = 'For individuals with income from salary, pension, one house property, and other sources';
      requirements = [
        'Total income should not exceed ₹50 lakhs',
        'Income from salary/pension only',
        'One house property',
        'No business income',
        'No capital gains'
      ];
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (totalTurnover <= 10000000) {
      recommendedITR = 'ITR-2';
      description = 'For individuals and HUFs not having income from business or profession';
      requirements = [
        'Total income should not exceed ₹1 crore',
        'No business income',
        'Can have capital gains',
        'Multiple house properties allowed',
        'Foreign assets/income allowed'
      ];
      color = 'text-blue-600';
      icon = <FileText className="h-5 w-5" />;
    } else if (totalTurnover <= 50000000) {
      recommendedITR = 'ITR-3';
      description = 'For individuals and HUFs having income from business or profession';
      requirements = [
        'Total income should not exceed ₹5 crore',
        'Business or professional income',
        'Presumptive taxation available',
        'Audit required if turnover > ₹2 crore',
        'Can have other income sources'
      ];
      color = 'text-orange-600';
      icon = <TrendingUp className="h-5 w-5" />;
    } else {
      recommendedITR = 'ITR-4 (Sugam)';
      description = 'For individuals, HUFs, and firms having presumptive income from business and profession';
      requirements = [
        'Total income should not exceed ₹5 crore',
        'Presumptive taxation under Section 44AD/44ADA',
        'No audit required',
        'Simplified form',
        'Business income only'
      ];
      color = 'text-purple-600';
      icon = <Calculator className="h-5 w-5" />;
    }

    setResult({
      totalTurnover,
      recommendedITR,
      description,
      requirements,
      color,
      icon
    });
  };

  const resetForm = () => {
    setBusinessIncome('');
    setProfessionalIncome('');
    setSalaryIncome('');
    setHousePropertyIncome('');
    setCapitalGainsIncome('');
    setOtherIncome('');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Turnover Calculator for ITR Form Filling - Determine Correct ITR Form | MoneyCal"
        description="Calculate your total turnover and determine the correct ITR form for filing. Get recommendations based on income sources and amounts."
        keywords="ITR form calculator, turnover calculator, tax filing, ITR-1, ITR-2, ITR-3, ITR-4, income tax return"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Turnover Calculator for ITR Form Filling
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate your total turnover and determine the correct ITR form for filing
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
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
                      Business Income (₹)
                    </label>
                    <input
                      type="number"
                      value={businessIncome}
                      onChange={(e) => setBusinessIncome(e.target.value)}
                      placeholder="Enter business income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Income (₹)
                    </label>
                    <input
                      type="number"
                      value={professionalIncome}
                      onChange={(e) => setProfessionalIncome(e.target.value)}
                      placeholder="Enter professional income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Income (₹)
                    </label>
                    <input
                      type="number"
                      value={salaryIncome}
                      onChange={(e) => setSalaryIncome(e.target.value)}
                      placeholder="Enter salary income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      House Property Income (₹)
                    </label>
                    <input
                      type="number"
                      value={housePropertyIncome}
                      onChange={(e) => setHousePropertyIncome(e.target.value)}
                      placeholder="Enter house property income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capital Gains Income (₹)
                    </label>
                    <input
                      type="number"
                      value={capitalGainsIncome}
                      onChange={(e) => setCapitalGainsIncome(e.target.value)}
                      placeholder="Enter capital gains income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Income (₹)
                    </label>
                    <input
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(e.target.value)}
                      placeholder="Enter other income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTurnover}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Turnover
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  ITR Form Recommendation
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Total Turnover */}
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-blue-600">Total Turnover</p>
                      <p className="text-2xl font-bold text-blue-900">₹{result.totalTurnover.toLocaleString()}</p>
                    </div>

                    {/* Recommended ITR */}
                    <div className={`text-center p-4 rounded-lg border-2 ${result.color.replace('text-', 'border-')}`}>
                      <div className={`flex items-center justify-center mb-2 ${result.color}`}>
                        {result.icon}
                        <span className="ml-2 text-lg font-bold">{result.recommendedITR}</span>
                      </div>
                      <p className="text-sm text-gray-600">{result.description}</p>
                    </div>

                    {/* Requirements */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Requirements:</h3>
                      <ul className="space-y-2">
                        {result.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter your income details to get ITR form recommendation</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding ITR Forms
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    ITR-1 (Sahaj)
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Income up to ₹50 lakhs</li>
                    <li>• Salary/pension income only</li>
                    <li>• One house property</li>
                    <li>• No business income</li>
                    <li>• No capital gains</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    ITR-2
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Income up to ₹1 crore</li>
                    <li>• No business income</li>
                    <li>• Can have capital gains</li>
                    <li>• Multiple house properties</li>
                    <li>• Foreign assets allowed</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    ITR-3
                  </h3>
                  <ul className="space-y-2 text-orange-700">
                    <li>• Income up to ₹5 crore</li>
                    <li>• Business/professional income</li>
                    <li>• Presumptive taxation available</li>
                    <li>• Audit required if turnover &gt; ₹2 crore</li>
                    <li>• All income sources allowed</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    ITR-4 (Sugam)
                  </h3>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Income up to ₹5 crore</li>
                    <li>• Presumptive taxation</li>
                    <li>• No audit required</li>
                    <li>• Simplified form</li>
                    <li>• Business income only</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• This calculator provides general guidance only</li>
                  <li>• Consult a tax professional for accurate form selection</li>
                  <li>• Form requirements may vary based on specific circumstances</li>
                  <li>• Always verify with the latest ITR guidelines</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TurnoverCalculatorITR;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign, Globe, ArrowRight } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface DoubleTaxCalculation {
  foreignIncome: number;
  foreignTaxPaid: number;
  indianTaxRate: number;
  indianTaxLiability: number;
  reliefAmount: number;
  netTaxLiability: number;
  reliefPercentage: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const DoubleTaxReliefTool: React.FC = () => {
  const [foreignIncome, setForeignIncome] = useState<string>('');
  const [foreignTaxPaid, setForeignTaxPaid] = useState<string>('');
  const [indianTaxRate, setIndianTaxRate] = useState<string>('');
  const [calculation, setCalculation] = useState<DoubleTaxCalculation | null>(null);

  const calculateDoubleTaxRelief = () => {
    if (!foreignIncome || !foreignTaxPaid || !indianTaxRate) {
      alert('Please fill in all fields');
      return;
    }

    const income = parseFloat(foreignIncome);
    const foreignTax = parseFloat(foreignTaxPaid);
    const indianRate = parseFloat(indianTaxRate);
    
    const indianTaxLiability = (income * indianRate) / 100;
    const reliefAmount = Math.min(foreignTax, indianTaxLiability);
    const netTaxLiability = indianTaxLiability - reliefAmount;
    const reliefPercentage = foreignTax > 0 ? (reliefAmount / foreignTax) * 100 : 0;
    
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (reliefAmount >= indianTaxLiability) {
      recommendation = 'Full relief available. No additional tax liability in India.';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (reliefAmount > 0) {
      recommendation = 'Partial relief available. Pay remaining tax in India.';
      color = 'text-blue-600';
      icon = <Info className="h-5 w-5" />;
    } else {
      recommendation = 'No relief available. Pay full tax in India.';
      color = 'text-red-600';
      icon = <AlertCircle className="h-5 w-5" />;
    }

    setCalculation({
      foreignIncome: income,
      foreignTaxPaid: foreignTax,
      indianTaxRate: indianRate,
      indianTaxLiability,
      reliefAmount,
      netTaxLiability,
      reliefPercentage,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setForeignIncome('');
    setForeignTaxPaid('');
    setIndianTaxRate('');
    setCalculation(null);
  };

  return (
    <>
      <SEOHelmet
        title="Double Tax Relief Tool - Calculate International Tax Relief | MoneyCal"
        description="Calculate relief from double taxation for international income. Determine your tax liability and available relief with our comprehensive double tax relief calculator."
        keywords="double tax relief calculator, international tax relief, foreign income tax, DTAA calculator, tax treaty relief, international taxation"
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
                Double Tax Relief Tool
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate relief from double taxation for international income
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
                  International Income Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foreign Income (₹)
                    </label>
                    <input
                      type="number"
                      value={foreignIncome}
                      onChange={(e) => setForeignIncome(e.target.value)}
                      placeholder="Enter foreign income amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foreign Tax Paid (₹)
                    </label>
                    <input
                      type="number"
                      value={foreignTaxPaid}
                      onChange={(e) => setForeignTaxPaid(e.target.value)}
                      placeholder="Enter foreign tax paid"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Indian Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      value={indianTaxRate}
                      onChange={(e) => setIndianTaxRate(e.target.value)}
                      placeholder="Enter applicable Indian tax rate"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateDoubleTaxRelief}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Relief
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
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                  Relief Analysis
                </h2>

                {calculation ? (
                  <div className="space-y-6">
                    {/* Relief Status */}
                    <div className={`text-center p-4 rounded-lg ${calculation.color.includes('green') ? 'bg-green-50 border border-green-200' : calculation.color.includes('blue') ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${calculation.color}`}>
                        {calculation.icon}
                        <span className="ml-2 text-lg font-bold">Relief Status</span>
                      </div>
                      <p className="text-sm text-gray-600">{calculation.recommendation}</p>
                    </div>

                    {/* Tax Liability Breakdown */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Tax Liability Breakdown
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Foreign Income:</span>
                          <span className="font-bold text-blue-600">₹{calculation.foreignIncome.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Foreign Tax Paid:</span>
                          <span className="font-bold text-blue-600">₹{calculation.foreignTaxPaid.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Indian Tax Rate:</span>
                          <span className="font-bold text-blue-600">{calculation.indianTaxRate}%</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Indian Tax Liability:</span>
                          <span className="font-bold text-blue-600">₹{calculation.indianTaxLiability.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Relief Calculation */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <Globe className="h-5 w-5 mr-2" />
                        Relief Calculation
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Relief Amount:</span>
                          <span className="font-bold text-green-600">₹{calculation.reliefAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Relief Percentage:</span>
                          <span className="font-bold text-green-600">{calculation.reliefPercentage.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Tax Liability:</span>
                          <span className="font-bold text-green-600">₹{calculation.netTaxLiability.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tax Savings */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        Tax Savings
                      </h3>
                      <div className="space-y-2 text-purple-700">
                        <p>• Relief from double taxation: ₹{calculation.reliefAmount.toLocaleString()}</p>
                        <p>• Effective tax rate: {((calculation.netTaxLiability / calculation.foreignIncome) * 100).toFixed(2)}%</p>
                        <p>• Tax savings: ₹{(calculation.indianTaxLiability - calculation.netTaxLiability).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter international income details to calculate relief</p>
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
                Understanding Double Tax Relief
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    What is Double Taxation?
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Same income taxed in two countries</li>
                    <li>• Source country and residence country</li>
                    <li>• Can occur on international income</li>
                    <li>• Relief available under DTAA</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Relief Mechanisms
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Tax credit method</li>
                    <li>• Exemption method</li>
                    <li>• Lower of two taxes</li>
                    <li>• Treaty provisions</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Considerations
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Check applicable DTAA provisions</li>
                  <li>• Verify tax residency status</li>
                  <li>• Maintain proper documentation</li>
                  <li>• Consider timing of income recognition</li>
                  <li>• Consult international tax expert</li>
                </ul>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Related International Tax Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/tax-tools/nri-vs-resident-tax-visualizer" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">NRI vs Resident Tax</span>
                    <p className="text-sm text-purple-600">Compare NRI and resident taxation</p>
                  </a>
                  <a href="/tax-tools/nre-vs-nro-tax-tool" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">NRE vs NRO Tax</span>
                    <p className="text-sm text-purple-600">Compare NRE and NRO account tax</p>
                  </a>
                  <a href="/tax-tools/foreign-income-tax-calculator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Foreign Income Tax</span>
                    <p className="text-sm text-purple-600">Calculate foreign income tax</p>
                  </a>
                  <a href="/tax-tools/dtaa-calculator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">DTAA Calculator</span>
                    <p className="text-sm text-purple-600">Calculate DTAA benefits</p>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DoubleTaxReliefTool;

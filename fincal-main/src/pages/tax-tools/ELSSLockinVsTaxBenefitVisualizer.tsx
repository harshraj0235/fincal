import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Calculator, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface ELSSComparison {
  investmentAmount: number;
  lockinPeriod: number;
  taxBenefit: number;
  potentialReturns: number;
  netBenefit: number;
  alternativeInvestment: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const ELSSLockinVsTaxBenefitVisualizer: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [incomeTaxSlab, setIncomeTaxSlab] = useState<string>('30');
  const [expectedReturn, setExpectedReturn] = useState<string>('12');
  const [comparison, setComparison] = useState<ELSSComparison | null>(null);

  const calculateELSSComparison = () => {
    if (!investmentAmount || !incomeTaxSlab || !expectedReturn) {
      alert('Please fill in all fields');
      return;
    }

    const amount = parseFloat(investmentAmount);
    const taxSlab = parseFloat(incomeTaxSlab);
    const returns = parseFloat(expectedReturn);
    
    // ELSS calculations
    const taxBenefit = (amount * taxSlab) / 100; // Tax saved under 80C
    const lockinPeriod = 3; // 3 years lock-in for ELSS
    const potentialReturns = amount * Math.pow(1 + returns/100, lockinPeriod) - amount;
    const netBenefit = taxBenefit + potentialReturns;
    
    // Alternative investment (no lock-in, no tax benefit)
    const alternativeInvestment = amount * Math.pow(1 + (returns - 2)/100, lockinPeriod) - amount; // 2% lower returns due to tax
    
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (netBenefit > alternativeInvestment) {
      recommendation = 'ELSS is beneficial - Higher net returns with tax benefits';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else {
      recommendation = 'Consider alternatives - Lock-in period may not justify tax benefits';
      color = 'text-orange-600';
      icon = <AlertCircle className="h-5 w-5" />;
    }

    setComparison({
      investmentAmount: amount,
      lockinPeriod,
      taxBenefit,
      potentialReturns,
      netBenefit,
      alternativeInvestment,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setInvestmentAmount('');
    setIncomeTaxSlab('30');
    setExpectedReturn('12');
    setComparison(null);
  };

  return (
    <>
      <SEOHelmet
        title="ELSS Lock-in vs Tax Benefit Visualizer - Compare ELSS vs Other Investments | MoneyCal"
        description="Compare ELSS lock-in period vs tax benefits. Visualize whether ELSS is worth the 3-year lock-in period with our advanced ELSS tax benefit calculator."
        keywords="ELSS calculator, tax benefit calculator, 80C investment, mutual fund lock-in, tax saving mutual fund, ELSS vs other investments"
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
                ELSS Lock-in vs Tax Benefit Visualizer
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Compare ELSS 3-year lock-in period with tax benefits to make informed investment decisions
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
                  Investment Parameters
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="Enter investment amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Income Tax Slab (%)
                    </label>
                    <select
                      value={incomeTaxSlab}
                      onChange={(e) => setIncomeTaxSlab(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="5">5% (Up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L - ₹5L)</option>
                      <option value="30">30% (Above ₹5L)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Return (%)
                    </label>
                    <input
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(e.target.value)}
                      placeholder="Enter expected return"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateELSSComparison}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Compare Options
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
                  Comparison Analysis
                </h2>

                {comparison ? (
                  <div className="space-y-6">
                    {/* Recommendation */}
                    <div className={`text-center p-4 rounded-lg ${comparison.color.includes('green') ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${comparison.color}`}>
                        {comparison.icon}
                        <span className="ml-2 text-lg font-bold">Recommendation</span>
                      </div>
                      <p className="text-sm text-gray-600">{comparison.recommendation}</p>
                    </div>

                    {/* ELSS Benefits */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <Lock className="h-5 w-5 mr-2" />
                        ELSS Investment (3-Year Lock-in)
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Benefit (80C):</span>
                          <span className="font-bold text-green-600">₹{comparison.taxBenefit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Potential Returns:</span>
                          <span className="font-bold text-blue-600">₹{comparison.potentialReturns.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Benefit:</span>
                          <span className="font-bold text-purple-600">₹{comparison.netBenefit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Alternative Investment */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Alternative Investment (No Lock-in)
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Benefit:</span>
                          <span className="font-bold text-gray-600">₹0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Potential Returns:</span>
                          <span className="font-bold text-gray-600">₹{comparison.alternativeInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Benefit:</span>
                          <span className="font-bold text-gray-600">₹{comparison.alternativeInvestment.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Lock-in Period</p>
                        <p className="text-xl font-bold text-green-600">{comparison.lockinPeriod} years</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Tax Savings</p>
                        <p className="text-xl font-bold text-blue-600">{incomeTaxSlab}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter investment details to compare ELSS vs alternatives</p>
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
                Understanding ELSS Lock-in vs Tax Benefits
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    ELSS Advantages
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Tax deduction under Section 80C</li>
                    <li>• Potential for higher returns</li>
                    <li>• Diversified equity exposure</li>
                    <li>• Professional fund management</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    ELSS Disadvantages
                  </h3>
                  <ul className="space-y-2 text-orange-700">
                    <li>• 3-year lock-in period</li>
                    <li>• No premature withdrawal</li>
                    <li>• Market risk exposure</li>
                    <li>• Limited liquidity</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Considerations
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• This calculator provides estimates for educational purposes</li>
                  <li>• Actual returns may vary based on market conditions</li>
                  <li>• Consider your liquidity needs before investing</li>
                  <li>• Consult a financial advisor for personalized advice</li>
                </ul>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Related Tax Planning Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/tax-tools/section-80c-tally-analyzer" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Section 80C Analyzer</span>
                    <p className="text-sm text-purple-600">Optimize your 80C investments</p>
                  </a>
                  <a href="/tax-tools/ppf-vs-nps-tax-growth-comparison" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">PPF vs NPS Comparison</span>
                    <p className="text-sm text-purple-600">Compare tax benefits and growth</p>
                  </a>
                  <a href="/tax-tools/tax-saving-investment-calculator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Tax Saving Calculator</span>
                    <p className="text-sm text-purple-600">Calculate tax savings on investments</p>
                  </a>
                  <a href="/tax-tools/old-vs-new-tax-regime-helper" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Tax Regime Helper</span>
                    <p className="text-sm text-purple-600">Choose between old and new tax regime</p>
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

export default ELSSLockinVsTaxBenefitVisualizer;

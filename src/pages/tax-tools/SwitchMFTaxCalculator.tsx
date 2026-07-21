import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, IndianRupee, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface SwitchMFCalculation {
  currentValue: number;
  originalInvestment: number;
  exitLoad: number;
  stt: number;
  capitalGain: number;
  holdingPeriod: number;
  taxRate: number;
  taxAmount: number;
  totalCharges: number;
  netAmount: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const SwitchMFTaxCalculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<string>('');
  const [originalInvestment, setOriginalInvestment] = useState<string>('');
  const [exitLoadPercentage, setExitLoadPercentage] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [switchDate, setSwitchDate] = useState<string>('');
  const [calculation, setCalculation] = useState<SwitchMFCalculation | null>(null);

  const calculateSwitchTax = () => {
    if (!currentValue || !originalInvestment || !exitLoadPercentage || !purchaseDate || !switchDate) {
      alert('Please fill in all fields');
      return;
    }

    const current = parseFloat(currentValue);
    const original = parseFloat(originalInvestment);
    const exitLoad = parseFloat(exitLoadPercentage);
    
    const purchase = new Date(purchaseDate);
    const switchDateObj = new Date(switchDate);
    const holdingPeriod = Math.floor((switchDateObj.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24));
    
    const capitalGain = current - original;
    const exitLoadAmount = (current * exitLoad) / 100;
    const stt = current * 0.001; // 0.1% STT
    const totalCharges = exitLoadAmount + stt;
    
    let taxRate: number;
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (capitalGain <= 0) {
      taxRate = 0;
      recommendation = 'No capital gains tax - Loss or no gain';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (holdingPeriod <= 365) {
      taxRate = 15; // STCG
      recommendation = 'Short-term capital gains tax applies';
      color = 'text-orange-600';
      icon = <AlertCircle className="h-5 w-5" />;
    } else {
      taxRate = 10; // LTCG with 1L exemption
      const taxableAmount = Math.max(0, capitalGain - 100000);
      recommendation = 'Long-term capital gains tax with ₹1L exemption';
      color = 'text-blue-600';
      icon = <Info className="h-5 w-5" />;
    }
    
    const taxAmount = capitalGain > 0 ? (capitalGain * taxRate) / 100 : 0;
    const netAmount = current - totalCharges - taxAmount;

    setCalculation({
      currentValue: current,
      originalInvestment: original,
      exitLoad: exitLoadAmount,
      stt,
      capitalGain,
      holdingPeriod,
      taxRate,
      taxAmount,
      totalCharges,
      netAmount,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setCurrentValue('');
    setOriginalInvestment('');
    setExitLoadPercentage('');
    setPurchaseDate('');
    setSwitchDate('');
    setCalculation(null);
  };

  return (
    <>
      <SEOHelmet
        title="Switch MF Tax Calculator - Calculate Tax on Mutual Fund Switching | MoneyCal"
        description="Calculate tax implications when switching between mutual funds. Determine exit load, STT, and capital gains tax with our comprehensive switch MF tax calculator."
        keywords="switch MF tax Calculator, mutual fund switching tax, exit load Calculator, STT Calculator, capital gains tax, mutual fund tax"
      />
      <WhatsAppBanner />

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
                Switch MF Tax Calculator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate tax implications when switching between mutual funds including exit load and capital gains
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
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Mutual Fund Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Value (₹)
                    </label>
                    <input
                      type="number"
                      value={currentValue}
                      onChange={(e) => setCurrentValue(e.target.value)}
                      placeholder="Enter current fund value"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={originalInvestment}
                      onChange={(e) => setOriginalInvestment(e.target.value)}
                      placeholder="Enter original investment amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exit Load (%)
                    </label>
                    <input
                      type="number"
                      value={exitLoadPercentage}
                      onChange={(e) => setExitLoadPercentage(e.target.value)}
                      placeholder="Enter exit load percentage"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Switch Date
                    </label>
                    <input
                      type="date"
                      value={switchDate}
                      onChange={(e) => setSwitchDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateSwitchTax}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Tax
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
                  Tax Analysis
                </h2>

                {calculation ? (
                  <div className="space-y-6">
                    {/* Recommendation */}
                    <div className={`text-center p-4 rounded-lg ${calculation.color.includes('green') ? 'bg-green-50 border border-green-200' : calculation.color.includes('orange') ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${calculation.color}`}>
                        {calculation.icon}
                        <span className="ml-2 text-lg font-bold">Tax Status</span>
                      </div>
                      <p className="text-sm text-gray-600">{calculation.recommendation}</p>
                    </div>

                    {/* Fund Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Fund Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Current Value:</span>
                          <span className="font-bold text-gray-600">₹{calculation.currentValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Original Investment:</span>
                          <span className="font-bold text-gray-600">₹{calculation.originalInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Holding Period:</span>
                          <span className="font-bold text-gray-600">{calculation.holdingPeriod} days</span>
                        </div>
                      </div>
                    </div>

                    {/* Charges Breakdown */}
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        Charges & Fees
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Exit Load:</span>
                          <span className="font-bold text-red-600">₹{calculation.exitLoad.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">STT (0.1%):</span>
                          <span className="font-bold text-red-600">₹{calculation.stt.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Total Charges:</span>
                          <span className="font-bold text-red-600">₹{calculation.totalCharges.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Capital Gains */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Capital Gains & Tax
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Capital Gain:</span>
                          <span className={`font-bold ${calculation.capitalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{calculation.capitalGain.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Rate:</span>
                          <span className="font-bold text-purple-600">{calculation.taxRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Amount:</span>
                          <span className="font-bold text-purple-600">₹{calculation.taxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Amount:</span>
                          <span className="font-bold text-purple-600">₹{calculation.netAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <RefreshCw className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter mutual fund details to calculate switch tax</p>
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
                Understanding Mutual Fund Switching Tax
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <RefreshCw className="h-5 w-5 mr-2" />
                    What is Fund Switching?
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Moving from one fund to another</li>
                    <li>• Usually within the same fund house</li>
                    <li>• May involve exit load charges</li>
                    <li>• Subject to capital gains tax</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <IndianRupee className="h-5 w-5 mr-2" />
                    Tax Implications
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Exit load (if applicable)</li>
                    <li>• Securities Transaction Tax (STT)</li>
                    <li>• Capital gains tax (STCG/LTCG)</li>
                    <li>• Holding period determines tax rate</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Considerations
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Exit load varies by fund and holding period</li>
                  <li>• STT is 0.1% on redemption value</li>
                  <li>• STCG: 15% if held &le; 1 year</li>
                  <li>• LTCG: 10% with ₹1L exemption if held &gt; 1 year</li>
                  <li>• Consider total cost before switching</li>
                </ul>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Related Mutual Fund Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/tax-tools/mutual-fund-exit-load-checker" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Exit Load Checker</span>
                    <p className="text-sm text-purple-600">Check exit load charges</p>
                  </a>
                  <a href="/tax-tools/stcg-ltcg-classifier" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">STCG vs LTCG</span>
                    <p className="text-sm text-purple-600">Determine capital gains category</p>
                  </a>
                  <a href="/tax-tools/debt-fund-tax-calculator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Debt Fund Tax</span>
                    <p className="text-sm text-purple-600">Calculate debt fund tax</p>
                  </a>
                  <a href="/tax-tools/equity-tax-estimator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Equity Tax Estimator</span>
                    <p className="text-sm text-purple-600">Calculate equity tax by year</p>
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

export default SwitchMFTaxCalculator;

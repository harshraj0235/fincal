import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, AlertCircle, TrendingUp, TrendingDown, DollarSign, Clock, BarChart3 } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
interface TaxComparison {
  intradayTax: number;
  deliveryTax: number;
  taxDifference: number;
  recommendation: string;
  explanation: string;
  advantages: string[];
  disadvantages: string[];
}

const IntradayVsDeliveryTaxCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [result, setResult] = useState<TaxComparison | null>(null);

  const calculateTax = () => {
    if (!purchasePrice || !salePrice || !quantity) {
      alert('Please fill in all required fields');
      return;
    }

    const purchase = parseFloat(purchasePrice);
    const sale = parseFloat(salePrice);
    const qty = parseInt(quantity);
    const otherInc = parseFloat(otherIncome) || 0;

    const profit = (sale - purchase) * qty;
    const totalIncome = profit + otherInc;

    // Intraday trading (STCG) - 20% flat rate (Budget 2024)
    const intradayTax = profit * 0.20;

    // Delivery trading - depends on holding period
    let deliveryTax = 0;
    let recommendation = '';
    let explanation = '';
    let advantages: string[] = [];
    let disadvantages: string[] = [];

    if (profit > 0) {
      // For delivery, we assume it's STCG (less than 1 year) for comparison
      // In reality, delivery could be LTCG if held for more than 1 year (12.5% + ₹1.25L exemption)
      deliveryTax = profit * 0.20; // Same as intraday for STCG (Budget 2024)
      
      if (intradayTax < deliveryTax) {
        recommendation = 'Intraday Trading';
        explanation = 'Intraday trading has lower tax burden in this scenario';
        advantages = [
          'Lower tax burden',
          'No overnight risk',
          'Quick profit realization',
          'No margin requirements for delivery'
        ];
        disadvantages = [
          'Higher brokerage costs',
          'Requires constant monitoring',
          'Limited to same day',
          'Higher risk due to leverage'
        ];
      } else {
        recommendation = 'Delivery Trading';
        explanation = 'Delivery trading is more tax-efficient in this scenario';
        advantages = [
          'Potential for LTCG benefits',
          'Lower brokerage costs',
          'No time pressure',
          'Can hold for long-term gains'
        ];
        disadvantages = [
          'Overnight market risk',
          'Requires more capital',
          'Longer holding period needed',
          'Higher tax if STCG'
        ];
      }
    } else {
      // Loss scenario
      recommendation = 'Both have similar tax treatment for losses';
      explanation = 'Losses can be carried forward for 8 years in both cases';
      advantages = [
        'Losses can be carried forward',
        'Can be set off against future gains',
        'No immediate tax liability'
      ];
      disadvantages = [
        'No immediate tax benefit',
        'Requires proper documentation',
        'Must file ITR to carry forward'
      ];
    }

    setResult({
      intradayTax,
      deliveryTax,
      taxDifference: Math.abs(intradayTax - deliveryTax),
      recommendation,
      explanation,
      advantages,
      disadvantages
    });
  };

  const resetForm = () => {
    setPurchasePrice('');
    setSalePrice('');
    setQuantity('');
    setOtherIncome('');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Intraday vs Delivery Tax Calculator - Compare Trading Tax Implications | MoneyCal"
        description="Compare tax implications between intraday and delivery trading. Calculate tax differences and get recommendations for optimal trading strategy."
        keywords="intraday vs delivery tax calculator, trading tax comparison, STCG tax calculator, stock trading tax, capital gains tax"
      />
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
                Intraday vs Delivery Tax Calculator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Compare tax implications between intraday and delivery trading strategies
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
                  Trade Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Price (₹)
                    </label>
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      placeholder="Enter purchase price per share"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Price (₹)
                    </label>
                    <input
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="Enter sale price per share"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity (Shares)
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter number of shares"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Income (₹) - Optional
                    </label>
                    <input
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(e.target.value)}
                      placeholder="Enter other income for context"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTax}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Compare Tax
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
                  Tax Comparison
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Tax Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-red-600 mx-auto mb-2" />
                        <p className="text-sm text-red-600">Intraday Tax</p>
                        <p className="text-xl font-bold text-red-900">₹{result.intradayTax.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <TrendingDown className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Delivery Tax</p>
                        <p className="text-xl font-bold text-blue-900">₹{result.deliveryTax.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                      <h3 className="font-semibold text-green-900 mb-2">Recommendation</h3>
                      <p className="text-green-800 font-bold">{result.recommendation}</p>
                      <p className="text-sm text-green-700 mt-2">{result.explanation}</p>
                    </div>

                    {/* Tax Difference */}
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-purple-600">Tax Difference</p>
                      <p className="text-2xl font-bold text-purple-900">₹{result.taxDifference.toLocaleString()}</p>
                    </div>

                    {/* Advantages and Disadvantages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Advantages
                        </h3>
                        <ul className="space-y-1">
                          {result.advantages.map((adv, index) => (
                            <li key={index} className="text-sm text-green-700">• {adv}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-red-900 mb-3 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Disadvantages
                        </h3>
                        <ul className="space-y-1">
                          {result.disadvantages.map((dis, index) => (
                            <li key={index} className="text-sm text-red-700">• {dis}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter trade details to compare tax implications</p>
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
                Understanding Intraday vs Delivery Tax
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Intraday Trading
                  </h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Always treated as STCG</li>
                    <li>• 15% flat tax rate</li>
                    <li>• No holding period benefits</li>
                    <li>• Higher brokerage costs</li>
                    <li>• Same day buy and sell</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Delivery Trading
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• STCG if held &lt; 1 year</li>
                    <li>• LTCG if held &gt; 1 year</li>
                    <li>• 10% tax on LTCG (₹1L exemption)</li>
                    <li>• Lower brokerage costs</li>
                    <li>• Can hold for long term</li>
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
                  <li>• Consult a tax professional for accurate advice</li>
                  <li>• Tax rates may vary based on income slab</li>
                  <li>• Consider brokerage and other costs in decision</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IntradayVsDeliveryTaxCalculator;

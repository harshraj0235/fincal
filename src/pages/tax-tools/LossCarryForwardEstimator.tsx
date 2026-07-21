import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Info, AlertCircle, TrendingDown, Calendar } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import CalculatorSchema from '../../components/CalculatorSchema';


interface LossResult {
  currentYearLoss: number;
  carriedForwardLoss: number;
  totalLoss: number;
  description: string;
  carryForwardYears: number;
}

const LossCarryForwardEstimator: React.FC = () => {
  const [currentYearLoss, setCurrentYearLoss] = useState('');
  const [previousYearLoss, setPreviousYearLoss] = useState('');
  const [lossType, setLossType] = useState<'stcg' | 'ltcg'>('stcg');
  const [result, setResult] = useState<LossResult | null>(null);

  const calculateLoss = () => {
    if (!currentYearLoss) {
      alert('Please enter current year loss');
      return;
    }

    const currentLoss = parseFloat(currentYearLoss);
    const previousLoss = parseFloat(previousYearLoss) || 0;
    const totalLoss = currentLoss + previousLoss;

    let description = '';
    let carryForwardYears = 0;

    if (lossType === 'stcg') {
      // Short Term Capital Loss can be carried forward for 8 years
      carryForwardYears = 8;
      description = 'Short Term Capital Loss - Can be carried forward for 8 years';
    } else {
      // Long Term Capital Loss can be carried forward for 8 years
      carryForwardYears = 8;
      description = 'Long Term Capital Loss - Can be carried forward for 8 years';
    }

    setResult({
      currentYearLoss: currentLoss,
      carriedForwardLoss: previousLoss,
      totalLoss: totalLoss,
      description: description,
      carryForwardYears: carryForwardYears
    });
  };

  const resetForm = () => {
    setCurrentYearLoss('');
    setPreviousYearLoss('');
    setLossType('stcg');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Loss Carry Forward Estimator - Calculate Capital Loss Carry Forward | MoneyCal"
        description="Calculate and track capital loss carry forward. Understand how to carry forward STCG and LTCG losses for tax optimization."
        keywords="loss carry forward Calculator, capital loss carry forward, STCG loss, LTCG loss, tax loss optimization"
      />
      <CalculatorSchema 
        name="Loss Carry Forward Estimator"
        description="Calculate and track capital loss carry forward. Understand how to carry forward STCG and LTCG losses for tax optimization."
        url="/tax-tools/loss-carry-forward"
        features={['STCG Loss Tracking', 'LTCG Loss Tracking', 'Carry Forward Analysis', 'Tax Saving Estimator']}
        category="FinanceApplication"
        faqData={[
          {
            question: 'How long can capital losses be carried forward?',
            answer: 'Both Short Term and Long Term Capital Losses can be carried forward for 8 assessment years.'
          },
          {
            question: 'Can STCG loss be set off against LTCG?',
            answer: 'Yes, Short Term Capital Loss can be set off against both STCG and LTCG.'
          },
          {
            question: 'Can LTCG loss be set off against STCG?',
            answer: 'No, Long Term Capital Loss can only be set off against Long Term Capital Gains.'
          }
        ]}
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
                Loss Carry Forward Estimator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate and track capital loss carry forward for tax optimization
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
                  Loss Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loss Type
                    </label>
                    <select
                      value={lossType}
                      onChange={(e) => setLossType(e.target.value as 'stcg' | 'ltcg')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="stcg">Short Term Capital Loss (STCG)</option>
                      <option value="ltcg">Long Term Capital Loss (LTCG)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Year Loss (₹)
                    </label>
                    <input
                      type="number"
                      value={currentYearLoss}
                      onChange={(e) => setCurrentYearLoss(e.target.value)}
                      placeholder="Enter current year loss"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous Year Carried Forward Loss (₹)
                    </label>
                    <input
                      type="number"
                      value={previousYearLoss}
                      onChange={(e) => setPreviousYearLoss(e.target.value)}
                      placeholder="Enter previous year loss (optional)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateLoss}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Loss
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
                  Loss Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Loss Type Badge */}
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-red-600">Loss Type</p>
                      <p className="text-xl font-bold text-red-900">{lossType.toUpperCase()} Loss</p>
                    </div>

                    {/* Loss Calculation */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">Current Year Loss:</span>
                        <span className="font-bold text-red-600">₹{result.currentYearLoss.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="text-gray-700">Carried Forward Loss:</span>
                        <span className="font-bold text-orange-600">₹{result.carriedForwardLoss.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border-2 border-purple-300">
                        <span className="text-gray-700 font-semibold">Total Loss:</span>
                        <span className="font-bold text-purple-600">₹{result.totalLoss.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Carry Forward Info */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="font-semibold text-blue-900">Carry Forward Period</span>
                      </div>
                      <p className="text-blue-700">{result.carryForwardYears} years</p>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">{result.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IndianRupee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter loss details to calculate carry forward</p>
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
                Understanding Loss Carry Forward
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                    <TrendingDown className="h-5 w-5 mr-2" />
                    Short Term Capital Loss
                  </h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Can be carried forward for 8 years</li>
                    <li>• Can be set off against STCG</li>
                    <li>• Can be set off against LTCG</li>
                    <li>• Must be filed in ITR</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <TrendingDown className="h-5 w-5 mr-2" />
                    Long Term Capital Loss
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Can be carried forward for 8 years</li>
                    <li>• Can be set off against LTCG only</li>
                    <li>• Cannot be set off against STCG</li>
                    <li>• Must be filed in ITR</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Losses can be carried forward for 8 assessment years</li>
                  <li>• Must file ITR to carry forward losses</li>
                  <li>• Losses lapse if not utilized within 8 years</li>
                  <li>• Consult a tax professional for proper utilization</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LossCarryForwardEstimator;

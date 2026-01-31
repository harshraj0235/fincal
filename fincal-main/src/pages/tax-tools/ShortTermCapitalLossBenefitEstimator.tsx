import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, AlertCircle, TrendingDown, DollarSign, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface LossBenefit {
  currentYearLoss: number;
  carriedForwardLoss: number;
  totalLoss: number;
  taxBenefit: number;
  carryForwardYears: number;
  recommendations: string[];
  benefits: string[];
  limitations: string[];
}

const ShortTermCapitalLossBenefitEstimator: React.FC = () => {
  const [currentYearLoss, setCurrentYearLoss] = useState('');
  const [previousYearLoss, setPreviousYearLoss] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<LossBenefit | null>(null);

  const calculateBenefit = () => {
    if (!currentYearLoss) {
      alert('Please enter current year loss');
      return;
    }

    const currentLoss = parseFloat(currentYearLoss);
    const previousLoss = parseFloat(previousYearLoss) || 0;
    const otherInc = parseFloat(otherIncome) || 0;
    const slabRate = parseInt(incomeSlab) / 100;

    const totalLoss = currentLoss + previousLoss;
    
    // Calculate tax benefit (potential tax saved if loss was gain)
    const taxBenefit = totalLoss * slabRate;
    
    const carryForwardYears = 8; // STCG losses can be carried forward for 8 years

    const recommendations: string[] = [];
    const benefits: string[] = [];
    const limitations: string[] = [];

    if (currentLoss > 0) {
      recommendations.push('File ITR to carry forward the loss for 8 years');
      recommendations.push('Can be set off against future STCG and LTCG');
      recommendations.push('Maintain proper documentation of losses');
    }

    if (previousLoss > 0) {
      recommendations.push('Utilize carried forward loss against current year gains');
      recommendations.push('Check if loss is still within 8-year limit');
    }

    if (totalLoss > otherInc) {
      recommendations.push('Consider timing of gains to maximize loss utilization');
    }

    benefits.push('Can be carried forward for 8 assessment years');
    benefits.push('Can be set off against both STCG and LTCG');
    benefits.push('No limit on amount that can be carried forward');
    benefits.push('Helps reduce tax liability in future years');

    limitations.push('Must file ITR to carry forward losses');
    limitations.push('Losses lapse after 8 years if not utilized');
    limitations.push('Cannot be set off against salary or business income');
    limitations.push('Requires proper documentation and proof');

    setResult({
      currentYearLoss: currentLoss,
      carriedForwardLoss: previousLoss,
      totalLoss,
      taxBenefit,
      carryForwardYears,
      recommendations,
      benefits,
      limitations
    });
  };

  const resetForm = () => {
    setCurrentYearLoss('');
    setPreviousYearLoss('');
    setOtherIncome('');
    setIncomeSlab('30');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Short-Term Capital Loss Benefit Estimator - Calculate STCG Loss Benefits | MoneyCal"
        description="Calculate benefits of short-term capital losses and their carry forward potential. Understand tax optimization strategies for STCG losses."
        keywords="STCG loss calculator, capital loss benefit, loss carry forward, tax optimization, short term capital gains loss"
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
                Short-Term Capital Loss Benefit Estimator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate benefits of STCG losses and optimize your tax strategy
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
                  Loss Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Year STCG Loss (₹)
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Income Tax Slab (%)
                    </label>
                    <select
                      value={incomeSlab}
                      onChange={(e) => setIncomeSlab(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="5">5% (Up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L - ₹5L)</option>
                      <option value="30">30% (Above ₹5L)</option>
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateBenefit}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Benefits
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
                  Loss Benefit Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Loss Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
                        <p className="text-sm text-red-600">Total Loss</p>
                        <p className="text-xl font-bold text-red-900">₹{result.totalLoss.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-600">Tax Benefit</p>
                        <p className="text-xl font-bold text-green-900">₹{result.taxBenefit.toLocaleString()}</p>
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

                    {/* Loss Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">Current Year Loss:</span>
                        <span className="font-bold text-red-600">₹{result.currentYearLoss.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="text-gray-700">Carried Forward Loss:</span>
                        <span className="font-bold text-orange-600">₹{result.carriedForwardLoss.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-yellow-700 flex items-start">
                            <CheckCircle className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter loss details to calculate benefits</p>
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
                Understanding STCG Loss Benefits
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Benefits
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• 8-year carry forward period</li>
                    <li>• Can be set off against STCG</li>
                    <li>• Can be set off against LTCG</li>
                    <li>• No limit on carry forward amount</li>
                    <li>• Helps reduce future tax liability</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Limitations
                  </h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Must file ITR to carry forward</li>
                    <li>• Cannot set off against salary</li>
                    <li>• Cannot set off against business income</li>
                    <li>• Losses lapse after 8 years</li>
                    <li>• Requires proper documentation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Important Rules
                </h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• STCG losses can be carried forward for 8 assessment years</li>
                  <li>• Must file ITR within due date to carry forward losses</li>
                  <li>• Can be set off against both STCG and LTCG in future years</li>
                  <li>• No limit on the amount that can be carried forward</li>
                  <li>• Losses lapse if not utilized within 8 years</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShortTermCapitalLossBenefitEstimator;

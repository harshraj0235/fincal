import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, TrendingUp, Shield } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface NPSResult {
  taxBenefit: number;
  growthBenefit: number;
  totalBenefit: number;
  recommendation: string;
}

const NPSTaxBenefitVsGrowthEstimator: React.FC = () => {
  const [investment, setInvestment] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  const [years, setYears] = useState('');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<NPSResult | null>(null);

  const calculateBenefits = () => {
    if (!investment || !growthRate || !years) {
      alert('Please fill in all fields');
      return;
    }

    const inv = parseFloat(investment);
    const growth = parseFloat(growthRate) / 100;
    const y = parseInt(years);
    const slabRate = parseInt(incomeSlab) / 100;

    // Tax benefit (Section 80CCD(1B) - ₹50,000)
    const taxBenefit = Math.min(inv, 50000) * slabRate;
    
    // Growth benefit
    const futureValue = inv * Math.pow(1 + growth, y);
    const growthBenefit = futureValue - inv;
    
    const totalBenefit = taxBenefit + growthBenefit;
    
    const recommendation = taxBenefit > growthBenefit 
      ? 'Tax benefits are more significant than growth benefits'
      : 'Growth benefits outweigh tax benefits';

    setResult({
      taxBenefit,
      growthBenefit,
      totalBenefit,
      recommendation
    });
  };

  const resetForm = () => {
    setInvestment('');
    setGrowthRate('');
    setYears('');
    setIncomeSlab('30');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="NPS Tax Benefit vs Growth Estimator - NPS Calculator | MoneyCal"
        description="Compare tax benefits vs growth benefits of NPS investments."
        keywords="NPS calculator, NPS tax benefit, pension scheme calculator"
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
                NPS Tax Benefit vs Growth Estimator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Compare tax benefits vs growth benefits of NPS
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
                  NPS Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={investment}
                      onChange={(e) => setInvestment(e.target.value)}
                      placeholder="Enter investment amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Growth Rate (%)
                    </label>
                    <input
                      type="number"
                      value={growthRate}
                      onChange={(e) => setGrowthRate(e.target.value)}
                      placeholder="Enter expected growth rate"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period (Years)
                    </label>
                    <input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      placeholder="Enter investment period"
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
                      onClick={calculateBenefits}
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

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  Benefits Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Tax Benefit</p>
                        <p className="text-xl font-bold text-blue-900">₹{result.taxBenefit.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-600">Growth Benefit</p>
                        <p className="text-xl font-bold text-green-900">₹{result.growthBenefit.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                      <h3 className="font-semibold text-purple-900 mb-2">Total Benefit</h3>
                      <p className="text-lg font-bold text-purple-600">₹{result.totalBenefit.toLocaleString()}</p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-2">Recommendation</h3>
                      <p className="text-yellow-800">{result.recommendation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter NPS details to calculate benefits</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NPSTaxBenefitVsGrowthEstimator;

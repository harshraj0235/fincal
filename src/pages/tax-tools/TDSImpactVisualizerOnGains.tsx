import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, TrendingUp, Eye, BarChart3 } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface TDSImpactResult {
  grossGain: number;
  tdsRate: number;
  tdsAmount: number;
  netGain: number;
  effectiveTaxRate: number;
  impactPercentage: number;
}

const TDSImpactVisualizerOnGains: React.FC = () => {
  const [grossGain, setGrossGain] = useState('');
  const [tdsRate, setTdsRate] = useState('10');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<TDSImpactResult | null>(null);

  const calculateTDSImpact = () => {
    if (!grossGain) {
      alert('Please enter gross gain amount');
      return;
    }

    const gain = parseFloat(grossGain);
    const tdsRatePercent = parseFloat(tdsRate) / 100;
    const slabRate = parseInt(incomeSlab) / 100;

    const tdsAmount = gain * tdsRatePercent;
    const netGain = gain - tdsAmount;
    
    // Calculate effective tax rate (TDS + final tax liability)
    const finalTaxLiability = gain * slabRate;
    const effectiveTaxRate = ((tdsAmount + finalTaxLiability) / gain) * 100;
    const impactPercentage = (tdsAmount / gain) * 100;

    setResult({
      grossGain: gain,
      tdsRate: tdsRatePercent * 100,
      tdsAmount,
      netGain,
      effectiveTaxRate,
      impactPercentage
    });
  };

  const resetForm = () => {
    setGrossGain('');
    setTdsRate('10');
    setIncomeSlab('30');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="TDS Impact Visualizer on Gains - Understand TDS Effect on Capital Gains | MoneyCal"
        description="Visualize how TDS affects your capital gains and understand the real impact on your returns."
        keywords="TDS impact calculator, capital gains TDS, tax deduction at source, gains visualization"
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
                TDS Impact Visualizer on Gains
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Visualize how TDS affects your capital gains
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
                  Gain Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gross Capital Gain (₹)
                    </label>
                    <input
                      type="number"
                      value={grossGain}
                      onChange={(e) => setGrossGain(e.target.value)}
                      placeholder="Enter gross capital gain"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TDS Rate (%)
                    </label>
                    <select
                      value={tdsRate}
                      onChange={(e) => setTdsRate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="1">1% (Securities Transaction Tax)</option>
                      <option value="10">10% (Standard TDS)</option>
                      <option value="15">15% (STCG TDS)</option>
                      <option value="20">20% (Higher TDS)</option>
                    </select>
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
                      onClick={calculateTDSImpact}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Visualize Impact
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
                  TDS Impact Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Gross Gain</p>
                        <p className="text-xl font-bold text-blue-900">₹{result.grossGain.toLocaleString()}</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <Eye className="h-8 w-8 text-red-600 mx-auto mb-2" />
                        <p className="text-sm text-red-600">TDS Amount</p>
                        <p className="text-xl font-bold text-red-900">₹{result.tdsAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">TDS Rate:</span>
                        <span className="font-bold text-gray-900">{result.tdsRate}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">Net Gain:</span>
                        <span className="font-bold text-green-600">₹{result.netGain.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-700">Effective Tax Rate:</span>
                        <span className="font-bold text-purple-600">{result.effectiveTaxRate.toFixed(1)}%</span>
                      </div>
                    </div>

                    {/* Visual Bar Chart */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Impact Visualization
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600 w-16">Gross:</span>
                          <div className="flex-1 bg-blue-200 h-4 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: '100%' }}></div>
                          </div>
                          <span className="text-xs text-gray-600 ml-2">100%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600 w-16">TDS:</span>
                          <div className="flex-1 bg-red-200 h-4 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full rounded-full" style={{ width: `${result.impactPercentage}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-600 ml-2">{result.impactPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600 w-16">Net:</span>
                          <div className="flex-1 bg-green-200 h-4 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full" style={{ width: `${100 - result.impactPercentage}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-600 ml-2">{(100 - result.impactPercentage).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-2">Key Insights</h3>
                      <ul className="space-y-1 text-sm text-yellow-800">
                        <li>• TDS reduces your immediate cash flow by ₹{result.tdsAmount.toLocaleString()}</li>
                        <li>• You can claim TDS credit while filing ITR</li>
                        <li>• Effective tax burden: {result.effectiveTaxRate.toFixed(1)}%</li>
                        <li>• Net gain after TDS: ₹{result.netGain.toLocaleString()}</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter gain details to visualize TDS impact</p>
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

export default TDSImpactVisualizerOnGains;

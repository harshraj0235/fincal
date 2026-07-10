import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Info, TrendingDown, TrendingUp, DollarSign, Shield } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface LossHarvestingResult {
  totalLoss: number;
  taxBenefit: number;
  netSavings: number;
  washSalePeriod: string;
  recommendations: string[];
}

const TaxLossHarvestingCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [holdingPeriod, setHoldingPeriod] = useState('');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<LossHarvestingResult | null>(null);

  const calculateLossHarvesting = () => {
    if (!investmentAmount || !currentValue || !holdingPeriod) {
      alert('Please fill in all fields');
      return;
    }

    const invested = parseFloat(investmentAmount);
    const current = parseFloat(currentValue);
    const holding = parseInt(holdingPeriod);
    const slabRate = parseInt(incomeSlab) / 100;

    const totalLoss = invested - current;
    const taxBenefit = totalLoss * slabRate;
    const netSavings = taxBenefit;

    const recommendations = [];
    if (totalLoss > 0) {
      recommendations.push('Consider selling the investment to realize the loss');
      recommendations.push('Wait 30 days before repurchasing to avoid wash sale rules');
      recommendations.push('Use the loss to offset capital gains');
      recommendations.push('Consider reinvesting in a similar but not identical security');
    } else {
      recommendations.push('No loss to harvest at current market value');
      recommendations.push('Consider holding for potential recovery');
      recommendations.push('Monitor for future loss harvesting opportunities');
    }

    setResult({
      totalLoss,
      taxBenefit,
      netSavings,
      washSalePeriod: '30 days',
      recommendations
    });
  };

  const resetForm = () => {
    setInvestmentAmount('');
    setCurrentValue('');
    setHoldingPeriod('');
    setIncomeSlab('30');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Tax Loss Harvesting Calculator - Optimize Your Tax Strategy | MoneyCal"
        description="Calculate tax benefits from loss harvesting. Learn how to offset capital gains with investment losses and optimize your tax strategy."
        keywords="tax loss harvesting, capital loss, investment loss, tax optimization, wash sale rules, tax strategy"
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
                Tax Loss Harvesting Calculator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Optimize your tax strategy by harvesting investment losses
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
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Investment Details
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
                      placeholder="Enter original investment amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Market Value (₹)
                    </label>
                    <input
                      type="number"
                      value={currentValue}
                      onChange={(e) => setCurrentValue(e.target.value)}
                      placeholder="Enter current market value"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Holding Period (Days)
                    </label>
                    <input
                      type="number"
                      value={holdingPeriod}
                      onChange={(e) => setHoldingPeriod(e.target.value)}
                      placeholder="Enter holding period in days"
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
                      onClick={calculateLossHarvesting}
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

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-3">Related Tax Tools</h3>
                    <div className="space-y-2 text-sm">
                      <a href="/tax-tools/stcg-ltcg-classifier" className="block text-blue-700 hover:text-blue-900">
                        • STCG vs LTCG Classifier
                      </a>
                      <a href="/tax-tools/short-term-capital-loss-benefit-estimator" className="block text-blue-700 hover:text-blue-900">
                        • Short Term Capital Loss Benefit Estimator
                      </a>
                      <a href="/tax-tools/loss-carry-forward-estimator" className="block text-blue-700 hover:text-blue-900">
                        • Loss Carry Forward Estimator
                      </a>
                      <a href="/tax-tools/equity-tax-estimator" className="block text-blue-700 hover:text-blue-900">
                        • Equity Tax Estimator
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
                  Loss Harvesting Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
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

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-700">Net Tax Savings:</span>
                        <span className="font-bold text-purple-600">₹{result.netSavings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">Wash Sale Period:</span>
                        <span className="font-bold text-blue-600">{result.washSalePeriod}</span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-3">Recommendations</h3>
                      <ul className="space-y-2 text-sm text-yellow-800">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-yellow-600 mr-2">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">SEO Optimized Content</h3>
                      <div className="text-sm text-blue-800 space-y-2">
                        <p><strong>Tax Loss Harvesting Strategy:</strong> Realize investment losses to offset capital gains and reduce your tax liability. Use our <a href="/tax-tools/stcg-ltcg-classifier" className="underline">STCG vs LTCG Classifier</a> to understand your gains category.</p>
                        <p><strong>Wash Sale Rules:</strong> Avoid repurchasing the same security within 30 days to maintain tax benefits. Consider using our <a href="/tax-tools/short-term-capital-loss-benefit-estimator" className="underline">Capital Loss Benefit Estimator</a> for detailed analysis.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IndianRupee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter investment details to calculate loss harvesting benefits</p>
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
                Complete Guide to Tax Loss Harvesting
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <h3>What is Tax Loss Harvesting?</h3>
                <p>
                  Tax loss harvesting is a strategy that involves selling investments at a loss to offset capital gains 
                  and reduce your tax liability. This technique can help you optimize your tax situation while maintaining 
                  your investment strategy. Use our <a href="/tax-tools/stcg-ltcg-classifier" className="text-blue-600 hover:text-blue-800">STCG vs LTCG Classifier</a> 
                  to understand how your losses can offset different types of gains.
                </p>

                <h3>Benefits of Tax Loss Harvesting</h3>
                <ul>
                  <li>Offset capital gains with investment losses</li>
                  <li>Reduce overall tax liability</li>
                  <li>Maintain investment strategy</li>
                  <li>Improve after-tax returns</li>
                  <li>Create tax-efficient portfolios</li>
                </ul>

                <h3>Wash Sale Rules</h3>
                <p>
                  The wash sale rule prevents you from claiming a loss if you repurchase the same or substantially 
                  identical security within 30 days. Use our <a href="/tax-tools/short-term-capital-loss-benefit-estimator" className="text-blue-600 hover:text-blue-800">Capital Loss Benefit Estimator</a> 
                  to understand the impact of wash sale rules on your tax strategy.
                </p>

                <h3>Related Tax Tools</h3>
                <p>
                  Enhance your tax optimization strategy with our comprehensive suite of calculators:
                </p>
                <ul>
                  <li><a href="/tax-tools/stcg-ltcg-classifier" className="text-blue-600 hover:text-blue-800">STCG vs LTCG Classifier</a> - Determine your capital gains category</li>
                  <li><a href="/tax-tools/short-term-capital-loss-benefit-estimator" className="text-blue-600 hover:text-blue-800">Capital Loss Benefit Estimator</a> - Calculate loss benefits</li>
                  <li><a href="/tax-tools/loss-carry-forward-estimator" className="text-blue-600 hover:text-blue-800">Loss Carry Forward Estimator</a> - Plan future tax benefits</li>
                  <li><a href="/tax-tools/equity-tax-estimator" className="text-blue-600 hover:text-blue-800">Equity Tax Estimator</a> - Calculate equity investment taxes</li>
                </ul>

                <h3>Tax Loss Harvesting Strategy</h3>
                <ol>
                  <li>Identify investments with unrealized losses</li>
                  <li>Calculate potential tax benefits</li>
                  <li>Consider wash sale rules</li>
                  <li>Plan replacement investments</li>
                  <li>Monitor for future opportunities</li>
                  <li>Use our calculators for accurate estimates</li>
                </ol>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TaxLossHarvestingCalculator;

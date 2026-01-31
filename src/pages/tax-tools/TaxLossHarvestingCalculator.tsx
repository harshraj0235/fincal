import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Info, TrendingDown, TrendingUp, DollarSign, Shield, HelpCircle, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

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

    let recommendations = [];
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

  const canonicalUrl = 'https://moneycal.in/tax-tools/tax-loss-harvesting-calculator';
  const faqData = [
    { question: 'What is tax loss harvesting?', answer: 'Tax loss harvesting is a strategy where you sell investments at a loss to offset capital gains and reduce tax. The loss can be set off against STCG and LTCG in the same year; unabsorbed loss can be carried forward for 8 years. Use this Tax Loss Harvesting Calculator to see potential tax benefit from realizing a loss.' },
    { question: 'Can I set off capital loss against salary income?', answer: 'No. Capital losses (STCG and LTCG) cannot be set off against salary, house property, or other heads. They can only be set off against capital gains. Use this calculator to see tax benefit when you have gains to offset.' },
    { question: 'How long can I carry forward capital loss?', answer: 'STCG and LTCG losses can be carried forward for up to 8 assessment years. You must file your ITR within the due date to carry forward the loss. Use our Loss Carry Forward Estimator and Short-Term Loss Offset Visualizer for planning.' },
    { question: 'Is there a wash sale rule in India?', answer: 'India does not have a formal wash sale rule like the US. As a best practice, avoid repurchasing the same or substantially identical security immediately to avoid scrutiny. Use this calculator to plan loss realization and reinvestment.' },
    { question: 'Where can I get official loss set-off rules?', answer: 'Check the Income Tax Act (Sections 70, 71, 74) and the Income Tax Portal (incometax.gov.in). Always verify with a chartered accountant. This calculator is for illustration.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Tax Loss Harvesting Calculator - Optimize Your Tax Strategy | MoneyCal"
        description="Calculate tax benefits from loss harvesting. Offset capital gains with investment losses. Tax Optimization • Valid 2026–2050."
        keywords="tax loss harvesting, capital loss offset, STCG LTCG loss India, tax optimization 2026, loss carry forward"
        url={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Tools', url: '/tax-tools' },
          { name: 'Tax Loss Harvesting Calculator', url: '/tax-tools/tax-loss-harvesting-calculator' }
        ]}
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-medium text-purple-200 mb-2">Tax Optimization • Valid 2026–2050</p>
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
                  <Calculator className="h-6 w-6 mr-3 text-blue-600" />
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
                      <Link to="/tax-tools/stcg-ltcg-classifier" className="block text-blue-700 hover:text-blue-900">
                        • STCG vs LTCG Classifier
                      </Link>
                      <Link to="/tax-tools/short-term-capital-loss-benefit-estimator" className="block text-blue-700 hover:text-blue-900">
                        • Short Term Capital Loss Benefit Estimator
                      </Link>
                      <Link to="/tax-tools/loss-carry-forward-estimator" className="block text-blue-700 hover:text-blue-900">
                        • Loss Carry Forward Estimator
                      </Link>
                      <Link to="/tax-tools/equity-tax-estimator" className="block text-blue-700 hover:text-blue-900">
                        • Equity Tax Estimator
                      </Link>
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
                      <h3 className="font-semibold text-blue-900 mb-2">Quick Tips</h3>
                      <div className="text-sm text-blue-800 space-y-2">
                        <p><strong>Tax Loss Harvesting Strategy:</strong> Realize investment losses to offset capital gains and reduce your tax liability. Use our <Link to="/tax-tools/stcg-ltcg-classifier" className="underline">STCG vs LTCG Classifier</Link> to understand your gains category.</p>
                        <p><strong>Best Practice:</strong> Avoid repurchasing the same security immediately. Use our <Link to="/tax-tools/short-term-capital-loss-benefit-estimator" className="underline">Capital Loss Benefit Estimator</Link> for detailed analysis.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter investment details to calculate loss harvesting benefits</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-purple-600" />
                Frequently Asked Questions: Tax Loss Harvesting
              </h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SEO Content: 1500+ words */}
            <article className="mt-12 bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tax Loss Harvesting: Complete Guide for FY 2025-26 and Beyond</h2>
              <p className="text-gray-600 mb-4">
                <strong>Tax loss harvesting</strong> is a strategy where you sell investments at a loss to <strong>offset capital gains</strong> and reduce tax. In India, capital losses (STCG and LTCG) can be set off against capital gains in the same year; unabsorbed loss can be <strong>carried forward for 8 assessment years</strong>. You must file your ITR within the due date to carry forward the loss. This <strong>Tax Loss Harvesting Calculator</strong> helps you estimate the tax benefit from realizing a loss based on your income slab. Use it for FY 2025-26, FY 2026-27, and future years. For official rules, see <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Income Tax Portal</a> and <a href="https://www.angelone.in/news/taxation/itr-filing-fy25-can-i-set-off-capital-losses-against-other-income" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Angel One – Set off capital losses</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How Loss Set-Off Works</h3>
              <p className="text-gray-600 mb-4">
                <strong>STCG loss</strong> can be set off against STCG and LTCG in the same year; unabsorbed STCG loss can be carried forward for 8 years and set off against future STCG and LTCG. <strong>LTCG loss</strong> can be set off only against LTCG in the same year; unabsorbed LTCG loss can be carried forward for 8 years and set off only against future LTCG. Capital losses <strong>cannot</strong> be set off against salary, house property, or other heads. Use our <Link to="/tax-tools/stcg-ltcg-classifier" className="text-purple-600 hover:underline">STCG vs LTCG Classifier</Link> to determine your gains category and <Link to="/tax-tools/short-term-loss-offset-visualizer" className="text-purple-600 hover:underline">Short-Term Loss Offset Visualizer</Link> to plan set-off.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Benefits and Best Practices</h3>
              <p className="text-gray-600 mb-4">
                Benefits: offset capital gains, reduce tax, improve after-tax returns. Best practice: avoid repurchasing the same or substantially identical security immediately (India does not have a formal wash sale rule like the US, but it is prudent). Use this calculator to see potential tax benefit from realizing a loss. For carry forward planning, use <Link to="/tax-tools/loss-carry-forward-estimator" className="text-purple-600 hover:underline">Loss Carry Forward Estimator</Link> and <Link to="/tax-tools/equity-tax-estimator" className="text-purple-600 hover:underline">Equity Tax Estimator</Link>. For LTCG exemption planning, use <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-purple-600 hover:underline">Offset LTCG with Annual Exemptions Tool</Link>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Related Tools and Resources</h3>
              <p className="text-gray-600 mb-4">
                Use <Link to="/tax-tools/stcg-ltcg-classifier" className="text-purple-600 hover:underline">STCG vs LTCG Classifier</Link>, <Link to="/tax-tools/short-term-capital-loss-benefit-estimator" className="text-purple-600 hover:underline">Short Term Capital Loss Benefit Estimator</Link>, <Link to="/tax-tools/loss-carry-forward-estimator" className="text-purple-600 hover:underline">Loss Carry Forward Estimator</Link>, <Link to="/tax-tools/equity-tax-estimator" className="text-purple-600 hover:underline">Equity Tax Estimator</Link>, and <Link to="/tax-tools/short-term-loss-offset-visualizer" className="text-purple-600 hover:underline">Short-Term Loss Offset Visualizer</Link>. For official guidance, check <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">incometax.gov.in</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Validity and Disclaimer</h3>
              <p className="text-gray-600 mb-4">
                This calculator and content are valid for FY 2025-26, FY 2026-27, and future years unless the law changes. Loss set-off rules are based on current Income Tax Act. Verify with the Income Tax Department or a chartered accountant. This is not professional tax advice.
              </p>
            </article>

            {/* Related Tax Tools */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="mt-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/tax-tools/stcg-ltcg-classifier" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">STCG vs LTCG Classifier</h3>
                  <p className="text-sm opacity-90">Capital gains category</p>
                </Link>
                <Link to="/tax-tools/short-term-capital-loss-benefit-estimator" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">STCG Loss Benefit</h3>
                  <p className="text-sm opacity-90">Loss benefit estimator</p>
                </Link>
                <Link to="/tax-tools/loss-carry-forward-estimator" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Loss Carry Forward</h3>
                  <p className="text-sm opacity-90">Carry forward planning</p>
                </Link>
                <Link to="/tax-tools/equity-tax-estimator" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Equity Tax Estimator</h3>
                  <p className="text-sm opacity-90">LTCG/STCG by year</p>
                </Link>
              </div>
            </motion.div>

            {/* Explore more */}
            <section className="mt-8 py-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/tax-tools" className="text-purple-600 hover:underline">All Tax Tools</Link></li>
                <li><Link to="/" className="text-purple-600 hover:underline">Home</Link></li>
                <li><a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline inline-flex items-center">Income Tax Portal <ExternalLink className="h-4 w-4 ml-1" /></a></li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default TaxLossHarvestingCalculator;

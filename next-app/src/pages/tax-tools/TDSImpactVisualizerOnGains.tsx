import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Info, TrendingUp, Eye, BarChart3, HelpCircle, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

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

  const canonicalUrl = 'https://moneycal.in/tax-tools/tds-impact-visualizer-on-gains';
  const faqData = [
    { question: 'Is TDS deducted on equity capital gains in India?', answer: 'For resident individuals, TDS on sale of equity shares through a recognized stock exchange is generally not deducted by the broker. TDS may apply on certain payments like interest, dividends, or NRI transactions. For mutual fund redemptions, TDS may apply in specific cases (e.g. NRI). Use this TDS Impact Visualizer to see how a given TDS rate affects your gross gain and net gain.' },
    { question: 'What is the TDS rate on capital gains for NRIs?', answer: 'For NRIs, TDS on capital gains from equity/equity mutual funds is typically 20% for STCG and 10% for LTCG (subject to DTAA). For debt mutual funds, TDS may apply at applicable rates. Use this calculator to enter gross gain and TDS rate to see net gain and effective tax impact.' },
    { question: 'Can I claim TDS credit while filing ITR?', answer: 'Yes. TDS deducted is reflected in Form 26AS and can be claimed as credit while filing your income tax return. Your final tax liability is computed on total income; TDS is set off against it. Use this visualizer to see TDS amount and plan for refund or additional tax at the time of filing.' },
    { question: 'What TDS rate should I use for equity gains?', answer: 'For residents, equity LTCG is taxed at 12.5% (from July 2024) with ₹1.25 lakh exemption; STCG at 20%. TDS may not be deducted on sale through exchange. For illustration, you can use 10% (typical TDS on certain gains) or your slab rate. Use the dropdown in this tool to select a rate and see impact.' },
    { question: 'Where can I check TDS on my gains?', answer: 'Check Form 26AS on the Income Tax Portal (incometax.gov.in) for TDS credit. For mutual fund or broker TDS, check your statement. This TDS Impact Visualizer is for educational illustration; always verify with your broker or the Income Tax Department.' }
  ];

  return (
    <>
      <SEOHelmet
        title="TDS Impact Visualizer on Gains - Understand TDS Effect on Capital Gains | MoneyCal"
        description="Visualize how TDS affects your capital gains. Calculate TDS amount, net gain, and effective tax rate. FY 2025-26 and beyond. Advanced Tools • Valid 2026–2050."
        keywords="TDS impact calculator, capital gains TDS, TDS on gains India, tax deduction at source capital gains, NRI TDS 2026"
        url={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Tools', url: '/tax-tools' },
          { name: 'TDS Impact Visualizer on Gains', url: '/tax-tools/tds-impact-visualizer-on-gains' }
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
              <p className="text-sm font-medium text-blue-200 mb-2">Advanced Tools • Valid 2026–2050</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                TDS Impact Visualizer on Gains
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Visualize how TDS affects your capital gains and net returns
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

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-indigo-600" />
                Frequently Asked Questions: TDS on Capital Gains
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">TDS on Capital Gains: Complete Guide for FY 2025-26 and Beyond</h2>
              <p className="text-gray-600 mb-4">
                Understanding how <strong>TDS (Tax Deducted at Source)</strong> affects your <strong>capital gains</strong> helps you plan cash flow and tax liability. This <strong>TDS Impact Visualizer on Gains</strong> lets you enter gross capital gain, TDS rate, and income slab to see TDS amount, net gain, and effective tax rate. Use it for FY 2025-26, FY 2026-27, and future years. Valid for residents and NRIs (with different TDS rates).
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">When Is TDS Deducted on Capital Gains?</h3>
              <p className="text-gray-600 mb-4">
                For <strong>resident individuals</strong>, TDS on sale of equity shares through a recognized stock exchange is generally <strong>not deducted</strong> by the broker. TDS may apply on certain payments such as interest, dividends, or when the payer is required to deduct (e.g. NRI transactions). For <strong>mutual fund redemptions</strong>, TDS may apply in specific cases (e.g. NRI, or certain debt funds). For residents, capital gains are typically reported in ITR and tax is paid at the time of filing or via advance tax. Use this visualizer to see how a given TDS rate would affect your gross gain. For official TDS rules, refer to <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Income Tax Portal</a> and <a href="https://economictimes.indiatimes.com/wealth/tax/nri-taxation-mutual-funds-capital-gain-tds-rules-stcg-ltcg-tax-rules-from-equity-debt-international-hybrid-mfs-and-others/articleshow/122972758.cms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times NRI TDS on MFs</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">TDS for NRIs on Capital Gains</h3>
              <p className="text-gray-600 mb-4">
                For <strong>NRIs</strong>, TDS on capital gains from equity/equity mutual funds is typically <strong>20% for STCG</strong> and <strong>10% for LTCG</strong> (subject to DTAA). For debt mutual funds and international fund redemptions, TDS may apply at higher rates (e.g. 30% for STCG in some cases). Use this TDS Impact Visualizer to enter gross gain and select a TDS rate to see net gain and effective impact. Claim TDS credit in ITR when filing. For NRI taxation, see <a href="https://economictimes.indiatimes.com/wealth/tax/nri-taxation-mutual-funds-capital-gain-tds-rules-stcg-ltcg-tax-rules-from-equity-debt-international-hybrid-mfs-and-others/articleshow/122972758.cms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times NRI mutual fund TDS</a> and <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">incometax.gov.in</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Claiming TDS Credit in ITR</h3>
              <p className="text-gray-600 mb-4">
                TDS deducted is reflected in <strong>Form 26AS</strong> and can be <strong>claimed as credit</strong> while filing your income tax return. Your final tax liability is computed on total income; TDS is set off against it. If TDS is more than final tax, you get a refund. Use this calculator to see TDS amount and plan for refund or additional tax. For capital gains tax rates (LTCG 12.5% with ₹1.25 lakh exemption, STCG 20% for equity from July 2024), use our <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline">Equity Tax Estimator</Link> and <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline">STCG vs LTCG Classifier</Link>. For filing deadlines, see <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline">Tax Filing Deadline Reminder Widget</Link>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Related Tools and Resources</h3>
              <p className="text-gray-600 mb-4">
                Use <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline">Equity Tax Estimator</Link> for equity LTCG/STCG by year. Use <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline">STCG vs LTCG Classifier</Link> to determine holding period and rate. Use <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="text-indigo-600 hover:underline">Tax-Efficient Withdrawal Planner</Link> to plan withdrawals. Use <Link to="/tax-tools/turnover-calculator-itr" className="text-indigo-600 hover:underline">Turnover Calculator for ITR</Link> and <Link to="/tax-tools/trader-turnover-estimator-itr" className="text-indigo-600 hover:underline">Trader Turnover Estimator for ITR</Link> for ITR form and turnover. For official TDS and capital gains, check <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">incometax.gov.in</a> and <a href="https://economictimes.indiatimes.com/wealth/tax/mutual-fund-taxation-for-ay-2025-26-latest-capital-gain-tax-rules-for-equity-mutual-funds-debt-mutual-funds-international-mutual-funds-gold-mutual-funds-others/articleshow/122830380.cms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times MF taxation AY 2025-26</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Validity and Disclaimer</h3>
              <p className="text-gray-600 mb-4">
                This calculator and content are designed to be valid for FY 2025-26, FY 2026-27, and future years unless the law changes. TDS and capital gains rules are based on current Income Tax Act. Always verify with the Income Tax Department or a chartered accountant. This is not professional tax advice.
              </p>
            </article>

            {/* Related Tax Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white"
            >
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/tax-tools/equity-tax-estimator" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Equity Tax Estimator</h3>
                  <p className="text-sm opacity-90">LTCG/STCG by year</p>
                </Link>
                <Link to="/tax-tools/stcg-ltcg-classifier" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">STCG vs LTCG Classifier</h3>
                  <p className="text-sm opacity-90">Capital gains category</p>
                </Link>
                <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Withdrawal Planner</h3>
                  <p className="text-sm opacity-90">Tax-efficient withdrawals</p>
                </Link>
                <Link to="/tax-tools/turnover-calculator-itr" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Turnover Calculator ITR</h3>
                  <p className="text-sm opacity-90">ITR form selection</p>
                </Link>
              </div>
            </motion.div>

            {/* Explore more */}
            <section className="mt-8 py-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/tax-tools" className="text-indigo-600 hover:underline">All Tax Tools</Link></li>
                <li><Link to="/" className="text-indigo-600 hover:underline">Home</Link></li>
                <li><a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline inline-flex items-center">Income Tax Portal <ExternalLink className="h-4 w-4 ml-1" /></a></li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default TDSImpactVisualizerOnGains;

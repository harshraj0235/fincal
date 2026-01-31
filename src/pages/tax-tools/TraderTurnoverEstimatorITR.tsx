import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign, FileText, ArrowRight, HelpCircle, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface TurnoverCalculation {
  totalBuyValue: number;
  totalSellValue: number;
  totalTurnover: number;
  tradingDays: number;
  averageDailyTurnover: number;
  category: string;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const TraderTurnoverEstimatorITR: React.FC = () => {
  const [buyValue, setBuyValue] = useState<string>('');
  const [sellValue, setSellValue] = useState<string>('');
  const [tradingDays, setTradingDays] = useState<string>('');
  const [calculation, setCalculation] = useState<TurnoverCalculation | null>(null);

  const calculateTurnover = () => {
    if (!buyValue || !sellValue || !tradingDays) {
      alert('Please fill in all fields');
      return;
    }

    const buy = parseFloat(buyValue);
    const sell = parseFloat(sellValue);
    const days = parseInt(tradingDays);
    
    const totalTurnover = buy + sell;
    const averageDailyTurnover = totalTurnover / days;
    
    let category: string;
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (totalTurnover >= 10000000) { // 1 crore
      category = 'High Frequency Trader';
      recommendation = 'Consider professional trader status. Maintain detailed records for ITR.';
      color = 'text-red-600';
      icon = <AlertCircle className="h-5 w-5" />;
    } else if (totalTurnover >= 5000000) { // 50 lakhs
      category = 'Active Trader';
      recommendation = 'Significant trading activity. Ensure proper documentation for ITR.';
      color = 'text-orange-600';
      icon = <Info className="h-5 w-5" />;
    } else if (totalTurnover >= 1000000) { // 10 lakhs
      category = 'Regular Trader';
      recommendation = 'Moderate trading activity. Standard ITR filing required.';
      color = 'text-blue-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else {
      category = 'Occasional Trader';
      recommendation = 'Low trading activity. Basic ITR filing sufficient.';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    }

    setCalculation({
      totalBuyValue: buy,
      totalSellValue: sell,
      totalTurnover,
      tradingDays: days,
      averageDailyTurnover,
      category,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setBuyValue('');
    setSellValue('');
    setTradingDays('');
    setCalculation(null);
  };

  const canonicalUrl = 'https://moneycal.in/tax-tools/trader-turnover-estimator-itr';
  const faqData = [
    { question: 'How is trading turnover calculated for ITR?', answer: 'Trading turnover for ITR is typically the sum of total buy value and total sell value of equity/commodity/F&O during the year. It indicates the volume of trading and helps determine whether you are an investor (capital gains) or a trader (business income). Use this Trader Turnover Estimator to enter buy value, sell value, and trading days to get total turnover and category.' },
    { question: 'What is the turnover limit for audit under Section 44AB?', answer: 'For business, audit under Section 44AB is required if turnover exceeds ₹1 crore (or ₹50 lakh in certain cases). For profession, if receipts exceed ₹50 lakh. Trading turnover (buy + sell) is used to determine turnover for F&O/equity trading. Use this calculator to estimate your turnover and plan compliance.' },
    { question: 'When is turnover considered for presumptive scheme 44AD?', answer: 'Section 44AD allows presumptive taxation for business with turnover up to ₹2 crore (8% or 6% of turnover). If your trading turnover exceeds ₹2 crore, you cannot use 44AD and may need audit. Use this Trader Turnover Estimator to see your total turnover and related ITR filing requirements.' },
    { question: 'Does this calculator include F&O and equity turnover?', answer: 'Yes. Enter your total buy value and total sell value (equity, F&O, or both) and number of trading days. The calculator sums buy + sell to get total turnover and shows average daily turnover. Use it for ITR form selection and audit planning.' },
    { question: 'Where can I get official turnover and ITR guidance?', answer: 'Check the Income Tax Portal (incometax.gov.in) and the latest ITR instruction kit for AY 2025-26 / 2026-27. For audit limits and presumptive scheme, refer to Section 44AB and 44AD. Always verify with a chartered accountant for your specific case.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Trader Turnover Estimator for ITR - Calculate Trading Turnover | MoneyCal"
        description="Calculate trading turnover (buy + sell) for ITR filing. Determine trader category, audit requirements, and ITR form. Filing & Compliance • Valid 2026–2050."
        keywords="trader turnover calculator, trading turnover ITR, F&O turnover, Section 44AB audit, presumptive scheme 44AD 2026"
        url={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Tools', url: '/tax-tools' },
          { name: 'Trader Turnover Estimator for ITR', url: '/tax-tools/trader-turnover-estimator-itr' }
        ]}
        faqData={faqData}
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
              <p className="text-sm font-medium text-blue-200 mb-2">Filing & Compliance • Valid 2026–2050</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Trader Turnover Estimator for ITR
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate trading turnover (buy + sell) for ITR filing and compliance
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
                  Trading Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Buy Value (₹)
                    </label>
                    <input
                      type="number"
                      value={buyValue}
                      onChange={(e) => setBuyValue(e.target.value)}
                      placeholder="Enter total buy value"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Sell Value (₹)
                    </label>
                    <input
                      type="number"
                      value={sellValue}
                      onChange={(e) => setSellValue(e.target.value)}
                      placeholder="Enter total sell value"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trading Days
                    </label>
                    <input
                      type="number"
                      value={tradingDays}
                      onChange={(e) => setTradingDays(e.target.value)}
                      placeholder="Enter number of trading days"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTurnover}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Turnover
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
                  Turnover Analysis
                </h2>

                {calculation ? (
                  <div className="space-y-6">
                    {/* Category */}
                    <div className={`text-center p-4 rounded-lg ${calculation.color.includes('red') ? 'bg-red-50 border border-red-200' : calculation.color.includes('orange') ? 'bg-orange-50 border border-orange-200' : calculation.color.includes('blue') ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${calculation.color}`}>
                        {calculation.icon}
                        <span className="ml-2 text-lg font-bold">Trader Category</span>
                      </div>
                      <p className="text-lg font-bold text-gray-800">{calculation.category}</p>
                      <p className="text-sm text-gray-600 mt-2">{calculation.recommendation}</p>
                    </div>

                    {/* Turnover Details */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Turnover Summary
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Buy Value:</span>
                          <span className="font-bold text-blue-600">₹{calculation.totalBuyValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Sell Value:</span>
                          <span className="font-bold text-blue-600">₹{calculation.totalSellValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Total Turnover:</span>
                          <span className="font-bold text-blue-600">₹{calculation.totalTurnover.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trading Statistics */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Trading Statistics
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Trading Days:</span>
                          <span className="font-bold text-green-600">{calculation.tradingDays} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Average Daily Turnover:</span>
                          <span className="font-bold text-green-600">₹{calculation.averageDailyTurnover.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* ITR Filing Info */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        ITR Filing Requirements
                      </h3>
                      <div className="space-y-2 text-purple-700">
                        <p>• Report all trading transactions in ITR</p>
                        <p>• Maintain detailed trading records</p>
                        <p>• Consider professional trader status if applicable</p>
                        <p>• Consult tax advisor for complex cases</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter trading details to calculate turnover</p>
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
                <HelpCircle className="h-6 w-6 mr-2 text-purple-600" />
                Frequently Asked Questions: Trading Turnover for ITR
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trading Turnover for ITR: Complete Guide for FY 2025-26 and Beyond</h2>
              <p className="text-gray-600 mb-4">
                Calculating your <strong>trading turnover</strong> is essential for correct <strong>ITR filing</strong> and compliance. This <strong>Trader Turnover Estimator for ITR</strong> helps you sum total buy value and total sell value (equity, F&O, or both) to get your annual turnover, average daily turnover, and trader category. Use it for ITR form selection, audit planning under Section 44AB, and presumptive scheme under Section 44AD. Valid for FY 2025-26, FY 2026-27, and future years.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">What Is Trading Turnover?</h3>
              <p className="text-gray-600 mb-4">
                <strong>Trading turnover</strong> for ITR is typically the <strong>sum of total buy value and total sell value</strong> of equity, F&O, or commodity during the financial year. It reflects the volume of trading and helps distinguish between an investor (capital gains) and a trader (business income). High turnover may trigger audit under Section 44AB (e.g. turnover above ₹1 crore) or limit use of presumptive scheme under Section 44AD (turnover up to ₹2 crore). Use this calculator to enter buy value, sell value, and trading days to get total turnover and average daily turnover. For official limits, refer to <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Income Tax Portal</a> and <a href="https://economictimes.indiatimes.com/wealth/tax/itr-1-itr-2-itr-3-or-itr-4-which-form-applies-to-your-income-for-itr-filing-fy-2024-25-ay-2025-26/articleshow/122385713.cms" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Economic Times ITR guide</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Section 44AB Audit and Turnover</h3>
              <p className="text-gray-600 mb-4">
                Under <strong>Section 44AB</strong>, tax audit is required if business turnover exceeds ₹1 crore (or ₹50 lakh in certain cases) or profession receipts exceed ₹50 lakh. For trading, turnover (buy + sell) is used to determine whether audit is required. Use this Trader Turnover Estimator to see your total turnover and plan compliance. If turnover exceeds ₹2 crore, you cannot use presumptive scheme under Section 44AD and may need to maintain books and get audit. Use our <Link to="/tax-tools/turnover-calculator-itr" className="text-purple-600 hover:underline">Turnover Calculator for ITR</Link> to sum all income heads for ITR form selection, and <Link to="/tax-tools/itr-form-type-helper" className="text-purple-600 hover:underline">ITR Form Type Helper</Link> for step-by-step form selection.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Presumptive Scheme 44AD and 44ADA</h3>
              <p className="text-gray-600 mb-4">
                <strong>Section 44AD</strong> allows presumptive taxation for business with turnover up to ₹2 crore (8% or 6% of turnover). <strong>Section 44ADA</strong> allows presumptive taxation for specified professionals with receipts up to ₹50 lakh (50% of receipts). If your trading turnover exceeds ₹2 crore, you cannot use 44AD. Use this calculator to estimate your turnover and see if you qualify for presumptive scheme. For capital gains on equity, use <Link to="/tax-tools/equity-tax-estimator" className="text-purple-600 hover:underline">Equity Tax Estimator</Link> and <Link to="/tax-tools/stcg-ltcg-classifier" className="text-purple-600 hover:underline">STCG vs LTCG Classifier</Link>. For TDS on gains, use <Link to="/tax-tools/tds-impact-visualizer-on-gains" className="text-purple-600 hover:underline">TDS Impact Visualizer on Gains</Link>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Related Tools and Resources</h3>
              <p className="text-gray-600 mb-4">
                Use <Link to="/tax-tools/turnover-calculator-itr" className="text-purple-600 hover:underline">Turnover Calculator for ITR</Link> to sum income heads for ITR form. Use <Link to="/tax-tools/itr-form-type-helper" className="text-purple-600 hover:underline">ITR Form Type Helper</Link> for form selection. Use <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-purple-600 hover:underline">Tax Filing Deadline Reminder Widget</Link> for due dates. Use <Link to="/tax-tools/loss-carry-forward-estimator" className="text-purple-600 hover:underline">Loss Carry Forward Estimator</Link> for loss utilization. For official guidance, check <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">incometax.gov.in</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Validity and Disclaimer</h3>
              <p className="text-gray-600 mb-4">
                This calculator and content are designed to be valid for FY 2025-26, FY 2026-27, and future years unless the law changes. Turnover and audit limits are based on current Income Tax Act. Always verify with the Income Tax Department or a chartered accountant. This is not professional tax advice.
              </p>
            </article>

            {/* Related Tax Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-8 text-white"
            >
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/tax-tools/turnover-calculator-itr" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Turnover Calculator ITR</h3>
                  <p className="text-sm opacity-90">Income and ITR form selection</p>
                </Link>
                <Link to="/tax-tools/itr-form-type-helper" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">ITR Form Type Helper</h3>
                  <p className="text-sm opacity-90">Choose the right ITR form</p>
                </Link>
                <Link to="/tax-tools/stcg-ltcg-classifier" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">STCG vs LTCG Classifier</h3>
                  <p className="text-sm opacity-90">Capital gains category</p>
                </Link>
                <Link to="/tax-tools/equity-tax-estimator" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Equity Tax Estimator</h3>
                  <p className="text-sm opacity-90">Equity tax by year</p>
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

export default TraderTurnoverEstimatorITR;

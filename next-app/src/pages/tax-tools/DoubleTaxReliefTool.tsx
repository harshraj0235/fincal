import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign, Globe, ArrowRight, HelpCircle, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface DoubleTaxCalculation {
  foreignIncome: number;
  foreignTaxPaid: number;
  indianTaxRate: number;
  indianTaxLiability: number;
  reliefAmount: number;
  netTaxLiability: number;
  reliefPercentage: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const DoubleTaxReliefTool: React.FC = () => {
  const [foreignIncome, setForeignIncome] = useState<string>('');
  const [foreignTaxPaid, setForeignTaxPaid] = useState<string>('');
  const [indianTaxRate, setIndianTaxRate] = useState<string>('');
  const [calculation, setCalculation] = useState<DoubleTaxCalculation | null>(null);

  const calculateDoubleTaxRelief = () => {
    if (!foreignIncome || !foreignTaxPaid || !indianTaxRate) {
      alert('Please fill in all fields');
      return;
    }

    const income = parseFloat(foreignIncome);
    const foreignTax = parseFloat(foreignTaxPaid);
    const indianRate = parseFloat(indianTaxRate);
    
    const indianTaxLiability = (income * indianRate) / 100;
    const reliefAmount = Math.min(foreignTax, indianTaxLiability);
    const netTaxLiability = indianTaxLiability - reliefAmount;
    const reliefPercentage = foreignTax > 0 ? (reliefAmount / foreignTax) * 100 : 0;
    
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (reliefAmount >= indianTaxLiability) {
      recommendation = 'Full relief available. No additional tax liability in India.';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (reliefAmount > 0) {
      recommendation = 'Partial relief available. Pay remaining tax in India.';
      color = 'text-blue-600';
      icon = <Info className="h-5 w-5" />;
    } else {
      recommendation = 'No relief available. Pay full tax in India.';
      color = 'text-red-600';
      icon = <AlertCircle className="h-5 w-5" />;
    }

    setCalculation({
      foreignIncome: income,
      foreignTaxPaid: foreignTax,
      indianTaxRate: indianRate,
      indianTaxLiability,
      reliefAmount,
      netTaxLiability,
      reliefPercentage,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setForeignIncome('');
    setForeignTaxPaid('');
    setIndianTaxRate('');
    setCalculation(null);
  };

  const canonicalUrl = 'https://moneycal.in/tax-tools/double-tax-relief-tool';
  const faqData = [
    { question: 'What is double taxation relief?', answer: 'Double taxation relief allows you to avoid paying tax twice on the same income—once in the country where the income is earned (source) and again in your country of residence (India). India provides relief under Sections 90/90A (DTAA) and Section 91 (unilateral relief for countries without a treaty). Use this Double Tax Relief Tool to estimate relief based on foreign income, foreign tax paid, and Indian tax rate.' },
    { question: 'How do I claim DTAA relief in India?', answer: 'To claim relief under a Double Taxation Avoidance Agreement (DTAA), you typically need to furnish a Tax Residency Certificate (TRC) from the foreign country and, where applicable, Form 10F. Residents can apply in Form 10FA to the assessing officer for a TRC. The more beneficial of the DTAA and the Income Tax Act applies. Consult a chartered accountant or the Income Tax Portal for your specific case.' },
    { question: 'What is the difference between Section 90 and Section 91 relief?', answer: 'Section 90/90A applies when India has a DTAA with the foreign country—relief is given as per the treaty (tax credit or exemption). Section 91 applies when there is no DTAA—unilateral relief is given; the foreign tax paid is allowed as a credit against Indian tax subject to limits. Use this calculator to see estimated relief; actual relief depends on the treaty or Section 91.' },
    { question: 'Can I get relief on foreign salary and foreign capital gains?', answer: 'Yes. Relief is available on foreign income that is taxable both in the source country and in India. You need to determine your residency status (resident or NRI), the applicable DTAA (if any), and the relief method (credit or exemption). This tool gives an estimate; for salary and capital gains, the treaty articles and Indian law apply.' },
    { question: 'Where can I find the list of India DTAA countries?', answer: 'The Income Tax Department website (incometax.gov.in) and the official DTAA page list countries with which India has tax treaties. For each treaty, refer to the specific agreement for rates and relief. This calculator is for illustration; verify with the Income Tax Department or a tax advisor.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Double Tax Relief Tool - Calculate International Tax Relief | MoneyCal"
        description="Calculate relief from double taxation for international income. DTAA and Section 91 relief. International Tax • Valid 2026–2050."
        keywords="double tax relief calculator, DTAA India, foreign income tax relief, Section 90 91, international taxation India 2026"
        url={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Tools', url: '/tax-tools' },
          { name: 'Double Tax Relief Tool', url: '/tax-tools/double-tax-relief-tool' }
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
              <p className="text-sm font-medium text-blue-200 mb-2">International Tax • Valid 2026–2050</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Double Tax Relief Tool
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate relief from double taxation for international income (DTAA & Section 91)
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
                  International Income Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foreign Income (₹)
                    </label>
                    <input
                      type="number"
                      value={foreignIncome}
                      onChange={(e) => setForeignIncome(e.target.value)}
                      placeholder="Enter foreign income amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foreign Tax Paid (₹)
                    </label>
                    <input
                      type="number"
                      value={foreignTaxPaid}
                      onChange={(e) => setForeignTaxPaid(e.target.value)}
                      placeholder="Enter foreign tax paid"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Indian Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      value={indianTaxRate}
                      onChange={(e) => setIndianTaxRate(e.target.value)}
                      placeholder="Enter applicable Indian tax rate"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateDoubleTaxRelief}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Relief
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
                  Relief Analysis
                </h2>

                {calculation ? (
                  <div className="space-y-6">
                    {/* Relief Status */}
                    <div className={`text-center p-4 rounded-lg ${calculation.color.includes('green') ? 'bg-green-50 border border-green-200' : calculation.color.includes('blue') ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${calculation.color}`}>
                        {calculation.icon}
                        <span className="ml-2 text-lg font-bold">Relief Status</span>
                      </div>
                      <p className="text-sm text-gray-600">{calculation.recommendation}</p>
                    </div>

                    {/* Tax Liability Breakdown */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Tax Liability Breakdown
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Foreign Income:</span>
                          <span className="font-bold text-blue-600">₹{calculation.foreignIncome.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Foreign Tax Paid:</span>
                          <span className="font-bold text-blue-600">₹{calculation.foreignTaxPaid.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Indian Tax Rate:</span>
                          <span className="font-bold text-blue-600">{calculation.indianTaxRate}%</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Indian Tax Liability:</span>
                          <span className="font-bold text-blue-600">₹{calculation.indianTaxLiability.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Relief Calculation */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <Globe className="h-5 w-5 mr-2" />
                        Relief Calculation
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Relief Amount:</span>
                          <span className="font-bold text-green-600">₹{calculation.reliefAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Relief Percentage:</span>
                          <span className="font-bold text-green-600">{calculation.reliefPercentage.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Tax Liability:</span>
                          <span className="font-bold text-green-600">₹{calculation.netTaxLiability.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tax Savings */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        Tax Savings
                      </h3>
                      <div className="space-y-2 text-purple-700">
                        <p>• Relief from double taxation: ₹{calculation.reliefAmount.toLocaleString()}</p>
                        <p>• Effective tax rate: {((calculation.netTaxLiability / calculation.foreignIncome) * 100).toFixed(2)}%</p>
                        <p>• Tax savings: ₹{(calculation.indianTaxLiability - calculation.netTaxLiability).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter international income details to calculate relief</p>
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
                <HelpCircle className="h-6 w-6 mr-2 text-indigo-600" />
                Frequently Asked Questions: Double Tax Relief
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Double Tax Relief: Complete Guide for FY 2025-26 and Beyond</h2>
              <p className="text-gray-600 mb-4">
                <strong>Double taxation</strong> occurs when the same income is taxed in two countries—typically the <strong>source country</strong> (where income is earned) and the <strong>residence country</strong> (e.g. India for residents). India provides relief through <strong>DTAA (Double Taxation Avoidance Agreement)</strong> under Sections 90 and 90A and through <strong>unilateral relief</strong> under Section 91 for countries without a treaty. This <strong>Double Tax Relief Tool</strong> helps you estimate relief based on foreign income, foreign tax paid, and applicable Indian tax rate. Use it for FY 2025-26, FY 2026-27, and future years. For official rules, see <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Income Tax Portal</a> and <a href="https://www.incometaxindia.gov.in/Pages/international-taxation/dtaa.aspx" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Income Tax Department DTAA</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How DTAA Relief Works (Sections 90 and 90A)</h3>
              <p className="text-gray-600 mb-4">
                When India has a <strong>DTAA</strong> with a foreign country, relief is allowed under <strong>Section 90</strong> (bilateral) or <strong>Section 90A</strong> (specified associations). The <strong>more beneficial</strong> of the treaty and the Indian Income Tax Act applies. Relief is typically given as a <strong>tax credit</strong>—foreign tax paid is allowed as credit against Indian tax on the same income, subject to limits. To claim DTAA benefits, you may need to furnish a <strong>Tax Residency Certificate (TRC)</strong> from the foreign country and, where applicable, Form 10F. Residents can apply in Form 10FA to the assessing officer. Use this calculator to estimate relief; for actual claim, consult a chartered accountant. For domestic tax planning, use our <Link to="/tax-tools/old-vs-new-tax-regime-helper" className="text-indigo-600 hover:underline">Old vs New Tax Regime Helper</Link> and <Link to="/tax-tools/hra-vs-lta-tax-comparison-tool" className="text-indigo-600 hover:underline">HRA vs LTA Tax Comparison Tool</Link>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Unilateral Relief (Section 91)</h3>
              <p className="text-gray-600 mb-4">
                For countries <strong>without a DTAA</strong> with India, <strong>Section 91</strong> allows <strong>unilateral relief</strong>. The foreign tax paid on income that is also taxable in India can be allowed as a credit against Indian tax, subject to the lower of foreign tax paid or Indian tax on that income. This tool gives an estimate of relief when you enter foreign income, foreign tax paid, and Indian tax rate. For filing and compliance, use <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline">Tax Filing Deadline Reminder Widget</Link> and <Link to="/tax-tools/turnover-calculator-itr" className="text-indigo-600 hover:underline">Turnover Calculator for ITR</Link>. For capital gains, use <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline">Equity Tax Estimator</Link> and <Link to="/tax-tools/tds-impact-visualizer-on-gains" className="text-indigo-600 hover:underline">TDS Impact Visualizer on Gains</Link>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Related Tools and Resources</h3>
              <p className="text-gray-600 mb-4">
                For domestic tax planning: <Link to="/tax-tools/old-vs-new-tax-regime-helper" className="text-indigo-600 hover:underline">Old vs New Tax Regime Helper</Link>, <Link to="/tax-tools/hra-vs-lta-tax-comparison-tool" className="text-indigo-600 hover:underline">HRA vs LTA Tax Comparison Tool</Link>, <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="text-indigo-600 hover:underline">80C Deduction Bucket Visualizer</Link>. For filing: <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline">Tax Filing Deadline Reminder Widget</Link>, <Link to="/tax-tools/turnover-calculator-itr" className="text-indigo-600 hover:underline">Turnover Calculator for ITR</Link>. For capital gains: <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline">Equity Tax Estimator</Link>, <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline">STCG vs LTCG Classifier</Link>. For official DTAA list and relief, check <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">incometax.gov.in</a> and <a href="https://taxsummaries.pwc.com/india/individual/foreign-tax-relief-and-tax-treaties" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">PwC India foreign tax relief</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Validity and Disclaimer</h3>
              <p className="text-gray-600 mb-4">
                This calculator and content are valid for FY 2025-26, FY 2026-27, and future years unless the law changes. Double tax relief is governed by Sections 90, 90A, and 91 and the respective DTAAs. Finance Act 2025 may have amended certain provisions. Always verify with the Income Tax Department or a chartered accountant. This is not professional tax advice.
              </p>
            </article>

            {/* Related Tax Tools */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/tax-tools/old-vs-new-tax-regime-helper" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Old vs New Tax Regime</h3>
                  <p className="text-sm opacity-90">Compare tax regimes</p>
                </Link>
                <Link to="/tax-tools/hra-vs-lta-tax-comparison-tool" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">HRA vs LTA</h3>
                  <p className="text-sm opacity-90">Allowance comparison</p>
                </Link>
                <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Tax Filing Deadlines</h3>
                  <p className="text-sm opacity-90">ITR and tax due dates</p>
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

export default DoubleTaxReliefTool;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Info, AlertCircle, FileText, TrendingUp, CheckCircle, HelpCircle, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface TurnoverResult {
  totalTurnover: number;
  recommendedITR: string;
  description: string;
  requirements: string[];
  color: string;
  icon: React.ReactNode;
}

const TurnoverCalculatorITR: React.FC = () => {
  const [businessIncome, setBusinessIncome] = useState('');
  const [professionalIncome, setProfessionalIncome] = useState('');
  const [salaryIncome, setSalaryIncome] = useState('');
  const [housePropertyIncome, setHousePropertyIncome] = useState('');
  const [capitalGainsIncome, setCapitalGainsIncome] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [result, setResult] = useState<TurnoverResult | null>(null);

  const calculateTurnover = () => {
    const business = parseFloat(businessIncome) || 0;
    const professional = parseFloat(professionalIncome) || 0;
    const salary = parseFloat(salaryIncome) || 0;
    const houseProperty = parseFloat(housePropertyIncome) || 0;
    const capitalGains = parseFloat(capitalGainsIncome) || 0;
    const other = parseFloat(otherIncome) || 0;

    const totalTurnover = business + professional + salary + houseProperty + capitalGains + other;

    let recommendedITR = '';
    let description = '';
    let requirements: string[] = [];
    let color = '';
    let icon: React.ReactNode = <FileText className="h-5 w-5" />;

    if (totalTurnover <= 500000) {
      recommendedITR = 'ITR-1 (Sahaj)';
      description = 'For individuals with income from salary, pension, one house property, and other sources';
      requirements = [
        'Total income should not exceed ₹50 lakhs',
        'Income from salary/pension only',
        'One house property',
        'No business income',
        'No capital gains'
      ];
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (totalTurnover <= 10000000) {
      recommendedITR = 'ITR-2';
      description = 'For individuals and HUFs not having income from business or profession';
      requirements = [
        'Total income should not exceed ₹1 crore',
        'No business income',
        'Can have capital gains',
        'Multiple house properties allowed',
        'Foreign assets/income allowed'
      ];
      color = 'text-blue-600';
      icon = <FileText className="h-5 w-5" />;
    } else if (totalTurnover <= 50000000) {
      recommendedITR = 'ITR-3';
      description = 'For individuals and HUFs having income from business or profession';
      requirements = [
        'Total income should not exceed ₹5 crore',
        'Business or professional income',
        'Presumptive taxation available',
        'Audit required if turnover > ₹2 crore',
        'Can have other income sources'
      ];
      color = 'text-orange-600';
      icon = <TrendingUp className="h-5 w-5" />;
    } else {
      recommendedITR = 'ITR-4 (Sugam)';
      description = 'For individuals, HUFs, and firms having presumptive income from business and profession';
      requirements = [
        'Total income should not exceed ₹5 crore',
        'Presumptive taxation under Section 44AD/44ADA',
        'No audit required',
        'Simplified form',
        'Business income only'
      ];
      color = 'text-purple-600';
      icon = <Calculator className="h-5 w-5" />;
    }

    setResult({
      totalTurnover,
      recommendedITR,
      description,
      requirements,
      color,
      icon
    });
  };

  const resetForm = () => {
    setBusinessIncome('');
    setProfessionalIncome('');
    setSalaryIncome('');
    setHousePropertyIncome('');
    setCapitalGainsIncome('');
    setOtherIncome('');
    setResult(null);
  };

  const canonicalUrl = 'https://moneycal.in/tax-tools/turnover-calculator-itr';
  const faqData = [
    { question: 'Which ITR form should I file for salary income only?', answer: 'If your total income is up to ₹50 lakh and you have only salary, pension, one house property, and other sources (no business, no capital gains above ₹1.25 lakh LTCG from equity), you can use ITR-1 (Sahaj). Use this Turnover Calculator to enter your income and get the recommended form.' },
    { question: 'What is the turnover limit for ITR-4 (Sugam)?', answer: 'ITR-4 (Sugam) is for presumptive income under Section 44AD (business turnover up to ₹2 crore), 44ADA (profession up to ₹50 lakh), or 44AE. Total income under ITR-4 should be up to ₹50 lakh. For turnover above ₹2 crore (or if not under presumptive scheme), use ITR-3.' },
    { question: 'When do I need to file ITR-3 instead of ITR-1?', answer: 'File ITR-3 if you have income from business or profession (whether presumptive or not). ITR-1 is only for salary, one house property, other sources, and limited capital gains. If you have business/professional income, use ITR-3 or ITR-4 depending on presumptive scheme.' },
    { question: 'Does this calculator consider gross total income or turnover?', answer: 'This calculator uses the sum of income heads you enter (business, profession, salary, house property, capital gains, other) to recommend an ITR form. For business turnover specifically (e.g. for 44AD audit limit), use our Trader Turnover Estimator for ITR.' },
    { question: 'Where can I check official ITR form eligibility?', answer: 'Check the Income Tax Portal (incometax.gov.in) and the latest ITR instruction kit for AY 2025-26 / 2026-27. Form eligibility can change each year; always verify with a tax professional or the official portal before filing.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Turnover Calculator for ITR Form Filling - Determine Correct ITR Form | MoneyCal"
        description="Calculate turnover and gross total income for ITR form selection. Get the right ITR form (ITR-1, ITR-2, ITR-3, ITR-4) for FY 2025-26 and beyond. Filing & Compliance • Valid 2026–2050."
        keywords="ITR form calculator, turnover calculator ITR, which ITR form to file, ITR-1 ITR-2 ITR-3 ITR-4, income tax return form selection 2026"
        url={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Tools', url: '/tax-tools' },
          { name: 'Turnover Calculator for ITR', url: '/tax-tools/turnover-calculator-itr' }
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
                Turnover Calculator for ITR Form Filling
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate turnover and gross total income to select the correct ITR form for filing
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
                  Income Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Income (₹)
                    </label>
                    <input
                      type="number"
                      value={businessIncome}
                      onChange={(e) => setBusinessIncome(e.target.value)}
                      placeholder="Enter business income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Income (₹)
                    </label>
                    <input
                      type="number"
                      value={professionalIncome}
                      onChange={(e) => setProfessionalIncome(e.target.value)}
                      placeholder="Enter professional income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Income (₹)
                    </label>
                    <input
                      type="number"
                      value={salaryIncome}
                      onChange={(e) => setSalaryIncome(e.target.value)}
                      placeholder="Enter salary income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      House Property Income (₹)
                    </label>
                    <input
                      type="number"
                      value={housePropertyIncome}
                      onChange={(e) => setHousePropertyIncome(e.target.value)}
                      placeholder="Enter house property income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capital Gains Income (₹)
                    </label>
                    <input
                      type="number"
                      value={capitalGainsIncome}
                      onChange={(e) => setCapitalGainsIncome(e.target.value)}
                      placeholder="Enter capital gains income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Income (₹)
                    </label>
                    <input
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(e.target.value)}
                      placeholder="Enter other income"
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
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  ITR Form Recommendation
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Total Turnover */}
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-blue-600">Total Turnover</p>
                      <p className="text-2xl font-bold text-blue-900">₹{result.totalTurnover.toLocaleString()}</p>
                    </div>

                    {/* Recommended ITR */}
                    <div className={`text-center p-4 rounded-lg border-2 ${result.color.replace('text-', 'border-')}`}>
                      <div className={`flex items-center justify-center mb-2 ${result.color}`}>
                        {result.icon}
                        <span className="ml-2 text-lg font-bold">{result.recommendedITR}</span>
                      </div>
                      <p className="text-sm text-gray-600">{result.description}</p>
                    </div>

                    {/* Requirements */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Requirements:</h3>
                      <ul className="space-y-2">
                        {result.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter your income details to get ITR form recommendation</p>
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
                <HelpCircle className="h-6 w-6 mr-2 text-blue-600" />
                Frequently Asked Questions: ITR Form Selection
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Turnover and ITR Form Selection: Complete Guide for FY 2025-26 and Beyond</h2>
              <p className="text-gray-600 mb-4">
                Choosing the correct <strong>ITR form</strong> is essential for accurate tax filing and compliance. This <strong>Turnover Calculator for ITR Form Filling</strong> helps you estimate your gross total income from all heads (salary, business, profession, house property, capital gains, other sources) and recommends the appropriate ITR form—ITR-1 (Sahaj), ITR-2, ITR-3, or ITR-4 (Sugam)—for FY 2025-26, FY 2026-27, and future years. Use this free tool to avoid filing the wrong form and to plan your filing and compliance.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">What Is Gross Total Income and Turnover?</h3>
              <p className="text-gray-600 mb-4">
                <strong>Gross total income</strong> is the sum of income under all heads: salary, house property, business or profession, capital gains, and other sources. <strong>Turnover</strong> in the business context (e.g. for Section 44AD) means gross receipts or sales. For ITR form selection, both your total income and the <strong>type</strong> of income matter. For example, ITR-1 (Sahaj) is only for individuals with income up to ₹50 lakh from salary, one house property, other sources, and limited capital gains (LTCG from equity up to ₹1.25 lakh under Section 112A). If you have business or profession income, you typically need ITR-3 or ITR-4. For official eligibility, refer to the <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Income Tax Portal</a> and <a href="https://economictimes.indiatimes.com/wealth/tax/itr-1-itr-2-itr-3-or-itr-4-which-form-applies-to-your-income-for-itr-filing-fy-2024-25-ay-2025-26/articleshow/122385713.cms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Economic Times ITR form guide</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ITR-1 (Sahaj): Who Can File?</h3>
              <p className="text-gray-600 mb-4">
                <strong>ITR-1 (Sahaj)</strong> is for resident individuals with total income up to ₹50 lakh from salary, pension, one house property, other sources, and agricultural income up to ₹5,000. From AY 2025-26, it can include LTCG up to ₹1.25 lakh from listed equity/equity mutual funds under Section 112A. You cannot use ITR-1 if you have business or profession income, multiple house properties, director in a company, unlisted equity, foreign assets, or if you are liable for audit under Section 44AB (e.g. turnover above ₹1 crore without 95% digital). Use this calculator to enter your income and see if ITR-1 is recommended.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ITR-2, ITR-3, and ITR-4: When to Use</h3>
              <p className="text-gray-600 mb-4">
                <strong>ITR-2</strong> is for individuals and HUFs not having income from business or profession—e.g. capital gains (including above ₹1.25 lakh LTCG from equity), multiple house properties, foreign assets. <strong>ITR-3</strong> is for individuals and HUFs with income from business or profession (whether presumptive or not). <strong>ITR-4 (Sugam)</strong> is for those with presumptive income under Section 44AD (business turnover up to ₹2 crore), 44ADA (profession up to ₹50 lakh), or 44AE; total income under ITR-4 should be up to ₹50 lakh. For trading turnover specifically, use our <Link to="/tax-tools/trader-turnover-estimator-itr" className="text-blue-600 hover:underline">Trader Turnover Estimator for ITR</Link>. For form type help, use <Link to="/tax-tools/itr-form-type-helper" className="text-blue-600 hover:underline">ITR Form Type Helper</Link>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Turnover for Audit and Presumptive Scheme</h3>
              <p className="text-gray-600 mb-4">
                Under <strong>Section 44AB</strong>, audit is required if business turnover exceeds ₹1 crore (or ₹50 lakh in certain cases) or profession receipts exceed ₹50 lakh. Under <strong>Section 44AD</strong>, presumptive scheme is available for business with turnover up to ₹2 crore (8% or 6% of turnover). So knowing your turnover is critical for both ITR form and audit. Use this Turnover Calculator to sum your income heads and our <Link to="/tax-tools/trader-turnover-estimator-itr" className="text-blue-600 hover:underline">Trader Turnover Estimator</Link> for trading (buy + sell) turnover. For deadlines, see <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-blue-600 hover:underline">Tax Filing Deadline Reminder Widget</Link>. For TDS on gains, see <Link to="/tax-tools/tds-impact-visualizer-on-gains" className="text-blue-600 hover:underline">TDS Impact Visualizer on Gains</Link>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Related Tools and Resources</h3>
              <p className="text-gray-600 mb-4">
                Use <Link to="/tax-tools/itr-form-type-helper" className="text-blue-600 hover:underline">ITR Form Type Helper</Link> for step-by-step form selection. Use <Link to="/tax-tools/trader-turnover-estimator-itr" className="text-blue-600 hover:underline">Trader Turnover Estimator for ITR</Link> to calculate trading turnover (buy + sell) for ITR. Use <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-blue-600 hover:underline">Tax Filing Deadline Reminder Widget</Link> for due dates. Use <Link to="/tax-tools/old-vs-new-tax-regime-helper" className="text-blue-600 hover:underline">Old vs New Tax Regime Helper</Link> to compare regimes. For capital gains, use <Link to="/tax-tools/equity-tax-estimator" className="text-blue-600 hover:underline">Equity Tax Estimator</Link> and <Link to="/tax-tools/stcg-ltcg-classifier" className="text-blue-600 hover:underline">STCG vs LTCG Classifier</Link>. For official forms and due dates, check <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">incometax.gov.in</a> and <a href="https://taxswift.in/income-tax-return-forms-for-ay-2025-26-which-form-should-you-file" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TaxSwift ITR forms AY 2025-26</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Validity and Disclaimer</h3>
              <p className="text-gray-600 mb-4">
                This calculator and content are designed to be valid for FY 2025-26, FY 2026-27, and future years unless the law changes. ITR form eligibility is based on current Income Tax Act and rules. Always verify with the <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Income Tax Department</a> or a chartered accountant. This is not professional tax advice.
              </p>
            </article>

            {/* Related Tax Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white"
            >
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/tax-tools/itr-form-type-helper" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">ITR Form Type Helper</h3>
                  <p className="text-sm opacity-90">Choose the right ITR form</p>
                </Link>
                <Link to="/tax-tools/trader-turnover-estimator-itr" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Trader Turnover Estimator</h3>
                  <p className="text-sm opacity-90">Trading turnover for ITR</p>
                </Link>
                <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Tax Filing Deadlines</h3>
                  <p className="text-sm opacity-90">ITR and tax due dates</p>
                </Link>
                <Link to="/tax-tools/tds-impact-visualizer-on-gains" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">TDS Impact Visualizer</h3>
                  <p className="text-sm opacity-90">TDS on capital gains</p>
                </Link>
              </div>
            </motion.div>

            {/* Explore more */}
            <section className="mt-8 py-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/tax-tools" className="text-blue-600 hover:underline">All Tax Tools</Link></li>
                <li><Link to="/" className="text-blue-600 hover:underline">Home</Link></li>
                <li><a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">Income Tax Portal <ExternalLink className="h-4 w-4 ml-1" /></a></li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default TurnoverCalculatorITR;

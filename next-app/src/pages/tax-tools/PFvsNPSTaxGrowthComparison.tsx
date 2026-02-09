import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Calculator, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign, Shield, HelpCircle, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface PFNPSComparison {
  monthlyContribution: number;
  years: number;
  pfCorpus: number;
  npsCorpus: number;
  pfTaxBenefit: number;
  npsTaxBenefit: number;
  pfNetAmount: number;
  npsNetAmount: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const PFvsNPSTaxGrowthComparison: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState<string>('');
  const [years, setYears] = useState<string>('30');
  const [incomeTaxSlab, setIncomeTaxSlab] = useState<string>('30');
  const [comparison, setComparison] = useState<PFNPSComparison | null>(null);

  const calculatePFNPSComparison = () => {
    if (!monthlyContribution || !years || !incomeTaxSlab) {
      alert('Please fill in all fields');
      return;
    }

    const monthly = parseFloat(monthlyContribution);
    const yearsNum = parseFloat(years);
    const taxSlab = parseFloat(incomeTaxSlab);
    
    // PF calculations (8.1% interest, tax-free)
    const pfRate = 8.1;
    const pfCorpus = monthly * 12 * (Math.pow(1 + pfRate/100, yearsNum) - 1) / (pfRate/100);
    const pfTaxBenefit = (monthly * 12 * taxSlab / 100) * yearsNum; // Annual tax benefit
    const pfNetAmount = pfCorpus + pfTaxBenefit;
    
    // NPS calculations (10% interest, partially taxable)
    const npsRate = 10;
    const npsCorpus = monthly * 12 * (Math.pow(1 + npsRate/100, yearsNum) - 1) / (npsRate/100);
    const npsTaxBenefit = (monthly * 12 * taxSlab / 100) * yearsNum; // Annual tax benefit
    const npsTaxOnWithdrawal = npsCorpus * 0.1; // 10% tax on withdrawal
    const npsNetAmount = npsCorpus + npsTaxBenefit - npsTaxOnWithdrawal;
    
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (pfNetAmount > npsNetAmount) {
      recommendation = 'PF is better - Higher net returns with tax-free withdrawals';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else {
      recommendation = 'NPS is better - Higher growth potential despite withdrawal tax';
      color = 'text-blue-600';
      icon = <TrendingUp className="h-5 w-5" />;
    }

    setComparison({
      monthlyContribution: monthly,
      years: yearsNum,
      pfCorpus,
      npsCorpus,
      pfTaxBenefit,
      npsTaxBenefit,
      pfNetAmount,
      npsNetAmount,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setMonthlyContribution('');
    setYears('30');
    setIncomeTaxSlab('30');
    setComparison(null);
  };

  const canonicalUrl = 'https://moneycal.in/tax-tools/pf-vs-nps-tax-growth-comparison';
  const faqData = [
    { question: 'Which is better for retirement: EPF or NPS?', answer: 'It depends on your risk appetite and employment. EPF offers guaranteed returns (currently 8.15% for FY 2024-25) and tax-free withdrawal after 5 years. NPS offers market-linked returns (higher potential but risk) and additional tax benefit under 80CCD(1B) up to ₹50,000; 60% lump sum is tax-free, 40% goes to annuity. Use this PF vs NPS calculator to compare corpus and net amount for your contribution and tenure.' },
    { question: 'Is NPS withdrawal taxable?', answer: 'From FY 2021-22, 60% of NPS corpus at exit is tax-free; 40% must be used to buy annuity (pension), and the pension income is taxable. So lump sum withdrawal is largely tax-free; only annuity is taxable. This calculator models a simplified withdrawal tax; actual annuity taxation depends on your slab.' },
    { question: 'What is the EPF interest rate for 2024-25?', answer: 'EPF interest for FY 2024-25 is 8.15% (declared by EPFO). It is subject to change each year. This calculator uses a representative rate for comparison; check EPFO circulars for the latest rate.' },
    { question: 'Can I have both EPF and NPS?', answer: 'Yes. Salaried employees can have EPF (employer contribution) and also subscribe to NPS for additional tax benefit under 80CCD(1B) up to ₹50,000. Use this tool to compare growth and tax benefits of both for your monthly contribution and tenure.' },
    { question: 'Where can I get official EPF and NPS information?', answer: 'Check EPFO (epfindia.gov.in) for EPF and PFRDA (pfrda.org.in) for NPS. For tax rules, refer to incometax.gov.in. This calculator is for illustration; verify with a financial advisor.' }
  ];

  return (
    <>
      <SEOHelmet
        title="PF vs NPS Tax & Growth Comparison - Compare EPF vs NPS Returns | MoneyCal"
        description="Compare EPF vs NPS tax benefits and growth for retirement. PF vs NPS calculator for FY 2025-26 and beyond. Retirement Planning • Valid 2026–2050."
        keywords="PF vs NPS, EPF vs NPS calculator, retirement planning India, NPS tax benefit, EPF interest rate 2026"
        url={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Tools', url: '/tax-tools' },
          { name: 'PF vs NPS Tax & Growth Comparison', url: '/tax-tools/pf-vs-nps-tax-growth-comparison' }
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
              <p className="text-sm font-medium text-blue-200 mb-2">Retirement Planning • Valid 2026–2050</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                PF vs NPS Tax & Growth Comparison
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Compare EPF and NPS to find the best retirement option for your goals
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
                  Investment Parameters
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Contribution (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      placeholder="Enter monthly contribution"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period (Years)
                    </label>
                    <select
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="10">10 Years</option>
                      <option value="15">15 Years</option>
                      <option value="20">20 Years</option>
                      <option value="25">25 Years</option>
                      <option value="30">30 Years</option>
                      <option value="35">35 Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Income Tax Slab (%)
                    </label>
                    <select
                      value={incomeTaxSlab}
                      onChange={(e) => setIncomeTaxSlab(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="5">5% (Up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L - ₹5L)</option>
                      <option value="30">30% (Above ₹5L)</option>
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculatePFNPSComparison}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Compare Schemes
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
                  Comparison Results
                </h2>

                {comparison ? (
                  <div className="space-y-6">
                    {/* Recommendation */}
                    <div className={`text-center p-4 rounded-lg ${comparison.color.includes('green') ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${comparison.color}`}>
                        {comparison.icon}
                        <span className="ml-2 text-lg font-bold">Recommendation</span>
                      </div>
                      <p className="text-sm text-gray-600">{comparison.recommendation}</p>
                    </div>

                    {/* PF Details */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <Building2 className="h-5 w-5 mr-2" />
                        Employee Provident Fund (EPF)
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Interest Rate:</span>
                          <span className="font-bold text-green-600">8.1%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Corpus Amount:</span>
                          <span className="font-bold text-green-600">₹{comparison.pfCorpus.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Benefits:</span>
                          <span className="font-bold text-green-600">₹{comparison.pfTaxBenefit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Amount:</span>
                          <span className="font-bold text-green-600">₹{comparison.pfNetAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* NPS Details */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        National Pension System (NPS)
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Interest Rate:</span>
                          <span className="font-bold text-blue-600">10%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Corpus Amount:</span>
                          <span className="font-bold text-blue-600">₹{comparison.npsCorpus.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Benefits:</span>
                          <span className="font-bold text-blue-600">₹{comparison.npsTaxBenefit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Withdrawal Tax:</span>
                          <span className="font-bold text-red-600">-₹{(comparison.npsCorpus * 0.1).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Amount:</span>
                          <span className="font-bold text-blue-600">₹{comparison.npsNetAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Investment Period</p>
                        <p className="text-xl font-bold text-purple-600">{comparison.years} years</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Tax Slab</p>
                        <p className="text-xl font-bold text-orange-600">{incomeTaxSlab}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter investment details to compare PF vs NPS</p>
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
                <HelpCircle className="h-6 w-6 mr-2 text-green-600" />
                Frequently Asked Questions: PF vs NPS
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">PF vs NPS Tax & Growth: Complete Guide for Retirement Planning FY 2025-26 and Beyond</h2>
              <p className="text-gray-600 mb-4">
                Comparing <strong>EPF (Employee Provident Fund)</strong> and <strong>NPS (National Pension System)</strong> helps you choose the best retirement and tax-saving option. This <strong>PF vs NPS Tax & Growth Comparison</strong> calculator compares corpus, tax benefits, and net amount for a given monthly contribution and tenure. EPF offers guaranteed returns (currently 8.15% for FY 2024-25) and tax-free withdrawal after 5 years; NPS offers market-linked returns and additional tax benefit under 80CCD(1B) up to ₹50,000, with 60% lump sum tax-free at exit. Use it for FY 2025-26, FY 2026-27, and future years. For official rates, see <a href="https://www.epfindia.gov.in/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">EPFO</a> and <a href="https://www.pfrda.org.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PFRDA</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">EPF: Interest, Tax, and Withdrawal</h3>
              <p className="text-gray-600 mb-4">
                <strong>EPF</strong> offers a government-declared interest rate (8.15% for FY 2024-25). Contribution up to ₹1.5 lakh (employee share) qualifies for 80C deduction. Withdrawal after 5 years of continuous service is <strong>tax-free</strong>; before 5 years, TDS may apply. Use our <Link to="/tax-tools/pf-withdrawal-tax-preview" className="text-green-600 hover:underline">PF Withdrawal Tax Preview</Link> to see TDS on full/partial withdrawal. For 80C planning, use <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="text-green-600 hover:underline">80C Deduction Bucket Visualizer</Link> and <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="text-green-600 hover:underline">NPS Tax Benefit vs Growth Estimator</Link>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">NPS: Tax Benefit and Withdrawal</h3>
              <p className="text-gray-600 mb-4">
                <strong>NPS</strong> offers 80C benefit on employee contribution plus additional <strong>80CCD(1B)</strong> deduction up to <strong>₹50,000</strong>. At exit, 60% of corpus can be withdrawn tax-free; 40% must be used to buy annuity (pension), which is taxable. So NPS lump sum is largely tax-free; only annuity is taxed. This calculator uses a simplified withdrawal tax for comparison; actual annuity taxation depends on your slab. For withdrawal planning, use <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="text-blue-600 hover:underline">Tax-Efficient Withdrawal Planner</Link> and <Link to="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" className="text-blue-600 hover:underline">ELSS Lock-in vs Tax Benefit Visualizer</Link>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Related Tools and Resources</h3>
              <p className="text-gray-600 mb-4">
                Use <Link to="/tax-tools/pf-withdrawal-tax-preview" className="text-green-600 hover:underline">PF Withdrawal Tax Preview</Link> for EPF TDS. Use <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="text-blue-600 hover:underline">NPS Tax Benefit vs Growth Estimator</Link> for NPS. Use <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="text-green-600 hover:underline">80C Deduction Bucket Visualizer</Link> and <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="text-blue-600 hover:underline">Tax-Efficient Withdrawal Planner</Link>. For official info, check <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">incometax.gov.in</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Validity and Disclaimer</h3>
              <p className="text-gray-600 mb-4">
                This calculator and content are valid for FY 2025-26, FY 2026-27, and future years unless the law changes. EPF and NPS rules are based on current law. Verify with EPFO, PFRDA, or a financial advisor. This is not professional advice.
              </p>
            </article>

            {/* Related Tax Tools */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/tax-tools/pf-withdrawal-tax-preview" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">PF Withdrawal Tax Preview</h3>
                  <p className="text-sm opacity-90">EPF TDS and tax-free withdrawal</p>
                </Link>
                <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">NPS Tax Benefit vs Growth</h3>
                  <p className="text-sm opacity-90">NPS returns and tax benefit</p>
                </Link>
                <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">80C Deduction Bucket</h3>
                  <p className="text-sm opacity-90">Optimize 80C investments</p>
                </Link>
                <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Withdrawal Planner</h3>
                  <p className="text-sm opacity-90">Tax-efficient withdrawals</p>
                </Link>
              </div>
            </motion.div>

            {/* Explore more */}
            <section className="mt-8 py-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/tax-tools" className="text-green-600 hover:underline">All Tax Tools</Link></li>
                <li><Link to="/" className="text-green-600 hover:underline">Home</Link></li>
                <li><a href="https://www.epfindia.gov.in/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline inline-flex items-center">EPFO <ExternalLink className="h-4 w-4 ml-1" /></a></li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default PFvsNPSTaxGrowthComparison;

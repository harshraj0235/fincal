import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Shield, Award,
  AlertTriangle, Calculator, Target, HelpCircle, Percent, Building,
  Home, PieChart, DollarSign, FileText, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const CapitalGainsTax: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [salePrice, setSalePrice] = useState(800000);
  const [holdingPeriod, setHoldingPeriod] = useState(18);
  const [assetType, setAssetType] = useState<'equity' | 'debt' | 'property'>('equity');

  const capitalGains = salePrice - purchasePrice;
  const isLongTerm = (assetType === 'equity' && holdingPeriod >= 12) || 
                     (assetType === 'debt' && holdingPeriod >= 36) || 
                     (assetType === 'property' && holdingPeriod >= 24);
  
  let taxRate = 0;
  let exemption = 0;
  
  if (assetType === 'equity') {
    if (isLongTerm) {
      taxRate = 12.5;
      exemption = 125000;
    } else {
      taxRate = 20;
    }
  } else if (assetType === 'debt') {
    if (isLongTerm) {
      taxRate = 20; // with indexation
    } else {
      taxRate = 30; // as per slab
    }
  } else if (assetType === 'property') {
    if (isLongTerm) {
      taxRate = 20; // with indexation
    } else {
      taxRate = 30; // as per slab
    }
  }

  const taxableGains = Math.max(0, capitalGains - exemption);
  const tax = (taxableGains * taxRate) / 100;

  const faqData = [
    {
      question: "What is LTCG and STCG in simple terms?",
      answer: "Capital Gains = Profit from selling assets (shares, property, gold). LTCG = Long-term (held more than 1 year for equity, more than 3 years for debt/gold). STCG = Short-term (sold before this period). LTCG taxed lower + exemptions. STCG taxed higher!"
    },
    {
      question: "How much is LTCG tax on equity mutual funds/stocks?",
      answer: "12.5% tax on gains above ₹1.25 lakh per financial year. Example: ₹3L gains → First ₹1.25L exempt, remaining ₹1.75L taxed at 12.5% = ₹21,875 tax. Gains below ₹1.25L = zero tax!"
    },
    {
      question: "How much is STCG tax on equity?",
      answer: "20% flat tax (no exemption). Example: Bought shares ₹5L, sold after 6 months for ₹6L → Profit ₹1L → Tax = ₹20,000. Hold for 6 more months to get LTCG benefit (12.5% + ₹1.25L exemption)!"
    },
    {
      question: "What is capital gains tax on property/real estate?",
      answer: "LTCG (held more than 2 years): 20% with indexation benefit. STCG (held less than 2 years): 30% (as per slab). Example: Bought flat ₹50L (2020), sold ₹80L (2024) → ₹30L profit → After indexation ₹20L taxable → Tax = ₹4L (20%)."
    },
    {
      question: "What is indexation benefit in capital gains?",
      answer: "Indexation: Adjusting purchase price for inflation. Only for LTCG on debt/property. Example: Bought property ₹50L (2010), sold ₹1Cr (2024). Inflation-adjusted purchase price = ₹50L × 1.8 (CII) = ₹90L. Taxable gain = ₹1Cr - ₹90L = ₹10L (instead of ₹50L!). Tax saved!"
    },
    {
      question: "Do I need to pay capital gains tax on ELSS after 3 years?",
      answer: "YES! ELSS is equity fund → LTCG 12.5% above ₹1.25L exemption. Lock-in is 3 years (cannot sell), but tax depends on holding period. Sell after 3 years → LTCG 12.5%. If profit under ₹1.25L/year → Zero tax! ELSS investment gets 80C deduction (separate benefit)."
    },
    {
      question: "How to save tax on capital gains legally?",
      answer: "5 ways: (1) Tax harvesting (use ₹1.25L exemption yearly), (2) Hold more than 1 year for LTCG benefit, (3) Spread sales across financial years, (4) Section 54 (reinvest property gains in another property), (5) Section 54EC (invest LTCG in bonds)."
    },
    {
      question: "What is capital gains tax on gold/debt mutual funds?",
      answer: "LTCG (held more than 3 years): 20% with indexation. STCG (held less than 3 years): 30% (as per slab). Example: Gold ETF bought ₹5L, sold after 4 years for ₹7L → ₹2L profit → After indexation ₹1.2L taxable → Tax = ₹24,000 (20%)."
    },
    {
      question: "Do I need to report small capital gains in ITR?",
      answer: "YES! Report ALL capital gains even if ₹100 profit. Why: (1) Broker reports to IT department (AI matches), (2) Can carry forward losses if any, (3) Use ₹1.25L exemption. File ITR-2 for capital gains (not ITR-1)."
    },
    {
      question: "What is capital loss and how to use it?",
      answer: "Capital loss: When you sell at loss. Can offset against capital gains (same type). STCG loss vs STCG gain OR LTCG gain. LTCG loss only vs LTCG gain. Can carry forward losses for 8 years! Must file ITR on time to carry forward."
    },
    {
      question: "Is there any exemption from capital gains tax?",
      answer: "YES! (1) Equity LTCG: ₹1.25L/year exempt, (2) Section 54 (property): Invest in another house (₹10 Cr limit), (3) Section 54EC: Invest LTCG in NHAI/REC bonds (₹50L limit), (4) Section 54F: Invest LTCG in house (full exemption if use all gains)."
    },
    {
      question: "How to calculate capital gains on shares bought at different prices?",
      answer: "Use FIFO (First In First Out) or Average Cost. Most brokers use FIFO. Example: Bought 100 shares @ ₹500 (Jan), 100 @ ₹600 (Mar). Sold 100 shares @ ₹700 (Dec) → FIFO: Profit = ₹700 - ₹500 = ₹200/share × 100 = ₹20K. Broker's capital gains statement auto-calculates!"
    },
    {
      question: "NRI taxation on capital gains?",
      answer: "Same rates as residents BUT TDS: 12.5% on LTCG (equity), 20% on STCG (equity). NRI must file ITR-2 in India even if resident abroad. Plus: May need to pay tax in country of residence (India-country DTAA applies to avoid double taxation)."
    },
    {
      question: "What happens if I don't report capital gains?",
      answer: "IT department knows! Brokers report all sales (via AIR - Annual Information Return). If not reported: (1) Notice u/s 148, (2) Tax + 50% penalty + 12% interest, (3) Prosecution if concealment. Always report even if no profit - show loss!"
    },
    {
      question: "Can I set off capital loss against salary income?",
      answer: "NO! Capital loss can only be set off against capital gains (not salary/business income). But: Carry forward for 8 years to offset future capital gains. Must file ITR on time to carry forward losses!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Capital Gains Tax 2025: LTCG, STCG on Equity, Debt, Property | Indexation, Exemptions India | MoneyCal"
        description="Master capital gains taxation in India: Long-term vs short-term holding period, tax rates on equity (12.5% LTCG, 20% STCG), debt (20% with indexation), property (20% LTCG). ₹1.25L exemption on equity. Section 54/54EC/54F exemptions. Tax harvesting strategies. Hindi + English"
        keywords="capital gains tax India 2025, LTCG STCG, equity taxation, property tax, indexation benefit, section 54, tax harvesting, carry forward losses, पूंजीगत लाभ कर"
        url="/learn/taxation-compliance/capital-gains-tax-ltcg-stcg-equity-debt-property-india-2025"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Taxation</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 5 of 7</span>
                <Link 
                  to="/learn/taxation-compliance"
                  className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  <span className="hidden sm:inline">Back to Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-pink-600 uppercase tracking-wide">
                  Lesson 5 • 45 Minutes • Intermediate
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Capital Gains Tax 2025</h1>
                <p className="text-xl text-gray-600 mt-1">LTCG, STCG on Equity, Debt, Property</p>
              </div>
            </div>
          </motion.div>

          {/* Calculator */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-br from-pink-600 to-rose-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <IndianRupee className="w-8 h-8" />
                🧮 Capital Gains Tax Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Asset Type</label>
                  <select
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value as 'equity' | 'debt' | 'property')}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-lg"
                  >
                    <option value="equity">Equity (Shares/Equity MF)</option>
                    <option value="debt">Debt (Debt MF/Gold)</option>
                    <option value="property">Property (House/Land)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Holding Period (Months)</label>
                  <input
                    type="number"
                    value={holdingPeriod}
                    onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Purchase Price (₹)</label>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Sale Price (₹)</label>
                  <input
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">Capital Gains</div>
                  <div className="text-3xl font-bold">₹{capitalGains.toLocaleString('en-IN')}</div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">Type</div>
                  <div className="text-2xl font-bold">{isLongTerm ? 'LTCG' : 'STCG'}</div>
                  <div className="text-sm opacity-75">Tax Rate: {taxRate}%</div>
                </div>

                <div className="bg-green-500 rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">Tax Payable</div>
                  <div className="text-3xl font-bold">₹{tax.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {exemption > 0 && capitalGains > exemption && (
                <div className="mt-4 bg-yellow-400 text-gray-900 rounded-xl p-4 text-center">
                  <p className="text-sm">First ₹{exemption.toLocaleString('en-IN')} exempt! Tax on remaining ₹{taxableGains.toLocaleString('en-IN')} only.</p>
                </div>
              )}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                ❓ Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Q{index + 1}: {faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Equity LTCG:</strong> 12.5% above ₹1.25L. Hold more than 1 year!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Equity STCG:</strong> 20% flat. Wait 6 more months to save tax!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Property LTCG:</strong> 20% with indexation (hold more than 2 years)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Tax harvesting:</strong> Use ₹1.25L exemption every year (sell & buy back)</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related Links */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Lessons</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/learn/taxation-compliance/itr-filing-complete-guide-online-income-tax-return-india-2025" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <FileText className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">ITR Filing</h3>
                  <p className="text-sm text-gray-600">Report capital gains</p>
                </Link>
                <Link to="/learn/taxation-compliance/tax-planning-strategies-minimize-tax-liability-legally-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Tax Planning</h3>
                  <p className="text-sm text-gray-600">Save ₹1L/year</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Course Complete */}
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-12 h-12" />
              <h3 className="text-3xl font-bold">🎉 Lesson Complete!</h3>
            </div>
            <p className="text-xl mb-6">Master advance tax next!</p>
            <Link
              to="/learn/taxation-compliance/advance-tax-payment-due-dates-calculation-penalty-india"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-pink-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next: Advance Tax
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CapitalGainsTax;

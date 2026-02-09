import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Info, AlertCircle, TrendingUp, TrendingDown, DollarSign, Clock, BarChart3, ChevronRight, ChevronDown, Sparkles, FileText, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
interface TaxComparison {
  intradayTax: number;
  deliveryTax: number;
  taxDifference: number;
  recommendation: string;
  explanation: string;
  advantages: string[];
  disadvantages: string[];
}

const IntradayVsDeliveryTaxCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [result, setResult] = useState<TaxComparison | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateTax = () => {
    if (!purchasePrice || !salePrice || !quantity) {
      alert('Please fill in all required fields');
      return;
    }

    const purchase = parseFloat(purchasePrice);
    const sale = parseFloat(salePrice);
    const qty = parseInt(quantity);
    const otherInc = parseFloat(otherIncome) || 0;

    const profit = (sale - purchase) * qty;
    const totalIncome = profit + otherInc;

    // Intraday trading (STCG) - 20% flat rate (Budget 2024)
    const intradayTax = profit * 0.20;

    // Delivery trading - depends on holding period
    let deliveryTax = 0;
    let recommendation = '';
    let explanation = '';
    let advantages: string[] = [];
    let disadvantages: string[] = [];

    if (profit > 0) {
      // For delivery, we assume it's STCG (less than 1 year) for comparison
      // In reality, delivery could be LTCG if held for more than 1 year (12.5% + ₹1.25L exemption)
      deliveryTax = profit * 0.20; // Same as intraday for STCG (Budget 2024)
      
      if (intradayTax < deliveryTax) {
        recommendation = 'Intraday Trading';
        explanation = 'Intraday trading has lower tax burden in this scenario';
        advantages = [
          'Lower tax burden',
          'No overnight risk',
          'Quick profit realization',
          'No margin requirements for delivery'
        ];
        disadvantages = [
          'Higher brokerage costs',
          'Requires constant monitoring',
          'Limited to same day',
          'Higher risk due to leverage'
        ];
      } else {
        recommendation = 'Delivery Trading';
        explanation = 'Delivery trading is more tax-efficient in this scenario';
        advantages = [
          'Potential for LTCG benefits',
          'Lower brokerage costs',
          'No time pressure',
          'Can hold for long-term gains'
        ];
        disadvantages = [
          'Overnight market risk',
          'Requires more capital',
          'Longer holding period needed',
          'Higher tax if STCG'
        ];
      }
    } else {
      // Loss scenario
      recommendation = 'Both have similar tax treatment for losses';
      explanation = 'Losses can be carried forward for 8 years in both cases';
      advantages = [
        'Losses can be carried forward',
        'Can be set off against future gains',
        'No immediate tax liability'
      ];
      disadvantages = [
        'No immediate tax benefit',
        'Requires proper documentation',
        'Must file ITR to carry forward'
      ];
    }

    setResult({
      intradayTax,
      deliveryTax,
      taxDifference: Math.abs(intradayTax - deliveryTax),
      recommendation,
      explanation,
      advantages,
      disadvantages
    });
  };

  const resetForm = () => {
    setPurchasePrice('');
    setSalePrice('');
    setQuantity('');
    setOtherIncome('');
    setResult(null);
  };

  const relatedTools = [
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains as short or long term' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Tax by assessment year' },
    { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial holding sales' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan LTCG gains' },
    { name: 'Gifted Shares Tax', path: '/tax-tools/gifted-shares-tax-estimator', desc: 'Tax on gifted shares' },
    { name: 'Bonus Shares Tax', path: '/tax-tools/bonus-shares-tax-impact-tool', desc: 'Bonus share tax impact' },
    { name: 'Intra-Year Redemption Tracker', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
    { name: 'Tax Loss Harvesting', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains with losses' },
  ];

  const faqs = [
    { q: 'Is intraday profit taxed as capital gains?', a: 'No. Intraday trading (buy and sell on the same day) is treated as business income and taxed as per your income slab, not as STCG. Delivery-based equity (shares held) is taxed as STCG (20% if held ≤12 months) or LTCG (12.5% with ₹1.25L exemption if held >12 months) as per Budget 2024.' },
    { q: 'What are the current STCG and LTCG rates for equity (2024-25)?', a: 'As per Budget 2024 (effective 23 July 2024), STCG on listed equity is 20% and LTCG is 12.5% with an annual exemption of ₹1,25,000. Budget 2025 left these unchanged.' },
    { q: 'When is delivery trading better than intraday for tax?', a: 'If you hold delivery for more than 12 months, gains qualify as LTCG and you get the ₹1.25L annual exemption plus 12.5% rate on the balance. Intraday profits have no such exemption and are taxed as business income at slab rates.' },
    { q: 'Can I use the LTCG exemption for multiple sales in a year?', a: 'Yes. The ₹1,25,000 LTCG exemption is per financial year and applies to your total LTCG from equity and equity funds. Use our Offset LTCG with Annual Exemptions Tool to plan multiple sales.' },
  ];

  return (
    <>
      <SEOHelmet
        title="Intraday vs Delivery Tax Calculator – Compare Trading Tax 2024-25 | MoneyCal"
        description="Compare tax implications of intraday vs delivery trading. Budget 2024: STCG 20%, LTCG 12.5%, ₹1.25L exemption. Get recommendations and tax comparison."
        keywords="intraday vs delivery tax calculator, trading tax comparison, STCG 20 percent, LTCG 12.5, capital gains tax India 2024, delivery trading tax"
        canonicalUrl="/tax-tools/intraday-vs-delivery-tax-calculator"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/tax-tools" className="hover:text-blue-600">Tax Tools</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Intraday vs Delivery Tax</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-12 pb-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Capital Gains Tax • Budget 2024/2025
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
              Intraday vs Delivery Tax Calculator
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
              Compare tax implications of intraday vs delivery trading. Latest rates: STCG 20%, LTCG 12.5%, ₹1.25L exemption.
            </motion.p>
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
                  Trade Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Price (₹)
                    </label>
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      placeholder="Enter purchase price per share"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Price (₹)
                    </label>
                    <input
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="Enter sale price per share"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity (Shares)
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter number of shares"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Income (₹) - Optional
                    </label>
                    <input
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(e.target.value)}
                      placeholder="Enter other income for context"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTax}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Compare Tax
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
                  Tax Comparison
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Tax Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-red-600 mx-auto mb-2" />
                        <p className="text-sm text-red-600">Intraday Tax</p>
                        <p className="text-xl font-bold text-red-900">₹{result.intradayTax.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <TrendingDown className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Delivery Tax</p>
                        <p className="text-xl font-bold text-blue-900">₹{result.deliveryTax.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                      <h3 className="font-semibold text-green-900 mb-2">Recommendation</h3>
                      <p className="text-green-800 font-bold">{result.recommendation}</p>
                      <p className="text-sm text-green-700 mt-2">{result.explanation}</p>
                    </div>

                    {/* Tax Difference */}
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-purple-600">Tax Difference</p>
                      <p className="text-2xl font-bold text-purple-900">₹{result.taxDifference.toLocaleString()}</p>
                    </div>

                    {/* Advantages and Disadvantages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Advantages
                        </h3>
                        <ul className="space-y-1">
                          {result.advantages.map((adv, index) => (
                            <li key={index} className="text-sm text-green-700">• {adv}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-red-900 mb-3 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Disadvantages
                        </h3>
                        <ul className="space-y-1">
                          {result.disadvantages.map((dis, index) => (
                            <li key={index} className="text-sm text-red-700">• {dis}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter trade details to compare tax implications</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding Intraday vs Delivery Tax
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Intraday Trading
                  </h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Treated as business income (not STCG)</li>
                    <li>• Taxed as per your income slab</li>
                    <li>• No holding period benefits</li>
                    <li>• Higher brokerage costs</li>
                    <li>• Same day buy and sell</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Delivery Trading
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• STCG 20% if held ≤ 12 months (Budget 2024)</li>
                    <li>• LTCG 12.5% if held &gt; 12 months</li>
                    <li>• ₹1.25L annual LTCG exemption</li>
                    <li>• Lower brokerage costs</li>
                    <li>• Can hold for long term</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• This calculator provides general guidance only</li>
                  <li>• Consult a tax professional for accurate advice</li>
                  <li>• Tax rates as per Budget 2024 (STCG 20%, LTCG 12.5%, ₹1.25L exemption)</li>
                  <li>• Consider brokerage and other costs in decision</li>
                </ul>
              </div>

              {/* Related tools */}
              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Related tax tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedTools.map((tool) => (
                  <Link key={tool.path} to={tool.path} className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                    <ChevronRight className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-indigo-700">{tool.name}</p>
                      <p className="text-sm text-slate-500">{tool.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* FAQ */}
              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Frequently asked questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-900 hover:bg-slate-50">
                      {faq.q}
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t border-slate-200">
                          <p className="p-4 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* SEO content */}
              <article className="mt-12 pt-12 border-t border-slate-200">
                <h2 id="intraday-delivery-guide" className="text-2xl font-bold text-slate-900 mb-4">Intraday vs Delivery: Tax Comparison Guide (2024-25)</h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p><strong>Intraday trading</strong> (buy and sell the same day) does not involve delivery; profits are <strong>business income</strong> and taxed at your slab rate. <strong>Delivery trading</strong> (shares held in demat) is taxed as <strong>STCG</strong> (20% if held ≤12 months) or <strong>LTCG</strong> (12.5% with ₹1,25,000 annual exemption if held &gt;12 months) as per Budget 2024. Use our <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline font-medium">STCG vs LTCG Classifier</Link> to check holding period, and our <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline font-medium">Equity Tax Estimator</Link> for assessment-year-wise tax. For partial sales see <Link to="/tax-tools/tax-on-partial-selloff-calculator" className="text-indigo-600 hover:underline font-medium">Tax on Partial Selloff Calculator</Link>. Official rates: <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Income Tax India</a>; <a href="https://economictimes.indiatimes.com/wealth/tax" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times – Tax</a>.</p>
                  <p>Explore more on <Link to="/blog?category=Tax" className="text-indigo-600 hover:underline font-medium">Blog</Link>, <Link to="/news" className="text-indigo-600 hover:underline font-medium">News</Link>, and <Link to="/tax-tools" className="text-indigo-600 hover:underline font-medium">Tax Tools</Link>. This tool is for illustration; consult a CA for personal advice.</p>
                </div>
              </article>

              {/* Explore more */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <Link to="/blog?category=Tax" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
                  <FileText className="h-10 w-10 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700">Tax & investment blog</p>
                    <p className="text-sm text-slate-500">Articles on capital gains and planning</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
                </Link>
                <Link to="/news" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
                  <ExternalLink className="h-10 w-10 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700">Latest news</p>
                    <p className="text-sm text-slate-500">Markets and tax updates</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
                </Link>
                <Link to="/tax-tools" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
                  <Calculator className="h-10 w-10 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700">All tax tools</p>
                    <p className="text-sm text-slate-500">Calculators for tax planning</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IntradayVsDeliveryTaxCalculator;

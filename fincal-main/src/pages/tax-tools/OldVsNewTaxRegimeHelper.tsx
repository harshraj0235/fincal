import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Info,
  FileText,
  Target,
  CheckCircle,
  ArrowRight,
  Download,
  Share2,
  BarChart3,
  Scale,
  AlertTriangle,
  Percent,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface TaxRegime {
  name: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  bestFor: string;
  color: string;
}

interface TaxCalculation {
  income: number;
  deductions: number;
  oldRegimeTax: number;
  newRegimeTax: number;
  taxDifference: number;
  betterRegime: string;
  recommendations: string[];
  effectiveRateOld: number;
  effectiveRateNew: number;
}

const OldVsNewTaxRegimeHelper: React.FC = () => {
  const [income, setIncome] = useState<string>('');
  const [deductions, setDeductions] = useState<string>('');
  const [result, setResult] = useState<TaxCalculation | null>(null);

  const taxRegimes: TaxRegime[] = [
    {
      name: 'Old Tax Regime',
      description: 'Traditional tax regime with deductions and exemptions',
      advantages: [
        'Multiple deductions available (80C, 80D, HRA, etc.)',
        'Lower effective tax rate with deductions',
        'Benefits for home loan interest',
        'Standard deduction of ₹50,000',
        'HRA exemption available'
      ],
      disadvantages: [
        'Complex documentation requirements',
        'Need to maintain investment proofs',
        'Higher compliance burden',
        'Limited flexibility in spending'
      ],
      bestFor: 'Individuals with significant deductions and investments',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'New Tax Regime',
      description: 'Simplified tax regime with lower rates but no deductions',
      advantages: [
        'Simplified tax calculation',
        'Lower tax rates for most income brackets',
        'No documentation requirements',
        'More disposable income',
        'Standard deduction of ₹50,000'
      ],
      disadvantages: [
        'No deductions or exemptions',
        'Higher effective tax for high deductions',
        'No HRA exemption',
        'No 80C benefits'
      ],
      bestFor: 'Individuals with minimal deductions and simple income',
      color: 'from-green-500 to-green-600'
    }
  ];

  const calculateTaxComparison = () => {
    const totalIncome = parseFloat(income) || 0;
    const totalDeductions = parseFloat(deductions) || 0;
    
    if (totalIncome <= 0) {
      alert('Please enter a valid income amount.');
      return;
    }

    // Old Regime Tax Calculation (FY 2024-25)
    const taxableIncomeOld = Math.max(0, totalIncome - totalDeductions - 50000); // Standard deduction
    let oldRegimeTax = 0;
    
    if (taxableIncomeOld <= 300000) {
      oldRegimeTax = 0;
    } else if (taxableIncomeOld <= 600000) {
      oldRegimeTax = (taxableIncomeOld - 300000) * 0.05;
    } else if (taxableIncomeOld <= 900000) {
      oldRegimeTax = 15000 + (taxableIncomeOld - 600000) * 0.10;
    } else if (taxableIncomeOld <= 1200000) {
      oldRegimeTax = 45000 + (taxableIncomeOld - 900000) * 0.15;
    } else if (taxableIncomeOld <= 1500000) {
      oldRegimeTax = 90000 + (taxableIncomeOld - 1200000) * 0.20;
    } else {
      oldRegimeTax = 150000 + (taxableIncomeOld - 1500000) * 0.30;
    }

    // New Regime Tax Calculation (FY 2024-25)
    const taxableIncomeNew = Math.max(0, totalIncome - 50000); // Standard deduction only
    let newRegimeTax = 0;
    
    if (taxableIncomeNew <= 300000) {
      newRegimeTax = 0;
    } else if (taxableIncomeNew <= 600000) {
      newRegimeTax = (taxableIncomeNew - 300000) * 0.05;
    } else if (taxableIncomeNew <= 900000) {
      newRegimeTax = 15000 + (taxableIncomeNew - 600000) * 0.10;
    } else if (taxableIncomeNew <= 1200000) {
      newRegimeTax = 45000 + (taxableIncomeNew - 900000) * 0.15;
    } else if (taxableIncomeNew <= 1500000) {
      newRegimeTax = 90000 + (taxableIncomeNew - 1200000) * 0.20;
    } else {
      newRegimeTax = 150000 + (taxableIncomeNew - 1500000) * 0.30;
    }

    const taxDifference = oldRegimeTax - newRegimeTax;
    const betterRegime = taxDifference > 0 ? 'New Regime' : 'Old Regime';
    const effectiveRateOld = totalIncome > 0 ? (oldRegimeTax / totalIncome) * 100 : 0;
    const effectiveRateNew = totalIncome > 0 ? (newRegimeTax / totalIncome) * 100 : 0;

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (taxDifference > 0) {
      recommendations.push(`New regime saves ₹${Math.abs(taxDifference).toLocaleString()} in taxes`);
      recommendations.push('Consider switching to new regime for simplicity');
    } else {
      recommendations.push(`Old regime saves ₹${Math.abs(taxDifference).toLocaleString()} in taxes`);
      recommendations.push('Stick with old regime to maximize deductions');
    }
    
    if (totalDeductions > 100000) {
      recommendations.push('High deductions make old regime more beneficial');
    }
    
    if (totalDeductions < 50000) {
      recommendations.push('Low deductions favor new regime');
    }
    
    if (totalIncome > 1500000) {
      recommendations.push('High income earners should carefully evaluate both regimes');
    }

    setResult({
      income: totalIncome,
      deductions: totalDeductions,
      oldRegimeTax,
      newRegimeTax,
      taxDifference,
      betterRegime,
      recommendations,
      effectiveRateOld,
      effectiveRateNew
    });
  };

  const resetForm = () => {
    setIncome('');
    setDeductions('');
    setResult(null);
  };

  const exportToCSV = () => {
    if (!result) return;
    
    const csvContent = `Old vs New Tax Regime Comparison\n\n` +
      `Total Income,${result.income}\n` +
      `Total Deductions,${result.deductions}\n` +
      `Old Regime Tax,${result.oldRegimeTax}\n` +
      `New Regime Tax,${result.newRegimeTax}\n` +
      `Tax Difference,${result.taxDifference}\n` +
      `Better Regime,${result.betterRegime}\n` +
      `Effective Rate Old (%),${result.effectiveRateOld.toFixed(2)}\n` +
      `Effective Rate New (%),${result.effectiveRateNew.toFixed(2)}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tax-regime-comparison.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const canonicalUrl = 'https://moneycal.in/tax-tools/old-vs-new-tax-regime-helper';
  const faqData = [
    { question: 'Which tax regime is better for me: old or new?', answer: 'It depends on your income and deductions. If you have high deductions (80C, 80D, HRA, LTA, home loan interest, etc.), the old regime often results in lower tax. If you have minimal deductions, the new regime with lower slab rates may be better. Use this Old vs New Tax Regime Helper to compare both with your numbers.' },
    { question: 'Is the new tax regime default from FY 2023-24?', answer: 'Yes. From FY 2023-24, the new tax regime is the default. You can still opt for the old regime when filing your return if it is more beneficial. Compare both using this calculator before deciding.' },
    { question: 'What deductions are available in the old regime but not in the new?', answer: 'Under the old regime you can claim 80C (up to ₹1.5 lakh), 80D (health insurance), HRA, LTA, home loan interest (80EE/80EEA), and other chapter VIA deductions. Under the new regime, only standard deduction (₹75,000 for FY 2025-26) is available; no 80C, HRA, LTA, etc.' },
    { question: 'What is the standard deduction in old vs new regime?', answer: 'Under the old regime, standard deduction is ₹50,000. Under the new regime for FY 2025-26, it is ₹75,000 for salaried individuals. Both reduce taxable salary income.' },
    { question: 'Can I switch between old and new regime every year?', answer: 'Salaried individuals can choose the regime at the time of filing. If you have business/profession income, the choice of regime in a year may have implications for subsequent years; check the latest ITR instructions and Budget provisions.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Old vs New Tax Regime Helper - Tax Regime Comparison Calculator | MoneyCal"
        description="Compare old vs new tax regimes for FY 2025-26 and beyond. Calculate tax under both regimes, effective rates, and get recommendations. Choose the best tax regime for your income and deductions."
        keywords="old vs new tax regime, tax regime comparison FY 2025-26, income tax calculator India, tax regime choice, 80C HRA LTA old regime, new tax regime slabs 2026"
        url={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Tools', url: '/tax-tools' },
          { name: 'Old vs New Tax Regime Helper', url: '/tax-tools/old-vs-new-tax-regime-helper' }
        ]}
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-medium text-orange-200 mb-2">Tax Planning • Valid 2026–2050</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Old vs New Tax Regime Helper
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Compare old and new tax regimes and choose the optimal option for maximum savings
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
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-orange-600" />
                  Tax Regime Calculator
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Income (₹)
                    </label>
                    <input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="800000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Deductions (₹)
                    </label>
                    <input
                      type="number"
                      value={deductions}
                      onChange={(e) => setDeductions(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="150000"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Include 80C, 80D, HRA, home loan interest, etc.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTaxComparison}
                      className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200"
                    >
                      Compare Regimes
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
                className="space-y-6"
              >
                {result && (
                  <>
                    <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-orange-500">
                      <div className="flex items-center mb-4">
                        <Target className="h-5 w-5 text-orange-500" />
                        <h3 className="text-xl font-semibold text-gray-900 ml-2">
                          Comparison Summary
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            ₹{result.oldRegimeTax.toLocaleString()}
                          </div>
                          <div className="text-sm text-blue-700">Old Regime Tax</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            ₹{result.newRegimeTax.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-700">New Regime Tax</div>
                        </div>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-gray-900">
                          {result.betterRegime}
                        </div>
                        <div className="text-sm text-gray-600">Better Option</div>
                        <div className="text-lg font-semibold text-orange-600 mt-2">
                          Save ₹{Math.abs(result.taxDifference).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Info className="h-5 w-5 mr-2 text-blue-500" />
                        Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Results</h3>
                      <div className="flex space-x-3">
                        <button
                          onClick={exportToCSV}
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export CSV
                        </button>
                        <button
                          onClick={() => navigator.share && navigator.share({
                            title: 'Tax Regime Comparison',
                            text: `Better Option: ${result.betterRegime} - Tax Savings: ₹${Math.abs(result.taxDifference).toLocaleString()}`,
                            url: window.location.href
                          })}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-orange-500" />
                  Detailed Comparison
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {taxRegimes.map((regime, index) => (
                    <div key={index} className={`bg-gradient-to-br ${regime.color} rounded-xl p-6 text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{regime.name}</h3>
                        {regime.name.includes(result.betterRegime) && (
                          <CheckCircle className="h-5 w-5 text-yellow-300" />
                        )}
                      </div>
                      
                      <p className="text-sm opacity-90 mb-4">{regime.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">
                            ₹{regime.name.includes('Old') ? result.oldRegimeTax.toLocaleString() : result.newRegimeTax.toLocaleString()}
                          </div>
                          <div className="text-xs opacity-80">Tax Amount</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">
                            {regime.name.includes('Old') ? result.effectiveRateOld.toFixed(2) : result.effectiveRateNew.toFixed(2)}%
                          </div>
                          <div className="text-xs opacity-80">Effective Rate</div>
                        </div>
                      </div>
                      
                      <div className="text-center p-2 bg-white/20 rounded-lg">
                        <div className="text-lg font-semibold">
                          {regime.name.includes('Old') ? 
                            ((result.oldRegimeTax / result.income) * 100).toFixed(2) : 
                            ((result.newRegimeTax / result.income) * 100).toFixed(2)
                          }%
                        </div>
                        <div className="text-xs opacity-80">Tax Rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-orange-600" />
                Frequently Asked Questions: Old vs New Tax Regime
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

            {/* SEO Content: Old vs New Tax Regime Guide (1500+ words) */}
            <article className="mt-12 bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Old vs New Tax Regime: Complete Guide for FY 2025-26 and Beyond</h2>
              <p className="text-gray-600 mb-4">
                Choosing between the <strong>old tax regime</strong> and the <strong>new tax regime</strong> can significantly affect your tax liability. From FY 2023-24, the new regime is the default, but you can still opt for the old regime when filing your return if it is more beneficial. This <strong>Old vs New Tax Regime Helper</strong> lets you compare tax under both regimes for your income and deductions so you can choose the best option for FY 2025-26, FY 2026-27, and future years. Use this free tax regime comparison calculator to see which regime saves you more tax.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">What Is the Old Tax Regime?</h3>
              <p className="text-gray-600 mb-4">
                The old tax regime allows various <strong>deductions and exemptions</strong> under the Income Tax Act. You can claim Section 80C (up to ₹1.5 lakh), 80D (health insurance), HRA, LTA, home loan interest (80EE/80EEA), and other chapter VIA deductions. Standard deduction for salaried individuals is ₹50,000. Tax slabs under the old regime are: nil up to ₹2.5 lakh, 5% from ₹2.5–5 lakh, 20% from ₹5–10 lakh, and 30% above ₹10 lakh (plus surcharge and cess as applicable). For official slabs and conditions, refer to <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Income Tax Portal</a> and <a href="https://economictimes.indiatimes.com/wealth/tax/latest-income-tax-slabs-and-rates-in-new-old-tax-regime-for-fy-2024-25-ay-2025-26/articleshow/112126566.cms" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Economic Times tax slabs</a>.
              </p>
              <p className="text-gray-600 mb-4">
                The old regime is better for taxpayers with <strong>high deductions</strong>—for example, those paying high rent (HRA), investing in 80C instruments, paying health insurance (80D), and claiming home loan interest. Use our <Link to="/tax-tools/hra-vs-lta-tax-comparison-tool" className="text-orange-600 hover:underline">HRA vs LTA Tax Comparison Tool</Link> to optimize allowances, and <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="text-orange-600 hover:underline">80C Deduction Bucket Visualizer</Link> to maximize 80C. Then compare total tax under both regimes with this Old vs New Tax Regime Helper.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">What Is the New Tax Regime?</h3>
              <p className="text-gray-600 mb-4">
                The new tax regime offers <strong>lower slab rates</strong> but <strong>no deductions</strong> (except standard deduction). From FY 2025-26, the new regime has revised slabs (e.g. nil up to ₹4 lakh, 5% from ₹4–8 lakh, 10% from ₹8–12 lakh, and so on) and a standard deduction of ₹75,000 for salaried individuals. There is no 80C, 80D, HRA, or LTA under the new regime. So if you have minimal deductions and prefer simplicity, the new regime may result in lower tax. For latest new regime slabs and rebates, see <a href="https://www.policybazaar.com/income-tax/old-vs-new-income-tax-slabs/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">PolicyBazaar old vs new slabs</a> and <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">incometax.gov.in</a>.
              </p>
              <p className="text-gray-600 mb-4">
                The new regime is the <strong>default</strong> from FY 2023-24. You must actively choose the old regime when filing your return if you want to use deductions. Use this calculator to compare both regimes with your income and total deductions before deciding.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">When Is the Old Regime Better?</h3>
              <p className="text-gray-600 mb-4">
                The old regime is usually better when your <strong>total deductions</strong> (80C, 80D, HRA, LTA, home loan interest, etc.) are high relative to your income. In such cases, taxable income under the old regime drops significantly, and even with higher slab rates, the final tax can be lower than under the new regime. This Old vs New Tax Regime Helper shows you the tax under both regimes and recommends the better option. For planning deductions, use our <Link to="/tax-tools/section-80c-tally-analyzer" className="text-orange-600 hover:underline">Section 80C Tally Analyzer</Link> and <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-orange-600 hover:underline">Tax Filing Deadline Reminder Widget</Link>.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">When Is the New Regime Better?</h3>
              <p className="text-gray-600 mb-4">
                The new regime is often better when you have <strong>minimal or no deductions</strong>. With lower slab rates and a higher standard deduction (₹75,000 for FY 2025-26), your tax under the new regime may be lower without the hassle of maintaining investment proofs. Salaried individuals with income up to a certain level can also benefit from rebate under Section 87A in the new regime. Use this calculator to see the exact comparison for your figures.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">FY 2025-26 Tax Slabs and Rebate</h3>
              <p className="text-gray-600 mb-4">
                From FY 2025-26 (Budget 2025), the new tax regime has revised slabs: nil up to ₹4 lakh, 5% from ₹4–8 lakh, 10% from ₹8–12 lakh, 15% from ₹12–16 lakh, 20% from ₹16–20 lakh, 25% from ₹20–24 lakh, and 30% above ₹24 lakh. Standard deduction for salaried individuals is ₹75,000. Rebate under Section 87A may make income up to ₹12 lakh effectively tax-free in the new regime (subject to conditions). The old regime slabs remain: nil up to ₹2.5 lakh, 5% from ₹2.5–5 lakh, 20% from ₹5–10 lakh, and 30% above ₹10 lakh, with standard deduction ₹50,000. For latest slabs and rebates, refer to <a href="https://economictimes.indiatimes.com/wealth/tax/new-income-tax-slabs-from-april-1-2025-know-tax-slabs-rates-under-new-old-tax-regime-for-fy-2025-26-ay-2026-27/articleshow/119578202.cms" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Economic Times FY 2025-26 slabs</a> and <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Income Tax Portal</a>.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How to Use This Old vs New Tax Regime Calculator</h3>
              <p className="text-gray-600 mb-4">
                Enter your <strong>total income</strong> (gross salary plus other income) and your <strong>total deductions</strong> (80C, 80D, HRA, LTA, home loan interest, etc.). The calculator computes tax under the old regime (income minus deductions minus standard deduction) and under the new regime (income minus standard deduction only) and shows which regime saves you more tax. Use our <Link to="/tax-tools/hra-vs-lta-tax-comparison-tool" className="text-orange-600 hover:underline">HRA vs LTA Tax Comparison Tool</Link> to estimate your HRA and LTA exemption, and <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="text-orange-600 hover:underline">80C Deduction Bucket Visualizer</Link> to maximize 80C, then add those figures to total deductions in this Old vs New Tax Regime Helper for an accurate comparison.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Related Tools and Resources</h3>
              <p className="text-gray-600 mb-4">
                To plan deductions under the old regime, use our <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="text-orange-600 hover:underline">80C Deduction Bucket Visualizer</Link>, <Link to="/tax-tools/section-80c-tally-analyzer" className="text-orange-600 hover:underline">Section 80C Tally Analyzer</Link>, and <Link to="/tax-tools/hra-vs-lta-tax-comparison-tool" className="text-orange-600 hover:underline">HRA vs LTA Tax Comparison Tool</Link>. For capital gains and withdrawals, try <Link to="/tax-tools/equity-tax-estimator" className="text-orange-600 hover:underline">Equity Tax Estimator</Link>, <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="text-orange-600 hover:underline">Tax-Efficient Withdrawal Planner</Link>, and <Link to="/tax-tools/exit-strategy-tax-visualizer" className="text-orange-600 hover:underline">Exit Strategy Tax Visualizer</Link>. For year-on-year comparison, use <Link to="/tax-tools/tax-year-comparison-slider-tool" className="text-orange-600 hover:underline">Tax Year Comparison Slider Tool</Link>. For deadlines, see <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-orange-600 hover:underline">Tax Filing Deadline Reminder Widget</Link>.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Validity and Disclaimer</h3>
              <p className="text-gray-600 mb-4">
                This calculator and content are designed to be valid for FY 2025-26, FY 2026-27, and future years unless the law changes. Tax slabs and deductions are based on current law and Budget provisions. Slab rates and rebates may change in future budgets; always verify with the <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Income Tax Department</a> or a chartered accountant. This is not professional tax advice. For latest updates, check <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">incometax.gov.in</a> and official Budget documents.
              </p>
            </article>

            {/* Related Tax Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white mt-8"
            >
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link 
                  to="/tax-tools/80c-deduction-bucket-visualizer" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">80C Deductions</h3>
                  <p className="text-sm opacity-90">Optimize your 80C investments</p>
                </Link>
                <Link 
                  to="/tax-tools/tax-year-comparison-slider-tool" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Tax Year Comparison</h3>
                  <p className="text-sm opacity-90">Compare tax implications</p>
                </Link>
                <Link 
                  to="/tax-tools/hra-vs-lta-tax-comparison-tool" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">HRA vs LTA</h3>
                  <p className="text-sm opacity-90">Compare allowance benefits</p>
                </Link>
                <Link 
                  to="/tax-tools/tax-efficient-withdrawal-planner" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Withdrawal Planner</h3>
                  <p className="text-sm opacity-90">Plan tax-efficient withdrawals</p>
                </Link>
              </div>
            </motion.div>

            {/* Explore more */}
            <section className="mt-8 py-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/tax-tools" className="text-orange-600 hover:underline">All Tax Tools</Link></li>
                <li><Link to="/" className="text-orange-600 hover:underline">Home</Link></li>
                <li><a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline inline-flex items-center">Income Tax Portal <ExternalLink className="h-4 w-4 ml-1" /></a></li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default OldVsNewTaxRegimeHelper;

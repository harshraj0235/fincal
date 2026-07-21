import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Percent, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import CalculatorSchema from '../../components/CalculatorSchema';


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

  return (
    <>
      <SEOHelmet
        title="Old vs New Tax Regime Helper - Tax Regime Comparison Calculator | MoneyCal"
        description="Compare old vs new tax regimes and choose the best option for your income. Calculate tax savings, effective rates, and get personalized recommendations for optimal tax planning."
        keywords="Old vs New Tax Regime, Income Tax Calculator, Tax Regime Comparison, Tax Savings India"
      />
      <CalculatorSchema 
        name="Old vs New Tax Regime Helper"
        description="Compare the Old and New Income Tax Regimes to find which one saves you the most money. Calculate taxes for FY 2024-25 and make an informed decision."
        url="/tax-tools/old-vs-new-tax-regime"
        features={['Tax Regime Comparison', 'FY 2024-25 Tax Rates', 'Deduction Impact Analysis', 'Effective Tax Rate Calculation']}
        category="FinanceApplication"
        faqData={[
          {
            question: 'Which tax regime is better, old or new?',
            answer: 'The new tax regime is generally better for individuals with fewer deductions, while the old regime is better if you claim significant deductions like HRA, 80C, home loan interest, etc.'
          },
          {
            question: 'Are deductions allowed in the new tax regime?',
            answer: 'Most deductions (like 80C, 80D, HRA) are not allowed in the new tax regime, but standard deduction of ₹50,000 is now available under both regimes.'
          }
        ]}
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Old vs New Tax Regime Helper
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Compare tax regimes and choose the optimal option for maximum savings
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
                  <IndianRupee className="h-6 w-6 mr-3 text-orange-600" />
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white mt-8"
            >
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a 
                  href="/tax-tools/80c-deduction-bucket-visualizer" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">80C Deductions</h3>
                  <p className="text-sm opacity-90">Optimize your 80C investments</p>
                </a>
                <a 
                  href="/tax-tools/tax-year-comparison-slider-tool" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Tax Year Comparison</h3>
                  <p className="text-sm opacity-90">Compare tax implications</p>
                </a>
                <a 
                  href="/tax-tools/hra-vs-lta-tax-comparison-tool" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">HRA vs LTA</h3>
                  <p className="text-sm opacity-90">Compare allowance benefits</p>
                </a>
                <a 
                  href="/tax-tools/tax-efficient-withdrawal-planner" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Withdrawal Planner</h3>
                  <p className="text-sm opacity-90">Plan tax-efficient withdrawals</p>
                </a>
              </div>
            </motion.div>

            <WhatsAppBanner />
          </div>
        </section>
      </div>
    </>
  );
};

export default OldVsNewTaxRegimeHelper;

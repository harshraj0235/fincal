import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Home, 
  Plane, 
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
  MapPin,
  Building,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface TaxBenefit {
  name: string;
  description: string;
  maxExemption: number;
  conditions: string[];
  advantages: string[];
  disadvantages: string[];
  bestFor: string;
  color: string;
}

interface ComparisonResult {
  hraAmount: number;
  ltaAmount: number;
  basicSalary: number;
  rentPaid: number;
  cityType: string;
  familyMembers: number;
  travelExpenses: number;
  hraExemption: number;
  ltaExemption: number;
  hraTaxable: number;
  ltaTaxable: number;
  hraTaxBenefit: number;
  ltaTaxBenefit: number;
  recommendations: string[];
  betterOption: string;
}

const HRAvsLTATaxComparisonTool: React.FC = () => {
  const [hraAmount, setHraAmount] = useState<string>('');
  const [ltaAmount, setLtaAmount] = useState<string>('');
  const [basicSalary, setBasicSalary] = useState<string>('');
  const [rentPaid, setRentPaid] = useState<string>('');
  const [cityType, setCityType] = useState<string>('metro');
  const [familyMembers, setFamilyMembers] = useState<string>('4');
  const [travelExpenses, setTravelExpenses] = useState<string>('');
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const taxBenefits: TaxBenefit[] = [
    {
      name: 'House Rent Allowance (HRA)',
      description: 'Tax exemption for rent paid towards accommodation',
      maxExemption: 0, // Calculated dynamically
      conditions: [
        'Must be actually paying rent',
        'Exemption limited to minimum of: HRA received, Rent paid - 10% of basic, 50% of basic (metro) / 40% of basic (non-metro)',
        'Rent receipts and PAN of landlord required'
      ],
      advantages: [
        'Monthly tax benefit',
        'No limit on number of claims',
        'Can be claimed even if living in own house',
        'Covers rent, utilities, maintenance'
      ],
      disadvantages: [
        'Requires actual rent payment',
        'Documentation requirements',
        'Landlord PAN disclosure',
        'Limited by basic salary percentage'
      ],
      bestFor: 'Employees paying rent in metro/non-metro cities',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Leave Travel Allowance (LTA)',
      description: 'Tax exemption for travel expenses during leave',
      maxExemption: 0, // Calculated dynamically
      conditions: [
        'Only for domestic travel',
        'Maximum 2 trips in a block of 4 years',
        'Only for family members',
        'Actual travel expenses required'
      ],
      advantages: [
        'No monthly limit',
        'Covers family travel',
        'Includes airfare, train, bus expenses',
        'Can be planned strategically'
      ],
      disadvantages: [
        'Limited to 2 trips per 4-year block',
        'Only domestic travel',
        'Requires actual travel',
        'Complex documentation'
      ],
      bestFor: 'Employees who travel with family during leaves',
      color: 'from-green-500 to-green-600'
    }
  ];

  const calculateComparison = () => {
    const hra = parseFloat(hraAmount) || 0;
    const lta = parseFloat(ltaAmount) || 0;
    const basic = parseFloat(basicSalary) || 0;
    const rent = parseFloat(rentPaid) || 0;
    const travel = parseFloat(travelExpenses) || 0;
    const family = parseInt(familyMembers) || 4;

    // HRA Calculation
    const metroLimit = basic * 0.5; // 50% for metro cities
    const nonMetroLimit = basic * 0.4; // 40% for non-metro cities
    const cityLimit = cityType === 'metro' ? metroLimit : nonMetroLimit;
    const rentMinus10Percent = Math.max(0, rent - (basic * 0.1));
    
    const hraExemption = Math.min(hra, cityLimit, rentMinus10Percent);
    const hraTaxable = hra - hraExemption;
    const hraTaxBenefit = hraExemption * 0.3; // Assuming 30% tax rate

    // LTA Calculation
    const ltaExemption = Math.min(lta, travel);
    const ltaTaxable = lta - ltaExemption;
    const ltaTaxBenefit = ltaExemption * 0.3; // Assuming 30% tax rate

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (hraExemption > 0) {
      recommendations.push('HRA provides monthly tax benefit - maximize rent documentation');
    }
    
    if (ltaExemption > 0) {
      recommendations.push('LTA can be claimed for family travel during leaves');
    }
    
    if (hraExemption > ltaExemption) {
      recommendations.push('HRA offers higher tax benefit - focus on rent optimization');
    } else if (ltaExemption > hraExemption) {
      recommendations.push('LTA offers higher tax benefit - plan family travel strategically');
    }
    
    if (rent < basic * 0.1) {
      recommendations.push('Consider increasing rent to maximize HRA benefit');
    }
    
    if (travel < lta) {
      recommendations.push('Increase travel expenses to maximize LTA exemption');
    }

    const betterOption = hraTaxBenefit > ltaTaxBenefit ? 'HRA' : 'LTA';

    setResult({
      hraAmount: hra,
      ltaAmount: lta,
      basicSalary: basic,
      rentPaid: rent,
      cityType,
      familyMembers: family,
      travelExpenses: travel,
      hraExemption,
      ltaExemption,
      hraTaxable,
      ltaTaxable,
      hraTaxBenefit,
      ltaTaxBenefit,
      recommendations,
      betterOption
    });
  };

  const resetForm = () => {
    setHraAmount('');
    setLtaAmount('');
    setBasicSalary('');
    setRentPaid('');
    setCityType('metro');
    setFamilyMembers('4');
    setTravelExpenses('');
    setResult(null);
  };

  const exportToCSV = () => {
    if (!result) return;
    
    const csvContent = `HRA vs LTA Tax Comparison Analysis\n\n` +
      `HRA Amount,${result.hraAmount}\n` +
      `LTA Amount,${result.ltaAmount}\n` +
      `Basic Salary,${result.basicSalary}\n` +
      `Rent Paid,${result.rentPaid}\n` +
      `City Type,${result.cityType}\n` +
      `Family Members,${result.familyMembers}\n` +
      `Travel Expenses,${result.travelExpenses}\n` +
      `HRA Exemption,${result.hraExemption}\n` +
      `LTA Exemption,${result.ltaExemption}\n` +
      `HRA Taxable,${result.hraTaxable}\n` +
      `LTA Taxable,${result.ltaTaxable}\n` +
      `HRA Tax Benefit,${result.hraTaxBenefit}\n` +
      `LTA Tax Benefit,${result.ltaTaxBenefit}\n` +
      `Better Option,${result.betterOption}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hra-vs-lta-comparison.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const canonicalUrl = 'https://moneycal.in/tax-tools/hra-vs-lta-tax-comparison-tool';
  const faqData = [
    { question: 'Can I claim both HRA and LTA under the new tax regime?', answer: 'No. Under the new tax regime (default from FY 2023-24), HRA and LTA exemptions are not available. Both allowances are fully taxable. To claim HRA and LTA, you must opt for the old tax regime when filing your return.' },
    { question: 'How is HRA exemption calculated for metro cities?', answer: 'HRA exemption is the minimum of: (1) actual HRA received, (2) 50% of basic salary for metro cities (Delhi, Mumbai, Kolkata, Chennai), and (3) rent paid minus 10% of basic salary. You must actually pay rent and have rent receipts.' },
    { question: 'How many times can I claim LTA in a block of 4 years?', answer: 'LTA exemption can be claimed for a maximum of two journeys in a block of four calendar years. The current block is 2022-2025. Only domestic travel (air, rail, bus) for you and your family is eligible; food and lodging are not.' },
    { question: 'Is landlord PAN mandatory for HRA?', answer: 'If your annual rent exceeds ₹1,00,000, you must report your landlord\'s PAN to your employer to claim HRA. If the landlord does not have a PAN, a declaration to that effect may be required.' },
    { question: 'Which is better for tax saving: HRA or LTA?', answer: 'It depends on your salary, rent paid, and travel. Use this HRA vs LTA calculator to compare your specific numbers. Generally, if you pay high rent in a metro, HRA gives recurring monthly benefit; LTA gives periodic benefit when you travel with family.' }
  ];

  return (
    <>
      <SEOHelmet
        title="HRA vs LTA Tax Comparison Tool - Allowance Tax Calculator | MoneyCal"
        description="Compare and optimize House Rent Allowance vs Leave Travel Allowance tax benefits for FY 2025-26 and beyond. Calculate HRA and LTA exemptions, tax savings, and choose the best allowance strategy. Valid for old tax regime only."
        keywords="HRA vs LTA comparison, house rent allowance calculator, leave travel allowance tax, HRA LTA exemption old regime, salary allowance benefits, tax exemption calculator India 2026"
        url={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Tools', url: '/tax-tools' },
          { name: 'HRA vs LTA Tax Comparison', url: '/tax-tools/hra-vs-lta-tax-comparison-tool' }
        ]}
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-teal-600 via-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-medium text-teal-200 mb-2">Tax Planning • Valid 2026–2050</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                HRA vs LTA Tax Comparison Tool
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Compare and optimize House Rent Allowance vs Leave Travel Allowance for maximum tax savings (old regime)
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
                  <Calculator className="h-6 w-6 mr-3 text-teal-600" />
                  Allowance Comparison Calculator
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HRA Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={hraAmount}
                      onChange={(e) => setHraAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="50000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LTA Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={ltaAmount}
                      onChange={(e) => setLtaAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="20000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Basic Salary (₹)
                    </label>
                    <input
                      type="number"
                      value={basicSalary}
                      onChange={(e) => setBasicSalary(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="800000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rent Paid (₹)
                    </label>
                    <input
                      type="number"
                      value={rentPaid}
                      onChange={(e) => setRentPaid(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="240000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City Type
                    </label>
                    <select
                      value={cityType}
                      onChange={(e) => setCityType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="metro">Metro City (50% of Basic)</option>
                      <option value="non-metro">Non-Metro City (40% of Basic)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Family Members
                    </label>
                    <input
                      type="number"
                      value={familyMembers}
                      onChange={(e) => setFamilyMembers(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="4"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Expenses (₹)
                    </label>
                    <input
                      type="number"
                      value={travelExpenses}
                      onChange={(e) => setTravelExpenses(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="15000"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateComparison}
                      className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-200"
                    >
                      Compare Benefits
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
                    <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-teal-500">
                      <div className="flex items-center mb-4">
                        <Target className="h-5 w-5 text-teal-500" />
                        <h3 className="text-xl font-semibold text-gray-900 ml-2">
                          Comparison Summary
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            ₹{result.hraTaxBenefit.toLocaleString()}
                          </div>
                          <div className="text-sm text-blue-700">HRA Tax Benefit</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            ₹{result.ltaTaxBenefit.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-700">LTA Tax Benefit</div>
                        </div>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-gray-900">
                          {result.betterOption}
                        </div>
                        <div className="text-sm text-gray-600">Better Option</div>
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
                            title: 'HRA vs LTA Comparison',
                            text: `Better Option: ${result.betterOption} - HRA Benefit: ₹${result.hraTaxBenefit.toLocaleString()}, LTA Benefit: ₹${result.ltaTaxBenefit.toLocaleString()}`,
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
                  <BarChart3 className="h-6 w-6 mr-2 text-teal-500" />
                  Detailed Comparison
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {taxBenefits.map((benefit, index) => (
                    <div key={index} className={`bg-gradient-to-br ${benefit.color} rounded-xl p-6 text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{benefit.name}</h3>
                        {benefit.name.includes(result.betterOption) && (
                          <CheckCircle className="h-5 w-5 text-yellow-300" />
                        )}
                      </div>
                      
                      <p className="text-sm opacity-90 mb-4">{benefit.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">
                            ₹{benefit.name.includes('HRA') ? result.hraExemption.toLocaleString() : result.ltaExemption.toLocaleString()}
                          </div>
                          <div className="text-xs opacity-80">Exemption</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">
                            ₹{benefit.name.includes('HRA') ? result.hraTaxBenefit.toLocaleString() : result.ltaTaxBenefit.toLocaleString()}
                          </div>
                          <div className="text-xs opacity-80">Tax Benefit</div>
                        </div>
                      </div>
                      
                      <div className="text-center p-2 bg-white/20 rounded-lg">
                        <div className="text-lg font-semibold">
                          {benefit.name.includes('HRA') ? 
                            ((result.hraExemption / result.hraAmount) * 100).toFixed(1) : 
                            ((result.ltaExemption / result.ltaAmount) * 100).toFixed(1)
                          }%
                        </div>
                        <div className="text-xs opacity-80">Exemption Rate</div>
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
                <HelpCircle className="h-6 w-6 mr-2 text-teal-600" />
                Frequently Asked Questions: HRA vs LTA
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

            {/* SEO Content: HRA vs LTA Guide (1500+ words) */}
            <article className="mt-12 bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">HRA vs LTA Tax Benefits: Complete Guide for FY 2025-26 and Beyond</h2>
              <p className="text-gray-600 mb-4">
                Comparing <strong>House Rent Allowance (HRA)</strong> and <strong>Leave Travel Allowance (LTA)</strong> helps salaried employees on the <strong>old tax regime</strong> maximize tax savings. Under the new tax regime (default from FY 2023-24), neither HRA nor LTA exemptions are available; both are fully taxable. This tool and guide are for taxpayers who opt for the old regime and want to optimize HRA and LTA benefits for 2026 and future years. Use this free <strong>HRA vs LTA tax comparison calculator</strong> to see which allowance gives you higher exemption and tax benefit based on your salary, rent, city type, and travel expenses.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How HRA Exemption Works in India</h3>
              <p className="text-gray-600 mb-4">
                HRA exemption is the <strong>minimum of three amounts</strong>: (1) actual HRA received from your employer, (2) 50% of basic salary if you live in a metro (Delhi, Mumbai, Kolkata, Chennai) or 40% for non-metro cities, and (3) rent paid minus 10% of basic salary. You must actually pay rent and maintain rent receipts; if annual rent is more than ₹1,00,000, your landlord&apos;s PAN must be reported. For official rules, refer to the <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Income Tax Portal</a> and <a href="https://cleartax.in/s/hra-calculation" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">ClearTax HRA guide</a>. HRA is one of the most valuable salary components for tax saving when you are on the old regime and paying rent.
              </p>
              <p className="text-gray-600 mb-4">
                To maximize HRA benefit, ensure your rent receipts are in order and submitted to your employer on time. Metro cities get a higher limit (50% of basic) than non-metro (40% of basic). If you live in your own house or do not pay rent, HRA is fully taxable. Many employees miss out on HRA exemption by not submitting rent proof or by under-reporting rent; use our <strong>HRA vs LTA comparison tool</strong> to see how much you can save by correctly claiming HRA.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How Leave Travel Allowance (LTA) Exemption Works</h3>
              <p className="text-gray-600 mb-4">
                Leave Travel Allowance (LTA) is exempt only for <strong>domestic travel</strong> within India—air, rail, or bus fares for you and your family. You can claim LTA exemption for a maximum of <strong>two journeys in a block of four calendar years</strong>. The current block is 2022-2025. Food, lodging, and sightseeing are not covered. Proof of travel (tickets, invoices) is required. For detailed LTA rules, see <a href="https://www.taxbuddy.com/blog/hra-and-lta-tax-benefits-comparison-for-fy-2024-25" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">TaxBuddy&apos;s HRA and LTA comparison</a> and <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">incometax.gov.in</a>. LTA is a great way to reduce tax when you travel with family within India, but it is available only under the old tax regime.
              </p>
              <p className="text-gray-600 mb-4">
                Planning LTA claims across the four-year block can help you time your trips and maximize exemption. Only the fare component (flight, train, or bus) is exempt; hotel and food expenses are not. If your employer pays LTA as a fixed amount, the exempt portion is limited to the actual travel cost or the LTA amount, whichever is lower. Use this <strong>HRA and LTA tax comparison calculator</strong> to compare your HRA exemption with your LTA exemption and see which gives more tax benefit in your case.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Old Tax Regime vs New Tax Regime: HRA and LTA</h3>
              <p className="text-gray-600 mb-4">
                Under the <strong>new tax regime</strong> (default from FY 2023-24), <strong>HRA and LTA exemptions are not available</strong>. Your full HRA and LTA are added to taxable income. So if you receive significant HRA or LTA, the old regime may still be better for you. Use our <Link to="/tax-tools/old-vs-new-tax-regime-helper" className="text-teal-600 hover:underline">Old vs New Tax Regime Helper</Link> to compare total tax under both regimes after accounting for 80C, 80D, HRA, LTA, and other deductions. Many salaried individuals with high rent and family travel find that the old regime saves more tax because of HRA and LTA.
              </p>
              <p className="text-gray-600 mb-4">
                If you do not receive HRA but pay rent, you may claim deduction under <strong>Section 80GG</strong> (subject to conditions and limits). That is separate from HRA. This page focuses on comparing HRA and LTA when both are part of your salary and you are on the old regime. For more on tax planning, see our <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-teal-600 hover:underline">Tax Filing Deadline Reminder Widget</Link> and <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="text-teal-600 hover:underline">80C Deduction Bucket Visualizer</Link>.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">HRA vs LTA: Which Gives More Tax Benefit?</h3>
              <p className="text-gray-600 mb-4">
                It depends on your salary, rent paid, city type, and travel. Use this <strong>HRA vs LTA tax comparison tool</strong> to enter your figures and see which allowance gives higher exemption and tax benefit. Generally, if you pay high rent in a metro, HRA offers a recurring monthly benefit; LTA offers a periodic benefit when you travel with family. You can claim <strong>both</strong> under the old regime—there is no either/or rule—so optimize both. The calculator above shows your HRA exemption, LTA exemption, taxable amounts, and tax benefit for each so you can plan better.
              </p>
              <p className="text-gray-600 mb-4">
                Tips: (1) Submit rent receipts and landlord PAN (if rent &gt; ₹1 lakh) on time to avoid losing HRA. (2) Plan LTA for the block so you use both exempt journeys. (3) Keep travel proof (tickets/invoices) for LTA. (4) Run numbers in our <Link to="/tax-tools/old-vs-new-tax-regime-helper" className="text-teal-600 hover:underline">Old vs New Tax Regime Helper</Link> to confirm that the old regime (with HRA and LTA) is still better for you after recent slab changes.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Related Tools and Resources</h3>
              <p className="text-gray-600 mb-4">
                To plan overall tax liability, use our <Link to="/tax-tools/old-vs-new-tax-regime-helper" className="text-teal-600 hover:underline">Old vs New Tax Regime Helper</Link> to see whether the old regime (with HRA and LTA) is better for you. For deduction planning, try the <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="text-teal-600 hover:underline">80C Deduction Bucket Visualizer</Link> and <Link to="/tax-tools/section-80c-tally-analyzer" className="text-teal-600 hover:underline">Section 80C Tally Analyzer</Link>. For capital gains, use the <Link to="/tax-tools/equity-tax-estimator" className="text-teal-600 hover:underline">Equity Tax Estimator</Link> and <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="text-teal-600 hover:underline">Tax-Efficient Withdrawal Planner</Link>. For deadlines, see the <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-teal-600 hover:underline">Tax Filing Deadline Reminder Widget</Link>. For exit strategy and LTCG planning, use <Link to="/tax-tools/exit-strategy-tax-visualizer" className="text-teal-600 hover:underline">Exit Strategy Tax Visualizer</Link> and <Link to="/tax-tools/tax-year-comparison-slider-tool" className="text-teal-600 hover:underline">Tax Year Comparison Slider Tool</Link>.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Validity and Disclaimer</h3>
              <p className="text-gray-600 mb-4">
                This calculator and content are designed to be valid for FY 2025-26, FY 2026-27, and future years unless the law changes. HRA and LTA rules are based on current Income Tax Act provisions. Always verify with the <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Income Tax Department</a> or a chartered accountant for your specific case. This is not professional tax advice. For the latest circulars and FAQs, check <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">incometax.gov.in</a> and <a href="https://www.taxbuddy.com/blog/can-you-claim-both-hra-and-lta-in-the-new-tax-regime" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">TaxBuddy on HRA and LTA in new regime</a>.
              </p>
            </article>

            {/* Related Tax Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-8 text-white mt-8"
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
                  to="/tax-tools/tax-efficient-withdrawal-planner" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Withdrawal Planner</h3>
                  <p className="text-sm opacity-90">Plan tax-efficient withdrawals</p>
                </Link>
                <Link 
                  to="/tax-tools/tax-year-comparison-slider-tool" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Tax Year Comparison</h3>
                  <p className="text-sm opacity-90">Compare tax implications</p>
                </Link>
                <Link 
                  to="/tax-tools/old-vs-new-tax-regime-helper" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Old vs New Regime</h3>
                  <p className="text-sm opacity-90">Choose the best tax regime</p>
                </Link>
              </div>
            </motion.div>

            {/* Explore more */}
            <section className="mt-8 py-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/tax-tools" className="text-teal-600 hover:underline">All Tax Tools</Link></li>
                <li><Link to="/" className="text-teal-600 hover:underline">Home</Link></li>
                <li><a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline inline-flex items-center">Income Tax Portal <ExternalLink className="h-4 w-4 ml-1" /></a></li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default HRAvsLTATaxComparisonTool;

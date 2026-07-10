import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Building, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

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

  return (
    <>
      <SEOHelmet
        title="HRA vs LTA Tax Comparison Tool - Allowance Tax Calculator | MoneyCal"
        description="Compare and optimize House Rent Allowance vs Leave Travel Allowance tax benefits. Calculate exemptions, tax savings, and choose the best allowance strategy for maximum tax benefits."
        keywords="HRA LTA comparison, house rent allowance Calculator, leave travel allowance tax, allowance optimization, tax exemption Calculator, salary allowance benefits"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-teal-600 via-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                HRA vs LTA Tax Comparison Tool
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Compare and optimize your allowance tax benefits for maximum savings
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
                  <IndianRupee className="h-6 w-6 mr-3 text-teal-600" />
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-8 text-white mt-8"
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
                  href="/tax-tools/tax-efficient-withdrawal-planner" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Withdrawal Planner</h3>
                  <p className="text-sm opacity-90">Plan tax-efficient withdrawals</p>
                </a>
                <a 
                  href="/tax-tools/tax-year-comparison-slider-tool" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Tax Year Comparison</h3>
                  <p className="text-sm opacity-90">Compare tax implications</p>
                </a>
                <a 
                  href="/tax-tools/equity-tax-estimator" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Equity Tax Estimator</h3>
                  <p className="text-sm opacity-90">Calculate equity investment taxes</p>
                </a>
              </div>
            </motion.div>

            <WhatsAppBanner />
            <AstroFinanceButton />
          </div>
        </section>
      </div>
    </>
  );
};

export default HRAvsLTATaxComparisonTool;

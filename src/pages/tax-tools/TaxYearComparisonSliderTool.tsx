import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Download, Info, TrendingUp, AlertTriangle, FileText, DollarSign, BarChart3, Calendar, ArrowLeftRight, Percent, TrendingDown } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface TaxYearData {
  year: string;
  income: number;
  deductions: number;
  taxSlab: string;
  taxAmount: number;
  effectiveRate: number;
  changes: string[];
}

const TaxYearComparisonSliderTool: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<string>('2024-25');
  const [compareYear, setCompareYear] = useState<string>('2023-24');
  const [income, setIncome] = useState<number>(1000000);
  const [deductions, setDeductions] = useState<number>(150000);
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState<boolean>(false);

  const taxSlabs = {
    '2024-25': [
      { min: 0, max: 300000, rate: 0, surcharge: 0 },
      { min: 300000, max: 600000, rate: 0.05, surcharge: 0 },
      { min: 600000, max: 900000, rate: 0.10, surcharge: 0 },
      { min: 900000, max: 1200000, rate: 0.15, surcharge: 0 },
      { min: 1200000, max: 1500000, rate: 0.20, surcharge: 0 },
      { min: 1500000, max: Infinity, rate: 0.30, surcharge: 0 }
    ],
    '2023-24': [
      { min: 0, max: 250000, rate: 0, surcharge: 0 },
      { min: 250000, max: 500000, rate: 0.05, surcharge: 0 },
      { min: 500000, max: 1000000, rate: 0.20, surcharge: 0 },
      { min: 1000000, max: Infinity, rate: 0.30, surcharge: 0 }
    ],
    '2022-23': [
      { min: 0, max: 250000, rate: 0, surcharge: 0 },
      { min: 250000, max: 500000, rate: 0.05, surcharge: 0 },
      { min: 500000, max: 1000000, rate: 0.20, surcharge: 0 },
      { min: 1000000, max: Infinity, rate: 0.30, surcharge: 0 }
    ]
  };

  const calculateTax = (year: string, taxableIncome: number) => {
    const slabs = taxSlabs[year as keyof typeof taxSlabs];
    let totalTax = 0;
    let remainingIncome = taxableIncome;

    for (const slab of slabs) {
      if (remainingIncome <= 0) break;
      
      const slabIncome = Math.min(remainingIncome, slab.max - slab.min);
      totalTax += slabIncome * slab.rate;
      remainingIncome -= slabIncome;
    }

    return totalTax;
  };

  const getTaxData = (year: string): TaxYearData => {
    const taxableIncome = Math.max(0, income - deductions);
    const taxAmount = calculateTax(year, taxableIncome);
    const effectiveRate = taxableIncome > 0 ? (taxAmount / taxableIncome) * 100 : 0;
    
    const changes = [];
    if (year === '2024-25') {
      changes.push('New tax regime with 6 slabs');
      changes.push('Higher basic exemption limit');
      changes.push('Reduced tax rates for middle income');
    } else if (year === '2023-24') {
      changes.push('Standard 4-slab structure');
      changes.push('Rebate under section 87A');
      changes.push('Standard deduction available');
    }

    return {
      year,
      income,
      deductions,
      taxSlab: getTaxSlab(year, taxableIncome),
      taxAmount,
      effectiveRate,
      changes
    };
  };

  const getTaxSlab = (year: string, taxableIncome: number): string => {
    const slabs = taxSlabs[year as keyof typeof taxSlabs];
    for (const slab of slabs) {
      if (taxableIncome <= slab.max) {
        return `${(slab.rate * 100).toFixed(0)}%`;
      }
    }
    return '30%';
  };

  const currentData = getTaxData(currentYear);
  const compareData = getTaxData(compareYear);
  const difference = currentData.taxAmount - compareData.taxAmount;
  const percentageChange = compareData.taxAmount > 0 ? (difference / compareData.taxAmount) * 100 : 0;

  const getSlabBreakdown = (year: string) => {
    const slabs = taxSlabs[year as keyof typeof taxSlabs];
    const taxableIncome = Math.max(0, income - deductions);
    const breakdown = [];
    let remainingIncome = taxableIncome;

    for (const slab of slabs) {
      if (remainingIncome <= 0) break;
      
      const slabIncome = Math.min(remainingIncome, slab.max - slab.min);
      const slabTax = slabIncome * slab.rate;
      
      if (slabTax > 0) {
        breakdown.push({
          range: `₹${slab.min.toLocaleString()} - ₹${slab.max === Infinity ? '∞' : slab.max.toLocaleString()}`,
          income: slabIncome,
          rate: slab.rate * 100,
          tax: slabTax
        });
      }
      
      remainingIncome -= slabIncome;
    }

    return breakdown;
  };

  return (
    <>
      <SEOHelmet
        title="Tax Year Comparison Slider Tool - Tax Comparison Calculator | MoneyCal"
        description="Compare tax implications across different financial years with interactive sliders. Analyze tax changes, effective rates, and optimize your tax planning with our comprehensive comparison tool."
        keywords="tax year comparison, tax comparison calculator, tax slab comparison, financial year tax calculator, tax planning tool, tax rate comparison"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4"
              >
                <ArrowLeftRight className="h-8 w-8 text-white" />
              </motion.div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Tax Year Comparison Slider Tool
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compare tax implications across different financial years with interactive sliders. 
                Analyze tax changes, effective rates, and optimize your tax planning strategy.
              </p>
            </div>

            {/* Year Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-purple-500" />
                Select Years to Compare
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Year
                  </label>
                  <select
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="2024-25">2024-25 (New Regime)</option>
                    <option value="2023-24">2023-24</option>
                    <option value="2022-23">2022-23</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compare With
                  </label>
                  <select
                    value={compareYear}
                    onChange={(e) => setCompareYear(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="2023-24">2023-24</option>
                    <option value="2024-25">2024-25 (New Regime)</option>
                    <option value="2022-23">2022-23</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Income Sliders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-blue-500" />
                Income & Deductions
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Total Income: ₹{income.toLocaleString()}
                    </label>
                    <span className="text-sm text-gray-500">₹0 - ₹2,00,00,000</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20000000"
                    step="10000"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Deductions: ₹{deductions.toLocaleString()}
                    </label>
                    <span className="text-sm text-gray-500">₹0 - ₹5,00,000</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="5000"
                    value={deductions}
                    onChange={(e) => setDeductions(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </motion.div>

            {/* Comparison Results */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Current Year */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  {currentYear}
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Taxable Income</span>
                      <span className="text-lg font-bold text-purple-600">₹{Math.max(0, currentData.income - currentData.deductions).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Tax Amount</span>
                      <span className="text-lg font-bold text-red-600">₹{currentData.taxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Effective Rate</span>
                      <span className="text-lg font-bold text-blue-600">{currentData.effectiveRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Tax Slab</span>
                      <span className="text-lg font-bold text-green-600">{currentData.taxSlab}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Key Features</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {currentData.changes.map((change, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Compare Year */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2 text-blue-500" />
                  {compareYear}
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Taxable Income</span>
                      <span className="text-lg font-bold text-blue-600">₹{Math.max(0, compareData.income - compareData.deductions).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Tax Amount</span>
                      <span className="text-lg font-bold text-red-600">₹{compareData.taxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Effective Rate</span>
                      <span className="text-lg font-bold text-blue-600">{compareData.effectiveRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Tax Slab</span>
                      <span className="text-lg font-bold text-green-600">{compareData.taxSlab}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Key Features</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {compareData.changes.map((change, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Difference Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-green-500" />
                Difference Analysis
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Tax Difference</h4>
                  <div className={`text-2xl font-bold ${difference >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₹{Math.abs(difference).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">
                    {difference >= 0 ? 'Higher' : 'Lower'} in {currentYear}
                  </p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Percentage Change</h4>
                  <div className={`text-2xl font-bold ${percentageChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {Math.abs(percentageChange).toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-600">
                    {percentageChange >= 0 ? 'Increase' : 'Decrease'} from {compareYear}
                  </p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Recommendation</h4>
                  <div className="text-lg font-semibold text-blue-600">
                    {difference < 0 ? 'Beneficial' : difference > 0 ? 'Higher Tax' : 'Same Tax'}
                  </div>
                  <p className="text-sm text-gray-600">
                    {currentYear} vs {compareYear}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Detailed Breakdown Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-center mb-8"
            >
              <button
                onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all flex items-center mx-auto"
              >
                <FileText className="h-5 w-5 mr-2" />
                {showDetailedBreakdown ? 'Hide' : 'Show'} Detailed Tax Breakdown
              </button>
            </motion.div>

            {/* Detailed Breakdown */}
            {showDetailedBreakdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <Percent className="h-6 w-6 mr-2 text-purple-500" />
                  Detailed Tax Slab Breakdown
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Current Year Breakdown */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{currentYear} Breakdown</h3>
                    <div className="space-y-3">
                      {getSlabBreakdown(currentYear).map((slab, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{slab.range}</div>
                            <div className="text-xs text-gray-600">₹{slab.income.toLocaleString()} @ {slab.rate}%</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-purple-600">₹{slab.tax.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Compare Year Breakdown */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{compareYear} Breakdown</h3>
                    <div className="space-y-3">
                      {getSlabBreakdown(compareYear).map((slab, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{slab.range}</div>
                            <div className="text-xs text-gray-600">₹{slab.income.toLocaleString()} @ {slab.rate}%</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-blue-600">₹{slab.tax.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Related Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white"
            >
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a 
                  href="/tax-tools/equity-tax-estimator" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Equity Tax Estimator</h3>
                  <p className="text-sm opacity-90">Calculate equity tax liability by assessment year</p>
                </a>
                <a 
                  href="/tax-tools/old-vs-new-tax-regime-helper" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Old vs New Tax Regime</h3>
                  <p className="text-sm opacity-90">Compare old and new tax regime benefits</p>
                </a>
                <a 
                  href="/tax-tools/80c-deduction-bucket-visualizer" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">80C Deductions</h3>
                  <p className="text-sm opacity-90">Visualize and optimize 80C investments</p>
                </a>
                <a 
                  href="/tax-tools/tax-efficient-withdrawal-planner" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Withdrawal Planner</h3>
                  <p className="text-sm opacity-90">Plan tax-efficient investment withdrawals</p>
                </a>
              </div>
            </motion.div>

            <WhatsAppBanner />
            <AstroFinanceButton />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TaxYearComparisonSliderTool;

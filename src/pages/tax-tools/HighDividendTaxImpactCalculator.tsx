import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Download, Info, TrendingUp, AlertTriangle, FileText, DollarSign, PieChart, BarChart3, TrendingDown, Percent, Calendar } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface DividendEntry {
  id: string;
  company: string;
  amount: number;
  dividendType: 'equity' | 'debt' | 'mutual-fund';
  financialYear: string;
  tdsDeducted: number;
}

const HighDividendTaxImpactCalculator: React.FC = () => {
  const [dividends, setDividends] = useState<DividendEntry[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);
  const [totalTDS, setTotalTDS] = useState<number>(0);
  const [additionalTax, setAdditionalTax] = useState<number>(0);
  const [taxSlab, setTaxSlab] = useState<string>('30%');
  const [isHighValue, setIsHighValue] = useState<boolean>(false);

  const calculateTax = (amount: number, type: 'equity' | 'debt' | 'mutual-fund', slab: string) => {
    let taxRate = 0;
    
    if (type === 'equity') {
      // Equity dividends are tax-free in hands of recipient
      return 0;
    } else if (type === 'debt') {
      // Debt fund dividends are added to income
      switch (slab) {
        case '5%': taxRate = 0.05; break;
        case '20%': taxRate = 0.20; break;
        case '30%': taxRate = 0.30; break;
        default: taxRate = 0.30;
      }
    } else if (type === 'mutual-fund') {
      // Mutual fund dividends are added to income
      switch (slab) {
        case '5%': taxRate = 0.05; break;
        case '20%': taxRate = 0.20; break;
        case '30%': taxRate = 0.30; break;
        default: taxRate = 0.30;
      }
    }
    
    return amount * taxRate;
  };

  const addDividend = () => {
    const newDividend: DividendEntry = {
      id: Date.now().toString(),
      company: '',
      amount: 0,
      dividendType: 'equity',
      financialYear: '2024-25',
      tdsDeducted: 0
    };
    
    setDividends([...dividends, newDividend]);
  };

  const updateDividend = (id: string, field: keyof DividendEntry, value: any) => {
    setDividends(dividends.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const removeDividend = (id: string) => {
    setDividends(dividends.filter(d => d.id !== id));
  };

  const calculateTotal = () => {
    const total = dividends.reduce((sum, d) => sum + d.amount, 0);
    const tds = dividends.reduce((sum, d) => sum + d.tdsDeducted, 0);
    const tax = dividends.reduce((sum, d) => 
      sum + calculateTax(d.amount, d.dividendType, taxSlab), 0
    );
    
    setTotalIncome(total);
    setTotalTDS(tds);
    setTotalTax(tax);
    setAdditionalTax(Math.max(0, tax - tds));
    setIsHighValue(total > 100000); // High value threshold
  };

  const getTaxStatus = (type: 'equity' | 'debt' | 'mutual-fund') => {
    if (type === 'equity') return 'Tax Free';
    return 'Taxable as per slab';
  };

  const getRecommendation = () => {
    if (totalIncome > 1000000) {
      return "Consider dividend reinvestment plans (DRIP) to defer tax liability and benefit from compounding.";
    }
    if (totalIncome > 500000) {
      return "Evaluate if dividend income pushes you to higher tax bracket. Consider growth options for tax efficiency.";
    }
    if (totalIncome > 100000) {
      return "Monitor dividend income to stay within optimal tax brackets. Consider systematic withdrawal plans.";
    }
    return "Your dividend income is within comfortable limits. Continue with current investment strategy.";
  };

  const getTaxSlabBreakdown = () => {
    const breakdown = dividends.reduce((acc, d) => {
      if (d.dividendType !== 'equity') {
        acc[d.dividendType] = (acc[d.dividendType] || 0) + d.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    return breakdown;
  };

  return (
    <>
      <SEOHelmet
        title="High Dividend Tax Impact Calculator - Dividend Tax Calculator | MoneyCal"
        description="Calculate tax implications of high dividend income. Analyze dividend tax impact, TDS deductions, and optimize your dividend investment strategy with our comprehensive calculator."
        keywords="high dividend tax Calculator, dividend tax impact, dividend TDS Calculator, equity dividend tax, mutual fund dividend tax, dividend income tax calculator"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4"
              >
                <DollarSign className="h-8 w-8 text-white" />
              </motion.div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                High Dividend Tax Impact Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate tax implications and TDS impact of your dividend income. 
                Analyze high dividend scenarios and optimize your investment strategy.
              </p>
            </div>

            {/* Main Calculator */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Input Section */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <IndianRupee className="h-6 w-6 mr-2 text-green-500" />
                    Dividend Details
                  </h2>

                  {/* Tax Slab Selection */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Income Tax Slab
                      </label>
                      <select
                        value={taxSlab}
                        onChange={(e) => setTaxSlab(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="5%">5% (Up to ₹3 lakhs)</option>
                        <option value="20%">20% (₹3-6 lakhs)</option>
                        <option value="30%">30% (Above ₹6 lakhs)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Financial Year
                      </label>
                      <select
                        value="2024-25"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="2024-25">2024-25</option>
                        <option value="2023-24">2023-24</option>
                        <option value="2022-23">2022-23</option>
                      </select>
                    </div>
                  </div>

                  {/* Dividends List */}
                  <div className="space-y-4">
                    {dividends.map((dividend, index) => (
                      <motion.div
                        key={dividend.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-800">Dividend #{index + 1}</h4>
                          <button
                            onClick={() => removeDividend(dividend.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company/Fund
                            </label>
                            <input
                              type="text"
                              value={dividend.company}
                              onChange={(e) => updateDividend(dividend.id, 'company', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                              placeholder="e.g., HDFC Bank"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Amount (₹)
                            </label>
                            <input
                              type="number"
                              value={dividend.amount}
                              onChange={(e) => updateDividend(dividend.id, 'amount', Number(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Type
                            </label>
                            <select
                              value={dividend.dividendType}
                              onChange={(e) => updateDividend(dividend.id, 'dividendType', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                            >
                              <option value="equity">Equity</option>
                              <option value="debt">Debt Fund</option>
                              <option value="mutual-fund">Mutual Fund</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              TDS Deducted (₹)
                            </label>
                            <input
                              type="number"
                              value={dividend.tdsDeducted}
                              onChange={(e) => updateDividend(dividend.id, 'tdsDeducted', Number(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <button
                    onClick={addDividend}
                    className="mt-4 w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <IndianRupee className="h-5 w-5 mr-2" />
                    Add Dividend Entry
                  </button>
                </motion.div>
              </div>

              {/* Results Section */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2 text-blue-500" />
                    Tax Impact
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Total Dividend</span>
                        <span className="text-lg font-bold text-green-600">₹{totalIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Total TDS</span>
                        <span className="text-lg font-bold text-blue-600">₹{totalTDS.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Tax Liability</span>
                        <span className="text-lg font-bold text-red-600">₹{totalTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Additional Tax</span>
                        <span className="text-lg font-bold text-orange-600">₹{additionalTax.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={calculateTotal}
                      className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Calculate Tax Impact
                    </button>

                    {/* Tax Status */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Tax Status</h4>
                      <div className="space-y-2">
                        {dividends.map((d, index) => (
                          <div key={d.id} className="flex justify-between text-sm">
                            <span>Dividend #{index + 1}:</span>
                            <span className={`font-medium ${
                              getTaxStatus(d.dividendType).includes('Tax Free') 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {getTaxStatus(d.dividendType)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* High Value Alert */}
                    {isHighValue && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                          High Dividend Alert
                        </h4>
                        <p className="text-sm text-gray-700">
                          Your dividend income exceeds ₹1,00,000. Consider tax-efficient alternatives.
                        </p>
                      </div>
                    )}

                    {/* Recommendation */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2 text-blue-600" />
                        Recommendation
                      </h4>
                      <p className="text-sm text-gray-700">{getRecommendation()}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Tax Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <PieChart className="h-6 w-6 mr-2 text-green-500" />
                Tax Breakdown Analysis
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Taxable vs Tax-Free</h3>
                  <div className="space-y-3">
                    {Object.entries(getTaxSlabBreakdown()).map(([type, amount]) => (
                      <div key={type} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium capitalize">{type} Dividends</span>
                        <span className="text-sm font-bold text-red-600">₹{amount.toLocaleString()}</span>
                      </div>
                    ))}
                    {dividends.filter(d => d.dividendType === 'equity').length > 0 && (
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Equity Dividends</span>
                        <span className="text-sm font-bold text-green-600">
                          ₹{dividends.filter(d => d.dividendType === 'equity').reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Points</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>Equity dividends are tax-free in recipient's hands</span>
                    </li>
                    <li className="flex items-start">
                      <Percent className="h-4 w-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                      <span>Debt fund dividends are taxable as per income slab</span>
                    </li>
                    <li className="flex items-start">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                      <span>TDS is deducted at 10% for dividends above ₹5,000</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingDown className="h-4 w-4 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                      <span>High dividend income may push you to higher tax bracket</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Related Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white"
            >
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a 
                  href="/tax-tools/dividend-tax-estimator" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Dividend Tax Estimator</h3>
                  <p className="text-sm opacity-90">Calculate dividend tax under new regulations</p>
                </a>
                <a 
                  href="/tax-tools/dividend-reinvestment-tax-comparison" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Dividend Reinvestment</h3>
                  <p className="text-sm opacity-90">Compare dividend reinvest vs payout tax implications</p>
                </a>
                <a 
                  href="/tax-tools/equity-tax-estimator" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Equity Tax Estimator</h3>
                  <p className="text-sm opacity-90">Calculate equity tax liability by assessment year</p>
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

export default HighDividendTaxImpactCalculator;

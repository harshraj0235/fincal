import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Calculator, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign, Target } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface DeductionCategory {
  name: string;
  amount: number;
  maxLimit: number;
  color: string;
  description: string;
  recommendation: string;
}

interface BucketVisualization {
  totalInvested: number;
  totalDeduction: number;
  remainingLimit: number;
  categories: DeductionCategory[];
  optimization: string;
  color: string;
  icon: React.ReactNode;
}

const DeductionBucketVisualizer: React.FC = () => {
  const [elssAmount, setElssAmount] = useState<string>('');
  const [ppfAmount, setPpfAmount] = useState<string>('');
  const [epfAmount, setEpfAmount] = useState<string>('');
  const [npsAmount, setNpsAmount] = useState<string>('');
  const [sukanyaAmount, setSukanyaAmount] = useState<string>('');
  const [ulipAmount, setUlipAmount] = useState<string>('');
  const [nscAmount, setNscAmount] = useState<string>('');
  const [fdAmount, setFdAmount] = useState<string>('');
  const [visualization, setVisualization] = useState<BucketVisualization | null>(null);

  const calculateBucketVisualization = () => {
    const elss = parseFloat(elssAmount) || 0;
    const ppf = parseFloat(ppfAmount) || 0;
    const epf = parseFloat(epfAmount) || 0;
    const nps = parseFloat(npsAmount) || 0;
    const sukanya = parseFloat(sukanyaAmount) || 0;
    const ulip = parseFloat(ulipAmount) || 0;
    const nsc = parseFloat(nscAmount) || 0;
    const fd = parseFloat(fdAmount) || 0;

    const categories: DeductionCategory[] = [
      {
        name: 'ELSS',
        amount: elss,
        maxLimit: 150000,
        color: '#3B82F6',
        description: 'Equity Linked Savings Scheme',
        recommendation: elss < 150000 ? `Consider investing ₹${(150000 - elss).toLocaleString()} more in ELSS for higher returns` : 'ELSS limit fully utilized'
      },
      {
        name: 'PPF',
        amount: ppf,
        maxLimit: 150000,
        color: '#10B981',
        description: 'Public Provident Fund',
        recommendation: ppf < 150000 ? `Consider investing ₹${(150000 - ppf).toLocaleString()} more in PPF for guaranteed returns` : 'PPF limit fully utilized'
      },
      {
        name: 'EPF',
        amount: epf,
        maxLimit: 150000,
        color: '#F59E0B',
        description: 'Employee Provident Fund',
        recommendation: epf < 150000 ? `Consider contributing ₹${(150000 - epf).toLocaleString()} more to EPF` : 'EPF limit fully utilized'
      },
      {
        name: 'NPS',
        amount: nps,
        maxLimit: 50000,
        color: '#8B5CF6',
        description: 'National Pension System (Tier 1)',
        recommendation: nps < 50000 ? `Consider investing ₹${(50000 - nps).toLocaleString()} more in NPS for additional tax benefit` : 'NPS limit fully utilized'
      },
      {
        name: 'Sukanya Samriddhi',
        amount: sukanya,
        maxLimit: 150000,
        color: '#EC4899',
        description: 'Sukanya Samriddhi Yojana',
        recommendation: sukanya < 150000 ? `Consider investing ₹${(150000 - sukanya).toLocaleString()} more in SSY for girl child` : 'SSY limit fully utilized'
      },
      {
        name: 'ULIP',
        amount: ulip,
        maxLimit: 150000,
        color: '#06B6D4',
        description: 'Unit Linked Insurance Plan',
        recommendation: ulip < 150000 ? `Consider investing ₹${(150000 - ulip).toLocaleString()} more in ULIP` : 'ULIP limit fully utilized'
      },
      {
        name: 'NSC',
        amount: nsc,
        maxLimit: 150000,
        color: '#84CC16',
        description: 'National Savings Certificate',
        recommendation: nsc < 150000 ? `Consider investing ₹${(150000 - nsc).toLocaleString()} more in NSC` : 'NSC limit fully utilized'
      },
      {
        name: 'Tax Saving FD',
        amount: fd,
        maxLimit: 150000,
        color: '#F97316',
        description: 'Tax Saving Fixed Deposit',
        recommendation: fd < 150000 ? `Consider investing ₹${(150000 - fd).toLocaleString()} more in Tax Saving FD` : 'FD limit fully utilized'
      }
    ];

    const totalInvested = categories.reduce((sum, cat) => sum + cat.amount, 0);
    const totalDeduction = Math.min(totalInvested, 150000); // 80C limit is 1.5L
    const remainingLimit = Math.max(0, 150000 - totalInvested);

    let optimization: string;
    let color: string;
    let icon: React.ReactNode;

    if (totalInvested >= 150000) {
      optimization = 'Excellent! You have fully utilized your 80C limit';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (totalInvested >= 100000) {
      optimization = `Good progress! Consider investing ₹${remainingLimit.toLocaleString()} more to maximize tax benefits`;
      color = 'text-blue-600';
      icon = <Target className="h-5 w-5" />;
    } else {
      optimization = `You can save more tax by investing ₹${remainingLimit.toLocaleString()} more under 80C`;
      color = 'text-orange-600';
      icon = <AlertCircle className="h-5 w-5" />;
    }

    setVisualization({
      totalInvested,
      totalDeduction,
      remainingLimit,
      categories,
      optimization,
      color,
      icon
    });
  };

  const resetForm = () => {
    setElssAmount('');
    setPpfAmount('');
    setEpfAmount('');
    setNpsAmount('');
    setSukanyaAmount('');
    setUlipAmount('');
    setNscAmount('');
    setFdAmount('');
    setVisualization(null);
  };

  return (
    <>
      <SEOHelmet
        title="80C Deduction Bucket Visualizer - Optimize Your Tax Saving Investments | MoneyCal"
        description="Visualize and optimize your Section 80C investments. See how to maximize your tax deductions across ELSS, PPF, EPF, NPS and other 80C instruments."
        keywords="80C deduction calculator, tax saving investments, ELSS calculator, PPF calculator, NPS calculator, 80C bucket visualizer, tax optimization"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                80C Deduction Bucket Visualizer
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Visualize and optimize your Section 80C investments to maximize tax savings
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  Investment Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ELSS Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={elssAmount}
                      onChange={(e) => setElssAmount(e.target.value)}
                      placeholder="Enter ELSS amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PPF Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={ppfAmount}
                      onChange={(e) => setPpfAmount(e.target.value)}
                      placeholder="Enter PPF amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EPF Contribution (₹)
                    </label>
                    <input
                      type="number"
                      value={epfAmount}
                      onChange={(e) => setEpfAmount(e.target.value)}
                      placeholder="Enter EPF amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NPS Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={npsAmount}
                      onChange={(e) => setNpsAmount(e.target.value)}
                      placeholder="Enter NPS amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sukanya Samriddhi (₹)
                    </label>
                    <input
                      type="number"
                      value={sukanyaAmount}
                      onChange={(e) => setSukanyaAmount(e.target.value)}
                      placeholder="Enter SSY amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ULIP Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={ulipAmount}
                      onChange={(e) => setUlipAmount(e.target.value)}
                      placeholder="Enter ULIP amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NSC Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={nscAmount}
                      onChange={(e) => setNscAmount(e.target.value)}
                      placeholder="Enter NSC amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Saving FD (₹)
                    </label>
                    <input
                      type="number"
                      value={fdAmount}
                      onChange={(e) => setFdAmount(e.target.value)}
                      placeholder="Enter FD amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateBucketVisualization}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Visualize Bucket
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
                  <PieChart className="h-6 w-6 mr-3 text-blue-600" />
                  Bucket Analysis
                </h2>

                {visualization ? (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Investment Summary
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Invested:</span>
                          <span className="font-bold text-blue-600">₹{visualization.totalInvested.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Deduction:</span>
                          <span className="font-bold text-blue-600">₹{visualization.totalDeduction.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Remaining Limit:</span>
                          <span className="font-bold text-blue-600">₹{visualization.remainingLimit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Optimization */}
                    <div className={`text-center p-4 rounded-lg ${visualization.color.includes('green') ? 'bg-green-50 border border-green-200' : visualization.color.includes('blue') ? 'bg-blue-50 border border-blue-200' : 'bg-orange-50 border border-orange-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${visualization.color}`}>
                        {visualization.icon}
                        <span className="ml-2 text-lg font-bold">Optimization</span>
                      </div>
                      <p className="text-sm text-gray-600">{visualization.optimization}</p>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800">Investment Categories</h3>
                      {visualization.categories.map((category, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-800">{category.name}</h4>
                            <span className="text-sm text-gray-600">{category.description}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-700">Amount:</span>
                              <span className="font-bold" style={{ color: category.color }}>₹{category.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Max Limit:</span>
                              <span className="font-bold text-gray-600">₹{category.maxLimit.toLocaleString()}</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-2">
                              {category.recommendation}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter your investment details to visualize 80C bucket</p>
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
                Understanding Section 80C Deductions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Section 80C Benefits
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Maximum deduction of ₹1.5 lakh</li>
                    <li>• Reduces taxable income</li>
                    <li>• Multiple investment options</li>
                    <li>• Long-term wealth creation</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Popular 80C Instruments
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• ELSS (Equity Linked Savings)</li>
                    <li>• PPF (Public Provident Fund)</li>
                    <li>• EPF (Employee Provident Fund)</li>
                    <li>• NPS (National Pension System)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Optimization Tips
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Start early to maximize compounding benefits</li>
                  <li>• Diversify across different instruments</li>
                  <li>• Consider liquidity requirements</li>
                  <li>• Factor in lock-in periods</li>
                  <li>• Review and rebalance annually</li>
                </ul>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Related Tax Planning Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/tax-tools/section-80c-tally-analyzer" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">80C Tally Analyzer</span>
                    <p className="text-sm text-purple-600">Analyze your 80C investments</p>
                  </a>
                  <a href="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">ELSS vs Tax Benefits</span>
                    <p className="text-sm text-purple-600">Compare ELSS lock-in vs benefits</p>
                  </a>
                  <a href="/tax-tools/pf-vs-nps-tax-growth-comparison" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">PF vs NPS Comparison</span>
                    <p className="text-sm text-purple-600">Compare retirement schemes</p>
                  </a>
                  <a href="/tax-tools/tax-saving-investment-calculator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Tax Saving Calculator</span>
                    <p className="text-sm text-purple-600">Calculate tax savings</p>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DeductionBucketVisualizer;

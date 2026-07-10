import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Info, AlertCircle, TrendingUp, DollarSign, CheckCircle, PieChart, Target } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface Section80CItem {
  name: string;
  amount: number;
  maxLimit: number;
  category: string;
  color: string;
}

interface TallyResult {
  totalInvested: number;
  totalTaxSaved: number;
  remainingLimit: number;
  recommendations: string[];
  breakdown: Section80CItem[];
  utilizationPercentage: number;
}

const Section80CTallyAnalyzer: React.FC = () => {
  const [elssAmount, setElssAmount] = useState('');
  const [ppfAmount, setPpfAmount] = useState('');
  const [epfAmount, setEpfAmount] = useState('');
  const [npsAmount, setNpsAmount] = useState('');
  const [sukanyaAmount, setSukanyaAmount] = useState('');
  const [ulipAmount, setUlipAmount] = useState('');
  const [lifeInsuranceAmount, setLifeInsuranceAmount] = useState('');
  const [homeLoanPrincipal, setHomeLoanPrincipal] = useState('');
  const [tuitionFees, setTuitionFees] = useState('');
  const [otherAmount, setOtherAmount] = useState('');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<TallyResult | null>(null);

  const calculateTally = () => {
    const elss = parseFloat(elssAmount) || 0;
    const ppf = parseFloat(ppfAmount) || 0;
    const epf = parseFloat(epfAmount) || 0;
    const nps = parseFloat(npsAmount) || 0;
    const sukanya = parseFloat(sukanyaAmount) || 0;
    const ulip = parseFloat(ulipAmount) || 0;
    const lifeInsurance = parseFloat(lifeInsuranceAmount) || 0;
    const homeLoan = parseFloat(homeLoanPrincipal) || 0;
    const tuition = parseFloat(tuitionFees) || 0;
    const other = parseFloat(otherAmount) || 0;

    const breakdown: Section80CItem[] = [
      { name: 'ELSS Mutual Funds', amount: elss, maxLimit: 150000, category: 'Equity', color: 'bg-blue-500' },
      { name: 'Public Provident Fund (PPF)', amount: ppf, maxLimit: 150000, category: 'Government', color: 'bg-green-500' },
      { name: 'Employee Provident Fund (EPF)', amount: epf, maxLimit: 150000, category: 'Government', color: 'bg-purple-500' },
      { name: 'National Pension System (NPS)', amount: nps, maxLimit: 150000, category: 'Pension', color: 'bg-orange-500' },
      { name: 'Sukanya Samriddhi Yojana', amount: sukanya, maxLimit: 150000, category: 'Government', color: 'bg-pink-500' },
      { name: 'ULIP', amount: ulip, maxLimit: 150000, category: 'Insurance', color: 'bg-indigo-500' },
      { name: 'Life Insurance Premium', amount: lifeInsurance, maxLimit: 150000, category: 'Insurance', color: 'bg-red-500' },
      { name: 'Home Loan Principal', amount: homeLoan, maxLimit: 150000, category: 'Housing', color: 'bg-teal-500' },
      { name: 'Tuition Fees', amount: tuition, maxLimit: 150000, category: 'Education', color: 'bg-yellow-500' },
      { name: 'Other Investments', amount: other, maxLimit: 150000, category: 'Others', color: 'bg-gray-500' }
    ];

    const totalInvested = breakdown.reduce((sum, item) => sum + item.amount, 0);
    const maxLimit = 150000;
    const remainingLimit = Math.max(0, maxLimit - totalInvested);
    const utilizationPercentage = (totalInvested / maxLimit) * 100;

    // Calculate tax saved based on income slab
    const slabRate = parseInt(incomeSlab) / 100;
    const totalTaxSaved = Math.min(totalInvested, maxLimit) * slabRate;

    const recommendations: string[] = [];
    
    if (remainingLimit > 0) {
      recommendations.push(`You can invest ₹${remainingLimit.toLocaleString()} more to maximize Section 80C benefits`);
    }
    
    if (elss === 0) {
      recommendations.push('Consider ELSS for equity exposure with tax benefits');
    }
    
    if (ppf === 0) {
      recommendations.push('PPF offers guaranteed returns with tax-free maturity');
    }
    
    if (utilizationPercentage < 50) {
      recommendations.push('You are underutilizing Section 80C benefits');
    }
    
    if (utilizationPercentage > 100) {
      recommendations.push('You have exceeded the ₹1.5 lakh limit - excess amount won\'t get tax benefit');
    }

    setResult({
      totalInvested,
      totalTaxSaved,
      remainingLimit,
      recommendations,
      breakdown,
      utilizationPercentage
    });
  };

  const resetForm = () => {
    setElssAmount('');
    setPpfAmount('');
    setEpfAmount('');
    setNpsAmount('');
    setSukanyaAmount('');
    setUlipAmount('');
    setLifeInsuranceAmount('');
    setHomeLoanPrincipal('');
    setTuitionFees('');
    setOtherAmount('');
    setIncomeSlab('30');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Section 80C Tally Analyzer - Track and Optimize Tax-Saving Investments | MoneyCal"
        description="Analyze your Section 80C investments and maximize tax savings. Track ELSS, PPF, EPF, NPS, and other tax-saving instruments."
        keywords="Section 80C Calculator, tax saving investments, ELSS, PPF, EPF, NPS, tax deduction calculator"
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
                Section 80C Tally Analyzer
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Track and optimize your Section 80C investments for maximum tax savings
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
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Investment Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Income Tax Slab (%)
                    </label>
                    <select
                      value={incomeSlab}
                      onChange={(e) => setIncomeSlab(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="5">5% (Up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L - ₹5L)</option>
                      <option value="30">30% (Above ₹5L)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ELSS Mutual Funds (₹)
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
                        PPF (₹)
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
                        EPF (₹)
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
                        NPS (₹)
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
                        placeholder="Enter Sukanya amount"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ULIP (₹)
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
                        Life Insurance (₹)
                      </label>
                      <input
                        type="number"
                        value={lifeInsuranceAmount}
                        onChange={(e) => setLifeInsuranceAmount(e.target.value)}
                        placeholder="Enter insurance amount"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Home Loan Principal (₹)
                      </label>
                      <input
                        type="number"
                        value={homeLoanPrincipal}
                        onChange={(e) => setHomeLoanPrincipal(e.target.value)}
                        placeholder="Enter home loan principal"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tuition Fees (₹)
                      </label>
                      <input
                        type="number"
                        value={tuitionFees}
                        onChange={(e) => setTuitionFees(e.target.value)}
                        placeholder="Enter tuition fees"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Other Investments (₹)
                      </label>
                      <input
                        type="number"
                        value={otherAmount}
                        onChange={(e) => setOtherAmount(e.target.value)}
                        placeholder="Enter other amounts"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTally}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Analyze Section 80C
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
                  Section 80C Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Total Invested</p>
                        <p className="text-xl font-bold text-blue-900">₹{result.totalInvested.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-600">Tax Saved</p>
                        <p className="text-xl font-bold text-green-900">₹{result.totalTaxSaved.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Utilization Progress */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Section 80C Utilization</span>
                        <span className="text-sm font-bold text-gray-900">{result.utilizationPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${result.utilizationPercentage > 100 ? 'bg-red-500' : result.utilizationPercentage > 80 ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${Math.min(result.utilizationPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Limit: ₹1,50,000 | Remaining: ₹{result.remainingLimit.toLocaleString()}
                      </p>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-yellow-700 flex items-start">
                            <CheckCircle className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <PieChart className="h-4 w-4 mr-2" />
                        Investment Breakdown
                      </h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {result.breakdown.filter(item => item.amount > 0).map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{item.name}</span>
                            <span className="font-semibold text-gray-900">₹{item.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IndianRupee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter your Section 80C investments to analyze</p>
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
                Understanding Section 80C
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Key Benefits
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Maximum deduction: ₹1.5 lakh</li>
                    <li>• Reduces taxable income</li>
                    <li>• Multiple investment options</li>
                    <li>• Long-term wealth creation</li>
                    <li>• Tax-free returns in most cases</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Popular Options
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• ELSS Mutual Funds</li>
                    <li>• Public Provident Fund (PPF)</li>
                    <li>• Employee Provident Fund (EPF)</li>
                    <li>• National Pension System (NPS)</li>
                    <li>• Life Insurance Premiums</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Maximum deduction limit is ₹1.5 lakh per financial year</li>
                  <li>• Investments must be made before March 31st</li>
                  <li>• Different instruments have different lock-in periods</li>
                  <li>• Consult a financial advisor for personalized advice</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Section80CTallyAnalyzer;

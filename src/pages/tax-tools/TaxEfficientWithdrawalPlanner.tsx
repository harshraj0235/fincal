import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign, Target, ArrowRight } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import CalculatorSchema from '../../components/CalculatorSchema';


interface WithdrawalPlan {
  totalCorpus: number;
  annualWithdrawal: number;
  withdrawalYears: number;
  taxEfficientAmount: number;
  taxInefficientAmount: number;
  totalTaxPaid: number;
  netAmountReceived: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const TaxEfficientWithdrawalPlanner: React.FC = () => {
  const [totalCorpus, setTotalCorpus] = useState<string>('');
  const [annualWithdrawal, setAnnualWithdrawal] = useState<string>('');
  const [withdrawalYears, setWithdrawalYears] = useState<string>('');
  const [calculation, setCalculation] = useState<WithdrawalPlan | null>(null);

  const calculateWithdrawalPlan = () => {
    if (!totalCorpus || !annualWithdrawal || !withdrawalYears) {
      alert('Please fill in all fields');
      return;
    }

    const corpus = parseFloat(totalCorpus);
    const withdrawal = parseFloat(annualWithdrawal);
    const years = parseInt(withdrawalYears);
    
    // Tax-efficient withdrawal (LTCG with exemption)
    const ltcgExemption = 100000; // ₹1L exemption per year
    const taxEfficientAmount = Math.min(withdrawal, ltcgExemption);
    const taxInefficientAmount = Math.max(0, withdrawal - ltcgExemption);
    
    // Calculate tax on inefficient portion
    const taxRate = 10; // LTCG rate
    const taxOnInefficient = (taxInefficientAmount * taxRate) / 100;
    const totalTaxPaid = taxOnInefficient * years;
    const netAmountReceived = (withdrawal * years) - totalTaxPaid;
    
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (withdrawal <= ltcgExemption) {
      recommendation = 'Optimal! Withdrawal within LTCG exemption limit. No tax liability.';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (taxOnInefficient <= 50000) {
      recommendation = 'Good strategy. Moderate tax impact. Consider spreading withdrawals.';
      color = 'text-blue-600';
      icon = <Info className="h-5 w-5" />;
    } else {
      recommendation = 'High tax impact. Consider reducing withdrawal or extending timeline.';
      color = 'text-red-600';
      icon = <AlertCircle className="h-5 w-5" />;
    }

    setCalculation({
      totalCorpus,
      annualWithdrawal: withdrawal,
      withdrawalYears: years,
      taxEfficientAmount,
      taxInefficientAmount,
      totalTaxPaid,
      netAmountReceived,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setTotalCorpus('');
    setAnnualWithdrawal('');
    setWithdrawalYears('');
    setCalculation(null);
  };

  return (
    <>
      <SEOHelmet
        title="Tax-Efficient Withdrawal Planner - Plan Your Investment Withdrawals | MoneyCal"
        description="Plan tax-efficient withdrawals from your investments. Optimize your withdrawal strategy to minimize tax liability and maximize net returns."
        keywords="Tax Efficient Withdrawal, Retirement Planner, SWP Calculator, Tax free withdrawal, Portfolio withdrawal"
      />
      <CalculatorSchema 
        name="Tax Efficient Withdrawal Planner"
        description="Plan your investment withdrawals across different asset classes to minimize tax liability and maximize post-tax returns."
        url="/tax-tools/tax-efficient-withdrawal-planner"
        features={['Retirement Withdrawal Planning', 'Tax Minimization', 'Asset Allocation', 'Post-tax Returns']}
        category="FinanceApplication"
        faqData={[
          {
            question: 'What is a tax-efficient withdrawal strategy?',
            answer: 'A tax-efficient withdrawal strategy involves liquidating investments in an order that minimizes capital gains tax, typically starting with tax-free or lower-tax assets before tapping into higher-taxed investments.'
          }
        ]}
      />
      <WhatsAppBanner />

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
                Tax-Efficient Withdrawal Planner
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Plan tax-efficient withdrawals from your investments
              </p>
            </motion.div>
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
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Withdrawal Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Corpus (₹)
                    </label>
                    <input
                      type="number"
                      value={totalCorpus}
                      onChange={(e) => setTotalCorpus(e.target.value)}
                      placeholder="Enter total investment corpus"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Withdrawal (₹)
                    </label>
                    <input
                      type="number"
                      value={annualWithdrawal}
                      onChange={(e) => setAnnualWithdrawal(e.target.value)}
                      placeholder="Enter annual withdrawal amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Withdrawal Years
                    </label>
                    <input
                      type="number"
                      value={withdrawalYears}
                      onChange={(e) => setWithdrawalYears(e.target.value)}
                      placeholder="Enter number of years"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateWithdrawalPlan}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Plan Withdrawal
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
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                  Withdrawal Analysis
                </h2>

                {calculation ? (
                  <div className="space-y-6">
                    {/* Strategy Status */}
                    <div className={`text-center p-4 rounded-lg ${calculation.color.includes('green') ? 'bg-green-50 border border-green-200' : calculation.color.includes('blue') ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${calculation.color}`}>
                        {calculation.icon}
                        <span className="ml-2 text-lg font-bold">Strategy Status</span>
                      </div>
                      <p className="text-sm text-gray-600">{calculation.recommendation}</p>
                    </div>

                    {/* Annual Breakdown */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Annual Withdrawal Breakdown
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Annual Withdrawal:</span>
                          <span className="font-bold text-blue-600">₹{calculation.annualWithdrawal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax-Efficient Amount:</span>
                          <span className="font-bold text-green-600">₹{calculation.taxEfficientAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax-Inefficient Amount:</span>
                          <span className="font-bold text-red-600">₹{calculation.taxInefficientAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Annual Tax:</span>
                          <span className="font-bold text-red-600">₹{((calculation.taxInefficientAmount * 10) / 100).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Long-term Impact */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Long-term Impact
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Withdrawal Period:</span>
                          <span className="font-bold text-green-600">{calculation.withdrawalYears} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Amount Withdrawn:</span>
                          <span className="font-bold text-green-600">₹{(calculation.annualWithdrawal * calculation.withdrawalYears).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Tax Paid:</span>
                          <span className="font-bold text-red-600">₹{calculation.totalTaxPaid.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Amount Received:</span>
                          <span className="font-bold text-green-600">₹{calculation.netAmountReceived.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Optimization Tips */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Optimization Tips
                      </h3>
                      <div className="space-y-2 text-purple-700 text-sm">
                        <p>• Stay within ₹1L LTCG exemption annually</p>
                        <p>• Consider spreading withdrawals across years</p>
                        <p>• Plan around tax slab boundaries</p>
                        <p>• Monitor corpus sustainability</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter withdrawal details to plan tax-efficient strategy</p>
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
                Understanding Tax-Efficient Withdrawals
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Withdrawal Strategy
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Plan withdrawals within tax exemptions</li>
                    <li>• Consider LTCG ₹1L annual exemption</li>
                    <li>• Spread withdrawals across years</li>
                    <li>• Monitor corpus sustainability</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <IndianRupee className="h-5 w-5 mr-2" />
                    Tax Implications
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• LTCG: 10% with ₹1L exemption</li>
                    <li>• STCG: 15% flat rate</li>
                    <li>• Plan around tax slabs</li>
                    <li>• Consider timing of withdrawals</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Considerations
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Plan withdrawals well in advance</li>
                  <li>• Consider inflation and corpus growth</li>
                  <li>• Factor in other income sources</li>
                  <li>• Monitor tax law changes</li>
                  <li>• Consult financial advisor for complex scenarios</li>
                </ul>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Related Withdrawal Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/tax-tools/pf-withdrawal-tax-preview" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">PF Withdrawal Tax</span>
                    <p className="text-sm text-purple-600">Preview PF withdrawal tax</p>
                  </a>
                  <a href="/tax-tools/retirement-calculator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Retirement Calculator</span>
                    <p className="text-sm text-purple-600">Calculate retirement corpus</p>
                  </a>
                  <a href="/tax-tools/stcg-ltcg-classifier" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">STCG vs LTCG</span>
                    <p className="text-sm text-purple-600">Determine capital gains category</p>
                  </a>
                  <a href="/tax-tools/equity-tax-estimator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Equity Tax Estimator</span>
                    <p className="text-sm text-purple-600">Calculate equity tax by year</p>
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

export default TaxEfficientWithdrawalPlanner;

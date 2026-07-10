import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign, Clock, ArrowRight } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface RedemptionEntry {
  id: string;
  date: string;
  amount: number;
  holdingPeriod: number;
  type: 'STCG' | 'LTCG';
  taxRate: number;
  taxAmount: number;
}

interface RedemptionTracker {
  totalRedemptions: number;
  totalAmount: number;
  totalTax: number;
  stcgAmount: number;
  ltcgAmount: number;
  stcgTax: number;
  ltcgTax: number;
  averageTaxRate: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const IntraYearRedemptionTaxTracker: React.FC = () => {
  const [redemptions, setRedemptions] = useState<RedemptionEntry[]>([]);
  const [newDate, setNewDate] = useState<string>('');
  const [newAmount, setNewAmount] = useState<string>('');
  const [newHoldingPeriod, setNewHoldingPeriod] = useState<string>('');
  const [tracker, setTracker] = useState<RedemptionTracker | null>(null);

  const addRedemption = () => {
    if (!newDate || !newAmount || !newHoldingPeriod) {
      alert('Please fill in all fields');
      return;
    }

    const amount = parseFloat(newAmount);
    const holdingPeriod = parseInt(newHoldingPeriod);
    
    const type = holdingPeriod <= 365 ? 'STCG' : 'LTCG';
    const taxRate = type === 'STCG' ? 15 : 10;
    const taxAmount = (amount * taxRate) / 100;

    const newRedemption: RedemptionEntry = {
      id: Date.now().toString(),
      date: newDate,
      amount,
      holdingPeriod,
      type,
      taxRate,
      taxAmount
    };

    const updatedRedemptions = [...redemptions, newRedemption];
    setRedemptions(updatedRedemptions);
    calculateTracker(updatedRedemptions);

    // Reset form
    setNewDate('');
    setNewAmount('');
    setNewHoldingPeriod('');
  };

  const removeRedemption = (id: string) => {
    const updatedRedemptions = redemptions.filter(r => r.id !== id);
    setRedemptions(updatedRedemptions);
    calculateTracker(updatedRedemptions);
  };

  const calculateTracker = (redemptionList: RedemptionEntry[]) => {
    if (redemptionList.length === 0) {
      setTracker(null);
      return;
    }

    const totalAmount = redemptionList.reduce((sum, r) => sum + r.amount, 0);
    const totalTax = redemptionList.reduce((sum, r) => sum + r.taxAmount, 0);
    const stcgAmount = redemptionList.filter(r => r.type === 'STCG').reduce((sum, r) => sum + r.amount, 0);
    const ltcgAmount = redemptionList.filter(r => r.type === 'LTCG').reduce((sum, r) => sum + r.amount, 0);
    const stcgTax = redemptionList.filter(r => r.type === 'STCG').reduce((sum, r) => sum + r.taxAmount, 0);
    const ltcgTax = redemptionList.filter(r => r.type === 'LTCG').reduce((sum, r) => sum + r.taxAmount, 0);
    const averageTaxRate = totalAmount > 0 ? (totalTax / totalAmount) * 100 : 0;

    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;

    if (totalTax > 100000) {
      recommendation = 'High tax burden. Consider spreading redemptions across years.';
      color = 'text-red-600';
      icon = <AlertCircle className="h-5 w-5" />;
    } else if (totalTax > 50000) {
      recommendation = 'Moderate tax impact. Review timing of future redemptions.';
      color = 'text-orange-600';
      icon = <Info className="h-5 w-5" />;
    } else {
      recommendation = 'Manageable tax burden. Continue with current strategy.';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    }

    setTracker({
      totalRedemptions: redemptionList.length,
      totalAmount,
      totalTax,
      stcgAmount,
      ltcgAmount,
      stcgTax,
      ltcgTax,
      averageTaxRate,
      recommendation,
      color,
      icon
    });
  };

  const resetTracker = () => {
    setRedemptions([]);
    setTracker(null);
    setNewDate('');
    setNewAmount('');
    setNewHoldingPeriod('');
  };

  return (
    <>
      <SEOHelmet
        title="Intra-Year Redemption Tax Tracker - Track Multiple Redemptions | MoneyCal"
        description="Track tax implications of multiple redemptions within a year. Monitor STCG and LTCG tax burden with our comprehensive intra-year redemption tracker."
        keywords="intra-year redemption tracker, multiple redemptions tax, STCG LTCG tracker, redemption tax Calculator, tax burden tracker"
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
                Intra-Year Redemption Tax Tracker
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Track tax implications of multiple redemptions within a year
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
                  Add Redemption
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Redemption Date
                    </label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Redemption Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      placeholder="Enter redemption amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Holding Period (Days)
                    </label>
                    <input
                      type="number"
                      value={newHoldingPeriod}
                      onChange={(e) => setNewHoldingPeriod(e.target.value)}
                      placeholder="Enter holding period in days"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={addRedemption}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Add Redemption
                  </button>
                </div>

                {/* Redemptions List */}
                {redemptions.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Redemptions ({redemptions.length})
                    </h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {redemptions.map((redemption) => (
                        <div key={redemption.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{redemption.date}</span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${redemption.type === 'STCG' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                                {redemption.type}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700">
                              ₹{redemption.amount.toLocaleString()} • {redemption.holdingPeriod} days
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-800">₹{redemption.taxAmount.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">{redemption.taxRate}%</div>
                            <button
                              onClick={() => removeRedemption(redemption.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={resetTracker}
                      className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Reset All
                    </button>
                  </div>
                )}
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
                  Tax Analysis
                </h2>

                {tracker ? (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className={`text-center p-4 rounded-lg ${tracker.color.includes('red') ? 'bg-red-50 border border-red-200' : tracker.color.includes('orange') ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${tracker.color}`}>
                        {tracker.icon}
                        <span className="ml-2 text-lg font-bold">Tax Impact</span>
                      </div>
                      <p className="text-sm text-gray-600">{tracker.recommendation}</p>
                    </div>

                    {/* Overall Summary */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Overall Summary
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Redemptions:</span>
                          <span className="font-bold text-blue-600">{tracker.totalRedemptions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Amount:</span>
                          <span className="font-bold text-blue-600">₹{tracker.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Tax:</span>
                          <span className="font-bold text-blue-600">₹{tracker.totalTax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Average Tax Rate:</span>
                          <span className="font-bold text-blue-600">{tracker.averageTaxRate.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* STCG vs LTCG Breakdown */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Capital Gains Breakdown
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-orange-800 mb-2">Short Term (STCG)</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Amount:</span>
                              <span className="font-semibold">₹{tracker.stcgAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax:</span>
                              <span className="font-semibold">₹{tracker.stcgTax.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-2">Long Term (LTCG)</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Amount:</span>
                              <span className="font-semibold">₹{tracker.ltcgAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax:</span>
                              <span className="font-semibold">₹{tracker.ltcgTax.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tax Optimization Tips */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Optimization Tips
                      </h3>
                      <div className="space-y-2 text-purple-700 text-sm">
                        <p>• Consider spreading redemptions across years</p>
                        <p>• Utilize ₹1L LTCG exemption effectively</p>
                        <p>• Plan redemptions around tax slabs</p>
                        <p>• Monitor cumulative tax burden</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Add redemptions to track tax implications</p>
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
                Understanding Intra-Year Redemption Tax
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Multiple Redemptions
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Track cumulative tax burden</li>
                    <li>• Monitor STCG vs LTCG mix</li>
                    <li>• Optimize redemption timing</li>
                    <li>• Plan tax-efficient strategies</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <IndianRupee className="h-5 w-5 mr-2" />
                    Tax Implications
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• STCG: 15% flat rate</li>
                    <li>• LTCG: 10% with ₹1L exemption</li>
                    <li>• Cumulative impact assessment</li>
                    <li>• Tax slab considerations</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Considerations
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Multiple redemptions increase tax burden</li>
                  <li>• Consider spreading across financial years</li>
                  <li>• Monitor cumulative LTCG exemption usage</li>
                  <li>• Plan around tax slab boundaries</li>
                  <li>• Consult tax advisor for complex scenarios</li>
                </ul>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Related Tax Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/tax-tools/stcg-ltcg-classifier" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">STCG vs LTCG Classifier</span>
                    <p className="text-sm text-purple-600">Determine capital gains category</p>
                  </a>
                  <a href="/tax-tools/equity-tax-estimator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Equity Tax Estimator</span>
                    <p className="text-sm text-purple-600">Calculate equity tax by year</p>
                  </a>
                  <a href="/tax-tools/loss-carry-forward-estimator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Loss Carry Forward</span>
                    <p className="text-sm text-purple-600">Estimate loss carry forward</p>
                  </a>
                  <a href="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">LTCG Offset Tool</span>
                    <p className="text-sm text-purple-600">Offset LTCG with exemptions</p>
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

export default IntraYearRedemptionTaxTracker;

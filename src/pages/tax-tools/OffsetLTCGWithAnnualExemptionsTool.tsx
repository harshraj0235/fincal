import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Info, TrendingUp, Shield } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface LTCGOffsetResult {
  totalLTCG: number;
  annualExemption: number;
  taxableLTCG: number;
  taxAmount: number;
  taxSaved: number;
}

const OffsetLTCGWithAnnualExemptionsTool: React.FC = () => {
  const [ltcgAmount, setLtcgAmount] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [result, setResult] = useState<LTCGOffsetResult | null>(null);

  const calculateOffset = () => {
    if (!ltcgAmount) {
      alert('Please enter LTCG amount');
      return;
    }

    const ltcg = parseFloat(ltcgAmount);
    
    // Annual exemption for LTCG (₹1 lakh)
    const annualExemption = 100000;
    
    // Calculate taxable LTCG
    const taxableLTCG = Math.max(0, ltcg - annualExemption);
    
    // Calculate tax (10% on taxable amount)
    const taxAmount = taxableLTCG * 0.10;
    
    // Calculate tax saved due to exemption
    const taxSaved = Math.min(ltcg, annualExemption) * 0.10;

    setResult({
      totalLTCG: ltcg,
      annualExemption,
      taxableLTCG,
      taxAmount,
      taxSaved
    });
  };

  const resetForm = () => {
    setLtcgAmount('');
    setOtherIncome('');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Offset LTCG with Annual Exemptions Tool - LTCG Tax Planning Calculator | MoneyCal"
        description="Calculate how to offset Long Term Capital Gains with annual exemptions. Plan your LTCG sales to maximize tax benefits."
        keywords="LTCG exemption Calculator, long term capital gains tax, annual exemption, tax planning"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Offset LTCG with Annual Exemptions Tool
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Plan your LTCG sales to maximize annual exemption benefits
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
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  LTCG Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Long Term Capital Gains (₹)
                    </label>
                    <input
                      type="number"
                      value={ltcgAmount}
                      onChange={(e) => setLtcgAmount(e.target.value)}
                      placeholder="Enter LTCG amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Income (₹) - Optional
                    </label>
                    <input
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(e.target.value)}
                      placeholder="Enter other income for context"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateOffset}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Offset
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

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  LTCG Offset Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Total LTCG</p>
                        <p className="text-xl font-bold text-blue-900">₹{result.totalLTCG.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-600">Exemption</p>
                        <p className="text-xl font-bold text-green-900">₹{result.annualExemption.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Taxable LTCG:</span>
                        <span className="font-bold text-gray-900">₹{result.taxableLTCG.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">Tax Amount:</span>
                        <span className="font-bold text-red-600">₹{result.taxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-300">
                        <span className="text-gray-700 font-semibold">Tax Saved:</span>
                        <span className="font-bold text-green-600">₹{result.taxSaved.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-3">Key Benefits</h3>
                      <ul className="space-y-2 text-blue-700 text-sm">
                        <li>• ₹1 lakh annual exemption available</li>
                        <li>• 10% tax rate on excess amount</li>
                        <li>• No indexation benefit needed</li>
                        <li>• Simple calculation method</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IndianRupee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter LTCG details to calculate offset</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OffsetLTCGWithAnnualExemptionsTool;

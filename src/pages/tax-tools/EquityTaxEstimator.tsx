import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Calendar, TrendingUp, DollarSign, Info, AlertCircle, FileText, BarChart3 } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface TaxBreakdown {
  stcg: number;
  ltcg: number;
  totalTax: number;
  netAmount: number;
  taxRate: {
    stcg: number;
    ltcg: number;
  };
}

const EquityTaxEstimator: React.FC = () => {
  const [assessmentYear, setAssessmentYear] = useState('2024-25');
  const [stcgAmount, setStcgAmount] = useState('');
  const [ltcgAmount, setLtcgAmount] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [result, setResult] = useState<TaxBreakdown | null>(null);

  const assessmentYears = [
    '2024-25', '2023-24', '2022-23', '2021-22', '2020-21'
  ];

  const calculateTax = () => {
    if (!stcgAmount && !ltcgAmount) {
      alert('Please enter at least one capital gains amount');
      return;
    }

    const stcg = parseFloat(stcgAmount) || 0;
    const ltcg = parseFloat(ltcgAmount) || 0;
    const otherInc = parseFloat(otherIncome) || 0;

    // Tax rates based on assessment year
    let stcgRate = 15; // Default STCG rate
    let ltcgRate = 10; // Default LTCG rate

    // Adjust rates based on assessment year (example logic)
    if (assessmentYear === '2023-24' || assessmentYear === '2024-25') {
      stcgRate = 15;
      ltcgRate = 10;
    } else if (assessmentYear === '2022-23') {
      stcgRate = 15;
      ltcgRate = 10;
    }

    // Calculate STCG tax
    const stcgTax = (stcg * stcgRate) / 100;

    // Calculate LTCG tax (with 1 lakh exemption)
    const taxableLtcg = Math.max(0, ltcg - 100000);
    const ltcgTax = (taxableLtcg * ltcgRate) / 100;

    const totalTax = stcgTax + ltcgTax;
    const totalGains = stcg + ltcg;
    const netAmount = totalGains - totalTax;

    setResult({
      stcg,
      ltcg,
      totalTax,
      netAmount,
      taxRate: {
        stcg: stcgRate,
        ltcg: ltcgRate
      }
    });
  };

  const resetForm = () => {
    setAssessmentYear('2024-25');
    setStcgAmount('');
    setLtcgAmount('');
    setOtherIncome('');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Equity Tax Estimator by Assessment Year - Capital Gains Tax Calculator | MoneyCal"
        description="Calculate equity tax liability by assessment year. Estimate STCG and LTCG taxes with our comprehensive equity tax estimator tool for accurate tax planning."
        keywords="equity tax estimator, assessment year tax Calculator, capital gains tax, STCG LTCG Calculator, tax planning tool"
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
                Equity Tax Estimator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate your equity tax liability by assessment year with precision
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
                  Tax Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assessment Year
                    </label>
                    <select
                      value={assessmentYear}
                      onChange={(e) => setAssessmentYear(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {assessmentYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Term Capital Gains (₹)
                    </label>
                    <input
                      type="number"
                      value={stcgAmount}
                      onChange={(e) => setStcgAmount(e.target.value)}
                      placeholder="Enter STCG amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

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
                      placeholder="Enter other income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTax}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Tax
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
                  Tax Breakdown
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Assessment Year */}
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-blue-600">Assessment Year</p>
                      <p className="text-xl font-bold text-blue-900">{assessmentYear}</p>
                    </div>

                    {/* Capital Gains Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-sm text-red-600">STCG Amount</p>
                        <p className="text-xl font-bold text-red-900">₹{result.stcg.toLocaleString()}</p>
                        <p className="text-xs text-red-600">Tax Rate: {result.taxRate.stcg}%</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-600">LTCG Amount</p>
                        <p className="text-xl font-bold text-blue-900">₹{result.ltcg.toLocaleString()}</p>
                        <p className="text-xs text-blue-600">Tax Rate: {result.taxRate.ltcg}%</p>
                      </div>
                    </div>

                    {/* Tax Calculation */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">STCG Tax:</span>
                        <span className="font-bold text-red-600">₹{((result.stcg * result.taxRate.stcg) / 100).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">LTCG Tax:</span>
                        <span className="font-bold text-blue-600">₹{((Math.max(0, result.ltcg - 100000) * result.taxRate.ltcg) / 100).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-2 border-gray-300">
                        <span className="text-gray-700 font-semibold">Total Tax:</span>
                        <span className="font-bold text-gray-900">₹{result.totalTax.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Net Amount */}
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-green-600">Net Amount After Tax</p>
                      <p className="text-2xl font-bold text-green-900">₹{result.netAmount.toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IndianRupee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter your capital gains details to calculate tax liability</p>
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
                Understanding Equity Tax by Assessment Year
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Short Term Capital Gains
                  </h3>
                                     <ul className="space-y-2 text-red-700">
                     <li>• Tax rate: 15% (flat rate)</li>
                     <li>• No exemption limit</li>
                     <li>• Applies to gains from equity shares</li>
                     <li>• Holding period: &le; 12 months</li>
                   </ul>
                 </div>

                 <div className="bg-blue-50 p-6 rounded-xl">
                   <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                     <TrendingUp className="h-5 w-5 mr-2" />
                     Long Term Capital Gains
                   </h3>
                   <ul className="space-y-2 text-blue-700">
                     <li>• Tax rate: 10% (flat rate)</li>
                     <li>• ₹1,00,000 exemption per year</li>
                     <li>• Applies to gains from equity shares</li>
                     <li>• Holding period: &gt; 12 months</li>
                   </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Tax rates are subject to change based on government policies</li>
                  <li>• LTCG exemption of ₹1,00,000 is per financial year</li>
                  <li>• This Calculator is for educational purposes</li>
                  <li>• Consult a tax professional for accurate calculations</li>
                  <li>• Consider other deductions and exemptions in your tax planning</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EquityTaxEstimator;

import React, { useState, useEffect } from 'react';
import { Scale, TrendingUp, TrendingDown, Info, Calculator, DollarSign, AlertCircle, CheckCircle, BarChart3, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

export const GSTLiabilityCalculator: React.FC = () => {
  const [outputTax, setOutputTax] = useState<number>(100000);
  const [inputTax, setInputTax] = useState<number>(40000);
  const [reverseChargeTax, setReverseChargeTax] = useState<number>(0);
  const [tdsDeducted, setTdsDeducted] = useState<number>(0);
  const [tcsCollected, setTcsCollected] = useState<number>(0);
  const [advanceTaxPaid, setAdvanceTaxPaid] = useState<number>(0);
  
  const [netLiability, setNetLiability] = useState<number>(0);
  const [cashLiability, setNetCashLiability] = useState<number>(0);
  const [itcUtilization, setItcUtilization] = useState<number>(0);
  const [refundAmount, setRefundAmount] = useState<number>(0);

  useEffect(() => {
    // Calculate total tax liability
    const totalOutputTax = outputTax + reverseChargeTax;
    
    // Calculate ITC utilization
    const itcAvailable = inputTax;
    const itcUsed = Math.min(itcAvailable, totalOutputTax);
    
    // Net liability before adjustments
    let liability = totalOutputTax - itcUsed;
    
    // Adjust for TDS/TCS
    liability = liability - tdsDeducted - tcsCollected - advanceTaxPaid;
    
    setNetLiability(liability);
    setItcUtilization(itcUsed);
    
    if (liability > 0) {
      setNetCashLiability(liability);
      setRefundAmount(0);
    } else {
      setNetCashLiability(0);
      setRefundAmount(Math.abs(liability));
    }
  }, [outputTax, inputTax, reverseChargeTax, tdsDeducted, tcsCollected, advanceTaxPaid]);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              GST Liability Calculator
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Calculate net GST liability after ITC adjustment. Input tax credit utilization, 
            TDS/TCS adjustments, and cash payment requirements.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-3 text-emerald-600" />
                Tax Details
              </h2>
              
              <div className="space-y-6">
                {/* Output Tax */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Output Tax (Tax on Sales) (₹)
                  </label>
                  <input
                    type="number"
                    value={outputTax}
                    onChange={(e) => setOutputTax(Number(e.target.value))}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Input Tax */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Input Tax Credit (ITC) Available (₹)
                  </label>
                  <input
                    type="number"
                    value={inputTax}
                    onChange={(e) => setInputTax(Number(e.target.value))}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Reverse Charge Tax */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reverse Charge Tax (₹)
                  </label>
                  <input
                    type="number"
                    value={reverseChargeTax}
                    onChange={(e) => setReverseChargeTax(Number(e.target.value))}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* TDS Deducted */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    TDS Deducted (₹)
                  </label>
                  <input
                    type="number"
                    value={tdsDeducted}
                    onChange={(e) => setTdsDeducted(Number(e.target.value))}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* TCS Collected */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    TCS Collected (₹)
                  </label>
                  <input
                    type="number"
                    value={tcsCollected}
                    onChange={(e) => setTcsCollected(Number(e.target.value))}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Advance Tax */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Advance Tax Paid (₹)
                  </label>
                  <input
                    type="number"
                    value={advanceTaxPaid}
                    onChange={(e) => setAdvanceTaxPaid(Number(e.target.value))}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Calculation Summary */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-xl p-8 border border-emerald-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-emerald-600" />
                Liability Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                  <span className="font-medium text-gray-700">Output Tax:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(outputTax)}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                  <span className="font-medium text-gray-700">Reverse Charge Tax:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(reverseChargeTax)}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-100 rounded-xl">
                  <span className="font-medium text-green-800">(-) ITC Utilized:</span>
                  <span className="font-bold text-green-800">{formatCurrency(itcUtilization)}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-100 rounded-xl">
                  <span className="font-medium text-blue-800">(-) TDS Deducted:</span>
                  <span className="font-bold text-blue-800">{formatCurrency(tdsDeducted)}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-100 rounded-xl">
                  <span className="font-medium text-blue-800">(-) TCS Collected:</span>
                  <span className="font-bold text-blue-800">{formatCurrency(tcsCollected)}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-100 rounded-xl">
                  <span className="font-medium text-blue-800">(-) Advance Tax:</span>
                  <span className="font-bold text-blue-800">{formatCurrency(advanceTaxPaid)}</span>
                </div>

                <div className="border-t-2 border-emerald-300 pt-4">
                  {cashLiability > 0 ? (
                    <div className="flex justify-between items-center p-5 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl shadow-lg">
                      <span className="font-bold text-white text-lg flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Cash to Pay:
                      </span>
                      <span className="text-2xl font-bold text-white">{formatCurrency(cashLiability)}</span>
                    </div>
                  ) : refundAmount > 0 ? (
                    <div className="flex justify-between items-center p-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <span className="font-bold text-white text-lg flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Refund Due:
                      </span>
                      <span className="text-2xl font-bold text-white">{formatCurrency(refundAmount)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                      <span className="font-bold text-white text-lg flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Liability Cleared!
                      </span>
                      <span className="text-2xl font-bold text-white">{formatCurrency(0)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-emerald-600" />
                Analysis
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Total Output Tax:</span>
                  <span className="font-bold">{formatCurrency(outputTax + reverseChargeTax)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>ITC Utilization %:</span>
                  <span className="font-bold text-green-600">
                    {outputTax > 0 ? ((itcUtilization / (outputTax + reverseChargeTax)) * 100).toFixed(2) : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Unused ITC:</span>
                  <span className="font-bold text-blue-600">{formatCurrency(Math.max(0, inputTax - itcUtilization))}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Effective Tax Rate:</span>
                  <span className="font-bold">
                    {outputTax > 0 ? ((cashLiability / outputTax) * 100).toFixed(2) : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Important Points
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                  <span>ITC can only be used against output tax liability</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                  <span>Reverse charge tax increases your total liability</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                  <span>TDS/TCS are adjustable against GST liability</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                  <span>Excess ITC can be carried forward to next month</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center mb-6">
            <Info className="w-6 h-6 mr-2 text-emerald-600" />
            GST Liability Calculator - FAQs
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How to calculate net GST liability?</h3>
              <p className="text-gray-600">
                Net GST Liability = (Output Tax + Reverse Charge Tax) - ITC Utilized - TDS - TCS - Advance Tax Paid
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is Input Tax Credit (ITC)?</h3>
              <p className="text-gray-600">
                ITC is the GST paid on purchases that can be used to reduce GST liability on sales. 
                It helps avoid tax on tax and reduces cash outflow.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I use ITC to pay GST liability?</h3>
              <p className="text-gray-600">
                Yes, ITC can be used to pay output tax liability. However, cash payment is required for interest, penalty, and certain other charges.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gray-50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related GST Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://moneycal.in/tools/gst-amount-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Amount Calculator</div>
              <div className="text-sm text-gray-600">Calculate GST on sales</div>
            </a>
            <a
              href="https://moneycal.in/tools/itc-eligibility-checker"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors"
            >
              <div className="font-medium text-gray-900">ITC Eligibility Checker</div>
              <div className="text-sm text-gray-600">Check ITC eligibility</div>
            </a>
            <a
              href="https://moneycal.in/tools/gstr-3b-deadline-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GSTR-3B Deadline</div>
              <div className="text-sm text-gray-600">Filing deadline calculator</div>
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default GSTLiabilityCalculator;

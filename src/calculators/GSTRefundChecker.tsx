import React, { useState, useEffect } from 'react';
import { DollarSign, CheckCircle, XCircle, AlertTriangle, Info, TrendingUp, FileText, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface RefundCheck {
  category: string;
  isEligible: boolean;
  message: string;
}

export const GSTRefundChecker: React.FC = () => {
  const [refundType, setRefundType] = useState<string>('');
  const [exportTurnover, setExportTurnover] = useState<number>(0);
  const [totalTurnover, setTotalTurnover] = useState<number>(0);
  const [itcAccumulated, setItcAccumulated] = useState<number>(0);
  const [taxPaid, setTaxPaid] = useState<number>(0);
  const [returnsStatus, setReturnsStatus] = useState<string>('');
  const [checks, setChecks] = useState<RefundCheck[]>([]);
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [estimatedRefund, setEstimatedRefund] = useState<number>(0);

  const checkRefundEligibility = () => {
    const results: RefundCheck[] = [];
    let eligible = true;

    // Check refund type specific conditions
    if (refundType === 'export-refund') {
      if (exportTurnover > 0) {
        results.push({
          category: 'Export Activity',
          isEligible: true,
          message: '✅ Export turnover recorded - eligible for refund'
        });
      } else {
        results.push({
          category: 'Export Activity',
          isEligible: false,
          message: '❌ No export turnover - not eligible for export refund'
        });
        eligible = false;
      }

      // Calculate export refund
      const exportRatio = totalTurnover > 0 ? exportTurnover / totalTurnover : 0;
      const refundAmount = itcAccumulated * exportRatio;
      setEstimatedRefund(refundAmount);

    } else if (refundType === 'accumulated-itc') {
      if (itcAccumulated > taxPaid) {
        results.push({
          category: 'Accumulated ITC',
          isEligible: true,
          message: '✅ ITC accumulated exceeds output tax - eligible for refund'
        });
        setEstimatedRefund(itcAccumulated - taxPaid);
      } else {
        results.push({
          category: 'Accumulated ITC',
          isEligible: false,
          message: '❌ No excess ITC accumulated'
        });
        eligible = false;
      }

    } else if (refundType === 'inverted-duty') {
      results.push({
        category: 'Inverted Duty Structure',
        isEligible: true,
        message: '✅ Inverted duty structure - may be eligible subject to verification'
      });
      
    } else if (refundType === 'excess-payment') {
      if (taxPaid > 0) {
        results.push({
          category: 'Excess Payment',
          isEligible: true,
          message: '✅ Excess tax paid - eligible for refund'
        });
        setEstimatedRefund(taxPaid);
      }
    }

    // Check returns filing status
    if (returnsStatus === 'filed-timely') {
      results.push({
        category: 'Returns Filing',
        isEligible: true,
        message: '✅ Returns filed on time - no compliance issues'
      });
    } else if (returnsStatus === 'filed-late') {
      results.push({
        category: 'Returns Filing',
        isEligible: true,
        message: '⚠️ Returns filed late - may cause delay in refund processing'
      });
    } else if (returnsStatus === 'not-filed') {
      results.push({
        category: 'Returns Filing',
        isEligible: false,
        message: '❌ Returns not filed - must file all returns before claiming refund'
      });
      eligible = false;
    }

    // General eligibility checks
    if (itcAccumulated === 0 && refundType !== 'excess-payment') {
      results.push({
        category: 'ITC Availability',
        isEligible: false,
        message: '❌ No ITC accumulated to claim refund'
      });
      eligible = false;
    }

    setChecks(results);
    setIsEligible(eligible);
  };

  useEffect(() => {
    if (refundType && returnsStatus) {
      checkRefundEligibility();
    }
  }, [refundType, exportTurnover, totalTurnover, itcAccumulated, taxPaid, returnsStatus]);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const processingTime = {
    'export-refund': '60-90 days',
    'accumulated-itc': '60 days',
    'inverted-duty': '90-120 days',
    'excess-payment': '30-60 days'
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
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              GST Refund Eligibility Checker
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Check if you're eligible for GST refund. Estimate refund amount and processing time. 
            Supports export refunds, accumulated ITC, and excess payment claims.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Details</h2>
              
              <div className="space-y-6">
                {/* Refund Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Type of Refund Claim
                  </label>
                  <select
                    value={refundType}
                    onChange={(e) => setRefundType(e.target.value)}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select refund type</option>
                    <option value="export-refund">Export Refund (Zero-rated supply)</option>
                    <option value="accumulated-itc">Accumulated ITC Refund</option>
                    <option value="inverted-duty">Inverted Duty Structure</option>
                    <option value="excess-payment">Excess Tax Payment</option>
                  </select>
                </div>

                {/* Export Turnover */}
                {refundType === 'export-refund' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Export Turnover (₹)
                      </label>
                      <input
                        type="number"
                        value={exportTurnover || ''}
                        onChange={(e) => setExportTurnover(Number(e.target.value))}
                        placeholder="Enter export turnover"
                        className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Total Turnover (₹)
                      </label>
                      <input
                        type="number"
                        value={totalTurnover || ''}
                        onChange={(e) => setTotalTurnover(Number(e.target.value))}
                        placeholder="Enter total turnover"
                        className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                        min="0"
                      />
                    </div>
                  </>
                )}

                {/* ITC Accumulated */}
                {(refundType === 'export-refund' || refundType === 'accumulated-itc' || refundType === 'inverted-duty') && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ITC Accumulated (₹)
                    </label>
                    <input
                      type="number"
                      value={itcAccumulated || ''}
                      onChange={(e) => setItcAccumulated(Number(e.target.value))}
                      placeholder="Enter accumulated ITC"
                      className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                      min="0"
                    />
                  </div>
                )}

                {/* Tax Paid */}
                {(refundType === 'accumulated-itc' || refundType === 'excess-payment') && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tax Paid (₹)
                    </label>
                    <input
                      type="number"
                      value={taxPaid || ''}
                      onChange={(e) => setTaxPaid(Number(e.target.value))}
                      placeholder="Enter tax paid"
                      className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                      min="0"
                    />
                  </div>
                )}

                {/* Returns Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Returns Filing Status
                  </label>
                  <select
                    value={returnsStatus}
                    onChange={(e) => setReturnsStatus(e.target.value)}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select status</option>
                    <option value="filed-timely">All returns filed on time</option>
                    <option value="filed-late">Returns filed but with delay</option>
                    <option value="not-filed">Some returns pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Refund Types Info */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Refund Types Explained
              </h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div>
                  <strong>Export Refund:</strong> For zero-rated (export) supplies
                </div>
                <div>
                  <strong>Accumulated ITC:</strong> When ITC &gt; Output tax
                </div>
                <div>
                  <strong>Inverted Duty:</strong> When input tax rate &gt; output tax rate
                </div>
                <div>
                  <strong>Excess Payment:</strong> Tax paid more than liability
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
            {checks.length > 0 && (
              <>
                {/* Eligibility Status */}
                <div className={`rounded-2xl shadow-xl p-8 border-2 ${
                  isEligible
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                    : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300'
                }`}>
                  <div className="flex items-center mb-6">
                    {isEligible ? (
                      <CheckCircle className="w-12 h-12 text-green-600 mr-4" />
                    ) : (
                      <XCircle className="w-12 h-12 text-red-600 mr-4" />
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {isEligible ? 'Refund Eligible!' : 'Not Eligible'}
                      </h2>
                      <p className="text-gray-600">
                        {isEligible 
                          ? 'You can claim GST refund'
                          : 'Requirements not met for refund'}
                      </p>
                    </div>
                  </div>

                  {/* Checks */}
                  <div className="space-y-3">
                    {checks.map((check, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border ${
                          check.isEligible
                            ? 'bg-green-100 border-green-300'
                            : 'bg-red-100 border-red-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900 mb-1">{check.category}</div>
                        <div className="text-sm text-gray-700">{check.message}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Estimated Refund */}
                {isEligible && estimatedRefund > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-amber-600" />
                      Refund Estimate
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg">
                        <span className="font-bold text-white text-lg">Estimated Refund:</span>
                        <span className="text-2xl font-bold text-white">{formatCurrency(estimatedRefund)}</span>
                      </div>

                      {refundType && processingTime[refundType as keyof typeof processingTime] && (
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                          <span className="font-medium text-blue-800 flex items-center">
                            <Clock className="w-5 h-5 mr-2" />
                            Processing Time:
                          </span>
                          <span className="font-bold text-blue-900">
                            {processingTime[refundType as keyof typeof processingTime]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Documents Required */}
                {isEligible && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-amber-600" />
                      Documents Required
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                        <span>All GST returns filed (GSTR-1, GSTR-3B)</span>
                      </li>
                      <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                        <span>Bank account details and cancelled cheque</span>
                      </li>
                      <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                        <span>Tax invoices of input purchases</span>
                      </li>
                      {refundType === 'export-refund' && (
                        <>
                          <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                            <span>Shipping bills / Bill of export</span>
                          </li>
                          <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                            <span>Bank realization certificate</span>
                          </li>
                        </>
                      )}
                      <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                        <span>Refund application form (RFD-01)</span>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
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
            <Info className="w-6 h-6 mr-2 text-amber-600" />
            GST Refund - FAQs
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">When can I claim GST refund?</h3>
              <p className="text-gray-600">
                You can claim refund for: exports, accumulated ITC, inverted duty structure, excess tax payment, 
                finalization of provisional assessment, or refund to UN bodies/embassies.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How long does GST refund take?</h3>
              <p className="text-gray-600">
                Typically 60-90 days for most refunds. Export refunds can be faster (30-60 days) if all documents are in order.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the process for claiming GST refund?</h3>
              <p className="text-gray-600">
                File RFD-01 form on GST portal → Upload documents → Officer verification → Provisional refund (90%) → 
                Final refund after verification.
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
              href="https://moneycal.in/tools/gst-liability-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Liability Calculator</div>
              <div className="text-sm text-gray-600">Calculate net liability</div>
            </a>
            <a
              href="https://moneycal.in/tools/itc-eligibility-checker"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors"
            >
              <div className="font-medium text-gray-900">ITC Eligibility Checker</div>
              <div className="text-sm text-gray-600">Check ITC eligibility</div>
            </a>
            <a
              href="https://moneycal.in/tools/gstr-3b-deadline-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GSTR-3B Deadline</div>
              <div className="text-sm text-gray-600">Filing deadlines</div>
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default GSTRefundChecker;

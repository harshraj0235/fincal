import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, ExternalLink, Info, FileText, Calculator, TrendingUp, Bell, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Inject FAQ schema
const injectSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is GSTR-3B and when is it due?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GSTR-3B is a monthly summary return filed by all GST registered taxpayers. It's due by the 20th of the following month for regular taxpayers and 22nd/24th for QRMP scheme taxpayers."
        }
      },
      {
        "@type": "Question",
        "name": "What is the penalty for late filing of GSTR-3B?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Late filing attracts penalty of ₹50 per day (₹25 CGST + ₹25 SGST) with maximum of ₹5,000. Interest at 18% per annum on tax liability also applies."
        }
      },
      {
        "@type": "Question",
        "name": "What is QRMP scheme?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "QRMP (Quarterly Return Monthly Payment) is a scheme for taxpayers with turnover up to ₹5 crore, allowing quarterly GSTR-3B filing with monthly tax payment using challan."
        }
      },
      {
        "@type": "Question",
        "name": "Can I file GSTR-3B after due date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, but with penalties and interest. File immediately to minimize charges. Late filing may also restrict ITC claims."
        }
      }
    ]
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
  return () => { document.head.removeChild(script); };
};

interface GSTR3BResult {
  dueDate: Date;
  daysRemaining: number;
  isOverdue: boolean;
  penaltyAmount: number;
  interestAmount: number;
  totalCharges: number;
  status: 'on-time' | 'warning' | 'overdue';
  message: string;
  filingType: string;
}

export const GSTR3BDeadlineCalculator: React.FC = () => {
  const [filingMonth, setFilingMonth] = useState<string>('');
  const [turnover, setTurnover] = useState<number>(0);
  const [filingType, setFilingType] = useState<'monthly' | 'qrmp'>('monthly');
  const [taxLiability, setTaxLiability] = useState<number>(0);
  const [result, setResult] = useState<GSTR3BResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [calculationHistory, setCalculationHistory] = useState<GSTR3BResult[]>([]);

  useEffect(() => {
    injectSchema();
  }, []);

  const calculateDeadline = () => {
    if (!filingMonth) return;

    const periodDate = new Date(filingMonth);
    const currentDate = new Date();
    
    let dueDate: Date;
    let filingTypeText = '';
    
    if (filingType === 'monthly') {
      // Regular taxpayers: 20th of next month
      dueDate = new Date(periodDate.getFullYear(), periodDate.getMonth() + 1, 20);
      filingTypeText = 'Monthly Filing';
    } else {
      // QRMP scheme: Varies by quarter and category
      const month = periodDate.getMonth();
      const quarter = Math.floor(month / 3);
      const isLastMonthOfQuarter = month % 3 === 2;
      
      if (isLastMonthOfQuarter) {
        // Last month of quarter: 22nd or 24th
        dueDate = new Date(periodDate.getFullYear(), periodDate.getMonth() + 1, turnover <= 150000000 ? 24 : 22);
        filingTypeText = 'QRMP - Quarterly Return';
      } else {
        // First two months: PMT-06 challan by 25th
        dueDate = new Date(periodDate.getFullYear(), periodDate.getMonth() + 1, 25);
        filingTypeText = 'QRMP - Monthly Payment (PMT-06)';
      }
    }

    const daysRemaining = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    const isOverdue = daysRemaining < 0;
    
    let penaltyAmount = 0;
    let interestAmount = 0;
    let status: 'on-time' | 'warning' | 'overdue' = 'on-time';
    let message = '';

    if (isOverdue) {
      const daysLate = Math.abs(daysRemaining);
      // GSTR-3B penalty: ₹50 per day (₹25 CGST + ₹25 SGST), max ₹5000
      penaltyAmount = Math.min(daysLate * 50, 5000);
      // Interest: 18% per annum
      interestAmount = (taxLiability * 18 * daysLate) / (100 * 365);
      status = 'overdue';
      message = `Overdue by ${daysLate} days. File immediately to avoid further penalties and ITC restrictions.`;
    } else if (daysRemaining <= 3) {
      status = 'warning';
      message = `Only ${daysRemaining} days left to file. File soon to avoid penalties.`;
    } else {
      message = `You have ${daysRemaining} days to file GSTR-3B.`;
    }

    const totalCharges = penaltyAmount + interestAmount;

    const calculationResult: GSTR3BResult = {
      dueDate,
      daysRemaining,
      isOverdue,
      penaltyAmount,
      interestAmount,
      totalCharges,
      status,
      message,
      filingType: filingTypeText
    };

    setResult(calculationResult);
    setCalculationHistory(prev => [calculationResult, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    if (filingMonth) {
      calculateDeadline();
    }
  }, [filingMonth, turnover, filingType, taxLiability]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'overdue':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

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
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              GSTR-3B Deadline Calculator
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Calculate GSTR-3B filing deadlines with penalty and interest for late filing. 
            Supports both monthly and QRMP scheme taxpayers. Updated for 2025.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-3 text-indigo-600" />
                Filing Details
              </h2>
              
              <div className="space-y-6">
                {/* Filing Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Filing Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setFilingType('monthly')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        filingType === 'monthly'
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="text-center">
                        <Calendar className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-semibold">Monthly</div>
                        <div className="text-xs text-gray-600">Due: 20th</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setFilingType('qrmp')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        filingType === 'qrmp'
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="text-center">
                        <Calendar className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-semibold">QRMP</div>
                        <div className="text-xs text-gray-600">Quarterly</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Filing Month */}
                <div>
                  <label htmlFor="filing-month" className="block text-sm font-semibold text-gray-700 mb-2">
                    Month for which return is to be filed
                  </label>
                  <input
                    type="month"
                    id="filing-month"
                    value={filingMonth}
                    onChange={(e) => setFilingMonth(e.target.value)}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>

                {/* Annual Turnover */}
                <div>
                  <label htmlFor="turnover" className="block text-sm font-semibold text-gray-700 mb-2">
                    Annual Turnover (₹)
                  </label>
                  <input
                    type="number"
                    id="turnover"
                    value={turnover || ''}
                    onChange={(e) => setTurnover(Number(e.target.value))}
                    placeholder="Enter your annual turnover"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {turnover > 0 && turnover <= 50000000 ? (
                      <span className="text-green-600 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Eligible for QRMP scheme (turnover ≤ ₹5 Cr)
                      </span>
                    ) : turnover > 50000000 ? (
                      <span className="text-orange-600 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Must file monthly returns (turnover &gt; ₹5 Cr)
                      </span>
                    ) : null}
                  </p>
                </div>

                {/* Tax Liability */}
                <div>
                  <label htmlFor="tax-liability" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tax Liability for the Period (₹)
                  </label>
                  <input
                    type="number"
                    id="tax-liability"
                    value={taxLiability || ''}
                    onChange={(e) => setTaxLiability(Number(e.target.value))}
                    placeholder="Enter tax liability"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Required for interest calculation on late filing
                  </p>
                </div>
              </div>
            </div>

            {/* Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-blue-50 rounded-2xl p-6 border border-blue-200"
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                GSTR-3B Filing Guidelines 2025
              </h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Monthly Filers:</strong> Due by 20th of following month
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>QRMP (≤₹5 Cr):</strong> Quarterly return + monthly payment
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Late Penalty:</strong> ₹50/day (max ₹5,000)
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Interest:</strong> 18% per annum on tax liability
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {result && (
              <>
                {/* Main Result Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-indigo-600" />
                    Filing Status
                  </h2>
                  
                  <div className={`p-6 rounded-xl border-2 ${getStatusColor(result.status)} mb-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {getStatusIcon(result.status)}
                        <span className="ml-3 font-semibold text-lg">
                          {result.status === 'on-time' ? 'On Time' : 
                           result.status === 'warning' ? 'Warning' : 'Overdue'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Filing Type:</span>
                        <span className="font-semibold">{result.filingType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Due Date:</span>
                        <span className="font-semibold">{formatDate(result.dueDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Days Remaining:</span>
                        <span className="font-semibold">{result.daysRemaining} days</span>
                      </div>
                      <div className="pt-3 border-t border-current">
                        <p className="font-medium">{result.message}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="https://www.gst.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      File GSTR-3B
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                    <button
                      className="flex items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                    >
                      <Bell className="w-5 h-5 mr-2" />
                      Set Reminder
                    </button>
                  </div>
                </div>

                {/* Penalty Card */}
                {(result.penaltyAmount > 0 || result.interestAmount > 0) && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                      Late Filing Charges
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                        <span className="font-medium text-red-800">Late Fee (₹50/day):</span>
                        <span className="font-bold text-red-900">{formatCurrency(result.penaltyAmount)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                        <span className="font-medium text-orange-800">Interest (18% p.a.):</span>
                        <span className="font-bold text-orange-900">{formatCurrency(result.interestAmount)}</span>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center p-4 bg-red-100 rounded-xl">
                          <span className="font-bold text-red-900">Total Charges:</span>
                          <span className="font-bold text-red-900 text-xl">{formatCurrency(result.totalCharges)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* History */}
                {calculationHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                      Recent Calculations
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {calculationHistory.slice(0, 5).map((calc, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                          <div>
                            <div className="font-semibold">{calc.filingType}</div>
                            <div className="text-gray-600">{formatDate(calc.dueDate)}</div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${calc.isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                              {calc.daysRemaining} days
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center mb-6">
            <Info className="w-6 h-6 mr-2 text-indigo-600" />
            GSTR-3B Deadline Calculator - FAQs
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is GSTR-3B and when is it due?</h3>
              <p className="text-gray-600">
                GSTR-3B is a monthly summary return filed by all GST registered taxpayers. It's due by the 20th of the following month 
                for regular taxpayers and 22nd/24th for QRMP scheme taxpayers.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the penalty for late filing of GSTR-3B?</h3>
              <p className="text-gray-600">
                Late filing attracts penalty of ₹50 per day (₹25 CGST + ₹25 SGST) with maximum of ₹5,000. 
                Interest at 18% per annum on tax liability also applies.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is QRMP scheme?</h3>
              <p className="text-gray-600">
                QRMP (Quarterly Return Monthly Payment) is a scheme for taxpayers with turnover up to ₹5 crore, 
                allowing quarterly GSTR-3B filing with monthly tax payment using Form PMT-06.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I file GSTR-3B after due date?</h3>
              <p className="text-gray-600">
                Yes, but with penalties and interest. File immediately to minimize charges. 
                Late filing may also restrict ITC claims and impact compliance rating.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 bg-gray-50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related GST Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://moneycal.in/tools/gstr-1-deadline-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GSTR-1 Deadline Calculator</div>
              <div className="text-sm text-gray-600">Calculate GSTR-1 filing deadlines</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-interest-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Interest Calculator</div>
              <div className="text-sm text-gray-600">Calculate interest on delayed payments</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-liability-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Liability Calculator</div>
              <div className="text-sm text-gray-600">Calculate net GST liability</div>
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default GSTR3BDeadlineCalculator;

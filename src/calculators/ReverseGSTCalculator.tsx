import React, { useState, useEffect } from 'react';
import { IndianRupee, RotateCcw, TrendingDown, Info, ExternalLink, FileText, AlertCircle, CheckCircle, ArrowRight, Zap, Target, BarChart3, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Inject FAQ schema for Google EEAT, rich snippets
const injectSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to calculate base amount from GST inclusive price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate base amount from GST inclusive price, divide the total amount by (1 + GST rate/100). For example, if total amount is ₹1180 and GST rate is 18%, base amount = ₹1180 ÷ (1 + 18/100) = ₹1180 ÷ 1.18 = ₹1000."
        }
      },
      {
        "@type": "Question",
        "name": "What is the formula for reverse GST calculation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Base Amount = Total Amount ÷ (1 + GST Rate ÷ 100), GST Amount = Total Amount - Base Amount. This is the reverse of adding GST to a base amount."
        }
      },
      {
        "@type": "Question",
        "name": "How to separate CGST and SGST from total GST amount?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For intra-state transactions, CGST and SGST are each half of the total GST amount. For example, if total GST is ₹180, CGST = ₹90 and SGST = ₹90."
        }
      },
      {
        "@type": "Question",
        "name": "When to use reverse GST calculation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use reverse GST calculation when you have the final price (including GST) and need to find the original price before GST was added, or when you need to separate the GST component from the total amount."
        }
      },
      {
        "@type": "Question",
        "name": "How to calculate GST on reverse charge mechanism?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under reverse charge, the recipient of goods/services pays GST instead of the supplier. The calculation remains the same, but the liability shifts to the recipient."
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

interface ReverseGSTResult {
  totalAmount: number;
  gstRate: number;
  baseAmount: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  transactionType: 'intra-state' | 'inter-state';
}

export const ReverseGSTCalculator: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState<number>(1180);
  const [gstRate, setGstRate] = useState<number>(18);
  const [transactionType, setTransactionType] = useState<'intra-state' | 'inter-state'>('intra-state');
  const [result, setResult] = useState<ReverseGSTResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [calculationHistory, setCalculationHistory] = useState<ReverseGSTResult[]>([]);

  useEffect(() => {
    injectSchema();
  }, []);

  const calculateReverseGST = () => {
    const baseAmount = totalAmount / (1 + gstRate / 100);
    const gstAmount = totalAmount - baseAmount;
    
    let cgst = 0, sgst = 0, igst = 0;
    
    if (transactionType === 'intra-state') {
      cgst = gstAmount / 2;
      sgst = gstAmount / 2;
    } else {
      igst = gstAmount;
    }

    const calculationResult: ReverseGSTResult = {
      totalAmount,
      gstRate,
      baseAmount,
      gstAmount,
      cgst,
      sgst,
      igst,
      transactionType
    };

    setResult(calculationResult);
    
    // Add to history
    setCalculationHistory(prev => [calculationResult, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    calculateReverseGST();
  }, [totalAmount, gstRate, transactionType]);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const gstRates = [
    { rate: 0, label: '0% (Exempt)', color: 'bg-green-100 text-green-800' },
    { rate: 0.25, label: '0.25%', color: 'bg-blue-100 text-blue-800' },
    { rate: 3, label: '3%', color: 'bg-blue-100 text-blue-800' },
    { rate: 5, label: '5%', color: 'bg-blue-100 text-blue-800' },
    { rate: 12, label: '12%', color: 'bg-yellow-100 text-yellow-800' },
    { rate: 18, label: '18%', color: 'bg-orange-100 text-orange-800' },
    { rate: 28, label: '28%', color: 'bg-red-100 text-red-800' }
  ];

  const quickExamples = [
    { total: 1180, rate: 18, label: '₹1180 @ 18%' },
    { total: 1120, rate: 12, label: '₹1120 @ 12%' },
    { total: 1050, rate: 5, label: '₹1050 @ 5%' },
    { total: 1280, rate: 28, label: '₹1280 @ 28%' }
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8" itemScope itemType="https://schema.org/FinancialProduct">
        <h1 className="sr-only" itemProp="name">
          Reverse GST Calculator India 2025 - Calculate Base Amount from GST Inclusive Price
        </h1>
        <meta itemProp="description" content="Free reverse GST Calculator for India. Calculate base amount from GST inclusive price. Separate CGST, SGST, IGST components. Updated for 2025 GST rates." />
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Reverse GST Calculator
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Calculate base amount from GST inclusive price. 
            Separate GST components and find the original price before tax. 
            Perfect for invoice analysis and tax calculations.
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
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Input Details
              </h2>
              
              <div className="space-y-6">
                {/* Total Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Total Amount (GST Inclusive) (₹)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(Number(e.target.value))}
                      className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter total amount including GST"
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₹
                    </div>
                  </div>
                </div>

                {/* GST Rate */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    GST Rate (%)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {gstRates.map((rate) => (
                      <button
                        key={rate.rate}
                        onClick={() => setGstRate(rate.rate)}
                        className={`p-3 rounded-lg text-sm font-semibold transition-all ${
                          gstRate === rate.rate
                            ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700'
                            : rate.color + ' hover:scale-105'
                        }`}
                      >
                        {rate.label}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={gstRate}
                      onChange={(e) => setGstRate(Number(e.target.value))}
                      className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter GST rate"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      %
                    </div>
                  </div>
                </div>

                {/* Transaction Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Transaction Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setTransactionType('intra-state')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        transactionType === 'intra-state'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">Intra-State</div>
                        <div className="text-sm text-gray-600">CGST + SGST</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setTransactionType('inter-state')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        transactionType === 'inter-state'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">Inter-State</div>
                        <div className="text-sm text-gray-600">IGST</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Quick Examples */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Quick Examples
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {quickExamples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setTotalAmount(example.total);
                          setGstRate(example.rate);
                        }}
                        className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors border border-gray-200 hover:border-blue-300"
                      >
                        {example.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Formula Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-blue-50 rounded-2xl p-6 border border-blue-200"
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Reverse GST Formula
              </h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-semibold mb-1">Base Amount = Total Amount ÷ (1 + GST Rate ÷ 100)</div>
                  <div className="text-xs text-gray-600">Example: ₹1180 ÷ (1 + 18 ÷ 100) = ₹1180 ÷ 1.18 = ₹1000</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-semibold mb-1">GST Amount = Total Amount - Base Amount</div>
                  <div className="text-xs text-gray-600">Example: ₹1180 - ₹1000 = ₹180</div>
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
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 border border-blue-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                    Calculation Results
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                      <span className="font-semibold text-gray-700">Total Amount (GST Inclusive):</span>
                      <span className="text-xl font-bold text-gray-900">{formatCurrency(result.totalAmount)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                      <span className="font-semibold text-gray-700">GST Rate:</span>
                      <span className="text-xl font-bold text-blue-600">{result.gstRate}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                      <span className="font-bold text-white text-lg">Base Amount (Before GST):</span>
                      <span className="text-2xl font-bold text-white">{formatCurrency(result.baseAmount)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-blue-100 rounded-xl shadow-sm">
                      <span className="font-semibold text-blue-800">Total GST Amount:</span>
                      <span className="text-xl font-bold text-blue-800">{formatCurrency(result.gstAmount)}</span>
                    </div>
                    
                    {result.transactionType === 'intra-state' ? (
                      <>
                        <div className="flex justify-between items-center p-4 bg-green-100 rounded-xl shadow-sm">
                          <span className="font-semibold text-green-800">CGST:</span>
                          <span className="text-xl font-bold text-green-800">{formatCurrency(result.cgst)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-100 rounded-xl shadow-sm">
                          <span className="font-semibold text-green-800">SGST:</span>
                          <span className="text-xl font-bold text-green-800">{formatCurrency(result.sgst)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between items-center p-4 bg-purple-100 rounded-xl shadow-sm">
                        <span className="font-semibold text-purple-800">IGST:</span>
                        <span className="text-xl font-bold text-purple-800">{formatCurrency(result.igst)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Verification */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    Verification
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Base Amount + GST Amount:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(result.baseAmount + result.gstAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">GST Percentage:</span>
                      <span className="font-bold text-green-600">
                        {((result.gstAmount / result.baseAmount) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Calculation verified successfully</span>
                    </div>
                  </div>
                </motion.div>

                {/* Calculation History */}
                {calculationHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingDown className="w-5 h-5 mr-2 text-blue-600" />
                      Recent Calculations
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {calculationHistory.slice(0, 5).map((calc, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-semibold text-gray-900">{formatCurrency(calc.totalAmount)}</div>
                            <div className="text-sm text-gray-600">{calc.gstRate}% • {calc.transactionType}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-blue-600">{formatCurrency(calc.baseAmount)}</div>
                            <div className="text-sm text-gray-600">GST: {formatCurrency(calc.gstAmount)}</div>
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
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center mb-6">
            <Info className="w-6 h-6 mr-2 text-blue-600" />
            Reverse GST Calculator - Frequently Asked Questions (2025)
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How to calculate base amount from GST inclusive price?</h3>
              <p className="text-gray-600">
                To calculate base amount from GST inclusive price, divide the total amount by (1 + GST rate/100). 
                For example, if total amount is ₹1180 and GST rate is 18%, base amount = ₹1180 ÷ (1 + 18/100) = ₹1180 ÷ 1.18 = ₹1000.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the formula for reverse GST calculation?</h3>
              <p className="text-gray-600">
                Base Amount = Total Amount ÷ (1 + GST Rate ÷ 100), GST Amount = Total Amount - Base Amount. 
                This is the reverse of adding GST to a base amount.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How to separate CGST and SGST from total GST amount?</h3>
              <p className="text-gray-600">
                For intra-state transactions, CGST and SGST are each half of the total GST amount. 
                For example, if total GST is ₹180, CGST = ₹90 and SGST = ₹90.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">When to use reverse GST calculation?</h3>
              <p className="text-gray-600">
                Use reverse GST calculation when you have the final price (including GST) and need to find the original price before GST was added, 
                or when you need to separate the GST component from the total amount.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How to calculate GST on reverse charge mechanism?</h3>
              <p className="text-gray-600">
                Under reverse charge, the recipient of goods/services pays GST instead of the supplier. 
                The calculation remains the same, but the liability shifts to the recipient.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 bg-gray-50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related GST Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://moneycal.in/tools/gst-amount-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Amount Calculator</div>
              <div className="text-sm text-gray-600">Calculate GST on base amount</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-slab-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Slab Calculator</div>
              <div className="text-sm text-gray-600">Find applicable GST rate</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-liability-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
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

export default ReverseGSTCalculator;

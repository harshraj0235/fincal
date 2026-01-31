import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, TrendingDown, Info, ExternalLink, FileText, AlertCircle, CheckCircle, ArrowRight, Zap, Target, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Inject FAQ schema for Google EEAT, rich snippets
const injectSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to calculate GST amount on any product or service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GST amount is calculated by multiplying the base amount by the GST rate and dividing by 100. For example, if base amount is ₹1000 and GST rate is 18%, GST amount = ₹1000 × 18 ÷ 100 = ₹180."
        }
      },
      {
        "@type": "Question",
        "name": "What are the different GST rates in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "India has 4 main GST rates: 0% (exempt), 5%, 12%, 18%, and 28%. There are also special rates like 0.25%, 3%, and 0.1% for specific items."
        }
      },
      {
        "@type": "Question",
        "name": "How to calculate CGST and SGST from total GST?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For intra-state transactions, CGST and SGST are each half of the total GST. For example, if total GST is ₹180, CGST = ₹90 and SGST = ₹90."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between IGST and CGST+SGST?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IGST is charged on inter-state transactions (between different states), while CGST+SGST is charged on intra-state transactions (within the same state)."
        }
      },
      {
        "@type": "Question",
        "name": "How to calculate GST on discounted prices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GST is calculated on the final discounted price. First apply the discount, then calculate GST on the discounted amount."
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

interface GSTCalculationResult {
  baseAmount: number;
  gstRate: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  transactionType: 'intra-state' | 'inter-state';
}

export const GSTAmountCalculator: React.FC = () => {
  const [baseAmount, setBaseAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [transactionType, setTransactionType] = useState<'intra-state' | 'inter-state'>('intra-state');
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [result, setResult] = useState<GSTCalculationResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [calculationHistory, setCalculationHistory] = useState<GSTCalculationResult[]>([]);

  useEffect(() => {
    injectSchema();
  }, []);

  const calculateGST = () => {
    let finalBaseAmount = baseAmount;
    
    // Apply discount
    if (discount > 0) {
      if (discountType === 'percentage') {
        finalBaseAmount = baseAmount * (1 - discount / 100);
      } else {
        finalBaseAmount = Math.max(0, baseAmount - discount);
      }
    }

    const gstAmount = (finalBaseAmount * gstRate) / 100;
    const totalAmount = finalBaseAmount + gstAmount;
    
    let cgst = 0, sgst = 0, igst = 0;
    
    if (transactionType === 'intra-state') {
      cgst = gstAmount / 2;
      sgst = gstAmount / 2;
    } else {
      igst = gstAmount;
    }

    const calculationResult: GSTCalculationResult = {
      baseAmount: finalBaseAmount,
      gstRate,
      gstAmount,
      cgst,
      sgst,
      igst,
      totalAmount,
      transactionType
    };

    setResult(calculationResult);
    
    // Add to history
    setCalculationHistory(prev => [calculationResult, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    calculateGST();
  }, [baseAmount, gstRate, transactionType, discount, discountType]);

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

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8" itemScope itemType="https://schema.org/FinancialProduct">
        <h1 className="sr-only" itemProp="name">
          GST Amount Calculator India 2025 - Calculate GST, CGST, SGST, IGST with Discount Support
        </h1>
        <meta itemProp="description" content="Free GST amount calculator for India. Calculate GST, CGST, SGST, IGST on any amount with discount support. Intra-state and inter-state transactions. Updated for 2025." />
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              GST Amount Calculator
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Calculate GST amount, CGST, SGST, and IGST with precision. 
            Support for discounts, intra-state and inter-state transactions. 
            Updated for 2025 GST rates.
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
                <Target className="w-6 h-6 mr-3 text-green-600" />
                Calculation Inputs
              </h2>
              
              <div className="space-y-6">
                {/* Base Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Base Amount (₹)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={baseAmount}
                      onChange={(e) => setBaseAmount(Number(e.target.value))}
                      className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="Enter base amount"
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
                            ? 'ring-2 ring-green-500 bg-green-50 text-green-700'
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
                      className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="Enter custom GST rate"
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
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300'
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
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">Inter-State</div>
                        <div className="text-sm text-gray-600">IGST</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Advanced Options */}
                <div>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center text-green-600 hover:text-green-700 font-semibold mb-4"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Advanced Options
                    <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Discount
                          </label>
                          <div className="flex space-x-4">
                            <input
                              type="number"
                              value={discount}
                              onChange={(e) => setDiscount(Number(e.target.value))}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="Discount amount"
                              min="0"
                              step="0.01"
                            />
                            <select
                              value={discountType}
                              onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            >
                              <option value="percentage">%</option>
                              <option value="fixed">₹</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-blue-50 rounded-2xl p-6 border border-blue-200"
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  <span>GST is calculated on the base amount before adding GST</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  <span>Intra-state: CGST + SGST (each half of total GST)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  <span>Inter-state: IGST (full GST amount)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  <span>Apply discounts before calculating GST</span>
                </li>
              </ul>
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
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-8 border border-green-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-3 text-green-600" />
                    Calculation Results
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                      <span className="font-semibold text-gray-700">Base Amount:</span>
                      <span className="text-xl font-bold text-gray-900">{formatCurrency(result.baseAmount)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                      <span className="font-semibold text-gray-700">GST Rate:</span>
                      <span className="text-xl font-bold text-green-600">{result.gstRate}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-green-100 rounded-xl shadow-sm">
                      <span className="font-semibold text-green-800">Total GST:</span>
                      <span className="text-xl font-bold text-green-800">{formatCurrency(result.gstAmount)}</span>
                    </div>
                    
                    {result.transactionType === 'intra-state' ? (
                      <>
                        <div className="flex justify-between items-center p-4 bg-blue-100 rounded-xl shadow-sm">
                          <span className="font-semibold text-blue-800">CGST:</span>
                          <span className="text-xl font-bold text-blue-800">{formatCurrency(result.cgst)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-blue-100 rounded-xl shadow-sm">
                          <span className="font-semibold text-blue-800">SGST:</span>
                          <span className="text-xl font-bold text-blue-800">{formatCurrency(result.sgst)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between items-center p-4 bg-purple-100 rounded-xl shadow-sm">
                        <span className="font-semibold text-purple-800">IGST:</span>
                        <span className="text-xl font-bold text-purple-800">{formatCurrency(result.igst)}</span>
                      </div>
                    )}
                    
                    <div className="border-t-2 border-green-200 pt-4">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                        <span className="font-bold text-white text-lg">Total Amount:</span>
                        <span className="text-2xl font-bold text-white">{formatCurrency(result.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculation History */}
                {calculationHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Recent Calculations
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {calculationHistory.slice(0, 5).map((calc, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-semibold text-gray-900">{formatCurrency(calc.baseAmount)}</div>
                            <div className="text-sm text-gray-600">{calc.gstRate}% • {calc.transactionType}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{formatCurrency(calc.totalAmount)}</div>
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
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center mb-6">
            <Info className="w-6 h-6 mr-2 text-green-600" />
            GST Amount Calculator - Frequently Asked Questions (2025)
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How to calculate GST amount on any product or service?</h3>
              <p className="text-gray-600">
                GST amount is calculated by multiplying the base amount by the GST rate and dividing by 100. 
                For example, if base amount is ₹1000 and GST rate is 18%, GST amount = ₹1000 × 18 ÷ 100 = ₹180.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What are the different GST rates in India?</h3>
              <p className="text-gray-600">
                India has 4 main GST rates: 0% (exempt), 5%, 12%, 18%, and 28%. 
                There are also special rates like 0.25%, 3%, and 0.1% for specific items.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How to calculate CGST and SGST from total GST?</h3>
              <p className="text-gray-600">
                For intra-state transactions, CGST and SGST are each half of the total GST. 
                For example, if total GST is ₹180, CGST = ₹90 and SGST = ₹90.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the difference between IGST and CGST+SGST?</h3>
              <p className="text-gray-600">
                IGST is charged on inter-state transactions (between different states), 
                while CGST+SGST is charged on intra-state transactions (within the same state).
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How to calculate GST on discounted prices?</h3>
              <p className="text-gray-600">
                GST is calculated on the final discounted price. First apply the discount, then calculate GST on the discounted amount.
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
              href="https://moneycal.in/tools/reverse-gst-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
            >
              <div className="font-medium text-gray-900">Reverse GST Calculator</div>
              <div className="text-sm text-gray-600">Calculate base amount from GST-inclusive price</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-slab-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Slab Calculator</div>
              <div className="text-sm text-gray-600">Find applicable GST rate for products</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-liability-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
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

export default GSTAmountCalculator;

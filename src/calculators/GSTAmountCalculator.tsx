import React, { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, Info, CheckCircle, ArrowRight, Zap, Target, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    { rate: 0, label: '0% (Exempt)' },
    { rate: 0.25, label: '0.25%' },
    { rate: 3, label: '3%' },
    { rate: 5, label: '5%' },
    { rate: 12, label: '12%' },
    { rate: 18, label: '18%' },
    { rate: 28, label: '28%' }
  ];

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-8" itemScope itemType="https://schema.org/FinancialProduct">
        <h1 className="sr-only" itemProp="name">
          GST Amount Calculator India 2026 - Calculate GST, CGST, SGST, IGST with Discount Support
        </h1>
        <meta itemProp="description" content="GST amount calculator India 2026. Calculate GST, CGST, SGST, IGST on any amount with discount support. Intra-state and inter-state transactions." />
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Updated 2026 GST slabs
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200 bg-white shadow-sm">
                <IndianRupee className="h-6 w-6 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
                GST Amount Calculator
              </h1>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-neutral-600 max-w-3xl mx-auto leading-relaxed sm:text-lg"
          >
            Calculate GST amount, CGST, SGST, and IGST with precision. Support for discounts, intra-state and inter-state transactions, and all GST slabs in India.
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
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-neutral-900 mb-5 flex items-center">
                <Target className="w-5 h-5 mr-3 text-emerald-600" />
                Calculation Inputs
              </h2>
              
              <div className="space-y-6">
                {/* Base Amount */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Base Amount (₹)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={baseAmount}
                      onChange={(e) => setBaseAmount(Number(e.target.value))}
                      className="w-full min-h-[48px] rounded-xl border border-neutral-300 px-4 text-base font-semibold text-neutral-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      placeholder="Enter base amount"
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                      ₹
                    </div>
                  </div>
                </div>

                {/* GST Rate */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    GST Rate (%)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    {gstRates.map((rate) => (
                      <button
                        key={rate.rate}
                        onClick={() => setGstRate(rate.rate)}
                        className={`min-h-[44px] rounded-lg border px-3 text-sm font-semibold transition-colors ${
                          gstRate === rate.rate
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-emerald-300'
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
                      className="w-full min-h-[48px] rounded-xl border border-neutral-300 px-4 text-base font-semibold text-neutral-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      placeholder="Enter custom GST rate"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                      %
                    </div>
                  </div>
                </div>

                {/* Transaction Type */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Transaction Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setTransactionType('intra-state')}
                      className={`min-h-[56px] rounded-xl border px-3 text-sm font-semibold transition-colors ${
                        transactionType === 'intra-state'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-emerald-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">Intra-State</div>
                        <div className="text-xs text-neutral-500">CGST + SGST</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setTransactionType('inter-state')}
                      className={`min-h-[56px] rounded-xl border px-3 text-sm font-semibold transition-colors ${
                        transactionType === 'inter-state'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-emerald-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">Inter-State</div>
                        <div className="text-xs text-neutral-500">IGST</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Advanced Options */}
                <div>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex min-h-[44px] items-center text-emerald-700 hover:text-emerald-800 font-semibold mb-4"
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
                        className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Discount
                          </label>
                          <div className="flex space-x-4">
                            <input
                              type="number"
                              value={discount}
                              onChange={(e) => setDiscount(Number(e.target.value))}
                              className="min-h-[44px] flex-1 rounded-lg border border-neutral-300 px-3 text-sm font-semibold text-neutral-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                              placeholder="Discount amount"
                              min="0"
                              step="0.01"
                            />
                            <select
                              value={discountType}
                              onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                              className="min-h-[44px] rounded-lg border border-neutral-300 px-3 text-sm font-semibold text-neutral-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
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
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-emerald-600" />
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-emerald-600" />
                  <span>GST is calculated on the base amount before adding GST</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-emerald-600" />
                  <span>Intra-state: CGST + SGST (each half of total GST)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-emerald-600" />
                  <span>Inter-state: IGST (full GST amount)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-emerald-600" />
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
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-5 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-3 text-emerald-600" />
                    Calculation Results
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-xl border border-neutral-200 bg-neutral-50">
                      <span className="font-semibold text-neutral-700">Base Amount:</span>
                      <span className="text-lg font-bold text-neutral-900">{formatCurrency(result.baseAmount)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 rounded-xl border border-neutral-200 bg-neutral-50">
                      <span className="font-semibold text-neutral-700">GST Rate:</span>
                      <span className="text-lg font-bold text-emerald-700">{result.gstRate}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 rounded-xl border border-emerald-200 bg-emerald-50">
                      <span className="font-semibold text-emerald-900">Total GST:</span>
                      <span className="text-lg font-bold text-emerald-900">{formatCurrency(result.gstAmount)}</span>
                    </div>
                    
                    {result.transactionType === 'intra-state' ? (
                      <>
                        <div className="flex justify-between items-center p-4 rounded-xl border border-neutral-200 bg-white">
                          <span className="font-semibold text-neutral-700">CGST:</span>
                          <span className="text-lg font-bold text-neutral-900">{formatCurrency(result.cgst)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-xl border border-neutral-200 bg-white">
                          <span className="font-semibold text-neutral-700">SGST:</span>
                          <span className="text-lg font-bold text-neutral-900">{formatCurrency(result.sgst)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between items-center p-4 rounded-xl border border-neutral-200 bg-white">
                        <span className="font-semibold text-neutral-700">IGST:</span>
                        <span className="text-lg font-bold text-neutral-900">{formatCurrency(result.igst)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-neutral-200 pt-4">
                      <div className="flex justify-between items-center rounded-xl border border-neutral-900 bg-neutral-900 p-4">
                        <span className="font-bold text-white text-lg">Total Amount:</span>
                        <span className="text-xl font-bold text-white">{formatCurrency(result.totalAmount)}</span>
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
                    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                      Recent Calculations
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {calculationHistory.slice(0, 5).map((calc, index) => (
                        <div key={index} className="flex justify-between items-center p-3 rounded-lg border border-neutral-200 bg-neutral-50">
                          <div>
                            <div className="font-semibold text-neutral-900">{formatCurrency(calc.baseAmount)}</div>
                            <div className="text-sm text-neutral-600">{calc.gstRate}% • {calc.transactionType}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-emerald-700">{formatCurrency(calc.totalAmount)}</div>
                            <div className="text-sm text-neutral-600">GST: {formatCurrency(calc.gstAmount)}</div>
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
          className="mt-12 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-neutral-900 flex items-center mb-6">
            <Info className="w-6 h-6 mr-2 text-emerald-600" />
            GST Amount Calculator - Frequently Asked Questions (2026)
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">How to calculate GST amount on any product or service?</h3>
              <p className="text-neutral-600">
                GST amount is calculated by multiplying the base amount by the GST rate and dividing by 100. 
                For example, if base amount is ₹1000 and GST rate is 18%, GST amount = ₹1000 × 18 ÷ 100 = ₹180.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">What are the different GST rates in India?</h3>
              <p className="text-neutral-600">
                India has 4 main GST rates: 0% (exempt), 5%, 12%, 18%, and 28%. 
                There are also special rates like 0.25%, 3%, and 0.1% for specific items.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">How to calculate CGST and SGST from total GST?</h3>
              <p className="text-neutral-600">
                For intra-state transactions, CGST and SGST are each half of the total GST. 
                For example, if total GST is ₹180, CGST = ₹90 and SGST = ₹90.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">What is the difference between IGST and CGST+SGST?</h3>
              <p className="text-neutral-600">
                IGST is charged on inter-state transactions (between different states), 
                while CGST+SGST is charged on intra-state transactions (within the same state).
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">How to calculate GST on discounted prices?</h3>
              <p className="text-neutral-600">
                GST is calculated on the final discounted price. First apply the discount, then calculate GST on the discounted amount.
              </p>
            </div>
          </div>
        </motion.div>

        <section className="mt-12 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-neutral-900">GST Amount Calculator Guide 2026</h2>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            A GST amount calculator helps you calculate Goods and Services Tax for any purchase, sale, invoice, or quotation in India. Whether you are a small business owner issuing invoices, a freelancer adding GST to professional services, or a consumer checking the final price, the calculator gives instant values for GST amount, CGST, SGST, IGST, and total payable. In 2026, GST compliance is increasingly digital, and accurate tax breakdowns matter for e-invoicing, e-way bills, and GST return filing. This page explains the formulas, rates, and real-world scenarios in detail so you can understand every number that appears on your invoice.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            The calculator works in both directions. If you have a base price and need to add GST, it calculates the tax and the total. If you have a final price and need to remove GST, it backs out the base amount and the GST component. For intra-state transactions, GST is split into CGST and SGST. For inter-state transactions, GST is charged as IGST. Discounts can be applied before tax, which mirrors standard GST rules for invoice pricing. With the calculator, you can also compare multiple rate slabs quickly to determine the most accurate price for your product or service.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">GST Rate Slabs in India</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            India uses multiple GST slabs based on the type of goods and services. The most common slabs are 0%, 5%, 12%, 18%, and 28%, along with special rates like 0.25% for rough diamonds and 3% for certain precious metals. Choosing the correct rate is critical because a small error can lead to incorrect invoices, wrong tax collection, and mismatched returns. If you are unsure about a rate, check your HSN or SAC classification and use the slab prescribed for your category.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2">
              <span className="font-semibold">0%</span>
              <span>Essential and exempt goods</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2">
              <span className="font-semibold">5%</span>
              <span>Basic consumer items</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2">
              <span className="font-semibold">12%</span>
              <span>Standard goods and services</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2">
              <span className="font-semibold">18%</span>
              <span>Most services and manufactured goods</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2">
              <span className="font-semibold">28%</span>
              <span>Luxury goods and sin products</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2">
              <span className="font-semibold">Special</span>
              <span>0.25% or 3% for select items</span>
            </div>
          </div>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">GST Inclusive vs GST Exclusive</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            A GST exclusive price is the base price before tax. If you sell a product for ₹10,000 exclusive of GST at 18%, the GST amount is ₹1,800 and the final total is ₹11,800. A GST inclusive price already includes tax. If ₹11,800 is your total price and the GST rate is 18%, the base amount is ₹10,000 and the GST amount is ₹1,800. Both modes are useful in different situations. Exclusive pricing is common for B2B invoices because it clearly shows tax added. Inclusive pricing is common in retail and consumer-facing pricing because customers want to see the final payable amount.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            When you use the calculator, select your scenario: add GST for exclusive pricing or remove GST for inclusive pricing. This is especially useful for product catalog pricing, price negotiation, and profit margin analysis. If your supplier gives a GST inclusive quote, removing GST helps you understand your base cost and compute margins properly. If you are preparing invoices, adding GST ensures the tax is correctly calculated before you present the final amount to the buyer.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">CGST, SGST, IGST Explained</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            GST is split based on the location of the supplier and the place of supply. For intra-state transactions, GST is divided into CGST and SGST. For example, if GST on ₹50,000 at 12% is ₹6,000, CGST is ₹3,000 and SGST is ₹3,000. For inter-state transactions, GST is charged as IGST and the entire ₹6,000 is paid as IGST. The calculator automatically splits GST when you select intra-state and assigns IGST when you select inter-state.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            Understanding the split is essential for invoice accuracy and compliance. Buyers can claim input tax credit (ITC) based on the correct tax type, and wrong tax classification can trigger mismatches in GST returns. If you are unsure, consider the place of supply rules for your industry and confirm the buyer’s state registration. For most services, the place of supply is the location of the recipient, while for goods it is generally the place where the goods are delivered.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">How Discounts Affect GST</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Discounts should be applied before GST is calculated because GST is charged on the net value of supply. If you offer a 10% discount on a ₹20,000 base price at 18%, the discounted base becomes ₹18,000 and GST is ₹3,240, not ₹3,600. The calculator supports both percentage and fixed discounts and applies them before tax. This is important for correct invoicing and to avoid overcharging tax, which can create reconciliation issues in your returns.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            For promotional pricing, early payment discounts, or trade discounts, always ensure the discount is documented on the invoice if it affects the taxable value. If you apply a discount after the invoice is generated, you may need to issue a credit note. The calculator helps you validate the discounted base and GST amount quickly so you can issue accurate invoices the first time.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">GST Formula Used</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            The formula for adding GST is straightforward: GST Amount = Base Amount × (GST Rate ÷ 100). Total Amount = Base Amount + GST Amount. For removing GST, use Base Amount = Total Amount ÷ (1 + GST Rate ÷ 100). GST Amount = Total Amount − Base Amount. These formulas are applied across all rate slabs, and the calculator computes them instantly for you. The same formula applies to any currency, but since GST is an Indian tax, this calculator is optimized for INR formatting and Indian rate slabs.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Examples for Businesses and Professionals</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Example 1: A designer bills ₹25,000 for a logo design service with 18% GST. GST amount is ₹4,500 and total invoice value is ₹29,500. Example 2: A trader sells goods worth ₹1,20,000 at 12% GST within the same state. GST amount is ₹14,400, with CGST ₹7,200 and SGST ₹7,200. Example 3: A manufacturer sells to another state at 5% GST on a ₹2,50,000 base. IGST is ₹12,500 and the total is ₹2,62,500. The calculator replicates these calculations instantly and presents the breakup clearly.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            Example 4: A retailer offers a ₹1,000 flat discount on a ₹15,000 item at 18% GST. The taxable value becomes ₹14,000 and GST is ₹2,520. Example 5: A restaurant charges a GST inclusive price of ₹1,180 at 18% GST. Removing GST yields a base of ₹1,000 and GST of ₹180. These real-world cases make it easy to check your numbers before you send a quote or invoice.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">GST for Services vs Goods</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Most services in India attract 18% GST, although some services are taxed at 5% or 12%. Goods have a wider slab distribution depending on classification. The calculator lets you pick a slab quickly so you can test what happens if your classification changes or if you supply a mixed basket of items. For businesses that provide both goods and services, separating line items by GST rate helps in accurate tax reporting and ITC claims.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            It is good practice to map your product catalog to HSN codes and your services to SAC codes. This simplifies rate determination and makes returns smoother. Even if you are not fully certain about the classification, use the calculator to understand the impact of each slab and check the final payable values.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">GST Compliance Checklist for 2026</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-600">
            <li>Confirm the correct GST slab using HSN/SAC classification before issuing invoices.</li>
            <li>Apply discounts before GST and show discount details on the invoice when applicable.</li>
            <li>Split GST into CGST/SGST for intra-state and IGST for inter-state transactions.</li>
            <li>Use accurate tax values to avoid mismatches in GSTR-1 and GSTR-3B returns.</li>
            <li>Maintain purchase invoices to claim input tax credit and reconcile monthly.</li>
            <li>Verify GSTIN details of buyers and suppliers for B2B invoices.</li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Input Tax Credit and Margin Planning</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Input Tax Credit allows businesses to offset GST paid on purchases against GST collected on sales. For margin planning, use the calculator to estimate the output tax on sales and compare it with the input tax paid. This helps you predict cash flow requirements and tax liability. If your business has high input tax and lower output tax, your net GST liability may be lower, and you should track credits carefully to avoid losing eligible credits.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            A good practice is to estimate GST on high-value invoices before finalizing pricing. If you operate with fixed customer budgets, you may need to adjust the base price so the GST inclusive total fits within the agreed amount. The calculator helps you instantly check inclusive and exclusive pricing scenarios.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Common GST Mistakes to Avoid</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            The most common mistakes include using the wrong slab, forgetting to apply discounts before tax, splitting CGST and SGST incorrectly, and using IGST for intra-state transactions. Another frequent issue is quoting GST inclusive prices but calculating GST as if it was exclusive, which inflates the tax amount. The GST amount calculator avoids these errors by applying the correct formula automatically.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            Always confirm whether the price you are working with is exclusive or inclusive. If you are dealing with retail prices or marketplace listings, the price is often inclusive. For B2B supply, the price is often exclusive and GST is shown separately. The calculator supports both modes so you can avoid confusion and generate accurate quotations.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">GST Calculation for Major Indian Cities</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Businesses in Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Pune, and Kolkata often deal with inter-state supply, especially for online orders and cross-state services. When selling to another state, IGST applies even if your business is registered in your home state. Use the calculator to switch between intra-state and inter-state and verify the correct tax split before issuing invoices to clients in different states.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            If you operate in multiple states, GST registration and invoicing rules can differ based on the place of supply. The calculator gives a quick numeric check, but always confirm compliance for state-specific regulations and threshold limits.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Why This Calculator Is Useful</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            This GST amount calculator is designed for speed and accuracy. It uses standard GST formulas, supports all slabs, and delivers a clear breakup so you can check your invoice values instantly. It also supports discounts and maintains a quick history of recent calculations for easy comparisons. Whether you are preparing invoices, validating vendor bills, or estimating tax liability, the calculator saves time and reduces calculation errors.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            In fast-moving businesses such as retail, distribution, and services, small pricing errors can add up to significant compliance issues. A reliable GST calculator helps you quote the right amount from the start, which improves customer trust and reduces invoice disputes. It also helps businesses that operate across multiple states by showing the correct split between CGST and SGST or a single IGST value. This is especially useful for e-commerce sellers, logistics operators, and professional service firms that regularly deal with inter-state clients.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">GST on E-commerce and Marketplaces</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            E-commerce sellers often list GST inclusive prices while settlement reports show GST exclusive values and tax deducted at source. To reconcile these figures, you need to convert inclusive prices into base and GST amounts. The calculator makes it easy to match your marketplace pricing with your GST returns. For inter-state deliveries, IGST applies, and you can quickly validate the IGST component before finalizing your invoice or shipping documentation.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            If you operate in a marketplace model, you may also need to account for marketplace commission and GST charged on that commission. Using the calculator for both your product price and the marketplace fees helps you estimate your true net revenue and plan margins effectively.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Reverse Charge Mechanism (RCM) Overview</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Under the reverse charge mechanism, the recipient pays GST instead of the supplier in specific cases. If you are the recipient, you may need to calculate GST on the value of the supply and pay it directly to the government. The calculator can be used to compute the GST amount on the invoice value so you can record the correct liability. If your business frequently deals with RCM transactions, you can use the calculator to ensure the correct GST is paid and accounted for in returns.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">E-invoicing and Record Keeping</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            For businesses required to issue e-invoices, accurate GST values are essential because the invoice reference number (IRN) and QR code are generated based on tax details. The calculator helps you confirm the taxable value and tax breakup before you upload invoices to the e-invoice portal. Even for businesses not under e-invoicing mandates, maintaining consistent tax calculations helps during audits, reconciliations, and annual compliance reviews.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            Keep a record of your base value, GST rate, GST amount, and total for each invoice. If you offer seasonal discounts or price adjustments, update your calculations and issue credit notes where necessary. The calculator supports discount calculations so you can align taxable value with your invoice documentation.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">GST Returns and Reconciliation</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            GST returns such as GSTR-1 and GSTR-3B require accurate reporting of taxable value and GST collected. If your invoices are inconsistent, your returns may not reconcile with your buyers’ claims of input tax credit. By using the calculator regularly, you reduce the chance of mismatched figures. It also helps you estimate monthly or quarterly tax liabilities by summing GST amounts across invoices.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            If your business has variable tax rates across product categories, store separate rate calculations for each category. The calculator allows you to test different slabs quickly so you can check correctness before filing returns.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Exporters and Zero-Rated Supplies</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Export of goods and services is treated as zero-rated supply under GST, meaning you can export with or without payment of GST and claim refunds on input tax credit. Even in zero-rated scenarios, it is important to compute the taxable value accurately because it determines the refund amount and impacts compliance documentation. Use the calculator to confirm the base value and the tax component when preparing export invoices or refund claims.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            If you export services, you should verify that the place of supply and payment conditions qualify for zero-rated treatment. While the calculator does not replace legal interpretation, it helps you verify numeric accuracy for the invoice values that go into refund applications and GST returns.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Composition Scheme and Small Businesses</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Businesses under the composition scheme pay GST at a fixed lower rate on turnover and cannot collect GST from customers. If you are under composition, you still need to understand how GST would be calculated for pricing analysis and to compare profitability with regular GST registration. The calculator can help you understand how much tax is embedded in a price and how margins change if you switch between composition and regular schemes.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            If you are a small business considering whether to register under GST or stay under the threshold, use the calculator to estimate how tax affects your pricing, especially if you sell to businesses that need input tax credit.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">GST on Imports and Reverse Charge</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Imports are treated as inter-state supplies and IGST is charged on the value of imported goods. If you import services or purchase from unregistered suppliers under specific conditions, you may have to pay GST under reverse charge. The calculator helps you estimate the IGST amount to be paid so you can plan working capital and avoid surprises at the time of payment.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            If you operate in industries like logistics, IT services, or professional consulting, reverse charge may apply in limited cases. Use the calculator to confirm the GST amount and keep these values ready for return filing and reconciliation.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Invoice Checklist for Accurate GST</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-600">
            <li>Confirm whether the price is exclusive or inclusive before applying GST.</li>
            <li>Validate GST rate with the correct HSN or SAC classification.</li>
            <li>Apply discounts before GST and show them clearly on the invoice.</li>
            <li>Split CGST and SGST for intra-state supply and use IGST for inter-state.</li>
            <li>Check rounding rules and ensure the final total matches the invoice value.</li>
            <li>Keep invoice numbers consistent with accounting and return filing.</li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Pricing Strategy with GST</h3>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Pricing strategy often depends on whether you display inclusive or exclusive pricing. If you display inclusive pricing, you can use the calculator to back-calculate the base value and ensure margins are preserved. If you display exclusive pricing, the calculator helps you present accurate totals to customers without manual errors. For high-value products, even a small percentage difference can affect perceived pricing, so validating GST calculations before publishing price lists is essential.
          </p>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            For B2B sales, buyers usually focus on base price and input credit. Clear separation of GST in your invoice is often preferred. For B2C sales, inclusive pricing improves transparency. The calculator supports both workflows and can be used for internal pricing analysis, quote creation, and invoice preparation.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-neutral-900">GST Glossary for Quick Reference</h3>
          <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-neutral-600 sm:grid-cols-2">
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <span className="font-semibold text-neutral-800">Taxable Value</span>: The amount on which GST is calculated after discounts.
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <span className="font-semibold text-neutral-800">HSN/SAC</span>: Classification codes for goods and services that determine GST rates.
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <span className="font-semibold text-neutral-800">IGST</span>: Integrated GST for inter-state transactions.
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <span className="font-semibold text-neutral-800">CGST/SGST</span>: Central and State GST for intra-state transactions.
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <span className="font-semibold text-neutral-800">ITC</span>: Input Tax Credit used to offset GST paid on purchases.
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <span className="font-semibold text-neutral-800">RCM</span>: Reverse Charge Mechanism where recipient pays GST.
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Related GST Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://moneycal.in/tools/reverse-gst-calculator"
              className="p-4 rounded-lg border border-neutral-200 bg-white hover:border-emerald-300 transition-colors"
            >
              <div className="font-medium text-neutral-900">Reverse GST Calculator</div>
              <div className="text-sm text-neutral-600">Calculate base amount from GST-inclusive price</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-slab-calculator"
              className="p-4 rounded-lg border border-neutral-200 bg-white hover:border-emerald-300 transition-colors"
            >
              <div className="font-medium text-neutral-900">GST Slab Calculator</div>
              <div className="text-sm text-neutral-600">Find applicable GST rate for products</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-liability-calculator"
              className="p-4 rounded-lg border border-neutral-200 bg-white hover:border-emerald-300 transition-colors"
            >
              <div className="font-medium text-neutral-900">GST Liability Calculator</div>
              <div className="text-sm text-neutral-600">Calculate net GST liability</div>
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default GSTAmountCalculator;

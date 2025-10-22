import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calculator, DollarSign, AlertTriangle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const ProcessingFees: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Processing Fees in India: Complete Guide 2025 | MoneyCal"
        description="Understand personal loan processing fees in India. Learn about different types of fees, how to calculate total cost, negotiate better rates, and avoid hidden charges. Complete guide with examples."
        keywords="personal loan processing fees, loan fees India, processing charges, loan cost calculator, hidden fees personal loan"
        canonicalUrl="https://moneycal.in/learn/personal-loans/processing-fees"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'Personal Loan Processing Fees in India: Complete Guide',
          description: 'Comprehensive guide to understanding personal loan processing fees, types of charges, calculation methods, and negotiation strategies in India.',
          provider: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Link 
                to="/learn/personal-loans" 
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Personal Loans
              </Link>
              <div className="flex items-center space-x-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Lesson 11 of 20
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Intermediate
                </span>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Personal Loan Processing Fees in India
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Complete guide to understanding processing fees, hidden charges, and how to minimize your loan costs
              </p>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>12 min read</span>
                <span className="mx-2">•</span>
                <Calculator className="w-4 h-4 mr-2" />
                <span>Fee Calculator Included</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="w-8 h-8 text-blue-600 mr-3" />
                  What are Processing Fees?
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    Processing fees are charges levied by banks and NBFCs for processing your personal loan application. 
                    These fees cover administrative costs, documentation, verification, and loan disbursement.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                      💡 Key Insight
                    </h3>
                    <p className="text-blue-800">
                      Processing fees are typically charged upfront and are non-refundable, even if your loan application is rejected. 
                      Always factor these into your total loan cost calculations.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Types of Processing Fees
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Upfront Processing Fee
                      </h4>
                      <p className="text-green-800 mb-3">
                        Charged at the time of loan disbursement, usually deducted from the loan amount.
                      </p>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 1-6% of loan amount</li>
                        <li>• Deducted from disbursement</li>
                        <li>• Non-refundable</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="text-lg font-semibold text-orange-900 mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Hidden Charges
                      </h4>
                      <p className="text-orange-800 mb-3">
                        Additional fees that may not be prominently disclosed.
                      </p>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Documentation charges</li>
                        <li>• Verification fees</li>
                        <li>• Legal charges</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Processing Fee Calculator
                  </h3>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loan Amount (₹)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="500000"
                          defaultValue="500000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Processing Fee Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="2.5"
                          defaultValue="2.5"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-700">Processing Fee:</span>
                        <span className="text-2xl font-bold text-blue-600">₹12,500</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-lg font-medium text-gray-700">Net Disbursement:</span>
                        <span className="text-2xl font-bold text-green-600">₹4,87,500</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Fee Structure by Lender Type
                  </h3>

                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Lender Type</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Processing Fee</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Additional Charges</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3">Public Sector Banks</td>
                          <td className="border border-gray-300 px-4 py-3">0.5% - 2%</td>
                          <td className="border border-gray-300 px-4 py-3">Minimal</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">Private Banks</td>
                          <td className="border border-gray-300 px-4 py-3">1% - 4%</td>
                          <td className="border border-gray-300 px-4 py-3">Moderate</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3">NBFCs</td>
                          <td className="border border-gray-300 px-4 py-3">2% - 6%</td>
                          <td className="border border-gray-300 px-4 py-3">Higher</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">Fintech Apps</td>
                          <td className="border border-gray-300 px-4 py-3">1% - 3%</td>
                          <td className="border border-gray-300 px-4 py-3">Variable</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    How to Minimize Processing Fees
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Compare Multiple Lenders</h4>
                          <p className="text-gray-600 text-sm">Check processing fees across different banks and NBFCs</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Negotiate with Existing Bank</h4>
                          <p className="text-gray-600 text-sm">Existing customers often get better rates</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Look for Promotional Offers</h4>
                          <p className="text-gray-600 text-sm">Many lenders offer zero or reduced processing fees</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Maintain Good Credit Score</h4>
                          <p className="text-gray-600 text-sm">Higher scores often get better fee structures</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Apply During Festive Seasons</h4>
                          <p className="text-gray-600 text-sm">Special offers and reduced fees available</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Consider Salary Account</h4>
                          <p className="text-gray-600 text-sm">Salary account holders get preferential rates</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Common Hidden Charges to Watch Out For
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Hidden Charges Checklist
                    </h4>
                    <ul className="space-y-2 text-red-800">
                      <li>• <strong>Documentation Charges:</strong> ₹500 - ₹2,000 for document processing</li>
                      <li>• <strong>Verification Fees:</strong> ₹200 - ₹1,000 for address/employment verification</li>
                      <li>• <strong>Legal Charges:</strong> ₹1,000 - ₹5,000 for legal documentation</li>
                      <li>• <strong>Stamp Duty:</strong> Varies by state, usually 0.1% - 0.5%</li>
                      <li>• <strong>Prepayment Charges:</strong> 2% - 4% if you prepay early</li>
                      <li>• <strong>Late Payment Fees:</strong> ₹500 - ₹1,500 per missed payment</li>
                      <li>• <strong>Cheque Bounce Charges:</strong> ₹500 - ₹1,000 per bounce</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Processing Fee vs Interest Rate
                  </h3>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-yellow-900 mb-3">
                      💡 Important Distinction
                    </h4>
                    <p className="text-yellow-800 mb-4">
                      Processing fees are one-time charges, while interest rates affect your monthly EMI. 
                      A lower processing fee doesn't always mean a better deal if the interest rate is higher.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded border border-yellow-300">
                        <h5 className="font-semibold text-yellow-900 mb-2">Option A</h5>
                        <p className="text-sm text-yellow-800">Processing Fee: 1% | Interest: 15%</p>
                        <p className="text-sm text-yellow-800">Total Cost: Lower</p>
                      </div>
                      <div className="bg-white p-4 rounded border border-yellow-300">
                        <h5 className="font-semibold text-yellow-900 mb-2">Option B</h5>
                        <p className="text-sm text-yellow-800">Processing Fee: 3% | Interest: 12%</p>
                        <p className="text-sm text-yellow-800">Total Cost: Higher</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Negotiation Strategies
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        1. Leverage Your Relationship
                      </h4>
                      <p className="text-gray-700">
                        If you have a long-standing relationship with the bank, use it to negotiate better terms. 
                        Salary account holders, existing customers, and high-value clients often get preferential rates.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        2. Compare and Quote
                      </h4>
                      <p className="text-gray-700">
                        Get quotes from multiple lenders and use the best offer to negotiate with your preferred bank. 
                        Most banks will match or beat competitor offers to retain customers.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        3. Bulk Negotiation
                      </h4>
                      <p className="text-gray-700">
                        If you're taking a large loan amount, you have more bargaining power. 
                        Banks are more willing to reduce fees for high-value loans.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        4. Timing Matters
                      </h4>
                      <p className="text-gray-700">
                        Apply during month-end or quarter-end when banks are trying to meet targets. 
                        They're more likely to offer better terms during these periods.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Regulatory Guidelines
                  </h3>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">
                      RBI Guidelines on Processing Fees
                    </h4>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Processing fees must be clearly disclosed upfront</li>
                      <li>• No hidden charges allowed without disclosure</li>
                      <li>• Fees should be reasonable and not excessive</li>
                      <li>• Refund policy must be clearly stated</li>
                      <li>• All charges must be included in the loan agreement</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Real-World Examples
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Example 1: ₹5 Lakh Loan
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Processing Fee (2%):</span>
                          <span className="font-semibold">₹10,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Documentation:</span>
                          <span className="font-semibold">₹1,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Verification:</span>
                          <span className="font-semibold">₹500</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold">Total Fees:</span>
                          <span className="font-semibold text-red-600">₹11,500</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Example 2: ₹10 Lakh Loan
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Processing Fee (1.5%):</span>
                          <span className="font-semibold">₹15,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Documentation:</span>
                          <span className="font-semibold">₹2,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Legal Charges:</span>
                          <span className="font-semibold">₹3,000</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold">Total Fees:</span>
                          <span className="font-semibold text-red-600">₹20,000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Tips for Smart Borrowers
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Info className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Read the Fine Print</h4>
                          <p className="text-gray-600 text-sm">Always read all terms and conditions before signing</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Info className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Ask for Fee Breakdown</h4>
                          <p className="text-gray-600 text-sm">Get a detailed breakdown of all charges</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Info className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Calculate Total Cost</h4>
                          <p className="text-gray-600 text-sm">Include all fees in your total cost calculation</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Info className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Negotiate Everything</h4>
                          <p className="text-gray-600 text-sm">Don't accept the first offer - always negotiate</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Info className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Consider Alternatives</h4>
                          <p className="text-gray-600 text-sm">Look at credit cards or other options if fees are too high</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Info className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Plan Your Repayment</h4>
                          <p className="text-gray-600 text-sm">Factor in all costs when planning your repayment strategy</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Are processing fees refundable?
                    </h3>
                    <p className="text-gray-700">
                      Generally, processing fees are non-refundable even if your loan application is rejected. 
                      However, some lenders may offer partial refunds under specific circumstances. 
                      Always check the refund policy before applying.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Can I negotiate processing fees?
                    </h3>
                    <p className="text-gray-700">
                      Yes, processing fees are often negotiable, especially for existing customers or high-value loans. 
                      Compare offers from multiple lenders and use the best offer to negotiate with your preferred bank.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      What's the difference between processing fee and interest rate?
                    </h3>
                    <p className="text-gray-700">
                      Processing fee is a one-time charge for processing your loan application, while interest rate 
                      is the ongoing cost you pay on the principal amount throughout the loan tenure.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Do all lenders charge processing fees?
                    </h3>
                    <p className="text-gray-700">
                      Most lenders charge processing fees, but the amount varies. Some lenders offer zero processing 
                      fee promotions during festive seasons or for specific customer segments.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How can I avoid hidden charges?
                    </h3>
                    <p className="text-gray-700">
                      Read all loan documents carefully, ask for a complete fee breakdown, and compare offers from 
                      multiple lenders. Look for lenders with transparent fee structures and clear terms.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Loans Course
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-800 font-medium">Processing Fees</span>
                    <span className="text-blue-600">Current</span>
                  </div>
                  
                  <Link to="/learn/personal-loans/repayment-strategies" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Repayment Strategies</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/prepayment-options" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Prepayment Options</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-rejection-reasons" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Rejection Reasons</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/improving-approval-chances" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Improving Approval</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-comparison-tools" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Comparison Tools</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">11/20</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-between items-center mt-8"
          >
            <Link
              to="/learn/personal-loans/cibil-score-impact"
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: CIBIL Score Impact
            </Link>
            
            <Link
              to="/learn/personal-loans/repayment-strategies"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next: Repayment Strategies
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProcessingFees;

import React from 'react';
import { DollarSign, CheckCircle, X, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const TaxBenefits: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Gold Loan Tax Benefits & Deductions in India 2024 | MoneyCal"
        description="Complete guide to gold loan tax implications in India. Learn about deductions, business use, personal use, and tax-saving strategies for gold loans."
        keywords="gold loan tax benefits, gold loan tax deduction, gold loan income tax, gold loan section 80C, gold loan tax treatment"
        canonicalUrl="https://moneycal.in/learn/gold-loans/tax-benefits"
      />
      
      <LearnLayout
        category="gold-loans"
        currentLesson="tax-benefits"
        breadcrumb={['Learn', 'Gold Loans', 'Tax Benefits']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <DollarSign className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Important Information</h3>
              <p className="text-gray-700">
                Unlike home loans, personal gold loans DON'T have direct tax benefits. But business gold loans do! Learn all tax implications. 📊💡
              </p>
            </div>
          </div>
        </div>

        {/* Main Truth */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            The Truth About Gold Loan Tax Benefits
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <X className="h-10 w-10 text-red-600 mr-3" />
                <h3 className="text-xl font-bold text-red-900">Personal Use ❌</h3>
              </div>
              <p className="text-gray-800 font-semibold mb-3">
                NO TAX BENEFITS for personal gold loans
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• No deduction under Section 80C</li>
                <li>• No deduction under Section 24</li>
                <li>• Interest paid is not tax deductible</li>
                <li>• Cannot claim any exemptions</li>
              </ul>
              <div className="mt-4 p-3 bg-red-100 rounded-lg">
                <p className="text-sm text-gray-800">
                  <strong>Example:</strong> Loan for wedding, education, medical emergency = No tax benefits
                </p>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-green-900">Business Use ✅</h3>
              </div>
              <p className="text-gray-800 font-semibold mb-3">
                YES - Interest is Business Expense!
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Interest fully deductible as business expense</li>
                <li>✅ Reduces taxable business income</li>
                <li>✅ No upper limit on deduction</li>
                <li>✅ Valid for all business types</li>
              </ul>
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <p className="text-sm text-gray-800">
                  <strong>Example:</strong> Loan for inventory, working capital = Interest deductible
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Loan Tax Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tax Benefits for Business Gold Loans
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works:</h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                <p className="font-semibold text-gray-900 mb-2">Step 1: Use for Business</p>
                <p className="text-gray-700">
                  Gold loan money must be used for legitimate business purposes:
                  inventory purchase, working capital, machinery, expansion, etc.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                <p className="font-semibold text-gray-900 mb-2">Step 2: Claim Interest as Expense</p>
                <p className="text-gray-700">
                  Interest paid on gold loan = Business Expense<br/>
                  Include in your Profit & Loss statement
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                <p className="font-semibold text-gray-900 mb-2">Step 3: Reduce Taxable Income</p>
                <p className="text-gray-700">
                  Total Business Income - Interest Expense = Taxable Income<br/>
                  Pay tax only on reduced amount
                </p>
              </div>
            </div>

            <div className="mt-6 bg-green-200 p-4 rounded-lg">
              <p className="font-bold text-gray-900 mb-2">Real Example:</p>
              <div className="space-y-1 text-gray-800">
                <p>Annual Business Income: ₹10,00,000</p>
                <p>Gold Loan Interest Paid: ₹50,000</p>
                <p className="font-bold text-green-700">→ Taxable Income: ₹9,50,000</p>
                <p className="text-sm mt-2">
                  💰 Tax Savings: ₹15,000 (assuming 30% tax bracket)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Required */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Documents Required for Tax Claims
          </h2>

          <div className="space-y-4">
            <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-gray-900 mb-3">✅ Must Have:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Gold loan agreement showing business purpose</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Interest payment certificates from lender</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Bank statements showing interest debits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Business books showing loan utilization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Purchase invoices/receipts (if applicable)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison with Other Loans */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tax Benefits Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-yellow-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Loan Type</th>
                  <th className="border border-gray-300 p-3">Personal Use</th>
                  <th className="border border-gray-300 p-3">Business Use</th>
                  <th className="border border-gray-300 p-3">Max Deduction</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Gold Loan</td>
                  <td className="border border-gray-300 p-3 text-center text-red-600 font-bold">NO</td>
                  <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">YES</td>
                  <td className="border border-gray-300 p-3 text-center">No Limit</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Home Loan</td>
                  <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">YES</td>
                  <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">YES</td>
                  <td className="border border-gray-300 p-3 text-center">₹2L + ₹1.5L</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Personal Loan</td>
                  <td className="border border-gray-300 p-3 text-center text-red-600 font-bold">NO</td>
                  <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">YES</td>
                  <td className="border border-gray-300 p-3 text-center">No Limit</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Education Loan</td>
                  <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">YES</td>
                  <td className="border border-gray-300 p-3 text-center">N/A</td>
                  <td className="border border-gray-300 p-3 text-center">Full Interest</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Car Loan</td>
                  <td className="border border-gray-300 p-3 text-center text-red-600 font-bold">NO</td>
                  <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">YES</td>
                  <td className="border border-gray-300 p-3 text-center">No Limit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Mistakes to Avoid ⚠️</h2>

          <div className="space-y-4">
            <div className="flex items-start bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Claiming Personal Loan as Business Expense</h3>
                <p className="text-gray-700">
                  If you take loan for personal use but claim as business expense, IT department can reject + penalty
                </p>
              </div>
            </div>

            <div className="flex items-start bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Not Maintaining Proper Records</h3>
                <p className="text-gray-700">
                  Keep all bills, receipts, loan statements for 7 years as proof
                </p>
              </div>
            </div>

            <div className="flex items-start bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Expecting Section 80C Benefits</h3>
                <p className="text-gray-700">
                  Gold loan principal repayment is NOT eligible for Section 80C deduction
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Tax Planning Tips 💡</h2>

          <div className="space-y-4">
            <div className="bg-white border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-gray-900 mb-2">✅ For Business Owners:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Clearly document business purpose in loan agreement</li>
                <li>• Maintain separate business bank account for loan</li>
                <li>• Keep detailed records of how money was used</li>
                <li>• Get annual interest certificate from lender</li>
                <li>• Consult CA for proper accounting treatment</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-gray-900 mb-2">💼 For Personal Use:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Don't expect tax benefits - plan accordingly</li>
                <li>• Focus on getting lowest interest rate</li>
                <li>• Prepay quickly to minimize interest burden</li>
                <li>• Consider other tax-saving investments separately</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Personal gold loans have NO tax benefits in India</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Business gold loan interest is fully deductible as expense</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Unlike home loans, no Section 80C or Section 24 benefits</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Maintain proper documentation for business loan claims</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Consult a CA for accurate tax planning and filing</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">🎉 Congratulations!</h2>
          <p className="text-yellow-100 mb-6">
            You've completed all 10 Gold Loan lessons! You're now an expert on gold loans in India. Explore more loan categories or start your learning journey!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/learn/credit-cards"
              className="inline-block bg-white text-yellow-600 font-bold py-3 px-8 rounded-xl hover:bg-yellow-50 transition-colors"
            >
              Learn About Credit Cards →
            </a>
            <a
              href="/learn"
              className="inline-block bg-yellow-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-yellow-800 transition-colors"
            >
              Back to Learn Home
            </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default TaxBenefits;


import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LearnLayout from '../../../components/learn/LearnLayout';

const EligibilityCalculator: React.FC = () => {
  const [goldWeight, setGoldWeight] = useState('100');
  const [goldPurity, setGoldPurity] = useState('22');
  const [goldPrice, setGoldPrice] = useState('6000');
  const [result, setResult] = useState<any>(null);

  const calculateLoan = () => {
    const weight = parseFloat(goldWeight);
    const purity = parseFloat(goldPurity);
    const pricePerGram = parseFloat(goldPrice);
    
    if (weight > 0 && purity > 0 && pricePerGram > 0) {
      const pureGold = (weight * purity) / 24;
      const marketValue = pureGold * pricePerGram;
      const loanAt60 = marketValue * 0.60;
      const loanAt75 = marketValue * 0.75;
      
      setResult({
        marketValue: Math.round(marketValue),
        loanAt60: Math.round(loanAt60),
        loanAt75: Math.round(loanAt75),
        pureGold: pureGold.toFixed(2)
      });
    }
  };

  const lessonData = {
    category: "gold-loans",
    currentLesson: "eligibility-calculator",
    breadcrumb: ['Learn', 'Gold Loans', 'Eligibility Calculator']
  };

  return (
    <>
      <Helmet>
        <title>Gold Loan Eligibility Calculator 2024 - Check Gold Loan Eligibility Online | MoneyCal</title>
        <meta name="description" content="Calculate your gold loan eligibility instantly. Check maximum loan amount based on gold weight, purity, and current market rates. Simple eligibility criteria - anyone can apply!" />
        <meta name="keywords" content="gold loan eligibility, gold loan Calculator, gold loan eligibility criteria, calculate gold loan amount, gold loan eligibility check" />
      </Helmet>

      <LearnLayout {...lessonData}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-8 rounded-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Gold Loan Eligibility Calculator
              <span className="block text-xl mt-2 text-amber-100">स्वर्ण ऋण पात्रता कैलकुलेटर</span>
            </h1>
            <p className="text-lg text-amber-100">
              Calculate your gold loan amount instantly based on your gold's weight, purity, and current market rates. 
              Check if you're eligible and see how much you can borrow!
            </p>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculate Your Loan Amount</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gold Weight (grams)
                </label>
                <input
                  type="number"
                  value={goldWeight}
                  onChange={(e) => setGoldWeight(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter weight"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gold Purity (Karat)
                </label>
                <select
                  value={goldPurity}
                  onChange={(e) => setGoldPurity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="24">24 Karat (99.9%)</option>
                  <option value="22">22 Karat (91.6%)</option>
                  <option value="20">20 Karat (83.3%)</option>
                  <option value="18">18 Karat (75.0%)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gold Price (₹/gram)
                </label>
                <input
                  type="number"
                  value={goldPrice}
                  onChange={(e) => setGoldPrice(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Current rate"
                />
              </div>
            </div>

            <button
              onClick={calculateLoan}
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700"
            >
              Calculate Loan Amount
            </button>

            {result && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                  <div className="text-sm text-blue-700 mb-2">Market Value</div>
                  <div className="text-3xl font-bold text-blue-600">₹{result.marketValue.toLocaleString()}</div>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                  <div className="text-sm text-green-700 mb-2">Loan @ 60% LTV</div>
                  <div className="text-3xl font-bold text-green-600">₹{result.loanAt60.toLocaleString()}</div>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center">
                  <div className="text-sm text-purple-700 mb-2">Loan @ 75% LTV</div>
                  <div className="text-3xl font-bold text-purple-600">₹{result.loanAt75.toLocaleString()}</div>
                </div>
              </div>
            )}
          </div>

          {/* Basic Eligibility Criteria */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Gold Loan Eligibility Criteria
            </h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-green-900 mb-3">Good News! Almost Everyone is Eligible!</h3>
              <p className="text-gray-700">
                Gold loans have the simplest eligibility criteria among all loans. You don't need a high credit score, 
                income proof, or employment verification. If you have gold jewelry and basic identity documents, you're eligible!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-700 mb-4">✅ Who Can Apply</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Indian citizens aged 18 years or above</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Salaried, self-employed, or business owners</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Homemakers with gold jewelry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Students (with guardian consent if under 18)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Retired individuals / pensioners</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Anyone with gold ornaments (minimum 18 karat)</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-700 mb-4">📋 Basic Requirements</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Valid ID proof (Aadhaar, PAN, Passport, Voter ID)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Address proof (same as ID or utility bill)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Gold jewelry/coins (minimum 18 karat purity)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Passport size photographs (2-3)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>No income proof required</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>No credit score check needed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Gold Requirements */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Gold Requirements for Loan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-3">💎 Minimum Purity</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 18 karat minimum (75% purity)</li>
                  <li>• 22 karat preferred (91.6% purity)</li>
                  <li>• 24 karat gets best LTV (99.9% purity)</li>
                  <li>• Below 18K usually not accepted</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-3">⚖️ Minimum Weight</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Typically 10-20 grams minimum</li>
                  <li>• No maximum weight limit</li>
                  <li>• Stone weight excluded from valuation</li>
                  <li>• Net gold weight considered</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-3">✨ Gold Condition</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Good condition preferred</li>
                  <li>• Broken jewelry accepted at lower value</li>
                  <li>• Must be genuine gold (not plated)</li>
                  <li>• Antique pieces evaluated separately</li>
                </ul>
              </div>
            </div>
          </div>

          {/* LTV Ratios */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Loan-to-Value (LTV) Ratios
            </h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
              <p className="text-gray-700">
                <strong>LTV Ratio</strong> is the percentage of your gold's market value that you can borrow as a loan. 
                RBI has set the maximum LTV at 75% for gold loans, but actual LTV varies by lender and gold type.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left">Gold Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Typical LTV</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">24K Gold Coins/Bars</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">70-75%</td>
                    <td className="border border-gray-300 px-4 py-3">₹1L value → ₹75K loan</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">22K Gold Jewelry</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">65-75%</td>
                    <td className="border border-gray-300 px-4 py-3">₹1L value → ₹70K loan</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">20K Gold Jewelry</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">60-70%</td>
                    <td className="border border-gray-300 px-4 py-3">₹1L value → ₹65K loan</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">18K Gold Jewelry</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">55-65%</td>
                    <td className="border border-gray-300 px-4 py-3">₹1L value → ₹60K loan</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Eligibility by Occupation */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Eligibility by Occupation
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-4">👔 Salaried Employees</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ No income proof needed</li>
                  <li>✓ No employment letter required</li>
                  <li>✓ Just gold + ID proof sufficient</li>
                  <li>✓ Instant approval possible</li>
                </ul>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-4">🏢 Business Owners</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ No business registration needed</li>
                  <li>✓ No ITR or financial statements required</li>
                  <li>✓ Ideal for working capital needs</li>
                  <li>✓ Quick processing (15-30 minutes)</li>
                </ul>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-4">🏠 Homemakers</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Can pledge personal gold jewelry</li>
                  <li>✓ No income proof needed</li>
                  <li>✓ Ownership consent required</li>
                  <li>✓ Widely used by homemakers</li>
                </ul>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-4">🎓 Students / Retired</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Students above 18 can apply</li>
                  <li>✓ Retirees/pensioners eligible</li>
                  <li>✓ No age upper limit (some lenders)</li>
                  <li>✓ Guardian consent for minors</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips to Improve Eligibility */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Tips to Get Maximum Loan Amount
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Pledge Higher Purity Gold</h3>
                  <p className="text-gray-600 text-sm">
                    22-24 karat gold gets better LTV ratios (up to 75%) compared to 18-20 karat jewelry. 
                    If you have gold coins or bars, they're preferred over jewelry.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Keep Gold Clean</h3>
                  <p className="text-gray-600 text-sm">
                    Clean your gold jewelry before valuation. Well-maintained gold creates a better impression 
                    and some valuers may offer slightly better rates.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Compare Multiple Lenders</h3>
                  <p className="text-gray-600 text-sm">
                    Different lenders offer different LTV ratios. NBFCs typically offer up to 75% LTV while some banks may offer 60-70%. 
                    Get valuations from 2-3 lenders before finalizing.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Check Gold Prices</h3>
                  <p className="text-gray-600 text-sm">
                    Apply when gold prices are high to maximize your loan amount. Gold prices fluctuate daily, 
                    so timing your application can get you 5-10% more loan amount.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I get a gold loan without income proof?
                </h3>
                <p className="text-gray-600">
                  Yes! Gold loans don't require income proof, salary slips, or ITR documents. 
                  Your gold acts as security, so lenders don't need to verify your income. 
                  This makes it perfect for homemakers, retirees, and self-employed individuals.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What if my gold jewelry has precious stones?
                </h3>
                <p className="text-gray-600">
                  Banks and NBFCs only value the gold content, not stones. The stone weight is deducted from total weight, 
                  and only net gold weight is considered for loan calculation. Keep stone bills if you want them valued separately.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I pledge gold jewelry that belongs to my family member?
                </h3>
                <p className="text-gray-600">
                  Yes, but the actual owner must give written consent and be present during gold pledge. 
                  Both the jewelry owner and loan applicant must provide KYC documents. 
                  This is common when wives pledge their jewelry for family emergencies.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Is there a minimum or maximum limit for gold loan amount?
                </h3>
                <p className="text-gray-600">
                  Minimum loan amounts start from ₹5,000-₹10,000 depending on the lender. 
                  There's no fixed maximum - you can get loans worth crores if you have sufficient gold. 
                  However, practical limits depend on the lender's policies and your gold's value.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I get a gold loan with bad credit score?
                </h3>
                <p className="text-gray-600">
                  Absolutely! Gold loans don't require credit score checks since they're secured by your gold. 
                  Even if you have a low CIBIL score, loan defaults, or bankruptcy history, you can still get a gold loan. 
                  The gold acts as complete security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default EligibilityCalculator;

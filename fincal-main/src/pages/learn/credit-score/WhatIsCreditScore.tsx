import React from 'react';
import { TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const WhatIsCreditScore: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="What is Credit Score (CIBIL)? Complete Guide 2024 | MoneyCal"
        description="Learn everything about credit scores and CIBIL in India. Understand the 300-900 scale, importance, and how it affects loan approvals and interest rates."
        keywords="credit score, CIBIL score, what is credit score, credit score India, CIBIL meaning"
        canonicalUrl="https://moneycal.in/learn/credit-score/what-is-credit-score"
      />
      
      <LearnLayout
        category="credit-score"
        currentLesson="what-is-credit-score"
        breadcrumb={['Learn', 'Credit Score', 'What is Credit Score?']}
      >
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <TrendingUp className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Your credit score is your financial report card! A score of 750+ can save you lakhs in interest and get instant loan approvals. 📊✨
              </p>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Credit Score (CIBIL)?</h2>
          <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
            <p className="text-lg text-gray-800 mb-4">
              A <strong>credit score</strong> is a 3-digit number (300-900) that represents your creditworthiness - 
              how likely you are to repay loans on time.
            </p>
            <div className="bg-white p-4 rounded-lg border-2 border-green-400">
              <p className="font-bold text-green-900 mb-2">Simple Explanation:</p>
              <p className="text-gray-700">
                <strong>Higher score = Trustworthy borrower = Easy loans at low rates!</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Credit Score Ranges</h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-1">750-900: Excellent</h3>
                  <p className="text-green-100">Instant approval, lowest interest rates</p>
                </div>
                <div className="text-4xl">🏆</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-1">650-749: Good</h3>
                  <p className="text-blue-100">High approval chances, decent rates</p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-1">550-649: Fair</h3>
                  <p className="text-yellow-100">Moderate approval, higher interest</p>
                </div>
                <div className="text-4xl">⚠️</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-1">300-549: Poor</h3>
                  <p className="text-red-100">Difficult to get loans, very high rates</p>
                </div>
                <div className="text-4xl">❌</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is CIBIL?</h2>
          <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
            <p className="text-gray-800 mb-4">
              <strong>CIBIL (Credit Information Bureau India Limited)</strong> is India's first and most popular credit bureau. 
              In India, "CIBIL score" and "credit score" are used interchangeably.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">4 Credit Bureaus in India:</p>
              <ul className="space-y-1 text-gray-700">
                <li>1. CIBIL TransUnion (Most Popular)</li>
                <li>2. Experian</li>
                <li>3. Equifax</li>
                <li>4. CRIF High Mark</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Credit Score Matters</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
              <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">Lower Interest Rates</h3>
              <p className="text-gray-700 mb-3">750+ score can get you 2-3% lower interest rate on loans</p>
              <div className="bg-white p-3 rounded border-2 border-green-300">
                <p className="text-sm font-bold text-gray-900">Example:</p>
                <p className="text-sm text-gray-700">₹50L home loan for 20 years:</p>
                <p className="text-sm text-gray-700">750+ score: 8.5% interest</p>
                <p className="text-sm text-gray-700">650 score: 11% interest</p>
                <p className="text-sm font-bold text-green-700 mt-2">💰 Save ₹12+ lakhs!</p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
              <CheckCircle className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">Easy Loan Approvals</h3>
              <p className="text-gray-700 mb-3">Banks pre-approve loans for high credit scores</p>
              <div className="bg-white p-3 rounded border-2 border-blue-300">
                <p className="text-sm font-bold text-gray-900 mb-2">Approval Rate:</p>
                <p className="text-sm text-gray-700">800+ score: 95% approval</p>
                <p className="text-sm text-gray-700">750-799: 85% approval</p>
                <p className="text-sm text-gray-700">650-749: 60% approval</p>
                <p className="text-sm text-gray-700">Below 650: 20-30% approval</p>
              </div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
              <CheckCircle className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">Premium Credit Cards</h3>
              <p className="text-gray-700">Access to best rewards cards, higher credit limits</p>
            </div>

            <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6">
              <CheckCircle className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">Higher Loan Amounts</h3>
              <p className="text-gray-700">Get 20-30% more loan amount with excellent score</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Affects Your Score?</h2>
          <div className="space-y-4">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">Payment History</h3>
                <span className="bg-blue-100 px-3 py-1 rounded-full font-bold text-blue-700">35%</span>
              </div>
              <p className="text-gray-700">On-time payments good | Late payments bad</p>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">Credit Utilization</h3>
                <span className="bg-green-100 px-3 py-1 rounded-full font-bold text-green-700">30%</span>
              </div>
              <p className="text-gray-700">Keep under 30% of credit limit</p>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">Credit History Length</h3>
                <span className="bg-purple-100 px-3 py-1 rounded-full font-bold text-purple-700">15%</span>
              </div>
              <p className="text-gray-700">Older accounts better | Keep old cards active</p>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">Credit Mix</h3>
                <span className="bg-yellow-100 px-3 py-1 rounded-full font-bold text-yellow-700">10%</span>
              </div>
              <p className="text-gray-700">Different types: credit cards, loans</p>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">New Credit</h3>
                <span className="bg-red-100 px-3 py-1 rounded-full font-bold text-red-700">10%</span>
              </div>
              <p className="text-gray-700">Too many applications hurt score</p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Credit score ranges from 300-900; 750+ is excellent</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">High score saves lakhs in interest and ensures easy loan approvals</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Payment history (35%) is most important factor</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Next: How Credit Score is Calculated! 🧮</h2>
          <p className="text-green-100 mb-6">
            Learn the exact formula and factors that determine your credit score!
          </p>
          <a
            href="/learn/credit-score/how-calculated"
            className="inline-block bg-white text-green-600 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors"
          >
            Next: How Credit Score is Calculated →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default WhatIsCreditScore;


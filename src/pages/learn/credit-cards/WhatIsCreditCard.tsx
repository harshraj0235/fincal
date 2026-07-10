import React from 'react';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const WhatIsCreditCard: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="What is Credit Card? Complete Guide for Indians 2024 | MoneyCal"
        description="Learn everything about credit cards - how they work, types, benefits, interest rates, and smart usage tips. Perfect guide for beginners!"
        keywords="what is credit card, credit card meaning, how credit card works, credit card benefits, credit card India"
        canonicalUrl="/learn/credit-cards/what-is-credit-card"
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="what-is-credit-card"
        breadcrumb={['Learn', 'Credit Cards', 'What is Credit Card?']}
      >
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <CreditCard className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Credit cards are powerful financial tools that can earn you rewards or trap you in debt. Understanding the basics saves you lakhs! 💳✨
              </p>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is a Credit Card?</h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
            <p className="text-lg text-gray-800 mb-4">
              A <strong>credit card</strong> is a plastic/digital card that lets you borrow money from the bank to make purchases. 
              You can buy now and pay later (within 45-50 days interest-free!).
            </p>
            <div className="bg-white p-4 rounded-lg border-2 border-blue-400">
              <p className="font-bold text-blue-900 mb-2">Simple Explanation:</p>
              <p className="text-gray-700">
                <strong>Bank gives you credit limit → You shop → Get free credit period → Pay bill → Repeat!</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Credit Cards Work</h2>
          <div className="space-y-4">
            <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                  <span className="font-bold text-blue-700">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Bank Sets Credit Limit</h3>
                  <p className="text-gray-700">Based on your income and CIBIL score, bank approves credit limit (₹50K - ₹10L)</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-green-300 rounded-lg p-5">
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-4 flex-shrink-0">
                  <span className="font-bold text-green-700">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">You Make Purchases</h3>
                  <p className="text-gray-700">Swipe card anywhere - online/offline. Bank pays merchant on your behalf</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-300 rounded-lg p-5">
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full p-2 mr-4 flex-shrink-0">
                  <span className="font-bold text-purple-700">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Interest-Free Period (45-50 days)</h3>
                  <p className="text-gray-700">If you pay full bill before due date - ZERO interest charges!</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-orange-300 rounded-lg p-5">
              <div className="flex items-start">
                <div className="bg-orange-100 rounded-full p-2 mr-4 flex-shrink-0">
                  <span className="font-bold text-orange-700">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Pay Bill or Pay Interest</h3>
                  <p className="text-gray-700">Pay full → No interest | Pay minimum only → 36-42% interest on remaining!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Example</h2>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Rahul's Credit Card Journey:</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded">
                <p className="text-gray-700">Credit Limit: ₹1,00,000</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-gray-700">Purchases in March: ₹30,000</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-gray-700">Bill Generated: 1st April</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-gray-700">Due Date: 20th April</p>
              </div>
              <div className="bg-green-200 p-4 rounded border-2 border-green-400">
                <p className="font-bold text-gray-900">✅ Rahul pays ₹30,000 on 18th April</p>
                <p className="text-green-700 font-bold">Interest Paid: ₹0 | Rewards Earned: 300 points!</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-2">Interest-Free Credit</h3>
              <p className="text-gray-700">45-50 days free credit on every purchase</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-2">Rewards & Cashback</h3>
              <p className="text-gray-700">Earn 1-5% back on purchases</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-2">Build Credit Score</h3>
              <p className="text-gray-700">Improve CIBIL with responsible usage</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-2">Fraud Protection</h3>
              <p className="text-gray-700">Zero liability on unauthorized transactions</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Warnings ⚠️</h2>
          <div className="space-y-4">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-red-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-2">36-42% Interest Rate</h3>
              <p className="text-gray-700">Highest among all loans! Only pay minimum if absolutely necessary</p>
            </div>
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-red-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-2">Debt Trap Risk</h3>
              <p className="text-gray-700">Easy to overspend and get trapped in high-interest debt</p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Credit card = Borrow money from bank, pay later interest-free (45-50 days)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Always pay full bill to avoid 36-42% interest charges</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Great for rewards, cashback, and building credit score</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Next: Types of Credit Cards! 🎴</h2>
          <p className="text-purple-100 mb-6">
            Discover different types of credit cards and find the perfect one for your needs!
          </p>
          <a
            href="/learn/credit-cards/types-of-credit-cards"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Next: Types of Credit Cards →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default WhatIsCreditCard;


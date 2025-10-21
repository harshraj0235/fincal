import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Shield, AlertCircle, CheckCircle, Calculator } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const WhatIsLoan: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="What Is a Loan? Types and Examples Explained | MoneyCal Learn"
        description="Complete guide to understanding loans in India. Learn what is a loan, how it works, types of loans (secured/unsecured), interest rates, EMI, and eligibility criteria with real examples."
        keywords="what is loan, loan meaning, types of loans, loan in India, secured loan, unsecured loan, how loans work, loan basics"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="what-is-loan"
        breadcrumb={['Learn', 'Loans & Credit', 'What Is a Loan?']}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">What Is a Loan?</h1>
                <p className="text-lg text-gray-600 mt-2">
                  लोन क्या है? - Types and Examples Explained
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Beginner Level
              </span>
              <span>📖 8 min read</span>
              <span>🔄 Updated: Oct 21, 2025</span>
            </div>
          </div>

          {/* Introduction */}
          <section id="introduction" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Loans in India</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A <strong>loan</strong> is money borrowed from a bank, financial institution, or lender that you must repay over time with <strong>interest</strong>. 
                Loans help individuals and businesses achieve their financial goals without paying the full amount upfront.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Hindi में समझें:</strong> लोन (Loan) एक प्रकार का उधार है जो आप बैंक या financial institution से लेते हैं। 
                इसे आपको एक निश्चित समय में ब्याज (interest) के साथ वापस करना होता है।
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether it's buying a home, starting a business, or funding education, loans make big purchases affordable by spreading 
                payments over months or years through <strong>EMI (Equated Monthly Installment)</strong>.
              </p>
            </div>
          </section>

          {/* Concept Box */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Key Concept
            </h3>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-800 text-lg font-semibold mb-2">
                Loan = Principal + Interest
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Principal (मूल राशि):</strong> The original amount you borrow (e.g., ₹5,00,000)</li>
                <li><strong>Interest (ब्याज):</strong> The cost of borrowing, charged as a percentage (e.g., 8% per year)</li>
                <li><strong>Tenure (अवधि):</strong> Time period to repay the loan (e.g., 5 years)</li>
                <li><strong>EMI:</strong> Fixed monthly payment that includes both principal and interest</li>
              </ul>
            </div>
          </div>

          {/* How Loans Work */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Do Loans Work?</h2>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
                <h3 className="font-bold text-gray-800 mb-2">Apply</h3>
                <p className="text-sm text-gray-600">Submit application with documents to bank</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">2</div>
                <h3 className="font-bold text-gray-800 mb-2">Approval</h3>
                <p className="text-sm text-gray-600">Bank checks eligibility & credit score</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                <h3 className="font-bold text-gray-800 mb-2">Disbursal</h3>
                <p className="text-sm text-gray-600">Money credited to your account</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
                <h3 className="font-bold text-gray-800 mb-2">Repay</h3>
                <p className="text-sm text-gray-600">Pay monthly EMI until fully repaid</p>
              </div>
            </div>
          </section>

          {/* Types of Loans */}
          <section id="types" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Loans in India</h2>
            
            <div className="space-y-4">
              {/* Secured Loans */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-900 mb-2">1. Secured Loans (सुरक्षित लोन)</h3>
                    <p className="text-gray-700 mb-3">
                      Require <strong>collateral</strong> (asset pledged as security). If you don't repay, the bank can seize the asset.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-semibold text-gray-800 mb-2">Examples:</p>
                      <ul className="space-y-1 text-gray-700">
                        <li>🏠 <strong>Home Loan:</strong> Property as collateral (8-9% interest)</li>
                        <li>🚗 <strong>Car Loan:</strong> Vehicle as collateral (9-12% interest)</li>
                        <li>🏆 <strong>Gold Loan:</strong> Gold jewelry as collateral (7-15% interest)</li>
                        <li>🏢 <strong>Loan Against Property:</strong> Existing property mortgaged (9-11% interest)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unsecured Loans */}
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-orange-900 mb-2">2. Unsecured Loans (असुरक्षित लोन)</h3>
                    <p className="text-gray-700 mb-3">
                      No collateral required. Approved based on <strong>income, credit score, and repayment capacity</strong>. Higher interest rates.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-semibold text-gray-800 mb-2">Examples:</p>
                      <ul className="space-y-1 text-gray-700">
                        <li>💳 <strong>Personal Loan:</strong> For any purpose (11-24% interest)</li>
                        <li>💳 <strong>Credit Card:</strong> Revolving credit (18-42% interest)</li>
                        <li>🎓 <strong>Education Loan:</strong> For students (9-15% interest, sometimes unsecured)</li>
                        <li>💼 <strong>Business Loan (unsecured):</strong> For small businesses (12-20% interest)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Example Calculation */}
          <section id="example" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-Life Example</h2>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">Scenario: Rajesh Takes a Car Loan</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">📋 Loan Details</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>🚗 <strong>Car Price:</strong> ₹8,00,000</li>
                    <li>💰 <strong>Down Payment:</strong> ₹2,00,000 (25%)</li>
                    <li>💵 <strong>Loan Amount:</strong> ₹6,00,000</li>
                    <li>📊 <strong>Interest Rate:</strong> 10% per annum</li>
                    <li>📅 <strong>Tenure:</strong> 5 years (60 months)</li>
                  </ul>
                </div>
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">💳 Repayment</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Monthly EMI:</strong> <span className="text-green-600 text-xl font-bold">₹12,748</span></li>
                    <li><strong>Total Amount Paid:</strong> ₹7,64,880</li>
                    <li><strong>Total Interest Paid:</strong> ₹1,64,880</li>
                    <li className="text-sm text-gray-600 italic mt-2">Rajesh pays ₹12,748 every month for 60 months</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Key Points */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              💡 Key Points to Remember
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Loan = Borrowed money</strong> that must be repaid with interest</li>
              <li><strong>Secured loans have lower interest</strong> because of collateral</li>
              <li><strong>Unsecured loans have higher interest</strong> due to more risk for lender</li>
              <li><strong>EMI</strong> is the fixed monthly payment (principal + interest)</li>
              <li><strong>Credit score matters:</strong> Higher score = Better loan terms</li>
              <li><strong>Read terms carefully:</strong> Understand processing fees, prepayment charges</li>
              <li><strong>Borrow only what you can repay:</strong> EMI should be max 40-50% of income</li>
            </ul>
          </div>

          {/* Common Mistakes */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  ❌ Don't Do This
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Taking a loan without understanding terms</li>
                  <li>• Borrowing more than you can afford</li>
                  <li>• Ignoring credit score before applying</li>
                  <li>• Missing EMI payments (affects credit)</li>
                  <li>• Not comparing offers from different banks</li>
                </ul>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  ✅ Do This Instead
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Read loan agreement carefully</li>
                  <li>• Calculate EMI before applying</li>
                  <li>• Check credit score (CIBIL)</li>
                  <li>• Set up auto-pay for EMIs</li>
                  <li>• Compare interest rates from 3-4 banks</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-purple-900 mb-4">🎯 Pro Tips for Getting the Best Loan</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <p className="text-gray-700"><strong>Maintain Credit Score 750+</strong> for best interest rates</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <p className="text-gray-700"><strong>Make larger down payment</strong> to reduce loan amount & interest</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <p className="text-gray-700"><strong>Choose shorter tenure</strong> to save on total interest (if affordable)</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <p className="text-gray-700"><strong>Negotiate with bank</strong> - rates are often flexible</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                  <p className="text-gray-700"><strong>Consider balance transfer</strong> if better rates available elsewhere</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">6</div>
                  <p className="text-gray-700"><strong>Prepay when possible</strong> to reduce interest burden</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              Related Calculators
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/emi-calculator" className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                <div className="text-3xl mb-2">🧮</div>
                <h4 className="font-bold text-blue-600 group-hover:text-blue-700 mb-1">EMI Calculator</h4>
                <p className="text-sm text-gray-600">Calculate monthly loan payments</p>
              </a>
              <a href="/calculators/home-loan-calculator" className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                <div className="text-3xl mb-2">🏠</div>
                <h4 className="font-bold text-blue-600 group-hover:text-blue-700 mb-1">Home Loan EMI</h4>
                <p className="text-sm text-gray-600">Calculate housing loan payments</p>
              </a>
              <a href="/calculators/personal-loan-calculator" className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                <div className="text-3xl mb-2">💳</div>
                <h4 className="font-bold text-blue-600 group-hover:text-blue-700 mb-1">Personal Loan EMI</h4>
                <p className="text-sm text-gray-600">Quick personal loan calculator</p>
              </a>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-300">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What is the difference between a loan and a credit card?
                </summary>
                <p className="mt-3 text-gray-700">
                  A loan is a one-time borrowing with fixed EMI and tenure. A credit card is revolving credit where you can borrow, repay, and borrow again up to a limit. Loans have lower interest (8-15%) vs credit cards (18-42%).
                </p>
              </details>
              
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-300">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  How much loan can I get based on my salary?
                </summary>
                <p className="mt-3 text-gray-700">
                  Generally, banks approve loans where EMI is 40-50% of your monthly income. For ₹50,000 salary, you can get a loan with EMI up to ₹20,000-25,000. Use our EMI calculator to check eligibility.
                </p>
              </details>
              
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-300">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What credit score is needed for a loan in India?
                </summary>
                <p className="mt-3 text-gray-700">
                  For best loan approval chances, maintain a CIBIL score of 750 or above. Scores 650-750 may get approved but at higher interest rates. Below 650 is risky and may face rejection.
                </p>
              </details>
              
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-300">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I prepay my loan before tenure ends?
                </summary>
                <p className="mt-3 text-gray-700">
                  Yes! Prepayment reduces interest. Most banks allow it with no penalty for floating rate loans. Fixed rate loans may have 2-4% prepayment charges. Always check your loan agreement.
                </p>
              </details>
              
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-300">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What happens if I miss an EMI payment?
                </summary>
                <p className="mt-3 text-gray-700">
                  Missing EMI payments attracts late fees (₹500-1000), impacts your credit score negatively, and may lead to loan default. After 90 days of non-payment, loan becomes NPA (Non-Performing Asset) and legal action may be taken.
                </p>
              </details>
            </div>
          </section>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <div className="text-gray-400">
              ← No previous lesson
            </div>
            <a 
              href="/learn/loans/types-of-loans" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
            >
              Next: Types of Loans →
            </a>
          </div>

        </motion.div>

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "What Is a Loan? Types and Examples Explained",
            "description": "Complete guide to understanding loans in India - secured/unsecured, EMI, interest rates, eligibility",
            "educationalLevel": "Beginner",
            "learningResourceType": "Tutorial",
            "inLanguage": ["en", "hi"],
            "author": {
              "@type": "Organization",
              "name": "MoneyCal Learn"
            },
            "datePublished": "2025-10-21",
            "dateModified": "2025-10-21"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the difference between a loan and a credit card?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A loan is a one-time borrowing with fixed EMI and tenure. A credit card is revolving credit where you can borrow, repay, and borrow again up to a limit. Loans have lower interest (8-15%) vs credit cards (18-42%)."
                }
              },
              {
                "@type": "Question",
                "name": "How much loan can I get based on my salary?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Generally, banks approve loans where EMI is 40-50% of your monthly income. For ₹50,000 salary, you can get a loan with EMI up to ₹20,000-25,000."
                }
              },
              {
                "@type": "Question",
                "name": "What credit score is needed for a loan in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For best loan approval chances, maintain a CIBIL score of 750 or above. Scores 650-750 may get approved but at higher interest rates. Below 650 is risky and may face rejection."
                }
              }
            ]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default WhatIsLoan;


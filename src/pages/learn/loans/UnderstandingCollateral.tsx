import React from 'react';
import { motion } from 'framer-motion';
import { Home, Car, Coins, Building, AlertTriangle, Shield } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const UnderstandingCollateral: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="What Is Collateral in Loans? Complete Guide with Examples | MoneyCal Learn"
        description="Understand collateral, hypothecation, mortgage, LTV ratio with real examples. Learn what assets qualify, risks, and how to protect yourself in secured loans."
        keywords="collateral, what is collateral, hypothecation, mortgage, LTV ratio, secured loan, collateral free loan, loan security"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="understanding-collateral"
        breadcrumb={['Learn', 'Loans & Credit', 'Understanding Collateral']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Understanding Collateral in Loans
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            कोलैटरल (जमानत) को समझें - Complete Guide
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Collateral (जमानत/सुरक्षा)</strong> is an asset (property, vehicle, gold, etc.) that you pledge to the lender as security. 
              If you fail to repay the loan, the lender can seize and sell it to recover their money.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Hindi में:</strong> Collateral वह asset है जो आप लोन लेते समय bank को security के रूप में देते हैं। 
              यह आपके पास रहती है, लेकिन अगर आप EMI नहीं भरते, तो bank इसे ले सकता है और बेच सकता है।
            </p>
          </section>

          {/* Types of Collateral */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Collateral Accepted</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Property */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">1. Real Estate</h3>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Accepted:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Residential property (flat, house)</li>
                    <li>• Commercial property (shop, office)</li>
                    <li>• Land/Plot (residential/agricultural)</li>
                  </ul>
                  <p className="text-xs text-blue-700 mt-3 font-semibold">
                    LTV: 70-90% | Loan Amount: Up to ₹5 Cr+
                  </p>
                </div>
              </div>

              {/* Vehicle */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-600 rounded-lg">
                    <Car className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900">2. Vehicles</h3>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Accepted:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Cars (new/used)</li>
                    <li>• Two-wheelers</li>
                    <li>• Commercial vehicles</li>
                  </ul>
                  <p className="text-xs text-green-700 mt-3 font-semibold">
                    LTV: 70-90% | Hypothecation (not mortgage)
                  </p>
                </div>
              </div>

              {/* Gold */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-yellow-600 rounded-lg">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-yellow-900">3. Gold</h3>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Accepted:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Gold jewelry</li>
                    <li>• Gold coins</li>
                    <li>• Gold biscuits</li>
                  </ul>
                  <p className="text-xs text-yellow-700 mt-3 font-semibold">
                    LTV: 75% (RBI limit) | Quick approval (same day)
                  </p>
                </div>
              </div>

              {/* Securities */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-600 rounded-lg">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900">4. Financial Assets</h3>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Accepted:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Fixed Deposits (FD)</li>
                    <li>• Shares & mutual funds</li>
                    <li>• Insurance policies</li>
                  </ul>
                  <p className="text-xs text-purple-700 mt-3 font-semibold">
                    LTV: 70-90% | Lower interest than personal loan
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* LTV Explained */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4">📊 What is LTV (Loan-to-Value) Ratio?</h3>
            <p className="text-gray-700 mb-4">
              <strong>LTV = (Loan Amount / Collateral Value) × 100</strong>
            </p>
            <div className="bg-white p-5 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Example:</h4>
              <p className="text-gray-700 mb-2">
                Property Value = ₹1,00,00,000<br/>
                Maximum LTV = 80%<br/>
                Maximum Loan = ₹80,00,000<br/>
                <strong>Your Down Payment = ₹20,00,000 minimum</strong>
              </p>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-sm text-blue-700">
                  💡 <strong>Higher down payment</strong> (lower LTV) often gets you <strong>0.25-0.5% better interest rate!</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Risks */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              ⚠️ Risks of Collateral-Based Loans
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Asset seizure risk:</strong> If you default, you lose the asset (home, car, gold)</li>
              <li><strong>Long recovery process:</strong> Getting asset back after clearing dues is difficult</li>
              <li><strong>Market value fluctuation:</strong> If collateral value drops, bank may ask for more security</li>
              <li><strong>Can't sell freely:</strong> Asset is "hypothecated" - can't sell without lender permission</li>
              <li><strong>Legal complications:</strong> Foreclosure/auction is stressful & public</li>
              <li><strong>Affects future borrowing:</strong> Same asset can't be used for multiple loans</li>
            </ul>
          </div>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I use the same property as collateral for 2 loans?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>No, not simultaneously.</strong> One asset = one loan at a time. However, after repaying first loan, you can use it again. 
                  Exception: "Top-up loan" on existing home loan uses the same property but is considered one loan account.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What happens to my collateral if I repay early?
                </summary>
                <p className="mt-3 text-gray-700">
                  Once you fully repay (including prepayment), the lender <strong>releases the collateral within 15-30 days</strong>. 
                  You get original documents back. For vehicles, hypothecation is removed from RC (Registration Certificate). 
                  For property, you receive original title deeds and NOC (No Objection Certificate).
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I rent out collateral property during the loan?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Yes!</strong> You can rent/lease the collateral property - rental income can even help you pay EMI. 
                  But you <strong>cannot sell</strong> without lender permission. Some banks require you to inform them about tenants for insurance purposes.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What if collateral value increases during loan tenure?
                </summary>
                <p className="mt-3 text-gray-700">
                  Good news! You can request <strong>"Top-up loan"</strong> based on increased value. Example: ₹80L loan on ₹1Cr property. 
                  After 5 years, property worth ₹1.5Cr and you've repaid ₹20L. New LTV calculation allows ₹30-40L additional loan at low rates.
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/fixed-vs-floating-rates" className="text-gray-600 hover:text-blue-600">
              ← Previous: Fixed vs Floating
            </a>
            <a href="/learn/loans/check-eligibility" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Check Loan Eligibility →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Understanding Collateral in Loans",
            "educationalLevel": "Beginner",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default UnderstandingCollateral;


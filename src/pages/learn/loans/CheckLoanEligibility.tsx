import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, IndianRupee, TrendingUp } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CheckLoanEligibility: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEMI, setExistingEMI] = useState(5000);
  const [cibilScore, setCibilScore] = useState(750);
  const [age, setAge] = useState(30);

  const foir = ((existingEMI / monthlyIncome) * 100);
  const availableForEMI = monthlyIncome * 0.5 - existingEMI;
  const maxLoanAmount = (availableForEMI * 12 * 20 * 100) / (9 * 20 + 100);

  const isEligible = cibilScore >= 650 && foir <= 50 && age >= 21 && age <= 60;

  return (
    <>
      <SEOHelmet
        title="How to Check Loan Eligibility in India | Complete Self-Assessment Guide"
        description="Check your loan eligibility with interactive calculator. Learn income requirements, CIBIL score needs, debt-to-income ratio, and how to improve eligibility for home, car, personal loans."
        keywords="loan eligibility, check loan eligibility, loan eligibility Calculator, CIBIL score, FOIR, loan approval chances, improve loan eligibility"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="check-eligibility"
        breadcrumb={['Learn', 'Loans & Credit', 'Check Loan Eligibility']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            How to Check Your Loan Eligibility
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            लोन पात्रता कैसे check करें - Complete Self-Assessment
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Before applying for a loan, <strong>check your eligibility</strong> to avoid rejection (which damages credit score). 
              Use this self-assessment tool to know your chances.
            </p>
          </section>

          {/* Interactive Eligibility Checker */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🧮 Instant Eligibility Checker</h2>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Monthly Income (₹)
                    </label>
                    <input
                      type="range"
                      min="15000"
                      max="200000"
                      step="5000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-lg font-bold text-purple-700">₹{monthlyIncome.toLocaleString('en-IN')}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Existing EMI (₹)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={existingEMI}
                      onChange={(e) => setExistingEMI(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-lg font-bold text-purple-700">₹{existingEMI.toLocaleString('en-IN')}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CIBIL Score
                    </label>
                    <input
                      type="range"
                      min="300"
                      max="900"
                      step="10"
                      value={cibilScore}
                      onChange={(e) => setCibilScore(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-lg font-bold text-purple-700">{cibilScore}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Age
                    </label>
                    <input
                      type="range"
                      min="21"
                      max="65"
                      step="1"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-lg font-bold text-purple-700">{age} years</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Result */}
                  <div className={`p-6 rounded-lg border-2 ${isEligible ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      {isEligible ? (
                        <CheckCircle className="w-12 h-12 text-green-600" />
                      ) : (
                        <XCircle className="w-12 h-12 text-red-600" />
                      )}
                      <div>
                        <p className="text-sm text-gray-600">Eligibility Status</p>
                        <p className={`text-2xl font-bold ${isEligible ? 'text-green-700' : 'text-red-700'}`}>
                          {isEligible ? '✅ ELIGIBLE' : '❌ NOT ELIGIBLE'}
                        </p>
                      </div>
                    </div>
                    {isEligible && (
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Estimated Loan Amount:</strong>
                        </p>
                        <p className="text-3xl font-bold text-green-700">
                          ₹{Math.max(0, Math.round(maxLoanAmount)).toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          At 9% interest, 20 years tenure
                        </p>
                      </div>
                    )}
                  </div>

                  {/* FOIR */}
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Your FOIR</p>
                    <p className="text-2xl font-bold text-blue-700">{foir.toFixed(1)}%</p>
                    <p className={`text-xs mt-2 ${foir <= 40 ? 'text-green-600' : foir <= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {foir <= 40 ? '✅ Excellent - Very likely approval' : foir <= 50 ? '⚠️ Moderate - May approve' : '❌ High - Difficult approval'}
                    </p>
                  </div>

                  {/* Available */}
                  <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Available for New EMI</p>
                    <p className="text-2xl font-bold text-green-700">₹{Math.max(0, availableForEMI).toLocaleString('en-IN')}</p>
                    <p className="text-xs text-gray-600 mt-2">
                      (50% of income - existing EMI)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Eligibility Checklist */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Eligibility Checklist</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { check: 'Age 21-60 years', pass: age >= 21 && age <= 60 },
                { check: 'CIBIL Score 650+', pass: cibilScore >= 650 },
                { check: 'Monthly Income ₹15K+', pass: monthlyIncome >= 15000 },
                { check: 'FOIR below 50%', pass: foir <= 50 },
                { check: 'Employment 1+ year', pass: true },
                { check: 'No recent defaults', pass: true }
              ].map((item, index) => (
                <div key={index} className={`flex items-center gap-3 p-4 rounded-lg border-2 ${item.pass ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  {item.pass ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span className="text-gray-700">{item.check}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  How can I increase my loan eligibility?
                </summary>
                <p className="mt-3 text-gray-700">
                  5 proven ways: (1) <strong>Increase income</strong> - ask for raise or show additional income, 
                  (2) <strong>Close existing loans</strong> - reduce FOIR, (3) <strong>Add co-applicant</strong> - combines income, 
                  (4) <strong>Improve CIBIL to 750+</strong> - 6 months of good behavior, (5) <strong>Choose longer tenure</strong> - lower EMI = higher eligibility.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Does checking eligibility online affect CIBIL score?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>No!</strong> Using bank's eligibility Calculator or MoneyCal tools = <strong>soft inquiry</strong> = no impact on score. 
                  Only <strong>formal application with documents</strong> = hard inquiry = 5-10 point drop. Always check eligibility first!
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/understanding-collateral" className="text-gray-600 hover:text-blue-600">
              ← Previous: Understanding Collateral
            </a>
            <a href="/learn/loans/loan-agreement-guide" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Loan Agreement Guide →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "How to Check Your Loan Eligibility",
            "educationalLevel": "Beginner",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default CheckLoanEligibility;






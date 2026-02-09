import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, AlertCircle, TrendingUp } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CalculateTrueCost: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(36);
  const [processing, setProcessing] = useState(1); // 1%
  const [insurance, setInsurance] = useState(5000);

  const calculateEMI = () => {
    const r = rate / 12 / 100;
    const n = tenure;
    return Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  };

  const emi = calculateEMI();
  const totalEMI = emi * tenure;
  const processingFee = (loanAmount * processing) / 100;
  const trueCost = totalEMI + processingFee + insurance - loanAmount;

  return (
    <>
      <SEOHelmet
        title="How to Calculate True Cost of a Loan | Hidden Charges & APR Explained"
        description="Learn to calculate real loan cost including processing fee, insurance, GST, prepayment charges. Understand APR, effective interest rate with interactive calculator."
        keywords="true cost of loan, loan hidden charges, APR calculator, effective interest rate, loan processing fee, loan total cost calculator"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="calculate-true-cost"
        breadcrumb={['Learn', 'Loans & Credit', 'Calculate True Cost']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            How to Calculate True Cost of a Loan
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            लोन की असली लागत कैसे calculate करें
          </p>

          {/* Warning */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
            <h3 className="text-xl font-bold text-red-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              ⚠️ The Interest Rate Trap
            </h3>
            <p className="text-gray-700">
              <strong>Don't just look at interest rate!</strong> A "10% loan" might actually cost you 12-14% when you include 
              processing fees, insurance, GST, and other hidden charges.
            </p>
          </div>

          {/* True Cost Calculator */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🧮 True Cost Calculator</h2>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Loan Amount (₹)</label>
                    <input type="range" min="50000" max="2000000" step="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full" />
                    <p className="text-lg font-bold text-purple-700">₹{loanAmount.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Interest Rate (%)</label>
                    <input type="range" min="8" max="24" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
                    <p className="text-lg font-bold text-purple-700">{rate}%</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Tenure (months)</label>
                    <input type="range" min="12" max="60" step="6" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full" />
                    <p className="text-lg font-bold text-purple-700">{tenure} months</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Processing Fee (%)</label>
                    <input type="range" min="0" max="3" step="0.25" value={processing} onChange={(e) => setProcessing(Number(e.target.value))} className="w-full" />
                    <p className="text-lg font-bold text-purple-700">{processing}%</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Insurance (₹)</label>
                    <input type="range" min="0" max="20000" step="1000" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="w-full" />
                    <p className="text-lg font-bold text-purple-700">₹{insurance.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monthly EMI:</span>
                        <span className="font-bold">₹{emi.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total EMI Paid:</span>
                        <span className="font-bold">₹{totalEMI.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-orange-700">
                        <span>Processing Fee:</span>
                        <span className="font-bold">₹{processingFee.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-orange-700">
                        <span>Insurance:</span>
                        <span className="font-bold">₹{insurance.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t-2 border-gray-300 text-lg">
                        <span className="font-bold">Total Cost:</span>
                        <span className="font-bold text-red-700">₹{trueCost.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-100 p-4 rounded-lg border-2 border-red-200">
                    <p className="text-sm font-semibold text-red-800">
                      Hidden Cost: ₹{(processingFee + insurance).toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-700 mt-2">
                      Effective Rate: ~{((trueCost / loanAmount / (tenure/12)) * 100).toFixed(2)}% p.a.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hidden Charges */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10 Hidden Charges to Watch For</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'Processing Fee', amount: '0.5-2% of loan', note: 'Charged upfront' },
                { name: 'Documentation Charges', amount: '₹2,000-5,000', note: 'Legal paperwork' },
                { name: 'Valuation Charges', amount: '₹3,000-10,000', note: 'Property assessment' },
                { name: 'Insurance Premium', amount: '₹5,000-50,000', note: 'Often mandatory' },
                { name: 'Prepayment Penalty', amount: '2-4% of outstanding', note: 'Check carefully!' },
                { name: 'Late Payment Fee', amount: '₹500-1,000', note: 'Per missed EMI' },
                { name: 'Stamp Duty', amount: '0.1-0.5% of loan', note: 'Govt tax' },
                { name: 'Legal Fee', amount: '₹5,000-15,000', note: 'For documentation' },
                { name: 'GST on Fees', amount: '18% on all fees', note: 'Adds significantly' },
                { name: 'Bounced EMI Charge', amount: '₹300-500', note: 'If auto-debit fails' }
              ].map((charge, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-1">{index + 1}. {charge.name}</h4>
                  <p className="text-sm text-orange-700 font-bold">{charge.amount}</p>
                  <p className="text-xs text-gray-600">{charge.note}</p>
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
                  What is APR and how is it different from interest rate?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Interest Rate</strong> = Just the borrowing cost (9%, 12%, etc.). 
                  <strong>APR (Annual Percentage Rate)</strong> = Interest + ALL fees (processing, insurance, etc.) expressed as annual %. 
                  APR is 1-3% higher than interest rate. <strong>Always compare APR</strong>, not just interest rate!
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I negotiate processing fees?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Yes!</strong> Processing fees are often negotiable: (1) Ask for waiver/discount (especially if existing customer), 
                  (2) Compare with competitors, (3) During festive offers, banks waive processing fees completely. 
                  Typical: Listed 1-2% → Can negotiate to 0.5% or ₹5-10K flat. <strong>Savings: ₹10-50K on large loans!</strong>
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/cibil-score-impact" className="text-gray-600 hover:text-blue-600">
              ← Previous: CIBIL Score Impact
            </a>
            <a href="/learn/loans/loan-default-consequences" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Loan Default →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "How to Calculate True Cost of a Loan",
            "educationalLevel": "Beginner",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default CalculateTrueCost;






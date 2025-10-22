import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, HelpCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CommonLoanTerms: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Common Loan Terms Explained for Beginners | Loan Glossary A-Z"
        description="Complete glossary of loan terms: EMI, principal, collateral, FOIR, LTV, MCLR, foreclosure, hypothecation. Understand banking jargon in simple language."
        keywords="loan terms, loan glossary, EMI meaning, principal, collateral, FOIR, LTV ratio, MCLR, foreclosure, hypothecation, loan terminology"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="common-loan-terms"
        breadcrumb={['Learn', 'Loans & Credit', 'Common Loan Terms']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Common Loan Terms Explained for Beginners
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Loan की सामान्य terms - A-Z Glossary
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Understanding banking terminology helps you read loan agreements, compare offers, and make informed decisions. 
              Here's a complete glossary of 30+ essential loan terms explained in simple language.
            </p>
          </section>

          {/* Terms A-Z */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Loan Terms (A-Z)</h2>
            <div className="space-y-3">
              {[
                { term: 'APR (Annual Percentage Rate)', def: 'Total cost of loan including interest + all fees, expressed as yearly %. More accurate than just interest rate. Always compare APR, not interest rate alone.' },
                { term: 'Collateral (जमानत)', def: 'Asset pledged as security (property, vehicle, gold). If you default, bank can seize it. Secured loans require collateral.' },
                { term: 'Co-Applicant (सह-आवेदक)', def: 'Person who applies with you (spouse, parent). Shares equal liability. Increases loan eligibility.' },
                { term: 'CIBIL Score', def: 'Credit score (300-900) showing creditworthiness. 750+ = excellent. Major factor in loan approval.' },
                { term: 'EMI (Equated Monthly Installment)', def: 'Fixed monthly payment including principal + interest. Formula: [P×r×(1+r)^n]/[(1+r)^n-1]' },
                { term: 'FOIR (Fixed Obligations to Income Ratio)', def: 'Total EMIs / Monthly Income × 100. Should be ≤50%. Example: ₹20K EMI / ₹50K income = 40%' },
                { term: 'Foreclosure (पूर्ण भुगतान)', def: 'Closing entire loan before tenure ends. May have 2-4% penalty for fixed loans. Floating home loans = free (RBI rule).' },
                { term: 'Hypothecation', def: 'Lender\'s right over asset without taking possession. Used for vehicle loans. You keep using car, but can\'t sell without bank NOC.' },
                { term: 'LTV (Loan-to-Value)', def: 'Loan amount as % of asset value. Example: ₹80L loan on ₹1Cr property = 80% LTV. Lower LTV = better rate.' },
                { term: 'MCLR (Marginal Cost of Lending Rate)', def: 'Bank\'s internal benchmark rate. Your loan rate = MCLR + spread. Changes quarterly/yearly based on bank\'s cost.' },
                { term: 'Moratorium', def: 'Grace period before EMI starts (education loans) OR temporary EMI pause (COVID-type relief). Interest still accrues!' },
                { term: 'NOC (No Objection Certificate)', def: 'Document from bank after full loan repayment. Proves you\'re debt-free. Needed to remove hypothecation/mortgage.' },
                { term: 'NPA (Non-Performing Asset)', def: 'Loan becomes NPA after 90 days of non-payment. Serious classification - legal action starts, CIBIL drops heavily.' },
                { term: 'Principal (मूल राशि)', def: 'Original loan amount borrowed. Example: ₹50L home loan = ₹50L principal. Interest calculated on this.' },
                { term: 'Processing Fee', def: 'Upfront charge (0.5-2%) for loan processing. Usually non-refundable even if loan rejected. Negotiable!' },
                { term: 'Repo Rate', def: 'RBI\'s policy rate (currently 6.5%). Floating loans linked to this adjust when RBI changes repo rate.' },
                { term: 'Secured Loan', def: 'Loan with collateral (home, car, gold). Lower interest (7-12%). Risk: asset loss if default.' },
                { term: 'Spread/Margin', def: 'Extra % added to base rate (MCLR/repo). Example: MCLR 8.5% + Spread 0.75% = Your rate 9.25%' },
                { term: 'Tenure (अवधि)', def: 'Loan repayment period. Longer tenure = lower EMI but higher total interest. Home loans: 5-30 years.' },
                { term: 'Unsecured Loan', def: 'Loan without collateral (personal loan, credit card). Higher interest (11-24%). Risk: credit score damage only.' }
              ].map((item, index) => (
                <details key={index} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300">
                  <summary className="font-semibold text-gray-800 cursor-pointer flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    {item.term}
                  </summary>
                  <p className="mt-3 text-gray-700 pl-7">{item.def}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Congratulations Message */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-8 text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-green-900 mb-3">
              Congratulations! You've Completed Loan Basics! 🎊
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              You've mastered the fundamentals of loans. You now understand EMI, interest rates, eligibility, 
              and how to choose the right loan for you!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/learn/loans/quiz"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition-all"
              >
                🎯 Take Quiz & Get Certificate
              </Link>
              <Link
                to="/learn/home-loans"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
              >
                🏠 Continue to Home Loans →
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/documents-required" className="text-gray-600 hover:text-blue-600">
              ← Previous: Documents Required
            </a>
            <Link to="/learn/home-loans" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg font-semibold">
              Next Category: Home Loans →
            </Link>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Common Loan Terms Explained for Beginners",
            "educationalLevel": "Beginner",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default CommonLoanTerms;





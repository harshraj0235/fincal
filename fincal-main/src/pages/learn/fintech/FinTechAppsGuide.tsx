import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Smartphone, CheckCircle, Award, AlertTriangle,
  Target, HelpCircle, Star, Zap, CreditCard, Building
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const FinTechAppsGuide: React.FC = () => {
  const faqData = [
    {
      question: "What is a neo bank and how is it different from traditional bank?",
      answer: "Neo bank: Digital-only bank (no physical branches), modern app, AI insights, higher interest. Examples: Jupiter (6.5%), Fi Money. Traditional bank: Physical branches, basic app, lower interest (3-4%). Neo banks partner with licensed banks (Jupiter = Federal Bank). Your money equally safe (DICGC insured ₹5L)!"
    },
    {
      question: "Is CRED safe for credit card payments?",
      answer: "100% SAFE! CRED is RBI-approved, PCI-DSS certified. Never stores your card CVV. Uses bank-grade encryption. 10+ million users. But: (1) CRED coins have limited value (₹1 coin ≠ ₹1), (2) Redemption options limited, (3) Better: Direct bank payment (no middleman). CRED good for: Rewards + payment reminders."
    },
    {
      question: "Should I open Jupiter or Fi salary account?",
      answer: "Jupiter: Better interest (6.5%), instant digital FD, automated insights, gems rewards. Fi: Better savings pots (automated), Ducats rewards, cleaner UI. Both: Zero balance, DICGC insured, Federal Bank partner. Choose based on: Jupiter = higher interest (₹10L → ₹65K/year!). Fi = better savings automation!"
    },
    {
      question: "What is Niyo and should I use it?",
      answer: "Niyo: Zero-fee salary account + forex card (0% markup for travel). Best for: Frequent international travelers (save 3-5% forex markup vs other cards). Pros: No charges, instant account, Equitas/DCB Bank partner. Cons: Limited branch network. Good if: Travel often or want zero-fee account!"
    },
    {
      question: "Are FinTech apps regulated by RBI?",
      answer: "Neo banks: NOT banks themselves, but partner with RBI-licensed banks (Jupiter/Fi = Federal Bank, Niyo = Equitas Bank). Your deposits in partner bank (RBI regulated + DICGC insured ₹5L). Payment apps (CRED, Paytm): RBI-registered as payment aggregators. Safe but: Partner bank can change!"
    },
    {
      question: "Can I get loan from FinTech apps?",
      answer: "YES! Many offer: Jupiter: Personal loan (8-18%), BNPL. Paytm: Postpaid ₹60K, personal loan ₹10L. Amazon Pay: ₹60K credit. Interest: 12-36% p.a. (higher than banks!). Good for: Small emergencies (₹10-50K). Bad for: Large loans (bank cheaper). Check: Processing fees, interest rate, hidden charges!"
    },
    {
      question: "What happens if neo bank shuts down?",
      answer: "Your money is SAFE! Neo bank = app only, money in partner bank account (Federal/Equitas). If app shuts: (1) Money still in partner bank, (2) Access via partner bank's netbanking, (3) Withdraw via ATM/branch. Example: If Jupiter shuts, your Federal Bank account remains active!"
    },
    {
      question: "Which FinTech app is best for beginners?",
      answer: "Start with: (1) Google Pay / PhonePe: Simplest UPI, zero learning curve. (2) Jupiter: Best neo bank for beginners (easy onboarding, good interest). (3) Amazon Pay: If you shop on Amazon (cashback!). Avoid initially: CRED (need credit card), BNPL apps (debt risk). Master basics first!"
    },
    {
      question: "Do FinTech apps share my financial data?",
      answer: "Only with consent! RBI's Account Aggregator (AA) framework: Apps can access your bank data ONLY if you approve. Can revoke anytime. FinTech apps use for: (1) Credit scoring, (2) Personalized offers, (3) Financial insights. Encrypted + secure. But: Read privacy policy, don't give unnecessary permissions!"
    },
    {
      question: "Can I trust cashback promises from FinTech apps?",
      answer: "Yes, but read T&C! Cashback types: (1) Instant (credited immediately), (2) Scratch card (50% win rate), (3) 30-day credit (80% get it), (4) Coins/Points (limited redemption). Best: Use for genuine purchases, don't buy just for cashback. ₹100 cashback on ₹1000 spend = good. ₹10 cashback = not worth it!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Best FinTech Apps India 2025: CRED, Jupiter, Fi, Niyo | Neo Banks & Salary Accounts Complete Guide | MoneyCal"
        description="Explore top FinTech apps in India: CRED (credit card bill payments, rewards), Jupiter/Fi (neo banks with 6.5% interest), Niyo (zero-fee salary account, forex card). Features, pros & cons, safety, customer reviews, RBI regulation. Should you switch from traditional bank? Hindi + English"
        keywords="FinTech apps India 2025, CRED app, Jupiter neo bank, Fi Money, Niyo salary account, best digital banking apps, neo bank vs traditional bank, 6.5% interest savings, फिनटेक ऐप्स भारत"
        url="/learn/fintech-digital-payments/best-fintech-apps-india-cred-jupiter-fi-niyo-salary-accounts-2025"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to FinTech</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 5 of 8</span>
                <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <span className="hidden sm:inline">Back to Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Lesson 5 • 40 Minutes • Intermediate</div>
                <h1 className="text-4xl font-bold text-gray-900">Best FinTech Apps India 2025</h1>
                <p className="text-xl text-gray-600 mt-1">CRED, Jupiter, Fi, Niyo - Complete Guide</p>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                ❓ Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Q{index + 1}: {faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Lesson Complete */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">🎉 Lesson Complete!</h3>
            <Link to="/learn/fintech-digital-payments/buy-now-pay-later-bnpl-lazypay-simpl-zestmoney-india-guide-2025" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next: BNPL Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinTechAppsGuide;
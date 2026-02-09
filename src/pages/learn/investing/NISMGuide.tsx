import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Award, CheckCircle, Shield, BadgeCheck,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, FileText,
  Users, Star, BookOpen, Briefcase, GraduationCap, Clock, Zap
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const NISMGuide: React.FC = () => {
  const faqData = [
    {
      question: "What is NISM and why is certification important?",
      answer: "NISM (National Institute of Securities Markets) is SEBI's education arm. Certifications mandatory for: (1) Mutual fund distributors (Series V-A), (2) Investment advisors (Series X-A), (3) Research analysts, (4) Compliance officers. Without certification = Cannot work legally!"
    },
    {
      question: "NISM Series V-A vs X-A - what's the difference?",
      answer: "Series V-A: Mutual Fund Distributor (can sell MF, earn commission). Series X-A: Investment Advisor (give paid advice, cannot sell products). V-A easier, X-A more prestigious. Choose based on career goal!"
    },
    {
      question: "How much can I earn as NISM-certified MF distributor?",
      answer: "Commission: 0.5-1% trail annually on client AUM. Example: ₹1 crore client AUM = ₹50,000-₹1L annual recurring income! Top distributors earn ₹10L-₹1 crore/year."
    },
    {
      question: "NISM exam fees and registration process?",
      answer: "Series V-A: ₹1,500 exam fee. Series X-A: ₹1,200. Register on NISM website, pay online, choose test center, book slot. Results within 2-3 days. Valid for 3 years (renewal needed)."
    },
    {
      question: "NISM exam difficulty - passing percentage?",
      answer: "Series V-A: 60+ marks needed (out of 100). Pass rate: 40-50%. Series X-A: 50+ marks. Pass rate: 60%. Not very difficult with 15-20 hours preparation!"
    },
    {
      question: "Best study materials for NISM preparation?",
      answer: "Free: NISM workbooks (download from NISM.ac.in). Paid: EduPristine, FinnovationZ courses (₹2,000-5,000). Mock tests mandatory! Practice on NISM portal."
    },
    {
      question: "Can I give NISM exam online or only at center?",
      answer: "Test center only! 200+ centers across India. Exam is computer-based (MCQ format). 2 hours duration. Results displayed immediately after submission!"
    },
    {
      question: "After NISM certification, what's next?",
      answer: "Series V-A: Register with AMCs (AMFI registration), start distributing. Series X-A: Register as RIA with SEBI (₹10,000+ fees), get license, start advisory practice."
    },
    {
      question: "Can I practice without NISM certification?",
      answer: "NO! SEBI will fine you + legal issues. All mutual fund distributors MUST have Series V-A. All investment advisors MUST have Series X-A. This is law!"
    },
    {
      question: "NISM certificate validity and renewal?",
      answer: "Valid for 3 years. Renewal: Give CPE (Continuing Professional Education) exam or re-take full exam. CPE easier. Cost: ₹500-1,000. Keep certificate updated!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="NISM Certifications 2025: Series V-A, X-A Complete Guide India | MoneyCal"
        description="Complete NISM certification guide. Series V-A (Mutual Fund Distributor), Series X-A (Investment Adviser), exam pattern, fees ₹1500, syllabus, study materials, passing marks 60%, career opportunities (earn ₹50K-₹10L+), registration process, validity 3 years, how to prepare."
        keywords="NISM certification India, Series V-A exam, Series X-A investment advisor, mutual fund distributor course, NISM exam fees, study material, investment advisor license, SEBI RIA, NISM प्रमाणपत्र"
        url="/learn/investing-wealth/nism-certifications-investment-advisor-mf-distributor-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Investing & Wealth</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 9 of 11</span>
                <Link 
                  to="/learn/investing-wealth/top-10-investing-mistakes-panic-selling-timing-market-overtrading"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="hidden sm:inline">Next Lesson</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Lesson 9 • 40 Minutes • Advanced</div>
                <h1 className="text-4xl font-bold text-gray-900">NISM Certifications</h1>
                <p className="text-xl text-gray-600 mt-1">Become Investment Advisor (Series V-A, X-A) - NISM प्रमाणपत्र</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-blue-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>NISM Series V-A: Become MF Distributor (earn ₹50K-₹10L+ annually!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>NISM Series X-A: Registered Investment Advisor (SEBI RIA license)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Exam pattern, fees (₹1,500), syllabus, study materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Career opportunities & earning potential in finance advisory</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Series V-A vs X-A */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📋 NISM Certifications Comparison</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BadgeCheck className="w-8 h-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Series V-A</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Mutual Fund Distributors</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Purpose:</strong> Sell mutual funds, earn commission</li>
                    <li><strong>Exam Fee:</strong> ₹1,500</li>
                    <li><strong>Passing Marks:</strong> 60/100</li>
                    <li><strong>Duration:</strong> 2 hours (100 MCQs)</li>
                    <li><strong>Validity:</strong> 3 years</li>
                    <li><strong>Earning:</strong> 0.5-1% trail commission</li>
                    <li><strong>Best For:</strong> Side income, entrepreneurship</li>
                  </ul>
                </div>

                <div className="border-2 border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-8 h-8 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Series X-A</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Investment Adviser (RIA)</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Purpose:</strong> Give investment advice, charge fees</li>
                    <li><strong>Exam Fee:</strong> ₹1,200</li>
                    <li><strong>Passing Marks:</strong> 50/100</li>
                    <li><strong>Duration:</strong> 2 hours (100 MCQs)</li>
                    <li><strong>Validity:</strong> 3 years</li>
                    <li><strong>Earning:</strong> ₹5K-50K per client/year</li>
                    <li><strong>Best For:</strong> Professional advisory career</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

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

          {/* Key Takeaways */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Series V-A:</strong> MF distributor, earn commission. Exam fee ₹1,500, pass at 60%.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Series X-A:</strong> Investment Advisor (RIA), charge fees. More prestigious!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Career opportunity:</strong> Earn ₹50K-₹10L+ annually helping people invest wisely!</p>
                </div>
              </div>
            </div>
          </motion.section>

          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Top 10 Investing Mistakes (Avoid Losing Lakhs!)</h3>
            <p className="mb-6 text-red-100">Learn common mistakes: Panic selling, timing market, over-trading. Avoid these to save your wealth!</p>
            <Link to="/learn/investing-wealth/top-10-investing-mistakes-panic-selling-timing-market-overtrading" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next Lesson: Top 10 Mistakes
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NISMGuide;

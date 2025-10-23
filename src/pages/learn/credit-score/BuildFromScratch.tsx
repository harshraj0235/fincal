import React from 'react';
import { Rocket, CheckCircle, TrendingUp, CreditCard, Target, Clock } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const BuildFromScratch: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Build Credit Score from Scratch 2024 - Beginners Guide | MoneyCal"
        description="Complete guide to building credit score from zero. Learn how to start with no credit history, get first credit card, build 750+ score in 12-18 months. Step-by-step plan included."
        keywords="build credit score from scratch, no credit history, first credit card, credit invisible, build CIBIL score, start credit history"
        canonicalUrl="https://moneycal.in/learn/credit-score/build-from-scratch"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Build Credit Score from Scratch',
          description: 'Complete guide for beginners to build credit score from zero',
          totalTime: 'P12M',
          step: [
            { '@type': 'HowToStep', name: 'Get secured credit card', text: 'Start with FD-backed card' },
            { '@type': 'HowToStep', name: 'Make small purchases', text: 'Use 10-30% of limit monthly' },
            { '@type': 'HowToStep', name: 'Pay in full always', text: 'Build perfect payment history' },
            { '@type': 'HowToStep', name: 'Reach 750+ score', text: 'Achieve excellent credit in 12-18 months' }
          ]
        }}
      />
      
      <LearnLayout
        category="credit-score"
        currentLesson="build-from-scratch"
        breadcrumb={['Learn', 'Credit Score', 'Build From Scratch']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Rocket className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Start from Zero - Reach 750+ in 12-18 Months!</h3>
              <p className="text-gray-700">
                No credit history? No problem! Follow this proven step-by-step plan to build excellent credit score from scratch. 
                College students, first-time borrowers - this is your complete roadmap! 🚀📈
              </p>
            </div>
          </div>
        </div>

        {/* 12-Month Action Plan */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            12-Month Credit Building Plan (12 महीने की योजना)
          </h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Month-by-Month Roadmap:</h3>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-5 rounded-lg text-white">
                <div className="flex items-center mb-3">
                  <Clock className="h-7 w-7 mr-3" />
                  <h4 className="text-lg font-bold">Month 1-2: Get Your First Credit Product</h4>
                </div>
                <div className="bg-white p-4 rounded text-gray-700">
                  <p className="font-semibold text-gray-900 mb-3">3 Options to Start:</p>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900 mb-1">Option 1: Secured Card</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Get FD of ₹10-25K</li>
                        <li>• Apply for secured card</li>
                        <li>• Limit = 80-90% of FD</li>
                        <li>• 100% approval!</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900 mb-1">Option 2: Add-On Card</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Ask parents/spouse</li>
                        <li>• Get add-on card</li>
                        <li>• Builds your history</li>
                        <li>• Easy & free!</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-bold text-purple-900 mb-1">Option 3: Student Card</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• If in college/grad school</li>
                        <li>• Lower requirements</li>
                        <li>• ₹5-10K limits</li>
                        <li>• Good starting point</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-3">
                  <CreditCard className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">Month 3-6: Build Perfect Payment Record</h4>
                </div>
                <div className="bg-white p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-3">What to Do:</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Make 5-10 small purchases monthly (groceries, bills)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Keep utilization between 10-30% of limit</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>ALWAYS pay full bill 3 days before due date</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Set auto-pay for safety</span>
                    </li>
                  </ul>
                  <div className="bg-green-100 p-2 rounded mt-3 text-xs text-center">
                    <p className="text-green-800 font-bold">Expected Score after 6 months: 650-700 ✅</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-2 border-purple-300">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-7 w-7 text-purple-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">Month 7-12: Upgrade & Expand</h4>
                </div>
                <div className="bg-white p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-3">Growth Phase:</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Apply for 2nd unsecured credit card (better benefits)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Request credit limit increase on first card</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Consider small personal loan (₹50K) if needed</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Maintain perfect payment record on all accounts</span>
                    </li>
                  </ul>
                  <div className="bg-purple-100 p-2 rounded mt-3 text-xs text-center">
                    <p className="text-purple-800 font-bold">Expected Score after 12 months: 720-760 🎉</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border-2 border-yellow-300">
                <div className="flex items-center mb-3">
                  <Target className="h-7 w-7 text-yellow-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">Month 13-18: Reach Excellent (750+)</h4>
                </div>
                <div className="bg-white p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-3">Optimization Phase:</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Maintain 2-3 credit cards with perfect payments</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Keep utilization consistently below 30%</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Add credit mix (if taking vehicle/home loan)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Avoid new credit applications</span>
                    </li>
                  </ul>
                  <div className="bg-gradient-to-r from-green-200 to-emerald-200 p-2 rounded mt-3 text-xs text-center border-2 border-green-500">
                    <p className="text-green-900 font-bold text-lg">Target Score: 750-800+ 🏆</p>
                    <p className="text-gray-700">Best loan rates, premium cards, instant approvals!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-score/what-is-credit-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Credit Score Basics</p>
                <p className="text-sm text-gray-600">Understand fundamentals</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Improve Score Plan</p>
                <p className="text-sm text-gray-600">Continue improvement</p>
              </a>
              <a href="/learn/credit-cards/what-is-credit-card" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Credit Card Basics</p>
                <p className="text-sm text-gray-600">Get your first card</p>
              </a>
              <a href="/learn/credit-score/check-score-free" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Check Score Free</p>
                <p className="text-sm text-gray-600">Monitor your progress</p>
              </a>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Start with: Secured card (FD-backed), add-on card, or student card</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Month 1-6: Build payment history, use 10-30%, pay in full → Reach 650-700</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Month 7-12: Get 2nd card, increase limits, maintain perfect record → Reach 720-760</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Month 13-18: Optimize mix, keep utilization low, perfect payments → Reach 750-800+</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Timeline: 0 → 750+ in 12-18 months with disciplined approach</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Golden rules: Pay full always, keep utilization &lt; 30%, never miss due dates</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Start Your Credit Journey Today! 🚀</h2>
          <p className="text-green-100 mb-6">
            Get your first credit card and start building excellent credit history!
          </p>
          <a
            href="/learn/credit-cards/application-process"
            className="inline-block bg-white text-green-600 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors"
          >
            Apply for First Card →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default BuildFromScratch;

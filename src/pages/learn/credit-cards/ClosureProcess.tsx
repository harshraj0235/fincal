import React from 'react';
import { XCircle, CheckCircle, AlertCircle, FileText, Shield, TrendingDown } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const ClosureProcess: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How to Close Credit Card 2024 - Step by Step Process | MoneyCal"
        description="Complete guide to closing credit card in India. Understand impact on credit score, proper closure process, when to close, alternatives, and avoid mistakes."
        keywords="close credit card, cancel credit card, credit card closure process, close credit card impact on cibil, surrender credit card"
        canonicalUrl="/learn/credit-cards/closure-process"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Close Credit Card Properly',
          description: 'Step-by-step guide to closing credit card without hurting credit score',
          step: [
            { '@type': 'HowToStep', name: 'Clear outstanding balance', text: 'Pay all dues in full' },
            { '@type': 'HowToStep', name: 'Redeem rewards', text: 'Use all points before closure' },
            { '@type': 'HowToStep', name: 'Request closure', text: 'Call customer care or submit written request' },
            { '@type': 'HowToStep', name: 'Get confirmation', text: 'Obtain closure certificate from bank' }
          ]
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="closure-process"
        breadcrumb={['Learn', 'Credit Cards', 'Closure Process']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Think Before You Close - It Affects Your Credit Score!</h3>
          <p className="text-gray-700">
                Closing a credit card can drop your CIBIL score by 20-100 points! Learn the right way to close, 
                when to close (and when NOT to), and how to minimize impact. ????
              </p>
            </div>
          </div>
        </div>

        {/* Should You Close */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Should You Close Your Credit Card? (???? ??? ???? ??????)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-4">? Good Reasons to Close:</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>High annual fee (&gt; ?5,000) and can't waive it</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Duplicate card (have better version)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Can't control spending (debt issues)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Card has minimal benefits for you</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Multiple cards causing confusion</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-red-900 mb-4">? Bad Reasons (DON'T Close):</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>It's your oldest card (hurts credit history length)</span>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You're not using it (keep active with small purchases)</span>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Temporary financial issue (better alternatives exist)</span>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Just to "clean up" (reduces total credit limit)</span>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Have only 1-2 cards total (diversity needed)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400">
            <p className="font-bold text-gray-900 mb-2">?? Alternative to Closing:</p>
            <p className="text-sm text-gray-700">
              Instead of closing, keep card active with 1 small purchase every 3-6 months and set auto-pay. 
              This maintains credit history without management hassle!
            </p>
          </div>
        </section>

        {/* Impact on Credit Score */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Impact on Credit Score (CIBIL ?? ??????)
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">?? Closing Can Drop Score by 20-100 Points!</h3>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <h4 className="font-bold text-gray-900 mb-3">Why Credit Score Drops:</h4>
                
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-bold text-red-900 mb-1">1. Reduced Total Credit Limit</p>
                    <p className="text-sm text-gray-700 mb-2">
                      Close ?1L limit card ? Total limit decreases ? Utilization ratio increases ? Score drops
                    </p>
                    <div className="bg-white p-2 rounded text-xs">
                      <p className="text-gray-700">Example: ?30K used of ?3L limit = 10% ?</p>
                      <p className="text-gray-700">After closing ?1L card: ?30K of ?2L = 15% ?? (worse!)</p>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-bold text-orange-900 mb-1">2. Credit History Length Reduced</p>
                    <p className="text-sm text-gray-700 mb-2">
                      Closing oldest card reduces average account age (15% of credit score)
                    </p>
                    <div className="bg-white p-2 rounded text-xs">
                      <p className="text-gray-700">Example: 5-year-old card closed ? Average age drops from 4 years to 2.5 years</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded">
                    <p className="font-bold text-yellow-900 mb-1">3. Credit Mix Affected</p>
                    <p className="text-sm text-gray-700">
                      Having multiple credit types (cards + loans) shows maturity. Closing reduces this mix.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-lg border-2 border-blue-400">
                <p className="font-bold text-gray-900 mb-2">?? Expected Score Drop:</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>• Newest card (1-2 years old): <strong>10-20 points</strong></p>
                  <p>• Mid-age card (3-5 years old): <strong>20-50 points</strong></p>
                  <p>• Oldest card (5+ years old): <strong>50-100 points</strong></p>
                  <p className="text-red-700 font-bold mt-2">?? NEVER close your oldest credit card!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proper Closure Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Proper Credit Card Closure Process (??? ?????????)
          </h2>

          <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">7-Step Closure Process:</h3>

            <div className="space-y-4">
              <div className="bg-blue-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Clear All Outstanding Dues</h4>
                    <p className="text-gray-700 mb-2 text-sm">
                      Pay 100% of outstanding balance including all charges, fees, and interest
                    </p>
                    <div className="bg-white p-3 rounded text-xs text-gray-600">
                      Wait for payment to reflect (2-3 days) before proceeding to next step
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Redeem All Reward Points</h4>
                    <p className="text-gray-700 mb-2 text-sm">
                      Use or transfer reward points before closure - they expire with card!
                    </p>
                    <div className="bg-white p-3 rounded text-xs">
                      <p className="text-gray-700">Options: Cash credit, shopping vouchers, air miles, products</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-purple-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Cancel Auto-Pay & Standing Instructions</h4>
                    <p className="text-gray-700 mb-2 text-sm">
                      Remove all recurring payments, subscriptions, and auto-debits linked to this card
                    </p>
                    <div className="bg-white p-3 rounded text-xs">
                      <p className="text-gray-700">Common: Netflix, Amazon Prime, utility bills, SIPs, insurance premiums</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-orange-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">4</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Request Closure</h4>
                    <p className="text-gray-700 mb-2 text-sm">
                      Two options:
                    </p>
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded text-sm">
                        <p className="font-bold text-gray-900">Option A: Call Customer Care</p>
                        <p className="text-xs text-gray-600">Call helpline, request closure, provide card details</p>
                      </div>
                      <div className="bg-white p-3 rounded text-sm">
                        <p className="font-bold text-gray-900">Option B: Written Application</p>
                        <p className="text-xs text-gray-600">Email/letter to bank stating closure request with card number</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">5</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Cut the Card Physically</h4>
                    <p className="text-gray-700 mb-2 text-sm">
                      After closure confirmation, cut card diagonally through chip and magnetic strip
                    </p>
                    <div className="bg-white p-3 rounded text-xs text-gray-600">
                      Security: Prevents misuse of old card. Dispose pieces in different bins.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-yellow-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">6</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Get Closure Confirmation Letter</h4>
                    <p className="text-gray-700 mb-2 text-sm">
                      Request "No Dues Certificate" or "Closure Confirmation" via email
                    </p>
                    <div className="bg-white p-3 rounded text-xs">
                      <p className="text-gray-700 font-bold mb-1">Important: Keep this document!</p>
                      <p className="text-gray-600">Proof that card is closed and no dues pending. Needed if disputes arise later.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">7</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Verify in Credit Report (After 45 Days)</h4>
                    <p className="text-gray-700 mb-2 text-sm">
                      Check CIBIL report to ensure card status shows "Closed" not "Settled"
                    </p>
                    <div className="bg-white p-3 rounded text-xs">
                      <p className="text-green-700 font-bold">? Correct: Account Status = "CLOSED"</p>
                      <p className="text-red-700 font-bold">? Wrong: Account Status = "SETTLED" (hurts score!)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alternatives to Closing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Alternatives to Closing (??????)
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">5 Better Alternatives:</h3>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">1. Downgrade to Lifetime Free Variant</p>
                  <p className="text-sm text-gray-700">
                    Many banks offer lower-tier cards with no fee. Maintain credit history without cost.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">2. Negotiate Annual Fee Waiver</p>
                  <p className="text-sm text-gray-700">
                    Call customer care, mention loyalty, threaten closure - works 50% of time!
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">3. Keep Active with Minimal Usage</p>
                  <p className="text-sm text-gray-700">
                    One ?100 purchase every 3 months, set auto-pay. Maintains history with zero effort.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">4. Put Card on Hold/Freeze</p>
                  <p className="text-sm text-gray-700">
                    Temporary freeze through app. Card stays active but can't be used. Unfreeze anytime.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">5. Convert to Add-On Card</p>
                  <p className="text-sm text-gray-700">
                    Make it an add-on to another card (if same bank). Maintains history, no separate fees.
          </p>
        </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Common Closure Mistakes (???????)
          </h2>

          <div className="space-y-3">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">? Closing Without Clearing Dues</h4>
                <p className="text-sm text-gray-700">
                  Bank won't process closure with pending balance. You'll still owe money + it hurts credit score severely!
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">? Not Getting Written Confirmation</h4>
                <p className="text-sm text-gray-700">
                  Verbal assurance isn't enough. Always get "No Dues Certificate" via email to avoid future disputes.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">? Forgetting Auto-Pay Subscriptions</h4>
                <p className="text-sm text-gray-700">
                  Netflix, insurance, etc. will fail, causing inconvenience. Move to new card BEFORE closing!
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">? Closing All Cards at Once</h4>
                <p className="text-sm text-gray-700">
                  Massive credit score drop! Keep at least 1-2 cards active to maintain credit history.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">? Not Checking Credit Report After</h4>
                <p className="text-sm text-gray-700">
                  Verify closure reflects correctly. "Settled" status is negative, should show "Closed by customer".
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">?? Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-score/how-calculated" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">How Score Calculated</p>
                <p className="text-sm text-gray-600">Credit history length impact</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Improve Credit Score</p>
                <p className="text-sm text-gray-600">Rebuild after closure</p>
              </a>
              <a href="/learn/credit-cards/common-mistakes" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Common Mistakes</p>
                <p className="text-sm text-gray-600">Avoid costly errors</p>
              </a>
              <a href="/learn/credit-score/check-score-free" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Check Your Score</p>
                <p className="text-sm text-gray-600">Monitor post-closure impact</p>
              </a>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">?? Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Closing credit card can drop score by 20-100 points (oldest card hurts most)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Impact: Reduced credit limit, lower average account age, worse credit mix</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">7-step process: Clear dues ? Redeem points ? Cancel auto-pay ? Request closure ? Cut card ? Get certificate ? Verify report</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Alternatives: Downgrade to free card, negotiate fee waiver, minimal usage, freeze card</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">NEVER close: Oldest card, if it's your only card, without clearing 100% dues</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Verify: Credit report shows "CLOSED" not "SETTLED" after 45 days</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Think Carefully Before Closing! ??</h2>
          <p className="text-orange-100 mb-6">
            Explore alternatives first. If you must close, follow the proper process to minimize credit score impact!
          </p>
          <a
            href="/learn/credit-score/improve-score"
            className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-xl hover:bg-orange-50 transition-colors"
          >
            Improve Your Score ?
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default ClosureProcess;

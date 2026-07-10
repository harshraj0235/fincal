import React from 'react';
import { AlertTriangle, XCircle, CheckCircle, TrendingDown, DollarSign, Shield } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CommonMistakes: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="10 Common Credit Card Mistakes to Avoid 2024 - Save Lakhs | MoneyCal"
        description="Avoid these 10 costly credit card mistakes! Learn about minimum payment trap, late fees, cash advances, closing old cards and how to save lakhs by avoiding errors."
        keywords="credit card mistakes, credit card errors to avoid, credit card tips, minimum payment trap, credit score mistakes"
        canonicalUrl="/learn/credit-cards/common-mistakes"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: '10 Common Credit Card Mistakes and How to Avoid Them',
          description: 'Comprehensive guide to avoiding costly credit card mistakes',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="common-mistakes"
        breadcrumb={['Learn', 'Credit Cards', 'Common Mistakes']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Avoid These Mistakes - Save ?10 Lakhs+!</h3>
          <p className="text-gray-700">
                These common credit card mistakes cost Indians lakhs every year! Learn what NOT to do, 
                why it's costly, and the right alternative. Don't learn the hard way! ????
          </p>
            </div>
          </div>
        </div>

        {/* Top 10 Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            10 Costly Credit Card Mistakes (????? ???????)
          </h2>

          <div className="space-y-4">
            {/* Mistake 1 */}
            <div className="bg-gradient-to-r from-red-400 to-orange-500 p-5 rounded-xl text-white">
              <div className="flex items-center mb-3">
                <div className="bg-white rounded-full p-3 mr-3">
                  <span className="font-bold text-red-700 text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Paying Only Minimum Due (???? ???? ????!)</h3>
                  <p className="text-sm text-red-100">Costs ?10+ lakhs over time!</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded text-gray-700">
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-bold text-red-900 mb-2">? The Trap:</p>
                    <p className="text-xs text-gray-700">?1L balance ? Pay ?5K minimum ? Remaining ?95K @ 42% interest = ?3,325/month wasted!</p>
                  </div>
                  <div>
                    <p className="font-bold text-green-900 mb-2">? Right Way:</p>
                    <p className="text-xs text-gray-700">ALWAYS pay full ?1L ? Zero interest ? Save ?40K/year!</p>
                  </div>
                </div>
                <div className="bg-red-100 p-2 rounded mt-2 text-xs text-center">
                  <p className="text-red-800 font-bold">Lifetime cost: ?10+ lakhs wasted on interest!</p>
                </div>
              </div>
            </div>

            {/* Mistake 2 */}
            <div className="bg-white border-2 border-red-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-red-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-red-700 text-xl">2</span>
                </div>
                <h3 className="text-lg font-bold text-red-900">Missing Payment Due Date</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-bold text-gray-900 mb-2">? Consequences:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Late fee: ?500-1,500</li>
                    <li>• Interest @ 42% from day 1</li>
                    <li>• Credit score drops 50-100 points</li>
                    <li>• Stays on report 7 years</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-bold text-gray-900 mb-2">? Solution:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Set auto-pay for full amount</li>
                    <li>• Set 3 calendar reminders</li>
                    <li>• Pay 3 days before due date</li>
                    <li>• Enable SMS/email alerts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mistake 3 */}
            <div className="bg-white border-2 border-orange-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-orange-700 text-xl">3</span>
                </div>
                <h3 className="text-lg font-bold text-orange-900">Withdrawing Cash from Credit Card</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-bold text-gray-900 mb-2">? The Cost:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Cash advance fee: 2.5-3%</li>
                    <li>• Interest: 42% from DAY 1</li>
                    <li>• No free period at all</li>
                    <li>• Total: 6%+ for 1 month!</li>
                  </ul>
                  <p className="text-red-700 font-bold text-xs mt-2">Withdraw ?10K ? Costs ?645 in 1 month!</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-bold text-gray-900 mb-2">? Better Alternatives:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Use debit card (free)</li>
                    <li>• Personal loan (11-15%)</li>
                    <li>• Gold loan (7-12%)</li>
                    <li>• Borrow from family/friends</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mistake 4 */}
            <div className="bg-white border-2 border-yellow-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-yellow-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-yellow-700 text-xl">4</span>
                </div>
                <h3 className="text-lg font-bold text-yellow-900">Maxing Out Credit Cards (100% Utilization)</h3>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  Using full credit limit signals financial stress, drops credit score by 80-120 points!
                </p>
                <p className="font-bold text-green-700 text-sm">
                  ? Keep below 30%: ?30K of ?1L limit = Excellent score impact
                </p>
              </div>
            </div>

            {/* Mistake 5 */}
            <div className="bg-white border-2 border-purple-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-purple-700 text-xl">5</span>
                </div>
                <h3 className="text-lg font-bold text-purple-900">Closing Oldest Credit Card</h3>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  Reduces average account age (15% of score) and total credit limit (increases utilization).
                </p>
                <p className="font-bold text-green-700 text-sm">
                  ? Keep active with 1 small purchase every 3-6 months instead
                </p>
              </div>
            </div>

            {/* Mistake 6 */}
            <div className="bg-white border-2 border-blue-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-blue-700 text-xl">6</span>
                </div>
                <h3 className="text-lg font-bold text-blue-900">Applying for Multiple Cards at Once</h3>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  Each application = Hard inquiry = -5 to -10 points. 5 applications in 6 months = -50 points!
                </p>
                <p className="font-bold text-green-700 text-sm">
                  ? Wait 6 months between applications to minimize impact
                </p>
              </div>
            </div>

            {/* Mistake 7 */}
            <div className="bg-white border-2 border-green-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-green-700 text-xl">7</span>
                </div>
                <h3 className="text-lg font-bold text-green-900">Not Reading Terms & Conditions</h3>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  Hidden charges, reward caps, exclusions can make attractive offers useless.
                </p>
                <p className="font-bold text-blue-700 text-sm">
                  ? Read APR, fees, reward terms, and exclusions before signing up
                </p>
              </div>
            </div>

            {/* Mistake 8 */}
            <div className="bg-white border-2 border-red-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-red-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-red-700 text-xl">8</span>
                </div>
                <h3 className="text-lg font-bold text-red-900">Not Checking Statements Regularly</h3>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  Unauthorized charges, billing errors, fraudulent transactions go unnoticed.
                </p>
                <p className="font-bold text-green-700 text-sm">
                  ? Check statement weekly, report fraud within 3 days for zero liability
                </p>
              </div>
            </div>

            {/* Mistake 9 */}
            <div className="bg-white border-2 border-orange-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-orange-700 text-xl">9</span>
                </div>
                <h3 className="text-lg font-bold text-orange-900">Sharing CVV/OTP with Anyone</h3>
              </div>
              <div className="bg-orange-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  Sharing CVV/OTP leads to fraud. Banks NEVER ask for these details!
                </p>
                <p className="font-bold text-green-700 text-sm">
                  ? Never share CVV, OTP, PIN - not even with "bank officials"
                </p>
              </div>
            </div>

            {/* Mistake 10 */}
            <div className="bg-white border-2 border-purple-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-purple-700 text-xl">10</span>
                </div>
                <h3 className="text-lg font-bold text-purple-900">Ignoring Reward Point Expiry</h3>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  Reward points expire in 2-3 years. Many lose ?5,000-20,000 worth of points!
                </p>
                <p className="font-bold text-green-700 text-sm">
                  ? Redeem points every 6-12 months or before expiry
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Impact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Financial Impact of These Mistakes
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-pink-100 border-2 border-red-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">?? How Much Each Mistake Costs You:</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300 text-sm">
                <thead className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Mistake</th>
                    <th className="border border-gray-300 p-3">Annual Cost</th>
                    <th className="border border-gray-300 p-3">Lifetime Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Minimum Payment Trap</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700 font-bold">?40,000</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700 font-bold">?10+ lakhs</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Missing Payments (3/year)</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700">?4,500</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700">?50,000+</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Cash Withdrawals (?10K/month)</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700">?7,740</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700">?77,400</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Maxing Out Cards</td>
                    <td className="border border-gray-300 p-3 text-center text-orange-700">Score -100 pts</td>
                    <td className="border border-gray-300 p-3 text-center text-orange-700">?7L+ (loan rates)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Not Using Rewards</td>
                    <td className="border border-gray-300 p-3 text-center text-yellow-700">?20,000 lost</td>
                    <td className="border border-gray-300 p-3 text-center text-yellow-700">?2 lakhs lost</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-red-200 to-orange-200 rounded-lg border-2 border-red-500">
              <p className="font-bold text-gray-900 text-center mb-2 text-xl">?? Total Potential Loss:</p>
              <p className="text-center text-3xl font-bold text-red-700">?20+ Lakhs!</p>
              <p className="text-center text-sm text-gray-700">These mistakes combined can cost you over 20 lakhs in lifetime!</p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">?? Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/minimum-vs-full-payment" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-red-200">
                <p className="font-semibold text-red-600 mb-1">Minimum Payment Trap</p>
                <p className="text-sm text-gray-600">Avoid ?10L loss</p>
              </a>
              <a href="/learn/credit-cards/fraud-safety" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Fraud Protection</p>
                <p className="text-sm text-gray-600">Never share OTP/CVV</p>
              </a>
              <a href="/learn/credit-cards/interest-rates-charges" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">All Charges Explained</p>
                <p className="text-sm text-gray-600">Know every fee</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Improve Score</p>
                <p className="text-sm text-gray-600">Fix mistakes impact</p>
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
              <span className="text-gray-800">#1 Mistake: Minimum payments (costs ?10+ lakhs lifetime in interest)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Other costly mistakes: Cash withdrawal, late payments, maxing out cards, closing old cards</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Total potential loss: ?20+ lakhs if you make all these mistakes!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Solutions: Set auto-pay, use debit for cash, keep utilization &lt; 30%, maintain old cards</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Security: Never share CVV/OTP/PIN with anyone - banks never ask!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Check statements weekly, redeem rewards timely, read T&C before applying</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Avoid These Mistakes - Save Lakhs! ??</h2>
          <p className="text-red-100 mb-6">
            Learn the right way to use credit cards and maximize benefits!
          </p>
          <a
            href="/learn/credit-cards"
            className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-xl hover:bg-red-50 transition-colors"
          >
            All Credit Card Lessons ?
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default CommonMistakes;
